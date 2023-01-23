# NodeJS SDK for the TelePay API

![TelePay Node](https://github.com/TelePay-cash/telepay-node/blob/main/docs/cover.jpg?raw=true)

Official TelePay client library for NodeJS, so you can easily process cryptocurrency payments using the REST API.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/TelePay-cash/telepay-node/actions/workflows/main.yml/badge.svg)](https://github.com/TelePay-cash/telepay-node/actions/workflows/main.yml)
[![npm](https://img.shields.io/npm/v/telepay-node.svg?style=flat-square)](https://www.npmjs.com/package/telepay-node)
[![Last commit](https://img.shields.io/github/last-commit/telepay-cash/telepay-node.svg?style=flat-square)](https://github.com/telepay-cash/telepay-node/commits)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/telepay-cash/telepay-node?style=flat-square)](https://github.com/telepay-cash/telepay-node/commits)
[![Github Stars](https://img.shields.io/github/stars/telepay-cash/telepay-node?style=flat-square&logo=github&)](https://github.com/telepay-cash/telepay-node/stargazers)
[![Github Forks](https://img.shields.io/github/forks/telepay-cash/telepay-node?style=flat-square&logo=github)](https://github.com/telepay-cash/telepay-node/network/members)
[![Github Watchers](https://img.shields.io/github/watchers/telepay-cash/telepay-node?style=flat-square&logo=github)](https://github.com/telepay-cash/telepay-node)
[![GitHub contributors](https://img.shields.io/github/contributors/telepay-cash/telepay-node?label=code%20contributors&style=flat-square)](https://github.com/telepay-cash/telepay-node/graphs/contributors)
[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=flat-squeare&logo=telegram&logoColor=white)](https://t.me/TelePayCash)
[![Blog](https://img.shields.io/badge/RSS-FFA500?style=flat-square&logo=rss&logoColor=white)](https://blog.telepay.cash)

## Installation

Install the package using npm:

```bash
npm install telepay-node
```

Install the package using yarn:

```bash
yarn add telepay-node
```

## Using the library

**Import and construct a client**

```typescript
import { TelepayClient } from 'telepay-node';

const telepayClient: TelepayClient = new TelepayClient(process.env['TELEPAY_SECRET_KEY']);
```

## Telepay API Endpoints

The API endpoints are documented in the [TelePay documentation](https://telepay.readme.io/reference/endpoints).

**/getMe**

Info about the current merchant. [Read docs](https://telepay.readme.io/reference/getme)

```typescript
const response = await telepayClient.getMe();

// or

telepayClient.getMe()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/getBalance [GET]**

Get your merchant wallet assets with corresponding balance. [Read docs](https://telepay.readme.io/reference/getbalance)

```typescript
const response = await telepayClient.getAllBalances();

// or

telepayClient.getAllBalances()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/getBalance [POST]**

Get your merchant wallet assets with corresponding
balance. [Read docs](https://telepay.readme.io/reference/getbalance-1)

```typescript
const data: GetOneBalanceBody = {
    asset: 'TON',
    blockchain: 'TON',
    network: Network.testnet
}

const response = await telepayClient.getOneBalance(data);

// or

telepayClient.getOneBalance(data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/getAsset**

Get asset details. [Read docs](https://telepay.readme.io/reference/getasset)

```typescript
 const data: GetOneAssetBody = {
    asset: 'TON',
    network: Network.testnet,
    blockchain: 'TON'
};

const response = await telepayClient.getAsset(data);

// or

telepayClient.getAsset(data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/getAssets**

Get assets supported by TelePay. [Read docs](https://telepay.readme.io/reference/getassets)

```typescript
const response = await telepayClient.getAssets();

// or

telepayClient.getAssets()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/getInvoices**

Get your merchant invoices. [Read docs](https://telepay.readme.io/reference/getinvoices)

```typescript
const response = await telepayClient.getInvoices();

// or

telepayClient.getInvoices()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/getInvoice**

Get invoice details, by ID. [Read docs](https://telepay.readme.io/reference/getinvoice)

```typescript
const response = await telepayClient.getInvoice(invoiceNumber);

// or

telepayClient.getInvoice(invoiceNumber)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/createInvoice**

Creates an invoice, associated to your merchant. [Read docs](https://telepay.readme.io/reference/createinvoice)

```typescript
const data: CreateInvoiceBody = {
    asset: 'TON',
    amount: 100,
    network: Network.testnet,
    blockchain: 'TON'
};

const response = await telepayClient.createInvoice(data);

// or

telepayClient.createInvoice(data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/cancelInvoice**

Cancel invoice, by its number. [Read docs](https://telepay.readme.io/reference/cancelinvoice)

```typescript
const invoiceNumber: string = 'TEST1234';

const response = await telepayClient.cancelInvoice(invoiceNumber);

// or

telepayClient.cancelInvoice(invoiceNumber)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/deleteInvoice**

Delete invoice, by its number. [Read docs](https://telepay.readme.io/reference/deleteinvoice)

```typescript
const invoiceNumber: string = 'TEST1234';

const response = await telepayClient.deleteInvoice(invoiceNumber);

// or

telepayClient.deleteInvoice(invoiceNumber)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/transfer**

Transfer funds between internal wallets. Off-chain operation. [Read docs](https://telepay.readme.io/reference/transfer)

```typescript
const data: TransferBody = {
    amount: 10,
    username: 'TEST_USERNAME',
    asset: 'TON',
    network: Network.testnet,
    blockchain: 'TON'
};

const response = await telepayClient.transfer(data);

// or

telepayClient.transfer(data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/getWithdrawMinimum**

Obtains minimum amount required to withdraw funds on a given
asset. [Read docs](https://telepay.readme.io/reference/getwithdrawminimum)

```typescript
const data: GetWithdrawMinimumBody = {
    asset: 'TON',
    network: Network.testnet,
    blockchain: 'TON'
};

const response = await telepayClient.getWithdrawMinimum(data);

// or

telepayClient.getWithdrawMinimum(data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/getWithdrawFee**

Get estimated withdraw fee, composed of blockchain fee and processing
fee. [Read docs](https://telepay.readme.io/reference/getwithdrawfee)

```typescript
const data: WithdrawBody = {
    amount: 10,
    to_address: 'TEST_TON_WALLET',
    asset: 'TON',
    network: Network.testnet,
    blockchain: 'TON'
};

const response = await telepayClient.getWithdrawFee(data);

// or

telepayClient.getWithdrawFee(data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/withdraw**

Withdraw funds from merchant wallet to external wallet. On-chain
operation. [Read docs](https://telepay.readme.io/reference/withdraw)

```typescript
const data: WithdrawBody = {
    amount: 10,
    to_address: 'TEST_TON_WALLET',
    asset: 'TON',
    network: Network.testnet,
    blockchain: 'TON'
};

const response = await telepayClient.withdraw(data);

// or

telepayClient.withdraw(data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/createWebhook**

Create a new webhook. [Read docs](https://telepay.readme.io/reference/createwebhook)

```typescript
const data: WebhookBody = {
    url: 'https://api.example.com/webhook',
    active: true,
    events: [WebhookEvents.Completed, WebhookEvents.Cancelled],
    secret: '<SECRET>'
};

const response = await telepayClient.createWebhook(data);

// or

telepayClient.createWebhook(data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/getWebhook**

Get webhook details. [Read docs](https://telepay.readme.io/reference/getwebhook)

```typescript
const webhook_id = 123;

const response = await telepayClient.getWebhook(webhook_id);

// or

telepayClient.getWebhook(webhook_id)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/getWebhook**

Get webhooks. [Read docs](https://telepay.readme.io/reference/getwebhooks)

```typescript
const response = await telepayClient.getWebhooks();

// or

telepayClient.getWebhooks()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/updateWebhook**

Update a webhook. [Read docs](https://telepay.readme.io/reference/updatewebhook)

```typescript
const webhook_id = 123;
const data: WebhookBody = {
    url: 'https://api.example.com/webhook',
    active: true,
    events: [WebhookEvents.Expired, WebhookEvents.Deleted],
    secret: '<SECRET>'
};

const response = await telepayClient.updateWebhook(webhook_id, data);

// or

telepayClient.updateWebhook(webhook_id, data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/activateWebhook**

Activates a webhook. [Read docs](https://telepay.readme.io/reference/activatewebhook)

```typescript
const webhook_id = 123;
const data: StatusWebhookBody = {
    asset: 'TON',
    network: Network.testnet,
    blockchain: 'TON'
};

const response = await telepayClient.activateWebhook(webhook_id, data);

// or

telepayClient.activateWebhook(webhook_id, data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/deactivateWebhook**

Deactivates a webhook. [Read docs](https://telepay.readme.io/reference/deactivatewebhook)

```typescript
const webhook_id = 123;
const data: StatusWebhookBody = {
    asset: 'TON',
    network: Network.testnet,
    blockchain: 'TON'
};

const response = await telepayClient.deactivateWebhook(webhook_id, data);

// or

telepayClient.deactivateWebhook(webhook_id, data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**/deleteWebhook**

Deletes a webhook. [Read docs](https://telepay.readme.io/reference/deletewebhook)

```typescript
const webhook_id = 123;

const response = await telepayClient.deleteWebhook(webhook_id);

// or

telepayClient.deleteWebhook(webhook_id, data)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

**Extra feature**

Generic function for perform requests to any endpoint

```typescript
const method: ApiMeth = 'GET';
const endpoint: ApiEndpoint = '/getMe';

const response = await telepayClient.genericRequest(method, endpoint);

// or

telepayClient.genericRequest(method, endpoint)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
```

## Contributors ✨

The library is made by ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/zahirinatzuke"><img src="https://avatars.githubusercontent.com/u/41224027?v=4" width="100px;" alt=""/><br /><sub><b>Yohan González Almaguer</b></sub></a><br /><a href="https://github.com/telepay-cash/telepay-node/commits?author=ZahiriNatZuke" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/pedrocastellanos"><img src="https://avatars.githubusercontent.com/u/53188140?v=4" width="100px;" alt=""/><br /><sub><b>Pedro Castellanos</b></sub></a><br /><a href="https://github.com/telepay-cash/telepay-node/commits?author=pedrocastellanos" title="Code">💻</a></td>
    <td align="center"><a href="https://carloslugones.com"><img src="https://avatars.githubusercontent.com/u/18733370?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Carlos Lugones</b></sub></a><br /><a href="https://github.com/telepay-cash/telepay-node/commits?author=CarlosLugones" title="Mentoring">🧑‍🏫</a></td>
  </tr>
</table>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.
Contributions of any kind welcome!
