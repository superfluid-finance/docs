---
description: 'Money flows in, soda flows out'
---

# 🥤Soda Machine

For this exampl, we will create an app for **purchasing soda in real-time**. The soda will only flow while we are paying, so we'll be in charge of how much we want in our cup!

![](../../.gitbook/assets/sam-battaglieri-9uufylbkojw-unsplash.jpg)

## $1 DAI = 1 SODA

To make things simple, we'll sell our SODA for $1 DAI

However, instead of discrete payments, like handing a single dollar bill to a cashier, the machine will only dispense SODA _while we are actively paying_. 

Stream DAI to the machine- it turns on. Stop streaming DAI- it turns off.

![Streaming 100 DAI per minute means you&apos;ll have a lot of SODA very quickly](../../.gitbook/assets/flow-rate.png)

## Operating the machine

When we deploy the contract, we can automatically mint 1M SODA tokens. This should be enough for many happy customers. We also set the **accepted token** we wish to earn, which in this case is DAIx \(Superfluid DAI\). 

Customer can start flowing DAIx to the Soda Machine contract address using any available interface- such as the [Superfluid Dashboard](https://app.superfluid.finance/). Once they've received the desired amount, they can cancel their DAIx stream.

## Prerequisites

Before starting you should: 

* Have some goerli ETH and tokens in your wallet from the dashboard [https://app.superfluid.finance](https://app.superfluid.finance)

## Setup

Click this link to load the contracts in Remix:

Select and deploy **Example.sol** on Goerli network using the following parameters:

| Parameter | Value |
| :--- | :--- |
| Host | 0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9 |
| CFA | 0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8 |
| ACCEPTEDTOKEN | 0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00 |
| SUPERTOKENFACTORY | 0x94f26B4c8AD12B18c12f38E878618f7664bdcCE2 |

If you want to deploy on a different network, use the [🔗 Network Directory](../../networks/networks.md)

Next call the function `deploySodaMachine()` which will deploy SodaMachine.sol and create and register a new Native Super Token. 

Now you can call the function `getMachineAddress()` to get the address for our new Soda machine. Finally, load the `SodaMachine.sol` contract at this address.

## Callbacks

Since our Soda Machine needs to automatically react to incoming DAIx streams, we'll use Super App Callbacks. The Callbacks is where we'll check the incoming token stream, and start flowing SODA tokens back to the customer.

