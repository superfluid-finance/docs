---
description: Tokens with super-powers ✨
---

# Super Tokens

Super Tokens come in two flavors: **Super Token** and **Native Super Token**. 

## Native Super Token

A Native Super Token is a Super Token created within the Superfluid protocol, which does not have an underlying or downgraded version of itself. For example, DAI can be upgraded or downgraded since it is a standard Super Token, however the SODA token used in the [🥤Soda Machine](../resources/examples/soda-machine.md) example cannot be downgraded, since it is deployed as a Native Super Token. 

We use the term "native", since these tokens are **born inside the Superfluid protocol**.

![](../.gitbook/assets/native-token%20%281%29.png)

### Native is better

A Native Super Token reduces the cognitive load for your users, and **simplifies development**. One token is better than two, since there's no need for multiple tokens to serve the same purpose. 

A Native token is still ERC777 and ERC20 compliant, so it can still interact with all your favorite Defi protocols. We haven't tested every use-case yet, so if you find something doesn't work we'd love to hear about it!

We've already seen several companies launch their tokens as a Native Super Tokens, such as Minerva Wallet and Opolis. This means they have all the benefits of Super Tokens starting from day one.

### Deploy a Native Super Token

If you'd like to deploy a Native Super Token you can use the [NativeSuperToken.sol](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/tokens/NativeSuperToken.sol) contract and accompanying [script](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/scripts/deploy-native-supertoken.js). Also check out the [🥤Soda Machine](../resources/examples/soda-machine.md) for an easy example of a Native Super Token embedded inside a Super App 🤯

## Super Token

A Super Token is a token that is upgraded to enable Superfluid super-powers. Before it can be upgraded, a Super Token wrapper contract must be deployed.

### Deploy a Super Token

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

**Dont forget!** If you are wrapping an existing token, like DAI or USDC, please use suffix `x` in the SuperToken symbol. If you need a refresher on naming conventions, see the [🦸‍♀️ Super Tokens](../protocol-tutorials/super-tokens.md) tutorial.  

## List Your Token in the Dashboard

In order for your token to appear in the Superfluid Dashboard, you can complete this [form](https://www.notion.so/Add-New-Tokens-to-Superfluid-8464f8c116c24cd6a0c5cb4f4174bb2d).

