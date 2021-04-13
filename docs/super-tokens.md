---
description: Tokens with super-powers ✨
---

# Super Tokens

🚧 Section Under Construction. Updates coming soon 🚧 

Super Tokens come in two different types: 

* **ERC20 Wrapper Super Token**
* **Custom** **Super Token**

Both types receive all the same benefits of Super Tokens. Choosing which primary type is easy, since existing tokens must use the ERC20 Wrapper.

![](../.gitbook/assets/image%20%2825%29.png)

## ERC20 Wrapper Super Token

This is the simplest option, and should be used whenever an ERC20 token already exists. Anyone can create a wrapper for any existing ERC20 token. We've already deployed some of the more popular defi tokens like DAI, USDC, and TUSD for you. See [🔗 Network Directory](../networks/networks.md) for the full list.

The main step for creating a new ERC20 Wrapper for your token is calling `createERC20Wrapper()` on the [SuperTokenFactory](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/superfluid/SuperTokenFactory.sol) contract. There are scripts in `@superfluid-finaince/ethereum-contracts` to assist in this process \(explained below\).

If a ERC20 token doesn't already exist, then the best option is to create a **Custom** **Super Token.** 

### Deploy an ERC20 Wrapper

We've created some handy scripts for deploying the Super Token wrapper contract for existing ERC20 tokens. Anyone can deploy the wrapper for any token, since the deployer does not receive any control or admin powers.

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

There are a few different decisions to be made when deploying a Custom Super Token. This guide will help you in deciding which approach is best. 

In order for a token to serve as a Super Token in the protocol, it must implement the [ISuperfluidToken](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidToken.sol) ****interface. In order to make your life easier, we recommend using an ERC1822 proxy for deploying any type of Super Token. This allows the Superfluid Protocol Governance to perform necessary upgrades, which helps to keep the entire Super Token ecosystem secure and up-to-date with the latest features. 

However, since the interface is the only strict requirement, you are free to "break-out" and manage your own upgrades for the Super Token logic. This approach is not recommended, but listed here for completeness. Keep in mind that the Superfluid governance is only making decisions about the Super Token Logic, not any custom logic you define \(discussed below\).

There are two primary categories for Custom Super Tokens:

* **Native** - Super Token upgrades are managed by Superfluid governance
* **Independent** - You are fully responsible for all upgrades

Now that you've determined who will manage upgrades for the _**Super Token logic**_, you must decide how to handle upgrades for any _**custom logic**._ Examples of custom logic include:

* Token pre-mine
* Access control and admin management
* Approve / reject list for wallet addresses

You may not need custom logic for your token, which is completely fine. Use this chart for making your decision:

![](../.gitbook/assets/image%20%2826%29.png)

### Custom "Native" Super Token

A Native Super Token is a Super Token created within the Superfluid protocol, which does not have an underlying or downgraded version of itself. For example, DAI can be upgraded or downgraded since it is a standard Super Token, however the SODA token used in the [🥤Soda Machine](../resources/examples/soda-machine.md) example cannot be downgraded, since it is deployed as a Native Super Token. 

We use the term "native", since these tokens are **born inside the Superfluid protocol**.

![](../.gitbook/assets/native-token%20%281%29.png)

### Native is better

A Native Super Token reduces the cognitive load for your users, and **simplifies development**. One token is better than two, since there's no need for multiple tokens to serve the same purpose. 

A Native token is still ERC777 and ERC20 compliant, so it can still interact with all your favorite Defi protocols. We haven't tested every use-case yet, so if you find something doesn't work we'd love to hear about it!

We've already seen several companies launch their tokens as a Native Super Tokens, such as Minerva Wallet and Opolis. This means they have all the benefits of Super Tokens starting from day one.

### Deploy a Native Super Token

If you'd like to deploy a Native Super Token you can use the [NativeSuperToken.sol](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/tokens/NativeSuperToken.sol) contract and the [deployment script](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/scripts/deploy-native-supertoken.js). Also check out the [🥤Soda Machine](../resources/examples/soda-machine.md) for an easy example of a Native Super Token embedded inside a Super App 🤯

## List Your Token in the Dashboard

In order for your token to appear in the Superfluid Dashboard, you can complete this [form](https://www.notion.so/Add-New-Tokens-to-Superfluid-8464f8c116c24cd6a0c5cb4f4174bb2d).

