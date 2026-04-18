# ZConnect SDK — Implementation Architecture

# Backend path local

/Users/aps/zoniqx/backend/zConnect/apps/users/src/users/users.grpc.controller.ts

## Overview

The ZConnect SDK follows the **AWS SDK v3 modular pattern**: each domain is an independently installable package built on a shared core. Nothing in a module depends on another module. The core has zero domain knowledge.

---

## Package Topology

```
@zoniqx/
├── sdk-core              # transport, auth, middleware, errors — NO domain logic
├── sdk-listings          # listing operations
├── sdk-connections       # connection operations
├── sdk-transactions      # buy + raw transaction broadcast
├── sdk-kyc               # KYC / KYB flows
├── sdk-wallet            # wallet operations
├── sdk-identity          # identity & document management
├── sdk-organization      # organization + role management
├── sdk-chat              # chat
└── sdk                   # umbrella — composes all modules, nothing else
```

Each package has its own `package.json` and semver. A breaking change in `sdk-transactions` does not force a major bump in `sdk-listings`.

---

## Dependency Rules

```
sdk-{module}  →  sdk-core  (only)
sdk            →  sdk-core + all sdk-{module} packages
```

Modules NEVER import from other modules. If two modules share a type, that type lives in `sdk-core/types/`.

---

## Repository Structure

```
packages/
├── core/
│   ├── src/
│   │   ├── client.ts
│   │   ├── transport/
│   │   │   ├── http.ts
│   │   │   └── retry.ts
│   │   ├── auth/
│   │   │   ├── api-key.ts
│   │   │   ├── bearer.ts
│   │   │   └── interface.ts
│   │   ├── middleware/
│   │   │   ├── pipeline.ts
│   │   │   ├── logger.ts
│   │   │   ├── rate-limit.ts
│   │   │   └── idempotency.ts
│   │   ├── errors/
│   │   │   ├── base.ts
│   │   │   ├── api.ts
│   │   │   └── network.ts
│   │   ├── pagination/
│   │   │   └── paginator.ts
│   │   └── types/
│   │       ├── config.ts
│   │       ├── request.ts
│   │       └── response.ts
│   ├── package.json
│   └── tsconfig.json
│
├── listings/
│   ├── src/
│   │   ├── index.ts
│   │   ├── module.ts
│   │   ├── operations/
│   │   │   ├── create.ts
│   │   │   ├── list.ts
│   │   │   ├── get.ts
│   │   │   ├── update.ts
│   │   │   └── delete.ts
│   │   └── types/
│   │       ├── input.ts
│   │       └── output.ts
│   ├── package.json
│   └── tsconfig.json
│
├── transactions/
│   ├── src/
│   │   ├── index.ts
│   │   ├── module.ts
│   │   ├── operations/
│   │   │   ├── buy.ts
│   │   │   ├── send-raw.ts
│   │   │   ├── simulate.ts
│   │   │   └── get-status.ts
│   │   ├── signer/
│   │   │   ├── interface.ts      # Signer interface — SDK never signs
│   │   │   └── local.ts          # LocalSigner for tests only
│   │   └── types/
│   │       ├── input.ts
│   │       └── output.ts
│   └── package.json
│
└── sdk/                          # umbrella
    ├── src/
    │   ├── index.ts
    │   └── zconnect.ts           # ZConnect class, composes all modules
    └── package.json
```

---

## sdk-core — Detailed Design

### `ClientConfig`

```ts
interface ClientConfig {
  baseUrl: string;
  auth: AuthProvider; // plug in ApiKeyAuth | BearerAuth | OAuthProvider
  middlewares?: Middleware[];
  timeout?: number; // ms, default 30000
  retries?: RetryConfig;
}
```

### Transport (`http.ts`)

- Uses native `fetch` only — runs in Node 18+, browsers, and edge runtimes (Cloudflare Workers, Vercel Edge) without polyfills.
- Never imports Node built-ins (`fs`, `http`, `crypto`) at the transport layer.
- Responsible only for: serialization, headers, status → error mapping.

```ts
interface HttpTransport {
  request<T>(req: Request): Promise<Response<T>>;
}
```

### Middleware Pipeline (`pipeline.ts`)

```ts
type Middleware = (request: SDKRequest, next: NextFn) => Promise<SDKResponse>;

// compose runs middlewares left-to-right, transport is the final handler
const pipeline = compose(
  withLogger(),
  withRetry({ attempts: 3, backoff: "exponential" }),
  withRateLimit({ rps: 20 }),
  withIdempotencyKey(), // auto-injects X-Idempotency-Key on POST/PUT
  transport,
);
```

Middlewares ship as named factory functions, not classes, so they are tree-shakeable.

### Auth (`auth/interface.ts`)

```ts
interface AuthProvider {
  resolveHeaders(): Promise<Record<string, string>>;
}

// Implementations:
class ApiKeyAuth implements AuthProvider { ... }   // X-API-Key header
class BearerAuth implements AuthProvider { ... }   // Authorization: Bearer <token>
```

The client calls `auth.resolveHeaders()` before every request. An `OAuthProvider` could refresh tokens here transparently.

### Errors

```
ZConnectError          (base)
├── ApiError           (4xx / 5xx — carries statusCode, errorCode, message)
│   ├── AuthError      (401 / 403)
│   ├── NotFoundError  (404)
│   └── RateLimitError (429 — carries retryAfter)
└── NetworkError       (no response received)
```

All errors carry a `requestId` field (from `X-Request-ID` response header) for support tracing.

### Pagination (`paginator.ts`)

```ts
// Returns an async iterable — no opinion on page size or cursor strategy
async function* paginate<T>(
  operation: (cursor?: string) => Promise<PaginatedResponse<T>>,
): AsyncIterable<T>

// Usage
for await (const listing of paginate(cursor => listings.list({ cursor }))) {
  console.log(listing);
}
```

---

## Module Design — Pattern Every Module Follows

### Two consumption styles, one implementation

Every operation is a plain function. The module class just binds the client.

```ts
// operations/create.ts
export async function createListing(
  client: ZConnectClient,
  input: CreateListingInput,
): Promise<Listing> {
  return client.request("POST", "/listings", input);
}

// module.ts
export class ListingsModule {
  constructor(private client: ZConnectClient) {}
  create = (input: CreateListingInput) => createListing(this.client, input);
  list = (input: ListListingsInput) => listListings(this.client, input);
  get = (id: string) => getListing(this.client, id);
  update = (id: string, input: UpdateListingInput) =>
    updateListing(this.client, id, input);
  delete = (id: string) => deleteListing(this.client, id);
}
```

Tree-shakeable (functional style):

```ts
import { createListing } from "@zoniqx/sdk-listings";
```

Ergonomic (class style via umbrella):

```ts
const zc = new ZConnect({ apiKey: '...' });
await zc.listings.create({ ... });
```

### Types per module

```ts
// types/input.ts  — what the caller provides
// types/output.ts — what the SDK returns (mapped from API response)
```

Never expose raw API response shapes as public types. Map them. This lets the API change internally without breaking SDK consumers.

---

## Transactions Module — Special Design

### Raw Transaction Flow

```ts
// The SDK does NOT sign. It accepts a pre-signed payload.
export async function sendRawTransaction(
  client: ZConnectClient,
  input: SendRawTransactionInput,
): Promise<TransactionReceipt>;

interface SendRawTransactionInput {
  signedTransaction: `0x${string}`; // hex-encoded signed tx
  chainId: number;
}
```

### Signer Interface (for convenience wrappers)

```ts
// packages/transactions/src/signer/interface.ts
interface Signer {
  sign(payload: TransactionPayload): Promise<`0x${string}`>;
}
```

Callers plug in their own signer:

```ts
class FireblocksSigner implements Signer { ... }
class MetaMaskSigner implements Signer { ... }
```

The SDK ships a `LocalSigner` in `signer/local.ts` for test environments **only** — it is not exported from the main `index.ts`.

### Simulate before broadcast

```ts
await transactions.simulate(input); // dry run, throws if it would fail
await transactions.sendRaw(input); // broadcast
```

---

## Umbrella Package (`@zoniqx/sdk`)

```ts
// zconnect.ts
export class ZConnect {
  readonly listings: ListingsModule;
  readonly connections: ConnectionsModule;
  readonly transactions: TransactionsModule;
  readonly kyc: KycModule;
  readonly wallet: WalletModule;
  readonly identity: IdentityModule;
  readonly organization: OrganizationModule;
  readonly chat: ChatModule;

  constructor(config: ClientConfig) {
    const client = new ZConnectClient(config);
    this.listings = new ListingsModule(client);
    this.connections = new ConnectionsModule(client);
    this.transactions = new TransactionsModule(client);
    this.kyc = new KycModule(client);
    this.wallet = new WalletModule(client);
    this.identity = new IdentityModule(client);
    this.organization = new OrganizationModule(client);
    this.chat = new ChatModule(client);
  }
}
```

Zero logic. Just wiring.

---

## Type Generation Strategy

Do not hand-write input/output types from scratch.

1. Gateway already emits Swagger via `@nestjs/swagger`.
2. Run `openapi-typescript` against the gateway spec to get raw API types.
3. Hand-write the **public SDK types** (input/output per operation) that map from raw → clean.
4. Add a CI step: if gateway spec changes and SDK types drift, the build fails.

This means:

- Public SDK types are intentional and stable (hand-crafted).
- They never silently drift from the API (validated by CI against generated types).

---

## Build & Release

```
pnpm workspaces           # monorepo workspace per package
tsup                      # builds CJS + ESM + .d.ts per package
changesets                # independent version bumps per package
```

Each package publishes:

- `dist/index.cjs` — CommonJS
- `dist/index.mjs` — ESM
- `dist/index.d.ts` — types

---

## Implementation Order

| Phase | Package            | Why first                              |
| ----- | ------------------ | -------------------------------------- |
| 1     | `sdk-core`         | Everything depends on it               |
| 2     | `sdk-listings`     | Simplest domain, validates the pattern |
| 3     | `sdk-transactions` | Raw tx is the key differentiator       |
| 4     | `sdk-connections`  | Needed for most real integrations      |
| 5     | `sdk-kyc`          | Complex flow, good stress test         |
| 6     | All others         | Parallel once pattern is proven        |
| 7     | `sdk` umbrella     | Last — wires completed modules         |

---

## What Is Explicitly Out of Scope for the SDK

- **Signing** — SDK accepts signed payloads, never keys.
- **Key management** — no wallet creation, no private key storage.
- **WebSocket/real-time** — chat subscriptions are out of v1 scope.
- **Admin operations** — SDK is for integrators, not platform operators.
- **React hooks / Vue composables** — that is a separate `@zoniqx/sdk-react` layer built on top of this SDK.
