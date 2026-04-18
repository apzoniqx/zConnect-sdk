export type Listing = {
  id: string;
  name: string;
  description?: string;
  dealId?: string;
  token?: Record<string, never>;
  keyFacts?: Record<string, never>;
  marketData?: Record<string, never>;
  primaryMarket?: Record<string, never>;
  legalAndRegulatory?: Record<string, never>;
  serviceProviders?: Record<string, never>;
  fees?: Record<string, never>;
  assessmentsAndRatings?: Record<string, never>[];
  isActive: boolean;
  isDeleted: boolean;
  isPublished: boolean;
  status: "DRAFT" | "COMPLETED";
  stage:
    | "DEAL_INFO"
    | "DEAL_DISCLOSURE"
    | "PROVIDERS"
    | "LEGAL_FEES"
    | "MARKET_DATA"
    | "SETTINGS";
  type?: Record<string, never>;
  subType?: Record<string, never>;
  location?: Record<string, never>;
  gallery?: Record<string, never>[];
  documents?: Record<string, never>[];
  disclosures?: Record<string, never>[];
  terms?: Record<string, never>[];
  chainId?: string;
  walletType?: string;
  tokenContractAddress?: string;
  dealStatus?: Record<string, never>;
  launchDate?: string;
  expressInterestEnabled?: boolean;
  visibility: "PUBLIC" | "PRIVATE" | "MARKETPLACE";
  selectedGroups?: string[];
  compliance?: Record<string, never>;
  dealSettings?: Record<string, never>;
  creatorId: string;
  tenantId: string;
  organizationId?: string;
  sections?: Record<string, never>[];
  createdAt: string;
  updatedAt: string;
};

export interface ListingsListResponse {
  data: Listing[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface MarketplaceListing extends Listing {
  issuer?: {
    id: string;
    name: string;
    [key: string]: unknown;
  };
  connectionStatus?: string;
}
