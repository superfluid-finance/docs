---
description: Deploying SuperApp to the Görli network
---

# 🔀 Setup your local environment

![](../.gitbook/assets/image%20%285%29.png)

## Goal of this tutorial

**By the end of this tutorial you will learn how to**:

- Be ready to use the Superfluid JavaScript SDK
- Mint Superfluid DAI \(DAIx\)

## Introduction

Superfluid is a new framework for value transfer on Ethereum.

We use wrappers of existing tokens, called superTokens, that can do amazing things!

Great! Now that you understand the first major concept of Superfluid, lets get to the fun part.

Let's take the contracts for a test-drive.

## Set Up

The Superfluid contracts have already been deployed on the Görli testnet for you. Here are the steps we'll take to get set up:

1. Install the SDK
2. Obtain Gorli ETH
3. Open Truffle console
4. Mint some Superfluid DAI \(DAIx\)

### Install the SDK

Download the example repo, which includes the Superfluid JavaScript software development kit.

```bash
git clone https://github.com/superfluid-finance/ethereum-contracts
cd ethereum-contracts
yarn install
yarn build
```

If you haven't already, install truffle and jq.

```bash
# Linux
sudo apt-get install jq
# Mac
brew install jq

npm i -g truffle
```

### Obtain Görli ETH

First of all, move to the right directory and install all dependencies

```bash
cd packages/ethereum-contracts
yarn install
```

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

```javascript
SuperfluidSDK = require("@superfluid-finance/js-sdk")

sf = new SuperfluidSDK.Framework({version: "v1", web3Provider: web3.currentProvider, tokens: ["fDAI"] })

await sf.initialize()

chainId 5
Resolver at 0x3710AB3fDE2B61736B8BB0CE845D6c61F667a78E
Resolving contracts with version v1
Superfluid host contract: TruffleContract .host @0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9
ConstantFlowAgreementV1: TruffleContract .agreements.cfa @0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8 | Helper .cfa
InstantDistributionAgreementV1: TruffleContract .agreements.ida @0xfDdcdac21D64B639546f3Ce2868C7EF06036990c | Helper .ida
fDAI: ERC20WithTokenInfo .tokens["fDAI"] @0x88271d333C72e51516B67f5567c728E702b3eeE8
fDAIx: ISuperToken .tokens["fDAIx"] @0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00
```

> What just happened? The Superfluid SDK used the `resolver` contract deployed on Görli to fetch all the Superfluid contracts for the version "test". Then the contract objects were created using the Truffle artifacts in the `/build` folder.
> Make sure you are using the latest _version_ name!

For this tutorial, we'll be using _fake_ ERC20 tokens called fDAI. If you need more than one token, you can easily add fUSDC and fTUSD as parameters when creating the sf object.

> Superfluid SDK created a Truffle object for our test token, and its superToken wrapper, at _sf.tokens.fDAI_ and _sf.tokens.fDAIx_

Now we'll load a web3 utility library and create an alias for two of our wallet addresses, as well as friendlier aliases for our tokens.

```javascript
const {
  toWad,
  toBN,
  fromWad,
  wad4human
} = require("@decentral.ee/web3-helpers");

const dai = await TestToken.at(sf.tokens.fDAI.address);
const daix = sf.tokens.fDAIx;

bob = accounts[0];
alice = accounts[1];
dan = accounts[2];
carol = accounts[3];
```

### Mint some DAIx \(Superfluid DAI\)

Let's mint bob 100 DAI \(in testnet, minting is open for anyone to call\).

```javascript
await dai.mint(bob, web3.utils.toWei("100", "ether"), { from: bob })

# Check bob's balance
(async () => (wad4human(await dai.balanceOf(bob))))()
> '100.00000'
```

Now bob has some **normal** DAI.

![](https://github.com/superfluid-finance/superfluid-protocol-docs/tree/c0acd5ac6cab2baecb39b5b01b35daa9f175c468/img/cmon.png)

Before we can use DAI with Superfluid, we need to **upgrade** it to the Superfluid version "DAIx".

This is done using a `SuperToken` wrapper contract. Generally, there is a single wrapper for each ERC20.

Because we previously got the daix object when initializing the contract, we can now upgrade 50 of bob's DAI by calling `approve()` followed by `upgrade()`

```javascript
dai.approve(daix.address, "1"+"0".repeat(42), { from: bob })

daix.upgrade(web3.utils.toWei("50", "ether"), { from: bob })

# Check DAIx balance
(async () => (wad4human(await daix.balanceOf(bob))))()
> '50.00000'
```

Hurrah, we now have 50 Superfluid-enabled DAI or "DAIx". We are ready to start using Superfluid.

---

Great job! You minted some Superfluid-enabled DAI

Next we'll learn how to use superfluid agreements, starting with streaming money: **Constant Flow Agreement**

[💰 Create a Superfluid Flow](https://github.com/superfluid-finance/superfluid-protocol-docs/tree/c0acd5ac6cab2baecb39b5b01b35daa9f175c468/tutorials/instant-distribution/README.md)

FIXME: fix Link!
