import { Network } from '../enums';

/**
 * required:
 *  asset: string => default: 'TON',
 *  blockchain: string => default: 'TON',
 *  amount: double
 *  username: string
 *
 * optional:
 *  network: Network => default: 'mainnet',
 *  message: string
 */
export interface TransferBody {
    asset: string,
    blockchain: string,
    network?: Network,
    amount: number,
    username: string,
    message?: string
}
