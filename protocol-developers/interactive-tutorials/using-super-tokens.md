---
description: How to Wrap & Unwrap Existing ERC20 Assets
---

# 🪙 Using Super Tokens

## Working With Super Tokens

We’ve already gone through the process of creating [money streams ](money-streaming-1.md)and working with the [instant distribution agreement](instant-distribution.md). Now it’s time to show you how to interact with super tokens.

In order to make use of agreements inside of the Superfluid protocol, you’ll need to have super tokens in your wallet. Broadly speaking, there are 2 types of super tokens:

1. Super tokens that are a wrapper around existing ERC20 tokens.&#x20;
2. Native Super Tokens

You can learn more about the details of super tokens in [our guide on the topic](../super-tokens/), but the main thing to understand is that they have special properties which allow them to be streamed per second using the [Constant Flow Agreement](money-streaming-1.md) or distributed to many accounts using the [Instant Distribution Agreement.](instant-distribution.md)

### Wrapped ERC20 Tokens

Because interoperability is a core tenant of DeFi & web3 more broadly, our team wrote a special kind of super token contract that can serve as a wrapper around existing ERC20 assets. This contract allows you to easily wrap & unwrap your existing ERC20 tokens.&#x20;

To wrap your existing ERC20 tokens, you need to first approve the Super Token wrapper contract to spend your ERC20 tokens (using the ERC20 `approve` function that you've likely seen elsewhere), then call `upgrade` on the super token wrapper contract. This will lock a defined amount of ERC20 tokens inside of the Super token contract, and mint you a corresponding amount of super tokens in return.

If/when you decide to unwrap those tokens in exchange for your underlying ERC20 asset, you can call `downgrade` on the Super Token wrapper contract. This will send you the defined amount of your ERC20 asset back, and burn your corresponding Super Tokens. These wrapped assets are denominated by the Superfluid community by appending an 'x' to the end of the wrapped ERC20 asset's symbol. For example, if you wrap DAI, the newly minted super token DAI will be labeled _DAIx_.

> **NOTE**: we have a list of super tokens which were deployed by the Superfluid community as ERC20 wrapper contracts inside of the [Network Directory](../networks/). If you want to work with an ERC20 asset not listed in the directory, you can learn more about deploying your own ERC20 wrapper contract [here](../super-tokens/#erc20-wrapper-super-token).&#x20;

### Native Super Tokens

Each Super Token that is deployed as a wrapper around an ERC20 token will have an underlying asset, which is the original ERC20 asset being used. However, in the case of Native Super Tokens, there is no underlying asset. These tokens are deployed directly as Super Tokens, and don’t need to be upgraded or downgraded. They inherit all of the functionality of ERC20 and ERC777 tokens (i.e. approve, transfer, transferFrom, etc), but also have the capability of being used directly within the Superfluid protocol.&#x20;

Some examples of native super tokens include Ricochet Exchange's [**RIC** token](https://docs.ricochet.exchange/business/usdric) and Minerva Wallet's [**MIVA** token](https://minerva.digital). You can learn more about deploying your own native super token as well as creating your own _custom_ super tokens [here](../super-tokens/).

### Native Asset Super Tokens

In addition to Native Super Tokens and ERC20 Wrapped Super Tokens, you can also use native assets within the protocol. There are instances of ETHx and MATICx deployed on both testnets and mainnets, and you can use them within your applications. You'll see an example of this below.

### Calling Upgrade & Downgrade to Wrap & Unwrap ERC20 Tokens

You can easily wrap & unwrap ERC20 assets as super tokens using the [Superfluid dashboard](https://app.superfluid.finance/currencies), but you might want to write code to allow your users to do the same in your application. In the below examples, we show you 2 code examples which makes it easy to do this using the [Superfluid SDK-Core](https://www.npmjs.com/package/@superfluid-finance/sdk-core). We’ve used an address that is unlocked & has lots of test DAI (fDAI) and DAIx (fDAIx) tokens. Feel free to play around & use this code for testing!

### Upgrading an Existing ERC20 Asset

Enter an amount to approve & upgrade in the form field below in whole dollar amounts. Make sure you 'Click to Approve Token Upgrade' first, and wait a few seconds after the console shows that the transaction has been completed before you 'Click to Upgrade Your Tokens.'&#x20;

In this example, we need to approve the super token wrapper contract to spend our DAI before we can call `upgrade` .

> **NOTE**: depending on your device, you may need to scroll down in the browser view below to view & click the button to upgrade tokens.

{% embed url="https://codesandbox.io/embed/upgrade-supertokens-kq3l4?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FUpgradeDAI.js&theme=dark&view=split" %}
Call approve first, then upgrade your tokens
{% endembed %}

### Downgrading a Super Token to the Underlying Asset

Next, we can choose to unwrap our ERC20 tokens by calling `downgrade` on the super token contract to burn the corresponding super tokens and receive the ERC20 assets back in return.

{% embed url="https://codesandbox.io/embed/downgrade-supertokens-5mk2j?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FDowngradeDAI.js&theme=dark&view=split" %}
Downgrading your super tokens
{% endembed %}

### Upgrading Native Assets

The syntax of working with these assets is a bit different than working with ERC20 Wrapper tokens. There is no underlying ERC20 contract to approve before upgrading, and, like Native Super Tokens, there's no underlying asset address. When upgrading your native assets as Super Tokens, you'll need to call a special function called `upgradeByETH` on the native asset super token contract, and pass in a `msg.value` which represents the amount of the native asset you'd like to upgrade.&#x20;

In this example, we're working with ETHx on the Kovan testnet, but the syntax is nearly identical when using native assets on other networks. For example, using MATICx on Polygon or Mumbai would also require calling `upgradeByETH` on the contract and passing in the amount you'd like to upgrade as your `msg.value`. The only difference is that you'll need to change the address of ETHx/MATICx in the below example to match the deployed address. You can use the [network directory](../networks/) for this.

{% embed url="https://codesandbox.io/embed/upgrade-nativeasset-supertoken-y6m4ol?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FUpgradeETH.js&theme=dark&view=split" %}
Upgrading a Native Asset
{% endembed %}
