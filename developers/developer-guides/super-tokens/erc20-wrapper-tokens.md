---
description: Super Tokens that Exist as Wrappers Around ERC20 Assets
---

# ERC20 Wrapper Tokens

## ERC20 Wrapper Super Tokens

This is the simplest version of a Super Token, and should be used whenever an ERC20 token already exists. Anyone can create a wrapper for any existing ERC20 token. The developer community has already deployed some of the more popular tokens in the ecosystem like DAI, USDC, and TUSD for you. See [🔗 Network Directory](../../networks/) for the full list.

### What is a Wrapper Super Token?

These tokens allow you to use existing ERC20 assets within the Superfluid protocol. These contracts inherit from the [ISuperfluidToken](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidToken.sol) interface and serve as an extension on the ERC20 standard. You can't stream existing ERC20 tokens directly, but wrapping these assets using an ERC20 Wrapper contract will give your existing ERC20 assets super powers. Super Tokens can be streamed and used within other Superfluid agreements because they contain Superfluid specific methods like the `realTimeBalanceOf()` function and are directly plugged into the rest of the protocol.

The main step for creating a new ERC20 Wrapper for your token is calling `createERC20Wrapper()` on the [SuperTokenFactory](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/superfluid/SuperTokenFactory.sol) contract.

### Create ERC20 Wrapper Tokens from a Block Explorer

1. Go to the Superfluid [**Network Directory**](https://docs.superfluid.finance/superfluid/networks/networks) and search for the token explorer in the right network.
2. Click on the "SuperTokenFactory" for your preferred network
3. Navigate the tabs to Contract > WriteAsProxy. Here are **direct links for** [**Polygon**](https://polygonscan.com/address/0x2C90719f25B10Fc5646c82DA3240C76Fa5BcCF34#writeProxyContract)**,** [**Gnosis Chain**](https://blockscout.com/xdai/mainnet/address/0x23410e2659380784498509698ed70E414D384880/write-contract)**,** [**Optimism**](https://optimistic.etherscan.io/address/0x8276469a443d5c6b7146bed45e2abcad3b6adad9#writeProxyContract)**,** [**Arbitrum**](https://arbiscan.io/address/0x1C21Ead77fd45C84a4c916Db7A6635D0C6FF09D6)**, and** [**BNB Smart Chain**](https://www.bscscan.com/address/0x8bde47397301f0cd31b9000032fd517a39c946eb#writeProxyContract)**.**
4. Connect your wallet to be able to write
5. Search for the `createERC20Wrapper` function, and input the required parameters, with **no additional characters**
   1. underlyingToken (address) ⇒ The `address` of the token you want to wrap
   2. upgradeability (uint8) ⇒ `1` will give the Superfluid Governance semi-upgradeability
   3. name (string) ⇒ `Super` + the current name of your token (ex. `Super Dog Token`)
   4. symbol (string) ⇒ The current symbol in upper case + lower case `x` (ex. `DOGx`)
6. Confirm by pressing `write` and confirming through your wallet. Congrats, you've created a new Super Token Wrapper!
7. Search for the new token's address in the event log of the transaction, or use the top right search tab (input `DOGx` and wait for your newly created token to appear in the dropdown)

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

If you are wrapping an existing token, like DAI or USDC, please use suffix "x" in the SuperToken symbol.
