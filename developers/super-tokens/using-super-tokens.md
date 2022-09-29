---
description: How to Wrap & Unwrap Existing ERC20 Assets
---

# Frontend Examples

## Wrapping and Unwrapping ERC20 Tokens

You can easily wrap and unwrap ERC20 assets as super tokens using the [Superfluid dashboard](https://app.superfluid.finance/currencies), but you might want to write code to allow your users to do the same in your application. In the below examples, we show you 2 code examples which makes it easy to do this using the [Superfluid SDK-Core](https://www.npmjs.com/package/@superfluid-finance/sdk-core). We’ve used an address that is unlocked and has lots of fake DAI (fDAI) and Super fake DAI (fDAIx) tokens. Feel free to play around and use this code for testing!

{% hint style="info" %}
NOTE: these examples expose a private key which contains some fake tokens, but you DO NOT need to create a signer with a private key to make use of Superfluid. To see an example which uses metamask/a web3 provider, scroll down to the last example
{% endhint %}

### Wrapping (Upgrading) an Existing ERC20 Asset

Enter an amount to approve and upgrade in the form field below in whole dollar amounts. Make sure you 'Click to Approve Token Upgrade' first, and wait a few seconds after the console shows that the transaction has been completed before you 'Click to Upgrade Your Tokens.'

In this example, we need to approve the super token wrapper contract to spend our DAI before we can call `upgrade` .

> **NOTE**: depending on your device, you may need to scroll down in the browser view below to view & click the button to upgrade tokens.

{% embed url="https://codesandbox.io/embed/upgrade-supertokens-kq3l4?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FUpgradeDAI.js&theme=dark&view=split" %}
Call approve first, then upgrade your tokens
{% endembed %}

### Unwrapping (Downgrading) a Super Token to the Underlying Asset

Next, we can choose to unwrap our ERC20 tokens by calling `downgrade` on the super token contract to burn the corresponding super tokens and receive the ERC20 assets back in return.

{% embed url="https://codesandbox.io/embed/downgrade-supertokens-5mk2j?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FDowngradeDAI.js&theme=dark&view=split" %}
Downgrading your super tokens
{% endembed %}

### Upgrading Native Assets

The syntax of working with these assets is a bit different than working with ERC20 Wrapper tokens. There is no underlying ERC20 contract to approve before upgrading, and, like Native Super Tokens, there's no underlying asset address. When upgrading your native assets as Super Tokens, you'll need to call a special function called `upgradeByETH` on the native asset super token contract, and pass in a `msg.value` which represents the amount of the native asset you'd like to upgrade.

In this example, we're working with ETHx on the Kovan testnet, but the syntax is nearly identical when using native assets on other networks. For example, using MATICx on Polygon or Mumbai would also require calling `upgradeByETH` on the contract and passing in the amount you'd like to upgrade as your `msg.value`. The only difference is that you'll need to change the address of ETHx/MATICx in the below example to match the deployed address. You can use the [network directory](../networks.md) for this.

{% embed url="https://codesandbox.io/embed/upgrade-nativeasset-supertoken-y6m4ol?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FUpgradeETH.js&theme=dark&view=split" %}
Upgrading a Native Asset
{% endembed %}
