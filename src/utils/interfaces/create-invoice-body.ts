import { Network } from '../enums';
import { Metadata } from './metadata';

/**
 * required:
 *  asset: string => default: 'TON',
 *  blockchain: string => default: 'TON',
 *  amount: double
 *
 * optional:
 *  network: Network => default: 'mainnet',
 *  usd_amount: float,
 *  description: string,
 *  matadata: Metadata,
 *  success_url: string,
 *  cancel_url: string,
 *  expired_url: string,
 *  expires_at: number => default: 600
 *  on_chain_allowed: boolean
 * off_chain_allowed: boolean
 */
export interface CreateInvoiceBody {
    asset: string,
    blockchain: string,
    network?: Network,
    amount: number,
    usd_amount?: number,
    description?: string,
    matadata?: Metadata,
    success_url?: string,
    cancel_url?: string,
    expired_url?: string,
    expires_at?: number,
    on_chain_allowed?: boolean,
    off_chain_allowed?: boolean,
}
