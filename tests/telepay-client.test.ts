import 'dotenv/config';
import { TelepayClient } from '../src';
import {
    CreateInvoiceBody,
    GetAllBalanceResponse,
    GetOneAssetBody,
    GetWebhooksResponse,
    GetWithdrawMinimumBody,
    Invoice,
    StatusWebhookBody,
    TransferBody,
    WalletBalance,
    Webhook,
    WebhookBody,
    WithdrawBody
} from '../src/utils/interfaces';
import { AxiosResponse } from 'axios';
import { ApiMethod, Network, UrlHelper, WebhookEvents } from '../src/utils/enums';

const TEST_SECRET_KEY = <string> process.env['TEST_SECRET_KEY'];
const TEST_TON_WALLET = <string> process.env['TEST_TON_WALLET'];
const TEST_USERNAME = <string> process.env['TEST_USERNAME'];

describe('Testing TelepayClient class constructor', () => {

    it('Success class constructor', () => {
        const client = new TelepayClient(TEST_SECRET_KEY);
        expect(client).toBeInstanceOf(TelepayClient);
    });

    it('Failure class constructor', () => {
        expect(() => {
            new TelepayClient('');
        }).toThrow('[telepay-node] [authorization] must be a valid string.');
    });

});

describe('Testing API Endpoints', () => {

    let client: TelepayClient;
    let walletBalances: WalletBalance[] = [];
    let webhook: Webhook;

    beforeAll(() => {
        client = new TelepayClient(TEST_SECRET_KEY);
    });

    it('Endpoint /getMe', async () => {
        await client.getMe()
            .then((res) => testSuccessResponse(res));
    });

    it('Endpoint /getBalance [GET]', async () => {
        await client.getAllBalances()
            .then((res) => {
                walletBalances = (testSuccessResponse(res) as GetAllBalanceResponse).wallets;
            });
    });

    it('Endpoint /getBalance [POST]', async () => {
        if (walletBalances.length > 0)
            await client.getOneBalance(walletBalances[0])
                .then((res) => testSuccessResponse(res));
    });

    it('Endpoint /getAsset', async () => {
        const payload: GetOneAssetBody = {
            asset: 'TON',
            network: Network.testnet,
            blockchain: 'TON'
        };

        await client.getAsset(payload)
            .then((res) => testSuccessResponse(res));
    });

    it('Endpoint /getAssets', async () => {
        await client.getAssets()
            .then((res) => testSuccessResponse(res));
    });

    describe('Testing Invoice Endpoints', () => {
        let invoice: Invoice;

        it('Endpoint /createInvoice', async () => {
            const payload: CreateInvoiceBody = {
                asset: 'TON',
                amount: 100,
                network: Network.testnet,
                blockchain: 'TON'
            };

            await client.createInvoice(payload)
                .then((res) => {
                    invoice = testSuccessResponse(res);
                });
        });

        it('Endpoint /getInvoices', async () => {
            await client.getInvoices()
                .then((res) => {
                    const response = testSuccessResponse(res);
                    expect(response.invoices.length).toBeGreaterThan(1);
                });
        });

        it('Endpoint /getInvoice', async () => {
            await client.getInvoice(invoice.number)
                .then((res) => {
                    expect(testSuccessResponse(res)).toEqual(invoice);
                });
        });

        it('Endpoint /cancelInvoice', async () => {
            await client.cancelInvoice(invoice.number)
                .then((res) => {
                    const response = testSuccessResponse(res);
                    expect(response.number).toEqual(invoice.number);
                });
        });

        it('Endpoint /deleteInvoice', async () => {
            await client.deleteInvoice(invoice.number)
                .then((res) => {
                    expect(testSuccessResponse(res)).toEqual({
                        success: WebhookEvents.InvoiceDeleted,
                        message: 'Invoice deleted.'
                    });
                });
        });
    });

    describe('Testing Withdraw Endpoints', () => {

        it('Endpoint /getWithdrawMinimum', async () => {
            const payload: GetWithdrawMinimumBody = {
                asset: 'TON',
                network: Network.testnet,
                blockchain: 'TON'
            };

            await client.getWithdrawMinimum(payload)
                .then((res) => testSuccessResponse(res));
        });

        it('Endpoint /getWithdrawFee', async () => {
            const payload: WithdrawBody = {
                amount: 100,
                to_address: TEST_TON_WALLET,
                asset: 'TON',
                network: Network.testnet,
                blockchain: 'TON'
            };

            await client.getWithdrawFee(payload)
                .then((res) => testSuccessResponse(res));
        });

        it('Endpoint /withdraw', async () => {
            const payload: WithdrawBody = {
                amount: 100,
                to_address: TEST_TON_WALLET,
                asset: 'TON',
                network: Network.testnet,
                blockchain: 'TON'
            };

            const error = {
                'error': 'withdrawal.insufficient-funds',
                'message': 'Withdrawal failed. Insufficient funds.'
            };

            await client.withdraw(payload)
                .catch((err) => {
                    expect(err.response.status).toBe(401);
                    expect(err.response.data).toBeInstanceOf(Object);
                    expect(err.response.data).toEqual(error);
                });
        });

    });

    it('Endpoint /transfer', async () => {
        const payload: TransferBody = {
            amount: 100,
            username: TEST_USERNAME,
            asset: 'TON',
            network: Network.testnet,
            blockchain: 'TON'
        };

        const error = {
            error: 'transfer.insufficient-funds',
            message: 'Transfer failed. Insufficient funds.'
        };

        await client.transfer(payload)
            .catch((err) => {
                expect(err.response.status).toBe(401);
                expect(err.response.data).toBeInstanceOf(Object);
                expect(err.response.data).toEqual(error);
            });
    });

    it('Generic function [/getMe]', async () => {
        await client.genericRequest(ApiMethod.GET, '/getMe')
            .then((res) => testSuccessResponse(res));
    });

    it('Generic function [/getWithdrawMinimum]', async () => {
        const payload: GetWithdrawMinimumBody = {
            asset: 'TON',
            network: Network.testnet,
            blockchain: 'TON'
        };

        await client.genericRequest(ApiMethod.POST, UrlHelper.getWithdrawMinimum, payload)
            .then((res) => testSuccessResponse(res));
    });

    describe('Testing WebHook Endpoints', () => {

        it('Endpoint /createWebhook', async () => {
            const payload: WebhookBody = {
                url: `https://api.example.com/webhook/${ require('crypto').randomBytes(8).toString('base64') }`,
                active: true,
                events: [ WebhookEvents.InvoiceCompleted, WebhookEvents.InvoiceCancelled ],
                secret: require('crypto').randomBytes(64).toString('base64')
            };

            await client.createWebhook(payload)
                .then((res) => {
                    webhook = testSuccessResponse(res);
                });
        });

        it('Endpoint /getWebhook', async () => {
            await client.getWebhook(webhook.id)
                .then((res) => {
                    expect(testSuccessResponse(res)).toMatchObject(webhook);
                });
        });

        it('Endpoint /getWebhooks', async () => {
            await client.getWebhooks()
                .then((res) => {
                    const response: GetWebhooksResponse = testSuccessResponse(res);
                    expect(response.webhooks.map(w => w.id)).toContain(webhook.id);
                });
        });

        it('Endpoint /updateWebhook', async () => {
            const payload: WebhookBody = {
                ...webhook,
                events: [ WebhookEvents.InvoiceExpired, WebhookEvents.InvoiceDeleted ]
            };

            await client.updateWebhook(webhook.id, payload)
                .then((res) => {
                    webhook = testSuccessResponse(res);
                    expect(webhook.events).toEqual(payload.events);
                });
        });

        it('Endpoint /activateWebhook', async () => {
            const payload: StatusWebhookBody = {
                asset: 'TON',
                network: Network.testnet,
                blockchain: 'TON'
            };

            await client.activateWebhook(webhook.id, payload)
                .then((res) => {
                    webhook = testSuccessResponse(res);
                    expect(webhook.active).toBeTruthy();
                });
        });

        it('Endpoint /deactivateWebhook', async () => {
            const payload: StatusWebhookBody = {
                asset: 'TON',
                network: Network.testnet,
                blockchain: 'TON'
            };

            await client.deactivateWebhook(webhook.id, payload)
                .then((res) => {
                    webhook = testSuccessResponse(res);
                    expect(webhook.active).toBeFalsy();
                });
        });

        it('Endpoint /deleteWebhook', async () => {
            await client.deleteWebhook(webhook.id)
                .then((res) => {
                    const response = testSuccessResponse(res);
                    expect(response).toMatchObject({
                        success: 'webhook.deleted',
                        message: 'Webhook deleted.'
                    });
                });
        });

    });

});

const testSuccessResponse = (response: AxiosResponse): any => {
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.data).toBeInstanceOf(Object);
    return response.data;
};
