import { Network } from '../enums';

/**
 * required:
 *  asset: string => default: 'TON',
 *  blockchain: string => default: 'TON',
 *  network: Network => default: 'mainnet',
 *  amount: double,
 *  to_address: string
 */
export interface WithdrawBody {
    asset: string,
    blockchain: string,
    network: Network,
    amount: number,
    to_address: string
}
