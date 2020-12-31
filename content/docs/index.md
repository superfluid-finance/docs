---
date: "2020-09-28T00:00:00.000Z"
title: Documentation
description: Superfluid docs
categories:
  - documentation
published: true
showToc: true
---

# index

## Introduction

Superfluid is a smart contract framework on L1 Ethereum, enabling you to move assets on-chain following predefined rules called agreements With a single on-chain tx, the money will flow from your balance to the receiver in real time! No other tx required Feels like magic ✨ Superfluid enables:

💸 **Real money streaming** - constant flows on-chain with no capital lockups.

🎁 **Rewards distributions** - Fixed cost distribution in a single transaction for any number of receivers.

🔮 **Anything you can imagine** - Superfluid is very flexible!

The initial version of Superfluid is comprised of the following key elements:

- _Super Agreement Framework_: a set of white-listed _super agreements_ contracts as building blocks.
- _Super App Framework_: a development framework for building real-time finance apps.
- _Super Token Framework_: an extended [ERC-777](https://eips.ethereum.org/EIPS/eip-777) implementation with real-time finance capability, and a registry.
- _Batch Call & Meta Tx_: for users \(contracts or EOA\) to interact with the system in batch on-chain, or off-chain through meta transactions.
- _Governance_: a external contract for managing protocol parameters and contract upgrades.
- _Solvency Agents_: an off-chain network of agents ensuring the solvency of the system.

## Cheat Sheet

One-liners to keep you "in the flow".

#### Quick-start

Setup the SDK in Truffle console and mint DAIx. See the [tutorial](https://github.com/superfluid-finance/superfluid-protocol-docs/tree/c0acd5ac6cab2baecb39b5b01b35daa9f175c468/tutorial/create-a-flow/README.md) for a full walk-through.

```bash
npx truffle --network goerli console
# Then in console
exec ../test-scripts/console-quick-start.js
```

#### Tokens

**`balanceOf()`**

```text
(await daix.balanceOf(bob)).toString() / 1e18
(await dai.balanceOf(bob)).toString() / 1e18

or

(async () => wad4human(await dai.balanceOf(bob))()
(async () => wad4human(await daix.balanceOf(bob))()

```

**`upgrade()`**

```bash
dai.approve(daix.address, "1"+"0".repeat(42), { from: bob })
daix.upgrade(web3.utils.toWei("50", "ether"), { from: bob })
```

#### Flows

**`createFlow()`**

```bash
sf.cfa.createFlow({ superToken: daix.address, sender: bob, receiver: alice, flowRate: "385802469135802"})
```

**`updateFlow()`**

```bash
sf.cfa.createFlow({ superToken: daix.address, sender: bob, receiver: alice, flowRate: "632802469135333"})
```

**`deleteFlow()`**

```text
sf.cfa.deleteFlow({superToken: daix.address, sender: bob, receiver: alice, by: bob})
```

**`getNetFlow()`**

```text
(await sf.cfa.getNetFlow({superToken: daix.address, account: bob})).toString()
```

**`getFlow()`**

```text
(await sf.cfa.getFlow({superToken: daix.address, sender: bob, receiver: alice})).toString()
```

**`listFlows()`**

```text
await sf.cfa.listFlows({superToken: daix.address, account: bob})
```

#### Instant Distributions

**`createIndex()`** \(sent from _publisher\)_

```text
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.createIndex(daix.address, 42, "0x").encodeABI(), "0x", { from: bob })
```

**`updateSubscription()`** \(sent from _publisher\)_

```text
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.updateSubscription(daix.address, 42, dan, 100, "0x").encodeABI(), "0x", { from: bob })
```

**`approveSubscription()`** \(sent from _subscriber\)_

```text
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.approveSubscription(daix.address, bob, 42, "0x").encodeABI(), "0x", { from: alice })
```

**`updateIndex()`** \(sent from _publisher\)_

```text
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.updateIndex(daix.address, 42, web3.utils.toWei("0.01", "ether"), "0x").encodeABI(), "0x", { from: bob })
```

**`claim()`** \(sent from _subscriber\)_

```text
sf.host.callAgreement(sf.agreements.ida.address, sf.agreements.ida.contract.methods.claim(daix.address, bob, 42, dan, "0x").encodeABI(), "0x", { from: dan })
```

## Agreements

### Constant Flow Agreement \(CFA\)

A **Constant Flow Agreement** is a transfer of value from a `sender` to a `receiver` at a constant `flowRate` measured in _amount per second_.

### Instant Distribution Agreement \(IDA\)

An **Instant Distribution Agreement \(IDA\)** is used to send funds as one-time-payments. It consists of a **Publishing Index** with `indexId`, an `indexValue`, and one or more **subscribers**.
