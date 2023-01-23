import { Network } from '../enums';

export interface WalletBalance {
    asset: string,
    blockchain: string,
    balance: string,
    network: Network
}
