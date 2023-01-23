import { Network } from '../enums';
import { Metadata } from './metadata';

export interface Invoice {
    number: string,
    asset: string,
    blockchain: string,
    network: Network,
    status: string,
    amount: string,
    amount_remaining: string,
    amount_real: string,
    description: string,
    metadata: Metadata,
    on_chain_allowed: boolean,
    off_chain_allowed: boolean,
    checkout_url: string,
    onchain_url: string,
    success_url: string,
    cancel_url: string,
    expired_url: string,
    explorer_url: string,
    expires_at: string,
    created_at: string,
    updated_at: string
}
