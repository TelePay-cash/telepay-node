/**
 * required:
 *  asset: string => default: 'TON',
 *  blockchain: string => default: 'TON'
 *
 * optional:
 *  network: string => default: 'mainnet'
 */
export interface StatusWebhookBody {
    asset: string,
    blockchain: string,
    network?: string
}
