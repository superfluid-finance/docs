---
date: '2020-09-28T00:00:00.000Z'
title: "\U0001F500 Create a Superfluid Flow"
description: In this tutorial we will create a Flow using the Javascript SDK
categories:
  - tutorial
published: true
showToc: true
---

# 🔀 Create a Superfluid Flow

## index

By the end of this tutorial you will learn how to: _Open and close a Flow_

### Introduction

A **Constant Flow Agreement** is a transfer of value from a `sender` to a `receiver` at a constant `flowRate` measured in _amount per second_.

Great! Now that you understand the first major concept of Superfluid, lets get to the fun part. Here is an overview of the Constant Flow Agreement contract. Did someone say _CRUD_?

```javascript
contract IConstantFlowAgreementV1 is ISuperAgreement {
  function createFlow( ...
  function updateFlow( ...
  function deleteFlow( ...
}
```

Seem straightforward enough? Let's go!

### Set Up

If you haven't done this before, follow [this guide](setup-local-environment.md) to setup your environment in the Görli testnet

### Create a Constant Flow Agreement "CFA"

Now that bob has some Superfluid-enabled DAI, he wants to send 100 DAIx per month to alice.

#### user\(\)

First of all, we need to create a user\(\) object for Bob. We'll need to add his address, and specify the currency he is going to use

```javascript
const userBob = sf.user({
  address: bob,
  token: daix.address
});
```

#### flow\(\)

Now we have a user, Bob. Let's send a stream to Alice

```javascript
await userBob.flow({
  recipient: alice,
  flowRate: "385802469135802"
});
```

So what is this weird number "385802469135802"? This is the amount of DAIx to transfer per second, which is equivalent to 1000 DAIx per month.

But is the flow actually happening? check it out yourself by checking his balance a few times:

```javascript
(async () => wad4human(await daix.balanceOf(bob)))()(
```

But where can I see these flows?

```javascript
await userBob.details(); // full object
(await userBob.details()).cfa.flows; // detailed flows view
```

There can only ever be one flow from: alice to: bob, so if you call flow\(\) again, you will be able to edit this stream:

```javascript
await userBob.flow({
  recipient: alice,
  flowRate: "1000000000000000" // 2592 per month, transformed to seconds, with 18 decimals
});
```

Now if we want to close the stream off

```javascript
userBob.flow({
  recipient: alice,
  flowRate: "0"
});
```

## Go lower level

If you want a bit more freedom to customize, you can go one level deeper into our SDK

#### createFlow\(\)

To achieve this, we will create a **Constant Flow Agreement**. In this agreement, we define the _amount per second_ and `recipient` where DAIx should flow.

```javascript
await sf.cfa.createFlow({
  superToken: daix.address,
  sender: bob,
  receiver: alice,
  flowRate: "385802469135802" // 1000 per month
});
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

**🎉 Excellent work, you just started your first Superfluid Flow!**

![](https://github.com/superfluid-finance/superfluid-protocol-docs/tree/c0acd5ac6cab2baecb39b5b01b35daa9f175c468/img/paid-every-second-meme.png)

#### Inspect the Flow

The flow is now active, so let's check alice and bob's balances to see what changed. Their balances are updated every second, and reflected on-chain at every new block.

```javascript
(async () => wad4human(await daix.balanceOf(bob)))() >
  48.36226851851852(async () => wad4human(await daix.balanceOf(alice)))() >
  0.2546296296296293;
```

> Note: These amounts will not add up to 50 DAIx, due to a refundable deposit.

To get an idea of all Flow activity for bob, we can check his **net flow**. This will show us the sum of all inflow/outflows for his account.

We can use `getNetFlow()` to see the flow we just created.

```javascript
(await sf.cfa.getNetFlow({superToken: daix.address, account: bob})).toString()
> "-385802469135802" # units of wei
```

Since Bob only has one flow to alice, his net flow is negative. If bob had multiple flows, this would be an easy way to get an overall picture of bob's activity. Let's check it's the right amount:

```javascript
(-385802469135802 * 3600 * 24 * 30) / 1e18 > -999.9999999999989;
```

#### Stop the Flow

Now lets stop the flow by deleting it. Call `deleteFlow()` and select the flow between bob and alice.

```javascript
sf.cfa.deleteFlow({
  superToken: daix.address,
  sender: bob,
  receiver: alice,
  by: bob
});
```

Streams are identified by token, sender, and receiver.

The parameter "by" defines who is closing the stream. Streams can be closed by both sender and receiver.

If we check their balances, we'll see that they now add up to 50 since the refundable deposit has been returned.

```javascript
(await daix.balanceOf(bob)).toString() / 1e18 >
  "49.04360"(await daix.balanceOf(alice)).toString() / 1e18 >
  "0.95640";
```

Great job! You minted some Superfluid-enabled DAI, and created your first Flow.

Next we'll learn about another agreement, called **Instant Distribution**

