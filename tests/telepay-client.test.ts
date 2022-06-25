import 'dotenv/config';
import { TelepayClient } from '../src';
import {
    CreateInvoiceBody,
    GetAllBalanceResponse,
    GetOneAssetBody,
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
import { ApiMethod, UrlHelper, WebhookEvents } from '../src/utils/enums';

const TEST_SECRET_KEY = <string>process.env['TEST_SECRET_KEY'];
const TEST_TON_WALLET = <string>process.env['TEST_TON_WALLET'];
const TEST_USERNAME = <string>process.env['TEST_USERNAME'];

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
        testSuccessResponse(await client.getMe());
    });

    it('Endpoint /getBalance [GET]', async () => {
        walletBalances = (testSuccessResponse(await client.getAllBalances()) as GetAllBalanceResponse).wallets;
    });

    it('Endpoint /getBalance [POST]', async () => {
        if (walletBalances.length > 0)
            testSuccessResponse(await client.getOneBalance(walletBalances[0]));
    });

    it('Endpoint /getAsset', async () => {
        const payload: GetOneAssetBody = {
            asset: 'TON',
            network: 'testnet',
            blockchain: 'TON'
        };
        testSuccessResponse(await client.getAsset(payload));
    });

    it('Endpoint /getAssets', async () => {
        testSuccessResponse(await client.getAssets());
    });

    describe('Testing Invoice Endpoints', () => {
        let invoice: Invoice;

        it('Endpoint /createInvoice', async () => {
            const payload: CreateInvoiceBody = {
                asset: 'TON',
                amount: 100,
                network: 'testnet',
                blockchain: 'TON'
            };

            invoice = testSuccessResponse(await client.createInvoice(payload));
        });

        it('Endpoint /getInvoices', async () => {
            const response = testSuccessResponse(await client.getInvoices());
            expect(response.invoices.length).toBeGreaterThan(1);
        });

        it('Endpoint /getInvoice', async () => {
            const response = testSuccessResponse(await client.getInvoice(invoice.number));

            expect(response).toEqual(invoice);
        });

        it('Endpoint /cancelInvoice', async () => {
            const response = testSuccessResponse(await client.cancelInvoice(invoice.number));

            expect(response.number).toEqual(invoice.number);
        });

        it('Endpoint /deleteInvoice', async () => {
            const response = testSuccessResponse(await client.deleteInvoice(invoice.number));

            expect(response).toEqual({
                success: 'invoice.deleted',
                message: 'Invoice deleted.'
            });
        });

    });

    describe('Testing Withdraw Endpoints', () => {

        it('Endpoint /getWithdrawMinimum', async () => {
            const payload: GetWithdrawMinimumBody = {
                asset: 'TON',
                network: 'testnet',
                blockchain: 'TON'
            };

            testSuccessResponse(await client.getWithdrawMinimum(payload));
        });

        it('Endpoint /getWithdrawFee', async () => {
            const payload: WithdrawBody = {
                amount: 100,
                to_address: TEST_TON_WALLET,
                asset: 'TON',
                network: 'testnet',
                blockchain: 'TON'
            };

            testSuccessResponse(await client.getWithdrawFee(payload));
        });

        it('Endpoint /withdraw', async () => {
            const payload: WithdrawBody = {
                amount: 100,
                to_address: TEST_TON_WALLET,
                asset: 'TON',
                network: 'testnet',
                blockchain: 'TON'
            };

            const error = {
                'error': 'unavailable',
                'message': 'This action is temporarly unavailable.',
            }

            await client.withdraw(payload)
                .catch((err) => {
                    expect(err.response.status).toBe(503);
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
            network: 'testnet',
            blockchain: 'TON'
        };

        const error = {
            error: 'transfer.insufficient-funds',
            message: 'Transfer failed. Insufficient funds.'
        }

        await client.transfer(payload)
            .catch((err) => {
                expect(err.response.status).toBe(401);
                expect(err.response.data).toBeInstanceOf(Object);
                expect(err.response.data).toEqual(error);
            });
    });

    it('Generic function [/getMe]', async () => {
        testSuccessResponse(await client.genericRequest(ApiMethod.GET, '/getMe'));
    });

    it('Generic function [/getWithdrawMinimum]', async () => {
        const payload: GetWithdrawMinimumBody = {
            asset: 'TON',
            network: 'testnet',
            blockchain: 'TON'
        };
        testSuccessResponse(await client.genericRequest(ApiMethod.POST, UrlHelper.getWithdrawMinimum, payload));
    });

    describe('Testing WebHook Endpoints', () => {

        it('Endpoint /createWebhook', async () => {
            const payload: WebhookBody = {
                url: `https://api.example.com/webhook/${ require('crypto').randomBytes(8).toString('base64') }`,
                active: true,
                events: [WebhookEvents.Completed, WebhookEvents.Cancelled],
                secret: require('crypto').randomBytes(64).toString('base64')
            };

            webhook = testSuccessResponse(await client.createWebhook(payload));
        });

        it('Endpoint /getWebhook', async () => {
            const response = testSuccessResponse(await client.getWebhook(webhook.id));
            expect(response).toMatchObject(webhook);
        });

        it('Endpoint /updateWebhook', async () => {
            const payload: WebhookBody = {
                ...webhook,
                events: [WebhookEvents.Expired, WebhookEvents.Deleted]
            }

            webhook = testSuccessResponse(await client.updateWebhook(webhook.id, payload));
            expect(webhook.events).toEqual(payload.events);
        });

        it('Endpoint /activateWebhook', async () => {
            const payload: StatusWebhookBody = {
                asset: 'TON',
                network: 'testnet',
                blockchain: 'TON'
            };

            webhook = testSuccessResponse(await client.activateWebhook(webhook.id, payload));
            expect(webhook.active).toBeTruthy();
        });

        it('Endpoint /deactivateWebhook', async () => {
            const payload: StatusWebhookBody = {
                asset: 'TON',
                network: 'testnet',
                blockchain: 'TON'
            };

            webhook = testSuccessResponse(await client.deactivateWebhook(webhook.id, payload));
            expect(webhook.active).toBeFalsy();
        });

    });

});

const testSuccessResponse = (response: AxiosResponse): any => {
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.data).toBeInstanceOf(Object);
    return response.data;
}
