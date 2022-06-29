---
description: Tokens with super-powers ✨
---

# 🪙 Super Tokens In-Depth

Super Tokens are one of the 3 main primitives of the Superfluid Protocol. Here's a list of the super-powers that all Super Tokens enjoy:

* **Money Streaming**
* Usage in the Superfluid **Instant Distribution Agreement**
* **Batch Calls -** can facilitate multiple operations in a single transaction
* **Automation** via optional ERC777 callbacks ([erc777.org](https://www.erc777.org))
* **Meta-transactions** - allow for submitting transactions on behalf of another account

## Varieties

All Super Tokens share the same basic features, however not all Super Tokens are alike. Super Tokens come in three primary types:

* [**ERC20 Wrapper**](erc20-wrapper-tokens.md) **Super Tokens**
* [**Pure**](pure-super-tokens.md) **Super Tokens**
* [**Native Asset**](native-asset-super-tokens.md) **Super Tokens**

## List Your Token in the Superfluid Dashboard

In order for your token to appear in the [Superfluid Dashboard](https://app.superfluid.finance), head over [here](https://docs.superfluid.finance/superfluid/resources/token-dashboard-submission).

## Working with Super Tokens

As Super Tokens are ERC20, they are, generally speaking, backward compatible with the Ethereum infrastructure and ecosystem. You can see your balance in Metamask, transfer funds using Gnosis Safe / swap Super Tokens on Uniswap. Forward compatibility is a bit trickier. Gnosis Safe and Metamask are able to display your balance correctly when you are receiving streams, but that doesn't mean you can "stream-swap" on Uniswap! (at least not yet anyways 😉).

#### Tracking events

Some applications (notably Etherscan) rely on `transfer` \_\_ events to first start tracking a user's balance. For scalability reasons however, agreements can't emit `transfer` events every time a user's balance changes. This leads to certain apps not showing all of a SuperToken's holders, and on occasion showing incorrect balances.

In order to work around this, applications looking to support Super Tokens should look not only to `transfer` events, but also to Superfluid's `AgreementStateUpdated` event. This is triggered every time an account's state changes, which is likely to indicate a future change in their balance.

Once you know you need to track an account, the best way to get an up to date balance is by calling the `balanceOf` function. As you know by now, Superfluid enables a number of new ways to move funds. Only tracking transfers won't cut it!

An excellent open source tool for checking user balances in real time is the [Superfluid Console](https://console.superfluid.finance). We suggest leveraging it for your own usage in the protocol:

{% embed url="https://console.superfluid.finance" %}
The Superfluid Console
{% endembed %}
