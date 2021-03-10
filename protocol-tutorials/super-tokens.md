---
description: Tokens with super powers
---

# 🦸‍♀️ Super Tokens

## Introduction

At this point, you are familiar with the concept of upgrading an ERC20 token to Super Token. The [Superfluid Dashboard](https://app.superfluid.finance) is a great tool for performing upgrades. Rather than spend time learning how to perform an upgrade, we will learn how to use the token super powers like _batching_ and _ERC777 callbacks_.

Just to recap from earlier, Super Tokens have a new token address after an upgrade. To denote this, we just append "x" to the token symbol.

![](../.gitbook/assets/image%20%288%29.png)

## Prerequisites

Before starting this tutorial you should: 

* Complete the [@superfluid-finance/js-sdk](frontend-+-nodejs.md) tutorial
* Have some goerli ETH and tokens in your wallet from the dashboard [https://app.superfluid.finance](https://app.superfluid.finance)

## ERC777 Callbacks

Tokens which can "react" to certain events using callbacks [erc777.org](https://www.erc777.org/). 

🚧 Section Under Construction. Updates coming soon 🚧

## **Batch Call** 

The simplest example for a batchcall is to perform multiple token transfers in one transaction. You can test this out and see the code in the playground app.

![Developer Playground batchcall transfer feature](../.gitbook/assets/image%20%289%29.png)

**Playground example App**: [https://playground.superfluid.finance/batchtransfer/0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00](https://playground.superfluid.finance/batchtransfer/0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00)

**Source code**: [https://github.com/superfluid-finance/protocol-monorepo/tree/dev/examples/dev-playground/web/src/utils/batchTransfer.js](https://github.com/superfluid-finance/protocol-monorepo/tree/dev/examples/dev-playground/web/src/utils/batchTransfer.js)

To change the token, replace the address in the URL.

## **Meta-transactions**

Submit transactions on behalf of another account. 

🚧 Section Under Construction. Updates coming soon 🚧 

