---
description: Alright, so you now understand how Auto Top Up works. Let's set one up!
---

# Setting Up

### 1. Pick a Strategy Contract

Currently there's only **ERC20StrollOut** which converts an ERC20 into its Wrapper Super Token (e.g. DAI to DAIx).

{% embed url="https://docs.superfluid.finance/superfluid/resources/tools/auto-top-up/strategies#erc20strollout-strategy" %}

### 2. Approve Strategy Contract

You'll want to approve the Strategy contract to spend your ERC20 tokens that will be used for Auto Top Up.&#x20;

For example, if you're maintaining a USDC salary stream and using the ERC20StrollOut strategy, you will **approve the ERC20StrollOut contract to spend your USDC**.&#x20;

We'd suggest giving maximum approval so you don't have to worry about running out of approval.&#x20;

### 3. Create Your Top Up

Call the `createTopUp()` function on the Auto Top Manager contract with the parameters described below 👇

{% embed url="https://docs.superfluid.finance/superfluid/resources/tools/auto-top-up/auto-top-up-manager#creating-your-top-up-with-createtopup" %}

### 4. Set Up Off-Chain Keeper

Now your Auto Top Up is configured and ready to go. But who's going to trigger the top up when it needs to get triggered?

Set up an off-chain keeper that periodically checks (at a cadence of your choice) if a top up needs to be called by calling [`checkTopUp`](https://app.gitbook.com/o/-MKEeXlqDp8Or6mOgLxr/s/-MKEcOOf\_qoYMObicyRu/\~/changes/83chtnBpBqJB1DZWkpOT/resources/tools/auto-top-up/auto-top-up-manager#checking-in-on-top-ups-with-checktopup) on the Auto Top Up contract. If `checkTopUp` returns a non-zero number, call [`performTopUp`](https://app.gitbook.com/o/-MKEeXlqDp8Or6mOgLxr/s/-MKEcOOf\_qoYMObicyRu/\~/changes/83chtnBpBqJB1DZWkpOT/resources/tools/auto-top-up/auto-top-up-manager#call-top-up-on-account).&#x20;

`performTopUp` is an external function, so it can be called by anyone. No need to set up your keeper with any kind of permissions!

```
// Basics of the keeper logic

if ( checkTopUp returns non-zero ) {
    call performTopUp
}
```

Your off-chain keeper can run on a variety of platforms—from a simple Javascript file, custom backend implementations, to even Gelato Network.&#x20;

### 5. Relax

You no longer have to manually top up your Super Token balances! As long as your wallet remains funded with the underlying token needed to pay out, you'll be good to go.
