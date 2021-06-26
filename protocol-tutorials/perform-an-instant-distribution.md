---
description: Create a pool and distribute tokens using @superfluid-financ/js-sdk
---

# 💰 Instant Distribution

## Introduction

Let's take a look at another Superfluid Agreement. The **Instant Distribution Agreement \(IDA\)** can be used to make one-time-payments to multiple recipients. The IDA could be used for revenue sharing or airdrops.  It consists of a **Publishing Index** with `indexId`, an `indexValue`, and one or more **subscribers**.

Here is an quick glimpse at the IDA contract we'll use in this tutorial. Don't worry, you don't need to memorize this.

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

## Prerequisites

Before starting this tutorial you should: 

* Complete the [@superfluid-finance/js-sdk](frontend-+-nodejs.md) tutorial
* Have some goerli ETH and tokens in your wallet from the dashboard [https://app.superfluid.finance](https://app.superfluid.finance)

## Create a Pool

The first step to using an IDA is to create a **Publishing Index**. Once created, the Publishing Index can be used to send tokens at any point in the future. To make things easier, we will just call this `poolId`

Lets create a new **pool:**

```javascript
await alice.createPool({ poolId: 1 });
```

Now that we have our Plublishing Index / pool, we can assign it some **Subscribers**. We do this by _giving shares_ to other people like this:

```javascript
await alice.giveShares({ poolId: 1, recipient: bob, shares: 90 });
await alice.giveShares({ poolId: 1, recipient: carol, shares: 10 });
```

And finally we can _distribute funds_ to everyone in the pool, based on the amount of shares they have.

```javascript
await alice.distributeToPool({ poolId: 1, amount: 1000 });
```

In this example, bob will receive 90% of the tokens alice sent, while carol only receives 10%. Bob will have 900 and carol will have 100.

Thats it! One thing to pay attention - for a recipient's balance to reflect the distribution event, they should first call `approveSubscription` one time. If they fail to do this, don't worry, they can still receive their tokens after calling the `claim` function at any time.



⚔ Look at you now, with two agreements at your disposal. You can duel-wield! Its time to learn more about Super Tokens.

