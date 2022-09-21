---
description: Select the methodology used to top up your Super Token balance
---

# Strategies

### What's a Strategy

When you create a Top Up, you specify a Super Token, Strategy, and Liquidity Token:

![](<../../../.gitbook/assets/image (9).png>)

A Strategy is a separately deployed contract that's called upon by the Auto Top Up Manager contract for top ups using its own `topUp` function.

When a top up is called, the Strategy you chose (passed in with `_strategy`) pulls liquidity tokens from your wallet and converts them into the targeted Super Token by whatever methodology it sets.

`topUp()` is only callable by Auto Top Up Manager.

<figure><img src="../../../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

## **Existing Strategies**

### **ERC20StrollOut Strategy**

**Address**: 0x88271d333c72e51516b67f5567c728e702b3eee8

The most basic strategy that simply auto-wraps your tokens into Super Tokens.&#x20;

When you call `createTopUp()` on ERC20StrollOutStrategy, `_liquidityToken` would be the underlying token of the `_superToken` you provided (e.g. DAI for DAIx).

When a top up is called, `_liquidityToken` is pulled from your wallet, wrapped into `_superToken` and returned to your wallet.

![](<../../../.gitbook/assets/image (2).png>)
