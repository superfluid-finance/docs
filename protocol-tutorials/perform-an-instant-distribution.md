---
description: Learning how to see the instant token distribution in the action
---

# 💰 Perform an Instant Distribution

![](../.gitbook/assets/image%20%286%29%20%283%29%20%284%29%20%282%29.png)

## Goal of this tutorial

By the end of this tutorial you will learn how to _Perform an Instant Distribution_

## Introduction

An **Instant Distribution Agreement \(IDA\)** is used to send funds as one-time-payments. It consists of a **Publishing Index** with `indexId`, an `indexValue`, and one or more **subscribers**.

This is the second major concept of Superfluid. Here is an overview of the Instant Distribution Agreement contract we'll use in this tutorial.

```javascript
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

If you haven't done this before, follow [this guide](setup-local-environment.md) to setup your environment in the Görli testnet

> If you have any active flows, please stop them before continuing.

## Perform an Instant Distribution

The first step to creating an Instant Distribution Agreement \(IDA\) is to create a **Publishing Index**. Once created, the Publishing Index can be used by bob to send tokens at any point in the future.

An **Instant Distribution Agreement \(IDA\)** can be used to make one-time-payments to multiple recipients. Use-cases include revenue sharing or recurring air-drops. An IDA consists of a **Publisher** with one or more **Subscribers**. To simplify things in this process, the SDK wraps much of the IDA logic.

## Steps

The first step is to create a new **pool** with a unique `poolId`

```javascript
await alice.createPool({ poolId: 1 });
```

Then we give out shares

```javascript
await alice.giveShares({ poolId: 1, recipient: dan, shares: 90 });
await alice.giveShares({ poolId: 1, recipient: carol, shares: 10 });
```

And finally we can distribute funds to everyone in the pool, based on the amount of shares they have.

```javascript
await alice.distributeToPool({ poolId: 1, amount: 1000 });
```

In this example, bob will receive 90% of the tokens alice sent, while carol only receives 10%. Bob will have 900 and carol will have 100.

Thats it! One thing to pay attention - for a recipient's balance to reflect the distribution event, they should first call `approveSubscription` one time. If they fail to do this, no worries, they can still receive their tokens after calling the `claim` function at any time.

## Excellent work!

You learned how to perform an Instant Distribution using the Superfluid SDK. Now that you have the basics down, its time to start building a dapp.

