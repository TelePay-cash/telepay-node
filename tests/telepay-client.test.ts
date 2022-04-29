import { TelepayClient } from '../src';
import { CreateInvoiceBody, Invoice } from '../src/utils/interfaces';
import { AxiosResponse } from 'axios';

const TEST_SECRET_KEY = 'secret_RW182YA8LFH5T5IHIK15LTD6G9KM2CVMOU0H1YM6G21XZQ7HXEDPIBBBBIQ1Z4EQ6ME73F12NA3IGM9PDS0TJOU5E5AG8825W5U3';

describe('Testing TelepayClient class constructor', () => {

    it('Success class constructor', () => {
        const client = new TelepayClient(TEST_SECRET_KEY);
        expect(client).toBeInstanceOf(TelepayClient);
    });

    it('Failure class constructor', () => {
        expect(() => {
            const client = new TelepayClient('');
        }).toThrow('[telepay-node] [authorization] must be a valid string.');
    });

});

describe('Testing API endpoints', () => {

    let client: TelepayClient;

    beforeAll(() => {
        client = new TelepayClient(TEST_SECRET_KEY);
    });

    it('Endpoint /getMe', async () => {
        testSuccessResponse(await client.getMe());
    });

    it('Endpoint /getBalance', async () => {
        testSuccessResponse(await client.getBalance());
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

            expect(response).toEqual({ 'status': 'deleted' });
        });

    });

});

const testSuccessResponse = (response: AxiosResponse): any => {
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.data).toBeInstanceOf(Object);
    return response.data;
}
