---
description: Tokens with super-powers ✨
---

# 🪙 Super Tokens

Super Tokens are one of the 3 main primitives of the Superfluid Protocol. Here's a list of the super-powers that all Super Tokens enjoy:

* **ERC777 -** can "react" to certain events using callbacks ([erc777.org](https://www.erc777.org))
* **Batch call -** can do multiple things in a single transaction
* **Meta-transactions** - allow for submitting transactions on behalf of another account

## Varieties

All Super Tokens share the same basic features, however not all Super Tokens are alike. Super Tokens come in two primary types:

* **ERC20 Wrapper** Super Token
* **Custom** Super Token

Choosing the type you need is easy, since an existing ERC20 token should use the ERC20 Wrapper.

![](<../../.gitbook/assets/image (26).png>)

### List Your Token in the Dashboard

In order for your token to appear in the Superfluid Dashboard, you can complete this [form](https://www.notion.so/Add-New-Tokens-to-Superfluid-8464f8c116c24cd6a0c5cb4f4174bb2d).

## Working with Super Tokens

As Super Tokens are ERC20, they are, generally speaking, backward compatible with the Ethereum infrastructure and ecosystem. You can see your balance in Metamask, transfer funds using Gnosis Safe / swap Super Tokens on Uniswap. Forward compatibility is a bit trickier. Gnosis Safe and Metamask are able to display your balance correctly when you are receiving streams, but that doesn't mean you can "stream-swap" on Uniswap!

#### Tracking events

Some applications (notably Etherscan) rely on `transfer` \_\_ events to first start tracking a user's balance. For scalability reasons however, agreements can't emit `transfer` events every time a user's balance changes. This leads to certain apps not showing all of a SuperToken's holders, and on occasion showing incorrect balances.

In order to work around this, applications looking to support Super Tokens should look not only to `transfer` events, but also to Superfluid's `AgreementStateUpdated` event. This is triggered every time an account's state changes, which is likely to indicate a future change in their balance.

Once you know you need to track an account, the best way to get an up to date balance is by calling the `balanceOf` function. As you know by now, Superfluid enables a number of new ways to move funds. Only tracking transfers won't cut it!
