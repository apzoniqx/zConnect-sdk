export { ZConnectClient, ApiKeyAuth, BearerAuth } from "@zoniqx/sdk-core";
import type { ClientConfig } from "@zoniqx/sdk-core";
import { ListingsModule } from "@zoniqx/sdk-listings";
import { TransactionsModule } from "@zoniqx/sdk-transactions";
import { ConnectionsModule } from "@zoniqx/sdk-connections";
import { KYCModule } from "@zoniqx/sdk-kyc";
import { WalletModule } from "@zoniqx/sdk-wallet";
import { OrganizationModule } from "@zoniqx/sdk-organization";
import { ChatModule } from "@zoniqx/sdk-chat";
import { ZConnectClient } from "@zoniqx/sdk-core";

export class ZConnectSDK extends ZConnectClient {
  public readonly listings: ListingsModule;
  public readonly transactions: TransactionsModule;
  public readonly connections: ConnectionsModule;
  public readonly kyc: KYCModule;
  public readonly wallet: WalletModule;
  public readonly organization: OrganizationModule;
  public readonly chat: ChatModule;

  constructor(config: ClientConfig) {
    super(config);
    this.listings = new ListingsModule(this);
    this.transactions = new TransactionsModule(this);
    this.connections = new ConnectionsModule(this);
    this.kyc = new KYCModule(this);
    this.wallet = new WalletModule(this);
    this.organization = new OrganizationModule(this);
    this.chat = new ChatModule(this);
  }
}
