import {
    CreateInvoiceBody,
    GetOneBalanceBody,
    GetWithdrawMinimumBody,
    StatusWebhookBody,
    TransferBody,
    WebhookBody,
    WithdrawBody
} from './interfaces';
import { WebhookEvents } from './enums';

export const validateAuthorization = (authorization: string): boolean => {
    if (checkString(authorization)) throw new Error('[telepay-node] [authorization] must be a valid string.');
    return true;
};

export const validateInvoiceNumber = (invoiceNumber: string): boolean => {
    if (checkString(invoiceNumber)) throw new Error('[telepay-node] [invoiceNumber] must be a valid string.');
    return true;
};

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
    if (checkNumber(amount)) throw new Error('[telepay-node] [amount] must be a valid number.');
    if (network !== undefined && checkString(network)) throw new Error('[telepay-node] [network] must be a valid Network {mainnet, testnet}.');
    if (description !== undefined && checkString(description)) throw new Error('[telepay-node] [description] must be a valid string.');
    if (matadata !== undefined && checkObject(matadata)) throw new Error('[telepay-node] [matadata] must be a valid object.');
    if (success_url !== undefined && checkString(success_url)) throw new Error('[telepay-node] [success_url] must be a valid string.');
    if (cancel_url !== undefined && checkString(cancel_url)) throw new Error('[telepay-node] [cancel_url]  must be a valid string.');
    if (expires_at !== undefined && checkNumber(expires_at)) throw new Error('[telepay-node] [expires_at] s at must be a valid number.');

    return true;
};

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
    if (checkNumber(amount)) throw new Error('[telepay-node] [amount] must be a valid number.');
    if (checkString(username)) throw new Error('[telepay-node] [username] must be a valid string.');
    if (network !== undefined && checkString(network)) throw new Error('[telepay-node] [network] must be a valid Network {mainnet, testnet}.');
    if (message !== undefined && checkString(message)) throw new Error('[telepay-node] [message] must be a valid string.');

    return true;
};

export const validateGetWithdrawMinimum = (data: GetWithdrawMinimumBody): boolean => {
    const {
        asset,
        blockchain,
        network
    } = data;

    if (checkString(asset)) throw new Error('[telepay-node] [asset] must be a valid string.');
    if (checkString(blockchain)) throw new Error('[telepay-node] [blockchain] must be a valid string.');
    if (network !== undefined && checkString(network)) throw new Error('[telepay-node] [network] must be a valid Network {mainnet, testnet}.');

    return true;
};

export const validateWithdraw = (data: WithdrawBody) => {
    const {
        asset,
        blockchain,
        network,
        amount,
        to_address
    } = data;

    if (checkString(asset)) throw new Error('[telepay-node] [asset] must be a valid string.');
    if (checkString(blockchain)) throw new Error('[telepay-node] [blockchain] must be a valid string.');
    if (checkString(network)) throw new Error('[telepay-node] [network] must be a valid Network {mainnet, testnet}.');
    if (checkNumber(amount)) throw new Error('[telepay-node] [amount] must be a valid number.');
    if (checkString(to_address)) throw new Error('[telepay-node] [to_address] must be a valid string.');

    return true;
};

export const validateGetOneBalance = (data: GetOneBalanceBody) => {
    const {
        asset,
        blockchain,
        network
    } = data;

    if (checkString(asset)) throw new Error('[telepay-node] [asset] must be a valid string.');
    if (checkString(blockchain)) throw new Error('[telepay-node] [blockchain] must be a valid string.');
    if (checkString(network)) throw new Error('[telepay-node] [network] must be a valid Network {mainnet, testnet}.');

    return true;
};

export const validateWebhookBody = (data: WebhookBody) => {
    const {
        url,
        secret,
        events,
        active
    } = data;

    if (checkString(url)) throw new Error('[telepay-node] [url] must be a valid string.');
    if (checkString(secret)) throw new Error('[telepay-node] [secret] must be a valid string.');
    if (!checkWebhookEvents(events)) throw new Error('[telepay-node] [events] must be a valid webhooks events array.');
    if (active !== undefined && checkBoolean(active)) throw new Error('[telepay-node] [active] must be a valid boolean.');

    return true;
};

export const validateStatusWebhookBody = (data: StatusWebhookBody) => {
    const {
        asset,
        blockchain,
        network
    } = data;

    if (checkString(asset)) throw new Error('[telepay-node] [asset] must be a valid string.');
    if (checkString(blockchain)) throw new Error('[telepay-node] [blockchain] must be a valid string.');
    if (checkString(network)) throw new Error('[telepay-node] [network] must be a valid Network {mainnet, testnet}.');

    return true;
};

export const checkString = (value: any): boolean => (typeof value !== 'string' || value.length === 0);

export const checkNumber = (value: any): boolean => (typeof value !== 'number' || value < 0);

export const checkObject = (value: any): boolean => (typeof value !== 'object');

export const checkBoolean = (value: any): boolean => (typeof value !== 'boolean');

export const checkArray = (value: any): boolean => (value instanceof Array);

export const checkWebhookEvents = (value: any[]): boolean =>
    checkArray(value) && value.every(elm => Object.values(WebhookEvents).includes(elm));
