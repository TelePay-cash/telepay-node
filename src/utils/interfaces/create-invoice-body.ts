/**
 * required:
 *  asset: string => default: 'TON',
 *  blockchain: string => default: 'TON',
 *  network: string => default: 'mainnet',
 *  amount: double
 *
 * optional:
 *  description: string,
 *  matadata: string,
 *  success_url: string,
 *  cancel_url: string,
 *  expires_at: number => default: 600
 */
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
