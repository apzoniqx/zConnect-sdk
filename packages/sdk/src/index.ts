export { ZConnectClient, ApiKeyAuth, BearerAuth } from "@apzoniqx/sdk-core";
import type { ClientConfig } from "@apzoniqx/sdk-core";
import { ListingsModule } from "@apzoniqx/sdk-listings";
import { TransactionsModule } from "@apzoniqx/sdk-transactions";
import { ConnectionsModule } from "@apzoniqx/sdk-connections";
import { KYCModule } from "@apzoniqx/sdk-kyc";
import { WalletModule } from "@apzoniqx/sdk-wallet";
import { OrganizationModule } from "@apzoniqx/sdk-organization";
import { ChatModule } from "@apzoniqx/sdk-chat";
import { ZConnectClient } from "@apzoniqx/sdk-core";

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
