---
description: Super Tokens that Are Wrappers Around Native Assets
---

# Native Asset Super Tokens

## Superfluid Native Assets

A native asset super token is similar to an ERC20 Wrapper token in that the contract itself is a wrapper around an existing asset. Native asset super token contracts allow you to deposit a native asset, such as ETH, MATIC, and AVAX into the contract, and receive a corresponding amount of the wrapped native asset in return (i.e. ETHx, [MATICx](https://polygonscan.com/address/0x3aD736904E9e65189c3000c7DD2c8AC8bB7cD4e3), and AVAXx).

### The SETH Interface

The most commonly used interface for native asset super token contracts is `ISETH.sol,` which can be found here:

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/interfaces/tokens/ISETH.sol" %}
The ISETH.sol interface has been used in a community deployment of [MATICx](https://polygonscan.com/address/0x3aD736904E9e65189c3000c7DD2c8AC8bB7cD4e3) and other native asset super tokens
{% endembed %}

In essence, the `SETH.sol` contract has a payable function called `upgradeByETH()` which takes no parameters but is expected to receive some nonzero `msg.value` when it's called. This function will mint a number of native asset super tokens that is equivalent to the total amount of the `msg.value` sent along with the function call. Calling `downgradeToETH()` and passing in the amount of the native asset super token you'd like to downgrade will burn native asset super tokens and send you back that amount of the underlying asset.

Native asset super tokens are deployed by the Superfluid community after the protocol is deployed on various networks. They're usually one of the first tokens deployed by community members, but if you'd like to deploy your own native asset super token, we suggest starting with the same logic found in the `SETH` contract!
