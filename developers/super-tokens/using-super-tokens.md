---
description: How to Wrap & Unwrap Existing ERC20 Assets
---

# Super Tokens - Frontend Examples

## Wrapping and Unwrapping ERC20 Tokens

You can easily wrap and unwrap ERC20s & native assets as super tokens using the [Superfluid dashboard](https://app.superfluid.finance/currencies), but you might want to write code to allow your users to do the same in your application. In the below examples, we show you 2 code examples which makes it easy to do this using the [Superfluid SDK-Core](https://www.npmjs.com/package/@superfluid-finance/sdk-core). We’ve used an address that is unlocked and has lots of fake DAI (fDAI) and Super fake DAI (fDAIx) tokens. Feel free to play around and use this code for testing!

{% hint style="info" %}
NOTE: these examples require test ether/MATIC and test super tokens. You can get some from our faucet [here](super-token-faucet.md).&#x20;
{% endhint %}

### Super Token Front End Example

Enter an amount to approve and upgrade in the form field below in whole dollar amounts. Make sure you 'Click to Approve Token Upgrade' first, and wait a few seconds after the console shows that the transaction has been completed before you 'Click to Upgrade Your Tokens.'

In this example, we need to `approve` the super token wrapper contract to spend our DAI before we can call `upgrade` .

Next, we can choose to unwrap our ERC20 tokens by calling `downgrade` on the super token contract to burn the corresponding super tokens and receive the ERC20 assets back in return.

> **NOTE**: depending on your device, you may need to scroll down in the browser view below to view & click the button to upgrade tokens.

{% embed url="https://codesandbox.io/embed/supertoken-upgrade-metamask-11qkh0?fontsize=14&hidenavigation=1&module=/src/SuperTokens.js&theme=dark&view=split" %}
