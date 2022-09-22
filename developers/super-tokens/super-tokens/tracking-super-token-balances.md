---
description: >-
  Super Token balances can change every second! How do we approach tracking
  them?
---

# Tracking Super Token Balances

## Compatibility

As Super Tokens are ERC20, they are, generally speaking, backward compatible with the Ethereum infrastructure and ecosystem. You can see your balance in Metamask, transfer funds using Gnosis Safe / swap Super Tokens on Uniswap. Forward compatibility is a bit trickier. Gnosis Safe and Metamask are able to display your balance correctly when you are receiving streams, but that doesn't mean you can "stream-swap" on Uniswap! (at least not yet anyways 😉).

## Balance Tracking Considerations

Some applications (notably Etherscan) rely on `transfer` \_\_ events to first start tracking a user's balance. For scalability reasons however, agreements can't emit `transfer` events every time a user's balance changes. This leads to certain apps not showing all of a SuperToken's holders, and on occasion showing incorrect balances.

In order to work around this, applications looking to support Super Tokens should look not only to `transfer` events, but also to Superfluid's `AgreementStateUpdated` event. This is triggered every time an account's state changes, which is likely to indicate a future change in their balance.

Once you know you need to track an account, the best way to get an up to date balance is by calling the `balanceOf` function. As you know by now, Superfluid enables a number of new ways to move funds. Only tracking transfers won't cut it!

An excellent open source tool for checking user balances in real time is the [Superfluid Console](https://console.superfluid.finance). We suggest leveraging it for your own usage in the protocol:

{% embed url="https://console.superfluid.finance" %}
