export interface CreateInvoiceBody {
    asset: string,
    blockchain: string,
    network: string,
    amount: number,
    description?: string,
    matadata?: object,
    success_url?: string,
    cancel_url?: string,
    expires_at?: number
}
