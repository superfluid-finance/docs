---
description: Money flows in, soda flows out
---

# 🥤Soda Machine

{% embed url="https://youtu.be/CUVIKcEQVuQ" %}

For this example, we will create a Super App for **purchasing soda in real-time**. The soda will only flow while we are paying, so we'll be in charge of how much we want in our cup!

## $1 DAI = 1 SODA

To make things simple, we'll sell our SODA for $1 DAI

However, instead of discrete payments, like handing a single dollar bill to a cashier, the machine will only dispense SODA _while we are actively paying_. 

Stream DAI to the machine- it turns on. Stop streaming DAI- it turns off.

![Streaming 100 DAI per minute means you'll have a lot of SODA very quickly](<../../.gitbook/assets/flow-rate (1).png>)

## Operating the machine

When we deploy the contract, we can automatically mint 1M SODA tokens. This should be enough for many happy customers. We also set the **accepted token **we wish to earn, which in this case is DAIx (Superfluid DAI). 

Customer can start flowing DAIx to the Soda Machine contract address using any available interface- such as the [Superfluid Dashboard](https://app.superfluid.finance). Once they've received the desired amount, they can cancel their DAIx stream.

## Prerequisites

Before starting you should: 

* Have some goerli ETH and test tokens in your wallet from the dashboard [https://app.superfluid.finance](https://app.superfluid.finance)

## Setup

Click this link to load the contracts in Remix:

{% embed url="https://remix.ethereum.org/#version=soljson-v0.7.6+commit.7338295f.js&optimize=false&runs=200&gist=4669f393d5b9cc199c88ab6e9c68686f" %}

Select and deploy **Example.sol** on Goerli network using the following parameters:

| Parameter         | Value                                      |
| ----------------- | ------------------------------------------ |
| Host              | 0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9 |
| CFA               | 0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8 |
| ACCEPTEDTOKEN     | 0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00 |
| SUPERTOKENFACTORY | 0x94f26B4c8AD12B18c12f38E878618f7664bdcCE2 |

If you want to deploy on a different network, use the [🔗 Network Directory](../../networks/networks.md)

During deployment, several things will happen:

* Deploy and initialize a Custom Super Token "SODA"
* Deploy the Soda Machine, and register it as an ERC777 recipient (so it can receive SODA)
* Mint 1M SODA and send them to the Soda Machine

## Stream some SODA

Now that you've deployed the example contract, you can check the values for `_sodaMachine` and `_sodaToken` and load the appropriate contracts in Remix. Keep in mind that the interface you should use for `_sodaToken` is `ISuperToken` and not the proxy interface `NativeSuperToken`.  

Once you have the address for the Soda Machine, start sending it some DAI (accepted token) using the [dashboard](https://app.superfluid.finance). Once your DAI stream begins, SODA will immediately begin flowing back to you! To stop the flow of SODA, simply stop your DAI stream.

You can check you balance of SODA using the contract in Remix, since the token won't appear in the dashboard.
