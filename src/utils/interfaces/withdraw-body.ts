export interface WithdrawBody {
    asset: string,
    blockchain: string,
    network: string,
    amount: number,
    to_address: string,
    message?: string
}
