# ZConnect SDK

TypeScript SDK for ZConnect API - A modular SDK following AWS SDK v3 pattern for interacting with the ZConnect platform.

## Installation

Install the umbrella package for all modules:

```bash
npm install @zoniqx/sdk
# or
pnpm add @zoniqx/sdk
# or
yarn add @zoniqx/sdk
```

Or install individual modules:

```bash
npm install @zoniqx/sdk-core @zoniqx/sdk-listings
```

## Quick Start

```typescript
import { ZConnectSDK, ApiKeyAuth } from "@zoniqx/sdk";

const sdk = new ZConnectSDK({
  baseUrl: "https://api.zoniqx.com",
  auth: new ApiKeyAuth("your-api-key"),
  tenantId: "your-tenant-id", // Optional
  organizationId: "your-org-id", // Optional
});

// Get all listings
const listings = await sdk.listings.list();

// Create a new listing
const newListing = await sdk.listings.create({
  name: "My Listing",
  description: "Description here",
});
```

## Authentication

### API Key Authentication

```typescript
import { ZConnectSDK, ApiKeyAuth } from "@zoniqx/sdk";

const sdk = new ZConnectSDK({
  baseUrl: "https://api.zoniqx.com",
  auth: new ApiKeyAuth("your-api-key"),
});
```

### JWT Bearer Authentication

```typescript
import { ZConnectSDK, BearerAuth } from "@zoniqx/sdk";

const sdk = new ZConnectSDK({
  baseUrl: "https://api.zoniqx.com",
  auth: new BearerAuth("your-jwt-token"),
});
```

### Custom Authentication

Implement the `AuthProvider` interface for custom authentication:

```typescript
import type { AuthProvider } from "@zoniqx/sdk-core";

class CustomAuthProvider implements AuthProvider {
  async getHeaders(): Promise<Record<string, string>> {
    // Return custom headers
    return {
      Authorization: `Custom ${this.getToken()}`,
    };
  }

  private getToken(): string {
    // Your token logic
    return "token";
  }
}
```

## Modules

### Listings Module

Manage listings on the platform.

```typescript
// Create a listing
const listing = await sdk.listings.create({
  name: "Real Estate Fund",
  description: "Tokenized real estate investment",
});

// List all listings
const listings = await sdk.listings.list({ page: 1, limit: 20 });

// Get a specific listing
const listing = await sdk.listings.get("listing-id");

// Update a listing
const updated = await sdk.listings.update("listing-id", {
  name: "Updated Name",
});

// Delete a listing
await sdk.listings.delete("listing-id");

// Get marketplace listings
const marketplace = await sdk.listings.getMarketplace();

// Get connected issuers listings
const connected = await sdk.listings.getConnectedIssuersListings();

// Sync from deal
const synced = await sdk.listings.syncFromDeal({ dealId: "deal-id" });
```

### Transactions Module

Handle payment transactions.

```typescript
// ZConnect Pay
const transaction = await sdk.transactions.zconnectPay({
  listingId: "listing-id",
  amount: 1000,
  currency: "USD",
});

// Get transactions
const transactions = await sdk.transactions.getTransactions({
  page: 1,
  limit: 20,
});

// Get specific transaction
const transaction = await sdk.transactions.getTransaction("transaction-id");
```

### Connections Module

Manage connections between organizations and issuers.

```typescript
// Create connection
const connection = await sdk.connections.create({
  issuerId: "issuer-id",
  message: "I would like to connect",
});

// List connections
const connections = await sdk.connections.list();

// Accept connection
await sdk.connections.accept("connection-id");

// Reject connection
await sdk.connections.reject("connection-id");

// Cancel connection
await sdk.connections.cancel("connection-id");

// Get issuers with connection status
const issuers = await sdk.connections.getIssuers();

// Get organizations with connection status
const organizations = await sdk.connections.getOrganizations();
```

### KYC Module

Manage KYC/KYB requests.

```typescript
// Initiate KYC
const kyc = await sdk.kyc.initiate({
  userId: "user-id",
  type: "INDIVIDUAL",
});

// List KYC requests
const kycRequests = await sdk.kyc.list({ page: 1, limit: 20 });

// Get specific KYC request
const kyc = await sdk.kyc.get("kyc-id");
```

### Wallet Module

Manage wallet addresses.

```typescript
// Create wallet
const wallet = await sdk.wallet.create({
  address: "0x...",
  chainId: "1",
});

// List wallets
const wallets = await sdk.wallet.list({ page: 1, limit: 20 });

// Get specific wallet
const wallet = await sdk.wallet.get("wallet-id");
```

### Organization Module

Manage organizations.

```typescript
// Create organization
const org = await sdk.organization.create({
  name: "My Organization",
  description: "Description",
});

// List organizations
const organizations = await sdk.organization.list();

// Get specific organization
const org = await sdk.organization.get("org-id");

// Update organization
const updated = await sdk.organization.update("org-id", {
  name: "Updated Name",
});

// Delete organization
await sdk.organization.delete("org-id");

// Get my organization
const myOrg = await sdk.organization.getMy();
```

### Chat Module

Manage chat functionality.

```typescript
// Create chat
const chat = await sdk.chat.create({
  dealId: "deal-id",
  message: "Hello",
});

// List chats
const chats = await sdk.chat.list({ page: 1, limit: 20 });

// Send message
const message = await sdk.chat.sendMessage({
  chatId: "chat-id",
  content: "Hello",
});

// Get messages
const messages = await sdk.chat.getMessages("chat-id");
```

## Configuration Options

```typescript
interface ClientConfig {
  baseUrl: string; // API base URL
  auth: AuthProvider; // Authentication provider
  tenantId?: string; // Optional tenant ID
  organizationId?: string; // Optional organization ID
  headers?: Record<string, string>; // Custom headers
  timeout?: number; // Request timeout in ms (default: 30000)
  retries?: RetryConfig; // Retry configuration
  middlewares?: Middleware[]; // Custom middleware
}
```

## Middleware

The SDK includes built-in middleware for logging, retry, rate limiting, and idempotency. You can add custom middleware:

```typescript
import type { Middleware } from "@zoniqx/sdk-core";

const customMiddleware: Middleware = {
  async request(request) {
    console.log("Request:", request);
    return request;
  },
  async response(response) {
    console.log("Response:", response);
    return response;
  },
};

const sdk = new ZConnectSDK({
  baseUrl: "https://api.zoniqx.com",
  auth: new ApiKeyAuth("your-api-key"),
  middlewares: [customMiddleware],
});
```

## Error Handling

The SDK provides specific error classes:

```typescript
import {
  ApiError,
  AuthError,
  NotFoundError,
  RateLimitError,
  NetworkError,
} from "@zoniqx/sdk-core";

try {
  await sdk.listings.get("invalid-id");
} catch (error) {
  if (error instanceof NotFoundError) {
    console.error("Listing not found");
  } else if (error instanceof RateLimitError) {
    console.error("Rate limit exceeded");
  } else if (error instanceof AuthError) {
    console.error("Authentication failed");
  } else if (error instanceof NetworkError) {
    console.error("Network error");
  } else {
    console.error("Unknown error:", error);
  }
}
```

## Pagination

For paginated responses, use the pagination helper:

```typescript
import { paginate } from "@zoniqx/sdk-core";

for await (const listing of paginate(sdk.listings.list, { limit: 100 })) {
  console.log(listing);
}
```

## Package Structure

- `@zoniqx/sdk-core` - Core client, transport, auth, middleware, errors, pagination
- `@zoniqx/sdk-listings` - Listing operations
- `@zoniqx/sdk-transactions` - Transaction operations
- `@zoniqx/sdk-connections` - Connection management
- `@zoniqx/sdk-kyc` - KYC/KYB flows
- `@zoniqx/sdk-wallet` - Wallet operations
- `@zoniqx/sdk-organization` - Organization management
- `@zoniqx/sdk-chat` - Chat operations
- `@zoniqx/sdk` - Umbrella package (includes all modules)

## Development

### Build

```bash
pnpm build
```

### Clean

```bash
pnpm clean
```

### Test

```bash
pnpm test
```

## Publishing

This project uses Changesets for versioning and publishing. To create a changeset:

```bash
pnpm changeset
```

## License

MIT
