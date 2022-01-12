---
description: Tokens with super powers
---

# 🦸♀ Super Tokens

## Introduction

At this point, you are familiar with the concept of upgrading an ERC20 token to Super Token. The [Superfluid Dashboard](https://app.superfluid.finance) is a great tool for performing upgrades. Rather than spend time learning how to perform an upgrade, we will learn how to use the token super powers like _batching_ and _ERC777 callbacks_.

Just to recap from earlier, Super Tokens have a new token address after an upgrade. To denote this, we just append "x" to the token symbol.

![](<../../.gitbook/assets/image (8) (1) (1) (1).png>)

## Prerequisites

Before starting this tutorial you should:&#x20;

* Complete the [@superfluid-finance/js-sdk](../../resources/archived-tutorials-docs/frontend-+-nodejs.md) tutorial
* Have some goerli ETH and tokens in your wallet from the dashboard [https://app.superfluid.finance](https://app.superfluid.finance)

## ERC777 Callbacks

Tokens which can "react" to certain events using callbacks [erc777.org](https://www.erc777.org).&#x20;

🚧 Section Under Construction. Updates coming soon 🚧

## **Batch Call**&#x20;

All Super Tokens include the **batchCall** feature, which allows you to perform multiple tasks in a single transaction.&#x20;

You can even mix-n-match your tasks, including upgrade/downgrade, calling agreements (CFA, IDA, etc), execute Super App functions, and make simple transfers. The world is your Oyster!

![Developer Playground batchcall transfer feature](<../../.gitbook/assets/image (11).png>)

&#x20;:man\_playing\_handball: See it in action using the Developer Playground. We have some helpful tools for both batchCall transfers **** and batchCall streams!

**Batch Transfer:** [https://playground.superfluid.finance/batchtransfer/0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00](https://playground.superfluid.finance/batchtransfer/0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00)

**Batch Stream:** [https://playground.superfluid.finance/batchstream/0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00](https://playground.superfluid.finance/batchstream/0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00)

Source code: [https://github.com/superfluid-finance/protocol-monorepo/tree/dev/examples/dev-playground/web/src/utils/batchTransfer.js](https://github.com/superfluid-finance/protocol-monorepo/tree/dev/examples/dev-playground/web/src/utils/batchTransfer.js)



## **Meta-transactions**

Submit transactions on behalf of another account.&#x20;

🚧 Section Under Construction. Updates coming soon 🚧&#x20;
