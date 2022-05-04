---
description: Super Tokens that Don't Have an Underlying ERC20 Address
---

# 💎 Custom Super Tokens

## Custom Super Token

A Custom Super Token is a Super Token which typically does not have an underlying asset or downgraded version of the token. For example, DAI can be upgraded or downgraded since it is an ERC20 Wrapper Super Token, however the SODA token used in the [🥤Soda Machine](broken-reference) example cannot be downgraded, since it is a Custom Super Token.

![](<../../.gitbook/assets/image (26) (1).png>)

Custom Super Tokens are ERC777 and ERC20 compliant, so they can still interact with all your favorite Defi protocols. We haven't tested every use-case yet, so if you find something doesn't work we'd love to hear about it!

We've already seen several companies launch their tokens as a Custom Super Token, such as Minerva Wallet and Opolis. This means they have all the benefits of Super Tokens starting from day one.

We'll explain the differences and how to choose a Custom Super Token type later. First, lets learn about each type.

### Custom "Native" Super Token

We use the term "native", since these tokens are **born inside the Superfluid protocol**. A Native Super Token reduces the cognitive load for your users, and **simplifies development**. After all, one token is better than two if they are serving the exact same purpose.

Native Super Tokens also have the benefit of having all Super Token logic upgrades handled by the Superfluid Protocol Governance.

### Custom "Independent" Super Token

The term "independent" denotes that these tokens are fully separate from Superfluid Protocol Governance. All upgrades are managed solely by the token developers. This type hasn't been created before, and we don't recommend it. If you do decide to go down this path, please let us know so we can assist you.

### Choosing a Type

This guide will help you in deciding which approach is best.

In order for a token to serve as a Super Token in the protocol, it must implement the [ISuperfluidToken](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidToken.sol) interface. To make your life easier, the recommended approach for deploying any type of Super Token is to use an [ERC1822](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1822.md) proxy. This allows the Superfluid Protocol Governance to perform necessary upgrades, which helps to keep the entire Super Token ecosystem secure and up-to-date with the latest features.

However, since the interface is the only strict requirement, you are free to "break-out" and manage your own upgrades for the Super Token logic. This approach is not recommended, but listed here for completeness. Keep in mind that the Superfluid Protocol Governance is used only to upgrade the Super Token logic, not your custom logic.

To reiterate, the two categories for Custom Super Tokens are:

* **Native** - Super Token logic upgrades managed by Superfluid Protocol Governance
* **Independent** - You are fully responsible for all upgrades

Now that you've determined who will manage upgrades for the _**Super Token logic**_, you must decide how to handle upgrades for your (optional) _**custom logic**._ Examples of custom logic you might want to add are:

* Pre-mint initial supply
* Access control and admin management
* Approve / reject list of wallet addresses

These are all features which are not provided by the Super Token logic, which you would need to add yourself.

You can use this chart to help you decide which approach to take:

![](<../../.gitbook/assets/image (25).png>)

### Super Token Edge-case type

There are a couple scenarios when a Super Token might fall in-between an ERC20 Wrapper and a Custom Super Token. The best example of this is [Superfluid ETH](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/tokens/SETH.sol), or SETH. This is a Super Token for the native chain token (gas token) ETH. Since ETH is not an ERC20 token, we cannot use the ERC20 Wrapper. It's also a bit different than a typical Custom Super Tokens, since it still has an underlying asset, and can perform upgrades and downgrades.

If we're being technical about it, SETH would ultimately be considered a Custom Super Token. Are there any other edge-cases you can think of? Let us know!

### Deploy a Custom Super Token

If you'd like to deploy a Custom Super Token you can use the [NativeSuperToken.sol](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/tokens/NativeSuperToken.sol) contract and the[ deployment script](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/scripts/deploy-super-token.js). We'd also highly recommend using the following repo as a resource for your deployment, as it contains many flavors of custom tokens and deploy scripts for each:

{% embed url="https://github.com/superfluid-finance/CustomSuperTokens" %}
A helpful repo for Custom Super Token deployment
{% endembed %}

