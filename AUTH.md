# Authentication Guide

This guide explains how to authenticate with the ZConnect SDK.

## Overview

The ZConnect SDK supports multiple authentication methods through the `AuthProvider` interface:

- **API Key Authentication** - Use an API key for authentication
- **JWT Bearer Authentication** - Use a JWT token for authentication
- **Custom Authentication** - Implement your own authentication provider

## API Key Authentication

API keys are the simplest way to authenticate. Each API key is associated with a specific scope and permissions.

```typescript
import { ZConnectSDK, ApiKeyAuth } from "@zoniqx/sdk";

const sdk = new ZConnectSDK({
  baseUrl: "https://api.zoniqx.com",
  auth: new ApiKeyAuth("your-api-key"),
  tenantId: "your-tenant-id", // Optional, for issuer-side operations
  organizationId: "your-org-id", // Optional, for organization-specific operations
});
```

### Getting an API Key

1. Navigate to the ZConnect dashboard
2. Go to API Keys section
3. Generate a new API key with the required scopes
4. Copy the key and use it in your SDK initialization

### API Key Security

- Never commit API keys to version control
- Use environment variables to store API keys
- Rotate API keys regularly
- Use different API keys for different environments (dev, staging, production)

```typescript
const sdk = new ZConnectSDK({
  baseUrl: process.env.ZCONNECT_API_URL || "https://api.zoniqx.com",
  auth: new ApiKeyAuth(process.env.ZCONNECT_API_KEY),
});
```

## JWT Bearer Authentication

JWT tokens are used for user authentication and provide temporary access.

```typescript
import { ZConnectSDK, BearerAuth } from "@zoniqx/sdk";

const sdk = new ZConnectSDK({
  baseUrl: "https://api.zoniqx.com",
  auth: new BearerAuth("your-jwt-token"),
});
```

### Getting a JWT Token

JWT tokens are typically obtained through:

1. **Login endpoint** - Authenticate with username/password
2. **OAuth flow** - Authenticate with third-party providers
3. **Refresh token** - Exchange a refresh token for a new JWT

### Token Refresh

The SDK does not automatically refresh JWT tokens. You'll need to implement token refresh logic:

```typescript
class RefreshingBearerAuth extends BearerAuth {
  constructor(private refreshToken: string) {
    super("");
    this.refresh();
  }

  async refresh() {
    // Implement token refresh logic
    const newToken = await fetchNewToken(this.refreshToken);
    this.token = newToken;
  }

  async getHeaders(): Promise<Record<string, string>> {
    // Check if token needs refresh
    if (this.isTokenExpired()) {
      await this.refresh();
    }
    return super.getHeaders();
  }
}
```

## Custom Authentication

Implement the `AuthProvider` interface for custom authentication logic:

```typescript
import type { AuthProvider } from "@zoniqx/sdk-core";

interface AuthProvider {
  getHeaders(): Promise<Record<string, string>>;
}
```

### Example: HMAC Authentication

```typescript
import crypto from "crypto";
import type { AuthProvider } from "@zoniqx/sdk-core";

class HmacAuthProvider implements AuthProvider {
  constructor(private apiKey: string, private apiSecret: string) {}

  async getHeaders(): Promise<Record<string, string>> {
    const timestamp = Date.now().toString();
    const signature = this.generateSignature(timestamp);

    return {
      "X-API-Key": this.apiKey,
      "X-Timestamp": timestamp,
      "X-Signature": signature,
    };
  }

  private generateSignature(timestamp: string): string {
    const message = timestamp;
    return crypto
      .createHmac("sha256", this.apiSecret)
      .update(message)
      .digest("hex");
  }
}

const sdk = new ZConnectSDK({
  baseUrl: "https://api.zoniqx.com",
  auth: new HmacAuthProvider("api-key", "api-secret"),
});
```

## Tenant ID and Organization ID

### Tenant ID

The `tenantId` is used for issuer-side operations and identifies the tenant (issuer) making the request. It's sent as the `x-tenant-id` header.

```typescript
const sdk = new ZConnectSDK({
  baseUrl: "https://api.zoniqx.com",
  auth: new ApiKeyAuth("your-api-key"),
  tenantId: "ZONIQX_QA", // Your tenant ID
});
```

### Organization ID

The `organizationId` is used for organization-specific operations and is sent as the `x-organization-id` header.

```typescript
const sdk = new ZConnectSDK({
  baseUrl: "https://api.zoniqx.com",
  auth: new ApiKeyAuth("your-api-key"),
  organizationId: "org-id", // Your organization ID
});
```

Both are optional and should only be provided when required by the specific API endpoint.

## Authentication Errors

The SDK provides an `AuthError` class for authentication-related errors:

```typescript
import { AuthError } from "@zoniqx/sdk-core";

try {
  await sdk.listings.list();
} catch (error) {
  if (error instanceof AuthError) {
    console.error("Authentication failed:", error.message);
    // Handle authentication failure
  }
}
```

## Best Practices

1. **Use environment variables** for sensitive credentials
2. **Implement proper error handling** for authentication failures
3. **Use appropriate auth method** for your use case:
   - API keys for server-to-server communication
   - JWT for user authentication
   - Custom auth for specialized requirements
4. **Rotate credentials** regularly
5. **Monitor API usage** and set up alerts for unusual activity
6. **Use least privilege** - only request the scopes you need

## Troubleshooting

### 401 Unauthorized

- Verify your API key or JWT token is correct
- Check that your credentials haven't expired
- Ensure you have the required permissions

### 403 Forbidden

- Verify your API key has the required scopes
- Check that you're providing the correct tenantId/organizationId if required

### Invalid Token

- Ensure your JWT token is properly formatted
- Check that the token hasn't expired
- Verify the token issuer is correct
