---
description: Super Tokens that Don't Have an Underlying ERC20 Address
---

# Pure Super Tokens

## Pure Super Tokens

A _Pure_ Super Token is a Super Token which does not have an underlying asset or downgraded version of the token. For example, DAI can be wrapped or unwrapped since it is an ERC20 Wrapper Super Token, however, $RIC, the DAO governance token for Ricochet Exchange cannot. $RIC is a super token through & through - it was deployed directly as a Super Token with all of the associated functionality out of the box and does not require wrapping or unwrapping.

Pure Super Tokens are ERC20 compliant, so they can still interact with DeFi protocols and have many of the methods you're used to such as `approve()`and `transferFrom()` for performing discrete transactions. We've already seen several other companies & DAOs launch their tokens as a Pure Super Token, such as Minerva Wallet and Opolis. This means they have all the benefits of Super Tokens, starting from day one.

## Pure Super Token Types

### Pure 'Governed' Super Tokens

The term governed denotes that these tokens are interconnected with Superfluid governance. Upgrades made by Superfluid governance will be reflected in the logic of these contracts, which can serve as a protection mechanism for those deploying these tokens.

### Pure "Independent" Super Tokens

The term "independent" denotes that these tokens are fully separate from Superfluid Protocol Governance. All upgrades are managed solely by the token developers. This type has yet to be created, and we don't recommend it. If you do decide to go down this path, please let us know so we can assist you.

### Choosing a Type

In order for a token to serve as a Super Token in the protocol, it must implement the [ISuperfluidToken](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidToken.sol) interface. To make your life easier, the recommended approach for deploying any type of Super Token is to use an [ERC1822](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1822.md) proxy. This allows the Superfluid Protocol Governance to perform necessary upgrades, which helps to keep the entire Super Token ecosystem secure and up-to-date with the latest features.

However, since the interface is the only strict requirement, you are free to "break-out" and manage your own upgrades for the Super Token logic. This approach is not recommended, but listed here for completeness. Keep in mind that the Superfluid Protocol Governance is used only to upgrade the Super Token logic, not your custom logic.

To reiterate, the two categories for Pure Super Tokens are:

* **Governed** - Super Token logic upgrades managed by Superfluid Protocol Governance
* **Independent** - You are fully responsible for all upgrades

Now that you've determined who will manage upgrades for the _**Super Token logic**_, you must decide how to handle upgrades for your (optional) _**custom logic**._ Examples of custom logic you might want to add are:

* Pre-mint initial supply
* Access control and admin management
* Approve / reject list of wallet addresses

These are all features which are not provided by the Super Token logic, which you would need to add yourself.

### Deploy a Pure Super Token

If you'd like to deploy a Pure Super Token you can use the [PureSuperToken](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/tokens/PureSuperToken.sol) contract 👇

{% embed url="https://github.com/superfluid-finance/CustomSuperTokens" %}
A helpful repo for Custom Super Token deployment
{% endembed %}
