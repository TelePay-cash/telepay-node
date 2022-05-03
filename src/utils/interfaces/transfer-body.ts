export interface TransferBody {
    asset: string,
    blockchain: string,
    network: string,
    amount: number,
    username: string,
    message?: string
}
