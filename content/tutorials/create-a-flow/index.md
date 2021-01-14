---
date: 2020-09-28T00:00:00.000Z
title: "\U0001F500 Create a Superfluid Flow"
description: In this tutorial we will create a Flow using the Javascript SDK
categories:
  - tutorial
published: true
showToc: true
---

# index

By the end of this tutorial you will learn how to:

- Use the Superfluid JavaScript SDK
- Mint Superfluid DAI \(DAIx\)
- Open and close a Flow

## Introduction

A **Constant Flow Agreement** is a transfer of value from a `sender` to a `receiver` at a constant `flowRate` measured in _amount per second_.

Great! Now that you understand the first major concept of Superfluid, lets get to the fun part. Here is an overview of the Constant Flow Agreement contract. Did someone say _CRUD_?

```text
contract IConstantFlowAgreementV1 is ISuperAgreement {
  function createFlow( ...
  function updateFlow( ...
  function deleteFlow( ...
}
```

Seem straightforward enough? Let's take the contracts for a test-drive.

## Set Up

The Superfluid contracts have already been deployed on the Görli testnet for you. Here are the steps we'll take to get set up:

1. Install the SDK
2. Obtain Gorli ETH
3. Open Truffle console
4. Mint some Superfluid DAI \(DAIx\)

### Install the SDK

Download the example repo, which includes the Superfluid JavaScript software development kit.

FIXME: update when new preview is deployed

```bash
git clone https://github.com/superfluid-finance/superfluid-protocol-preview/
cd superfluid-protocol-preview/ethereum-contracts && yarn install
```

If you haven't already, install truffle and jq.

```bash
# Linux
sudo apt-get install jq
# Mac
brew install jq

npm i -g truffle
```

The contracts have already been built and are located in the `/build` folder \(note: the contract source code may not be included\).

### Obtain Görli ETH

Before we can get testnet ETH, we need a 12-word mnemonic to create some test wallets. If you don't have a mnemonic, we can use Truffle to create one.

```text
truffle develop

> Accounts:
> (0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
> (1) 0xf17f52151ebef6c7334fad080c5704d77216b732

> Mnemonic: rigid cradle south ...
```

Copy the first address and use one of the Görli testnet faucets listed at [https://goerli.net/](https://goerli.net/) to obtain some ETH.

Exit the truffle develop tool before continuing.

Now create a file named `.env` and add your mnemonic and web3 provider for Görli network.

```text
GOERLI_MNEMONIC=rigid cradle south ...
GOERLI_PROVIDER_URL=https://goerli.infura.io/v3/<API_KEY>
```

### Open Truffle console

We are ready to open the Truffle console.

```bash
npx truffle --network goerli console
```

Let's load the SDK and initialize it with the contracts.

FIXME: update version name

```bash
SuperfluidSDK = require(".")

sf = new SuperfluidSDK.Framework({version: "test", web3Provider: web3.currentProvider, tokens: ["fDAI"] })

await sf.initialize()

> Resolver at 0x3710AB3fDE2B61736B8BB0CE845D6c61F667a78E
> Resolving contracts with version 0.1.2-preview-20201014
> Superfluid 0x8EA403f69173CB3271DBBa1916DD99d8E294B46f
> ConstantFlowAgreementV1 0x270a86E3F664b4c6db6a1CD6f7309Ca2E468Fc85
> InstantDistributionAgreementV1 0x265F42856aF54ff630B3C6297d4d125f9c8ED60f
> chainId 1609410758276
> Resolver at 0x248E358f8B1981Ab6d488Ec800ab5969A05F4bdf
> Resolving contracts with version test
> Superfluid host contract: TruffleContract .host @0x9CFBD0602ec5cd00c70A2702432f2728Cb73E017
> ConstantFlowAgreementV1: TruffleContract .agreements.cfa @0x48e582dA07017377EfD5F2341b7B31f540B9f71e | Helper .cfa
> InstantDistributionAgreementV1: TruffleContract .agreements.ida @0x5B1E93D08A46979F987668B7BEFc98f903ACa058 | Helper .ida
> fDAI: ERC20WithTokenInfo .tokens["fDAI"] @0xe849331e2A747c91C73e03B0b83BaC99621eDEcc
> fDAIx: ISuperToken .tokens["fDAIx"] @0x24FC433e6402ed142E3244a220AE03eddD9746e1
```

> What just happened? The Superfluid SDK used the `resolver` contract deployed on Görli to fetch all the Superfluid contracts for the version "test". Then the contract objects were created using the Truffle artifacts in the `/build` folder.
> Make sure you are using the latest _version_ name!

For this tutorial, we'll be using _fake_ ERC20 tokens called fDAI. If you need more than one token, you can easily add fUSDC and fTUSD as parameters when creating the sf object.

> Superfluid SDK created a Truffle object for our test token, and its superToken wrapper, at _sf.tokens.fDAI_ and _sf.tokens.fDAIx_

Now we'll load a web3 utility library and create an alias for two of our wallet addresses, as well as friendlier aliases for our tokens.

```bash
const { toWad, toBN, fromWad, wad4human } = require("@decentral.ee/web3-helpers")

const dai = await TestToken.at(sf.tokens.fDAI.address)
const daix = sf.tokens.fDAIx

bob = accounts[0]
alice = accounts[1]
dan = accounts[2]
```

### Mint some DAIx \(Superfluid DAI\)

Let's mint bob 100 DAI \(in testnet, minting is open for anyone to call\).

```bash
dai.mint(bob, web3.utils.toWei("100", "ether"), { from: bob })

# Check bob's balance
(async () => (wad4human(await dai.balanceOf(bob))))()
> '100.00000'
```

Now bob has some **normal** DAI.

![](https://github.com/superfluid-finance/superfluid-protocol-docs/tree/c0acd5ac6cab2baecb39b5b01b35daa9f175c468/img/cmon.png)

Before we can use DAI with Superfluid, we need to **upgrade** it to the Superfluid version "DAIx".

This is done using a `SuperToken` wrapper contract. Generally, there is a single wrapper for each ERC20.

Because we previously got the daix object when initializing the contract, we can now upgrade 50 of bob's DAI by calling `approve()` followed by `upgrade()`

```bash
dai.approve(daix.address, "1"+"0".repeat(42), { from: bob })

daix.upgrade(web3.utils.toWei("50", "ether"), { from: bob })

# Check DAIx balance
(async () => (wad4human(await daix.balanceOf(bob))))()
> '50.00000'
```

Hurrah, we now have 50 Superfluid-enabled DAI or "DAIx". We are ready to start using Superfluid.

## Create a Constant Flow Agreement "CFA"

Now that bob has some Superfluid-enabled DAI, he wants to send 100 DAIx per month to alice.

### createFlow\(\)

To achieve this, we will create a **Constant Flow Agreement**. In this agreement, we define the _amount per second_ and `recipient` where DAIx should flow.

```bash
await sf.cfa.createFlow({ superToken: daix.address, sender: bob, receiver: alice, flowRate: "385802469135802"})
```

Here is the breakdown:

1. A flow is a type of agreement, called a _Constant Flow Agreement_, **CFA** in short
2. We want to send a flow of DAI, so we specify _superToken: daix.address_
3. Using the method `createFlow()`, we pass the arguments for the DAIx token, sender, receiver, and the amount "385802469135802"

So what is this weird number "385802469135802"? This is the amount of DAIx to transfer per second, which is equivalent to 1000 DAIx per month.

```python
>>> (385802469135802 * 3600 * 24 * 30) / 1e18
999.99999999999989 DAIx per month
```

> HUH?! How is bob able to send 1000 DAIx per month if he only has 50 Superfluid enabled DAI? The answer is that the sender isn't required to have the full amount to start a flow. The flow will continue to run as long as he has DAIx.

#### 🎉 Excellent work, you just started your first Superfluid Flow!

![](https://github.com/superfluid-finance/superfluid-protocol-docs/tree/c0acd5ac6cab2baecb39b5b01b35daa9f175c468/img/paid-every-second-meme.png)

### Inspect the Flow

The flow is now active, so let's check alice and bob's balances to see what changed. Their balances are updated every second, and reflected on-chain at every new block.

```bash
(async () => wad4human((await daix.balanceOf(bob))))()
> 48.36226851851852
(async () => wad4human((await daix.balanceOf(alice))))()
> 0.2546296296296293
```

> Note: These amounts will not add up to 50 DAIx, due to a refundable deposit.

To get an idea of all Flow activity for bob, we can check his **net flow**. This will show us the sum of all inflow/outflows for his account.

We can use `getNetFlow()` to see the flow we just created.

```bash
(await sf.cfa.getNetFlow({superToken: daix.address, account: bob})).toString()
> "-385802469135802" # units of wei
```

Since Bob only has one flow to alice, his net flow is negative. If bob had multiple flows, this would be an easy way to get an overall picture of bob's activity.
Let's check it's the right amount:

```bash
(-385802469135802 *3600 * 24 * 30) / 1e18
> -999.9999999999989
```

### Stop the Flow

Now lets stop the flow by deleting it. Call `deleteFlow()` and select the flow between bob and alice.

```bash
sf.cfa.deleteFlow({superToken: daix.address, sender: bob, receiver: alice, by: bob})
```

Streams are identified by token, sender, and receiver.

The parameter "by" defines who is closing the stream. Streams can be closed by both sender and receiver.

If we check their balances, we'll see that they now add up to 50 since the refundable deposit has been returned.

```bash
(await daix.balanceOf(bob)).toString() / 1e18
> '49.04360'
(await daix.balanceOf(alice)).toString() / 1e18
> '0.95640'
```

Great job! You minted some Superfluid-enabled DAI, and created your first Flow.

Next we'll learn about another agreement, called **Instant Distribution**

[💰 Perform an Instant Distribution](https://github.com/superfluid-finance/superfluid-protocol-docs/tree/c0acd5ac6cab2baecb39b5b01b35daa9f175c468/tutorials/instant-distribution/README.md)
