---
description: The 3 major components of the Superfluid framework
---

# 🚚 Primitives

There are three primitives of Superfluid:

1. Agreements
2. Super Tokens
3. Super Apps

Each primitive enables new features, however you don't have to use all of them. You can mix and match them depending your needs.&#x20;

## 1. Agreements

Agreements set the "rules" of how a Super Token can behave. The Superfluid framework is comprised of a single **host** contract, with multiple **agreement** contracts. An agreement contract must be on the approve-list, otherwise the host contract will not execute the agreement code.

> Agreements are the building blocks that enable Superfluid to expand and add new features.

In the previous section, you used the **Constant Flow Agreement**, which enables you to flow tokens from your wallet.  There is also the **Instant Distribution Agreement**, which allows sending tokens to multiple recipients in a single transaction. If you want to read the Solidity code, here are all the agreements:

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/tree/dev/packages/ethereum-contracts/contracts/agreements" %}
packages/ethereum-contracts/contracts/agreements/
{% endembed %}

The Superfluid community is exploring the possibilites of what these two agreements can do. Eventually there will be more agreements, and there's an open invitation to help build and create them.

## 2. Super Tokens

In addition to agreements, the Superfluid framework also provides features at the token level. Here's a short list of super-powers:

* **ERC777 -** tokens which can "react" to certain events using callbacks ([erc777.org](https://www.erc777.org/))
* **Batch capabilities -** you can do multiple things in a single transaction
* **Meta-transactions** - submit transactions on behalf of another account

Dive into the Solidity here:&#x20;

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/superfluid/SuperToken.sol" %}
packages/ethereum-contracts/contracts/superfluid/SuperToken.sol
{% endembed %}

## 3. Super Apps

Now for the really juicy stuff! A Superfluid App or "Super App" is a contract that can react to agreement calls. For example:

* If a user starts a token flow to the contract, automatically flow another token back using the CFA.&#x20;
* If a user calls `buyShares`, distribute the ETH to all current shareholders using the IDA.

> See more examples and ideas in [🛠️ Examples](../../resources/examples.md)

A Super App can "manage" agreements and respond to changes. This is where you can write your own custom logic/behavior.&#x20;
