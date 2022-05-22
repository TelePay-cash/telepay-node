export interface Invoice {
    number: string,
    asset: string,
    blockchain: string,
    network: string,
    status: string,
    amount: string,
    description: string,
    metadata: string,
    checkout_url: string,
    onchain_url: string,
    success_url: string,
    cancel_url: string,
    explorer_url: string,
    expires_at: string,
    created_at: string,
    updated_at: string
}
