---
description: Tokens with super-powers ✨
---

# Super Tokens

Super Tokens are one of the 3 main primitives of the Superfluid Protocol. Here's a list of the super-powers that all Super Tokens enjoy:

* **ERC777 -** can "react" to certain events using callbacks \([erc777.org](https://www.erc777.org/)\)
* **Batch call -** can do multiple things in a single transaction
* **Meta-transactions** - allow for submitting transactions on behalf of another account

## Varieties

All Super Tokens share the same basic features, however not all Super Tokens are alike. Super Tokens come in two primary types: 

* **ERC20 Wrapper** Super Token
* **Custom** Super Token

Choosing the type you need is easy, since an existing ERC20 token should use the ERC20 Wrapper.

![](../.gitbook/assets/image%20%2814%29.png)

## ERC20 Wrapper Super Token

This is the simplest option, and should be used whenever an ERC20 token already exists. Anyone can create a wrapper for any existing ERC20 token. The developer community has already deployed some of the more popular defi tokens like DAI, USDC, and TUSD for you. See [🔗 Network Directory](../networks/networks.md) for the full list.

The main step for creating a new ERC20 Wrapper for your token is calling `createERC20Wrapper()` on the [SuperTokenFactory](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/superfluid/SuperTokenFactory.sol) contract.

### Deploy an ERC20 Wrapper

Anyone can deploy the ERC20 wrapper for any ERC20 token. The deployer account does not receive any control or admin powers, and all Super Token logic upgrades are handled by Superfluid Protocol Governance. 

We've created some handy scripts for deploying the ERC20 Wrapper contract.

```bash
git clone https://github.com/superfluid-finance/protocol-monorepo/
yarn install --frozen-lockfile
yarn build
cd packages/ethereum-contracts
cp .env.template .env

# edit .env file and configure the correct mnemonic and rpc endpoint
# check truffle-config.js for what environment variables are required
```

Now you can use the `deploy-unlisted-super-token.js` script to deploy the wrapper:

```bash
RELEASE_VERSION=v1 npx truffle --network <xdai or matic> \
exec scripts/deploy-unlisted-super-token.js : \
<Underlying Token Address> \
<SuperToken Name> \
<SuperToken Symbol>
```

**Dont forget!** If you are wrapping an existing token, like DAI or USDC, please use suffix "x" in the SuperToken symbol. If you need a refresher on naming conventions, see the tutorial section on[🦸‍♀️ Super Tokens](../protocol-tutorials/super-tokens.md).  

## Custom Super Token

A Custom Super Token is a Super Token which typically does not have an underlying asset or downgraded version of the token. For example, DAI can be upgraded or downgraded since it is an ERC20 Wrapper Super Token, however the SODA token used in the [🥤Soda Machine](../resources/examples/soda-machine.md) example cannot be downgraded, since it is a Custom Super Token. 

![](../.gitbook/assets/image%20%2826%29.png)

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

In order for a token to serve as a Super Token in the protocol, it must implement the [ISuperfluidToken](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidToken.sol) ****interface. To make your life easier, the recommended approach for deploying any type of Super Token is to use an ERC1822 proxy. This allows the Superfluid Protocol Governance to perform necessary upgrades, which helps to keep the entire Super Token ecosystem secure and up-to-date with the latest features. 

However, since the interface is the only strict requirement, you are free to "break-out" and manage your own upgrades for the Super Token logic. This approach is not recommended, but listed here for completeness. Keep in mind that the Superfluid Protocol Governance is used only to upgrade the Super Token logic, not your custom logic.

To reiterate, the two categories for Custom Super Tokens are:

* **Native** - Super Token logic upgrades managed by Superfluid Protocol Governance
* **Independent** - You are fully responsible for all upgrades

Now that you've determined who will manage upgrades for the _**Super Token logic**_, you must decide how to handle upgrades for your \(optional\) _**custom logic**._ Examples of custom logic you might want to add are:

* Pre-mint initial supply
* Access control and admin management
* Approve / reject list of wallet addresses

These are all features which are not provided by the Super Token logic, which you would need to add yourself. 

You can use this chart to help you decide which approach to take:

![](../.gitbook/assets/image%20%2829%29.png)

### Deploy a Custom Super Token

If you'd like to deploy a Custom Super Token you can use the [NativeSuperToken.sol](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/tokens/NativeSuperToken.sol) contract and the [deployment script](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/scripts/deploy-native-super-token.js). Also check out the [🥤Soda Machine](../resources/examples/soda-machine.md) for an example of a Native Super Token deployed with a Super App. We will add documenation as more community members deploy Custom Super Tokens.

## Edge-case Super Tokens

There are a couple scenarios when a Super Token might fall in-between an ERC20 Wrapper and a Custom Super Token. The best example of this is [Superfluid ETH](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/tokens/SETH.sol), or SETH. This is a Super Token for the native chain token \(gas token\) ETH. Since ETH is not an ERC20 token, we cannot use the ERC20 Wrapper. It's also a bit different than a typical Custom Super Tokens, since it still has an underlying asset, and can perform upgrades and downgrades. 

If we're being technical about it, SETH would ultimately be considered a Custom Super Token. Are there any other edge-cases you can think of? Let us know!

## List Your Token in the Dashboard

In order for your token to appear in the Superfluid Dashboard, you can complete this [form](https://www.notion.so/Add-New-Tokens-to-Superfluid-8464f8c116c24cd6a0c5cb4f4174bb2d).

