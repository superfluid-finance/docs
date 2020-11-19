---
date: '2020-09-28T00:00:00.000Z'
title: "\U0001F4B0 Perform an Instant Distribution"
description: Use the Javascript SDK to perform an Instant Distribution
categories:
  - tutorial
published: true
showToc: true
---

# index

By the end of this tutorial you will learn how to:

* Use the Superfluid JavaScript SDK
* Mint Superfluid DAI \(DAIx\)
* Perform an Instant Distribution

## Introduction

An **Instant Distribution Agreement \(IDA\)** is used to send funds as one-time-payments. It consists of a **Publishing Index** with `indexId`, an `indexValue`, and one or more **subscribers**.

This is the second major concept of Superfluid. Here is an overview of the Instant Distribution Agreement contract we'll use in this tutorial.

```text
contract IInstantDistributionAgreementV1 is ISuperAgreement {
  function createIndex(
      ISuperToken token,
      uint32 indexId,
      bytes calldata ctx)
          external
          virtual
          returns(bytes memory newCtx);

   function updateIndex(
      ISuperToken token,
      uint32 indexId,
      uint128 indexValue,
      bytes calldata ctx)
          external
          virtual
          returns(bytes memory newCtx);
```

## Set Up

> Skip this section if you're already running Truffle console with the Superfluid SDK. You may need to deposit more Görli ETH into your accounts.

The Superfluid contracts have already been deployed on the Görli testnet for you. Here are the steps we'll take to get set up:

1. Install the SDK
2. Obtain Gorli ETH
3. Open Truffle console
4. Mint some Superfluid DAI \(DAIx\)

### Install the SDK

Download the example repo, which includes the Superfluid JavaScript software development kit.

```bash
git clone https://github.com/superfluid-finance/superfluid-protocol-preview/
cd superfluid-protocol-preview/ethereum-contracts && yarn install
```

If you haven't already, install truffle and jq.

```bash
sudo apt-get install jq
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
> (3) 0x9ff32c1748bc935f02b43d66751d290927de49e4

> Mnemonic: rigid cradle south ...
```

Copy the first 3 address and use one of the Görli testnet faucets listed at [https://goerli.net/](https://goerli.net/) to obtain some ETH for each account.

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

```bash
SuperfluidSDK = require(".")

sf = new SuperfluidSDK.Framework({version: "0.1.2-preview-20201014", web3Provider: web3.currentProvider })

await sf.initialize()

> Resolver at 0x3710AB3fDE2B61736B8BB0CE845D6c61F667a78E
> Resolving contracts with version 0.1.2-preview-20201014
> Superfluid 0x8EA403f69173CB3271DBBa1916DD99d8E294B46f
> ConstantFlowAgreementV1 0x270a86E3F664b4c6db6a1CD6f7309Ca2E468Fc85
> InstantDistributionAgreementV1 0x265F42856aF54ff630B3C6297d4d125f9c8ED60f
```

> What just happened? The Superfluid SDK used the `resolver` contract deployed on Görli to fetch all the Superfluid contracts for the version "0.1.2-preview-20201014". Then the contract objects were created using the Truffle artifacts in the `/build` folder.

Now we'll load a web3 utility library and create an alias for two of our wallet addresses.

```bash
const { toWad, toBN, fromWad, wad4human } = require("@decentral.ee/web3-helpers")

bob = accounts[0]
alice = accounts[1]
dan = accounts[2]
```

### Mint some DAIx \(Superfluid DAI\)

For this tutorial, we'll be using an ERC20 token "fake DAI" to represent DAI. Let's get the address for this token using the resolver, and create a Truffle contract object so we can interact with it.

```bash
daiAddress = await sf.resolver.get("tokens.fDAI")
dai = await sf.contracts.TestToken.at(daiAddress)
```

Let's mint bob 100 DAI \(minting is open for anyone to call\).

```bash
dai.mint(bob, web3.utils.toWei("100", "ether"), { from: bob })

# Check bob's balance
(async () => (wad4human(await dai.balanceOf(bob))))()
> '100.00000'
```

Now bob has some normal DAI.

![](https://github.com/superfluid-finance/superfluid-protocol-docs/tree/c0acd5ac6cab2baecb39b5b01b35daa9f175c468/img/cmon.png)

Before we can use DAI with Superfluid, we need to **upgrade** it to the Superfluid version "DAIx".

This is done using a `SuperToken` wrapper contract. Generally, there is a single wrapper for each ERC20. Let's get the SuperToken wrapper for DAI.

```bash
daixWrapper = await sf.getERC20Wrapper(dai)
daix = await sf.contracts.ISuperToken.at(daixWrapper.wrapperAddress)
```

Now we can upgrade 50 of bob's DAI by calling `approve()` followed by `upgrade()`

```bash
dai.approve(daix.address, "1"+"0".repeat(42), { from: bob })

daix.upgrade(web3.utils.toWei("50", "ether"), { from: bob })

# Check DAIx balance
(async () => (wad4human(await daix.balanceOf(bob))))()
> '50.00000'
```

Hurrah, we now have 50 Superfluid-enabled DAI or "DAIx". We are ready to start using Superfluid.

## Perform an Instant Distribution

> If you have any active flows, please stop them before continuing.

The first step to creating an Instant Distribution Agreement \(IDA\) is to create a **Publishing Index**. Once created, the Publishing Index can be used by bob to send tokens at any point in the future.

### Create a Publishing Index

Create a new Publishing Index from bob using `createIndex()`. Bob is the _publisher_ in this scenario.

```bash
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.createIndex(daix.address, 42, "0x").encodeABI(), { from: bob })
```

Here is the breakdown:

1. An Instant Distribution is a type of agreement, so we use `callAgreement()`
2. We specify we want an **Instant Distribution Agreement** by selecting `sf.agreements.ida.address`
3. Using the method `createIndex()`, we pass the arguments for `token` DAIx and `indexId` "42".

> A publisher can create virtually unlimited Publishing Indexes.

Now that we have a Publishing Index, lets specify it's behavior. In this tutorial, bob wants to send funds to both alice and dan. He also would like alice to receive twice the amount that dan receives, whenever a distribution occurs.

![](https://github.com/superfluid-finance/superfluid-protocol-docs/tree/c0acd5ac6cab2baecb39b5b01b35daa9f175c468/img/instant-distribution-42.png)

We do this by creating a **subscription** for each recipient. Let's go ahead and call `updateSubscription()` for alice. Note that only the publisher can update their own Publishing Index.

```bash
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.updateSubscription(daix.address, 42, alice, 200, "0x").encodeABI(), { from: bob })
```

Here is the breakdown:

1. We again use `callAgreement()` and specify this is an IDA by passing `sf.agreements.ida.address`
2. Using the method `updateSubscription()`, we pass the arguments for the `token` DAIx, `indexId` "42", `recipient` alice, and an amount of `units` "200".

Let's do the same for dan, but for only "100" `units`.

```bash
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.updateSubscription(daix.address, 42, dan, 100, "0x").encodeABI(), { from: bob })
```

**Units** are used to calculate how much each recipient should receive in a distribution. Each recipient receives an amount proportional to the amount of units they hold, compared to the total units.

Since alice has twice as many units as dan, she will always receive double the amount that dan receives 💰💰.

### Subscribe to a Publishing Index

In the previous step, we created two subscriptions for bob's Publishing Index. Now the recipients have the option to **approve subscription**. By doing so, their DAIx balance will be updated instantly when an Instant Distribution occurs. They will still receive the funds if they don't perform this step, but they may have to perform an additional transaction.

Alice can approve subscription to bob's Publishing Index using `approveSubscription()`.

```bash
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.approveSubscription(daix.address, bob, 42, "0x").encodeABI(), { from: alice })
```

Let's see what happens if dan does not subscribe ahead of time \(spoiler alert: he still receives the funds\).

### Update the Index

Let's check everyone's balances before we distribute DAIx.

```bash
(await daix.balanceOf(bob)).toString() / 1e18
> 50
(await daix.balanceOf(alice)).toString() / 1e18
> 0
(await daix.balanceOf(dan)).toString() / 1e18
> 0
```

Now we will perform an Instant Distribution using `updateIndex()` with an `indexValue` of "0.01".

```bash
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.updateIndex(daix.address, 42, web3.utils.toWei("0.01", "ether"), "0x").encodeABI(), { from: bob })
```

Here is the breakdown:

1. We again use `callAgreement()` and specify this is an IDA by passing `sf.agreements.ida.address`
2. Using the method `updateIndex()`, we pass the arguments for `token` DAIx, `indexId` "42", and the desired `indexValue`.

The "0.01" `indexValue` we passed represents 0.01 _DAIx per unit_. Since alice has 200 `units`, she receives `0.01 * 200 units = 2 DAIx`. Similarly, dan received 1 DAIx.

We can always get the total amount distributed by multiplying the `indexValue` by the total `units` for a Publishing Index.

Lets check the balances to confirm.

```bash
(await daix.balanceOf(alice)).toString() / 1e18
> 2
(await daix.balanceOf(dan)).toString() / 1e18
> 0
```

Great! Alice received her portion of the distribution immediately. However, dan has not received his yet, since he did not call `approveSubscription()` ahead of time.

### Claim "unclaimed" tokens

Every account can only subscribe to a total of 256 Publishing Indexes. This is why the SF contracts cannot automatically distribute the DAIx to Dan. It is a prevention mechanism to keep spammers from "filling" up all 256 subscriptions.

The next time bob calls `updateIndex()`, the IDA contract will see there is an "unclaimed" distribution, and will perform the distribution automatically as a _side-effect_.

However, dan is eager to receive his DAIx, and wants it immediately. Let's have dan use the `claim()` function to get his well-earned DAIx. He should also `approveSubscription()` so he won't need to perform this step again.

```bash
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.claim(daix.address, bob, 42, "0x").encodeABI(), { from: dan })

sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.approveSubscription(daix.address, bob, 42, "0x").encodeABI(), { from: dan })
```

Now if we check dan's balance, we'll see the distribution was successful.

```bash
(await daix.balanceOf(dan)).toString() / 1e18
> 1
```

### Making additional Distributions

To perform additional distributions, we can increase the `indexValue` amount. To send another 2 DAI to alice and 1 DAI to dan we must increment the index by another 0.01 for a total of 0.02 DAIx per `units`

```bash
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.updateIndex(daix.address, 42, web3.utils.toWei("0.02", "ether"), "0x").encodeABI(), { from: bob })
```

The `indexValue` can only ever increase, since funds can only flow from the _publisher to the subscriber\(s\)._ Let's check their new balances.

```bash
(await daix.balanceOf(alice)).toString() / 1e18
> 4
(await daix.balanceOf(dan)).toString() / 1e18
> 2
```

Excellent work! You learned how to perform an Instant Distribution using the Superfluid SDK. Now that you have the basics down, its time to start building a dapp.

