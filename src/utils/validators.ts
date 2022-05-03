import { CreateInvoiceBody, GetWithdrawMinimumBody, TransferBody, WithdrawBody } from './interfaces';

export const validateAuthorization = (authorization: string): boolean => {
    if (checkString(authorization)) throw new Error('[telepay-node] [authorization] must be a valid string.');
    return true;
}

export const validateInvoiceNumber = (invoiceNumber: string): boolean => {
    if (checkString(invoiceNumber)) throw new Error('[telepay-node] [invoiceNumber] must be a valid string.');
    return true;
}

export const validateCreateInvoice = (data: CreateInvoiceBody): boolean => {
    const {
        asset,
        blockchain,
        network,
        amount,
        description,
        matadata,
        success_url,
        cancel_url,
        expires_at
    } = data;

    if (checkString(asset)) throw new Error('[telepay-node] [asset] must be a valid string.');
    if (checkString(blockchain)) throw new Error('[telepay-node] [blockchain] must be a valid string.');
    if (checkString(network)) throw new Error('[telepay-node] [network] must be a valid string.');
    if (checkNumber(amount)) throw new Error('[telepay-node] [amount] must be a valid number.');
    if (description !== undefined && checkString(description)) throw new Error('[telepay-node] [description] must be a valid string.');
    if (matadata !== undefined && checkObject(matadata)) throw new Error('[telepay-node] [matadata] must be a valid object.');
    if (success_url !== undefined && checkString(success_url)) throw new Error('[telepay-node] [success_url] must be a valid string.');
    if (cancel_url !== undefined && checkString(cancel_url)) throw new Error('[telepay-node] [cancel_url]  must be a valid string.');
    if (expires_at !== undefined && checkNumber(expires_at)) throw new Error('[telepay-node] [expires_at] s at must be a valid number.');

    return true;
}

export const validateTransfer = (data: TransferBody): boolean => {
    const {
        asset,
        blockchain,
        network,
        amount,
        username,
        message
    } = data;

    if (checkString(asset)) throw new Error('[telepay-node] [asset] must be a valid string.');
    if (checkString(blockchain)) throw new Error('[telepay-node] [blockchain] must be a valid string.');
    if (checkString(network)) throw new Error('[telepay-node] [network] must be a valid string.');
    if (checkNumber(amount)) throw new Error('[telepay-node] [amount] must be a valid number.');
    if (checkString(username)) throw new Error('[telepay-node] [username] must be a valid string.');
    if (message !== undefined && checkString(message)) throw new Error('[telepay-node] [message] must be a valid string.');

    return true;
}

export const validateGetWithdrawMinimum = (data: GetWithdrawMinimumBody): boolean => {
    const {
        asset,
        blockchain,
        network
    } = data;

    if (checkString(asset)) throw new Error('[telepay-node] [asset] must be a valid string.');
    if (checkString(blockchain)) throw new Error('[telepay-node] [blockchain] must be a valid string.');
    if (network !== undefined && checkString(network)) throw new Error('[telepay-node] [network] must be a valid string.');

    return true;
}

export const validateWithdraw = (data: WithdrawBody) => {
    const {
        asset,
        blockchain,
        network,
        amount,
        to_address,
        message
    } = data;

    if (checkString(asset)) throw new Error('[telepay-node] [asset] must be a valid string.');
    if (checkString(blockchain)) throw new Error('[telepay-node] [blockchain] must be a valid string.');
    if (checkString(network)) throw new Error('[telepay-node] [network] must be a valid string.');
    if (checkNumber(amount)) throw new Error('[telepay-node] [amount] must be a valid number.');
    if (checkString(to_address)) throw new Error('[telepay-node] [to_address] must be a valid string.');
    if (message !== undefined && checkString(message)) throw new Error('[telepay-node] [message] must be a valid string.');

    return true;
}

export const checkString = (value: string): boolean => (typeof value !== 'string' || value.length === 0);

export const checkNumber = (value: number): boolean => (typeof value !== 'number' || value < 0);

export const checkObject = (value: object): boolean => (typeof value !== 'object');
