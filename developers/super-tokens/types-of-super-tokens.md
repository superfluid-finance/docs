---
description: Wrapper, Pure, Native
---

# Types of Super Tokens

## 1. Wrapper Super Tokens

Wrapper Super Tokens are the most common Super Tokens. They are deployed whenever an ERC20 token already exists to create an equivalent Super Token version that has Super Agreement capabilities - like money streaming!

Anyone can permissionlessly create a wrapper for any existing ERC20 token. Wrappers for many popular tokens like DAI, USDC, and WETH have been deployed on the various chains we support. Check out the[ Network Directory](../networks.md) for the full list.

### **Wrapping & Unwrapping**

When getting wrapper Super Tokens, you first deposit the underlying tokens into its Wrapper Super Token contract after which you are minted an equal quantity of wrapper Super Tokens. Basically, you gave up the plain underlying token and got the "Super Token version" of it.&#x20;

To unwrap, the opposite happens; a desired amount of Super Tokens are burned and an equal amount of the underlying token is returned.

<figure><img src="../../.gitbook/assets/image (1) (1).png" alt=""><figcaption></figcaption></figure>

### Custom Wrapper Super Tokens

Custom Wrapper Super Tokens incorporate additional logic on the wrapper contract beyond the standard wrap/unwrap. They typically are used when the underlying ERC20 token has advanced logic that would get stifled by a standard Wrapper Super Token.&#x20;

The only example of this would be the [StIbAlluo token](https://docs.alluo.com/alluo-explained/tokens-and-tokenomics/tech-deep-dive-interest-bearing-asset-token/stiballuo-and-superfluid) by Alluo which serves as a Custom Wrapper Super Token for the complex interest-bearing IbAlluo token. Designing a Custom Wrapper is a different challenge case-by-case, so if you decide it is best for you, please let us know over [#dev-support](https://discord.gg/MAqnDhJMVM) so we can assist you.

## 2. Pure Super Tokens

Pure Super Tokens don't have an underlying token. They exist only as Super Tokens so there's no wrapping or unwrapping required. Pure Super Tokens are deployed directly as Super Tokens with all of the associated Superfluid functionality out of the box. These tokens inherently have all the functionality of a basic ERC20 token plus Superfluid's Super Agreement abilities.

### Customization

You may want to give your Pure Super Tokens other kinds of non-Superfluid functionalities such as...&#x20;

* Pre-mint initial supply
* Access control and admin management
* Wallet whitelisting
* ...the list goes on

All this logic can be programmed into your Pure Super Token just as you would add your own custom logic to an ERC20.

### Governed vs Independent

"Governed" Pure Super Tokens are connected with Superfluid Protocol Governance such that when upgrades are implemented, they immediately reflect the new logic. **We encourage Pure Super Tokens be deployed as governed**.

"Independent" Pure Super Tokens are fully separate from Superfluid Protocol Governance (you can think of them as "jailbroken" Super Tokens). All upgrades are managed solely by the token developers. This type is not recommended it but if you do decide it is best for you, please let us know over [#dev-support](https://discord.gg/MAqnDhJMVM) so we can assist you.

## 3. Native Super Tokens

A native asset super token is similar to an Wrapper Super Token in that the contract itself is a wrapper around an existing asset. Native Super Token contracts allow you to deposit a native asset, such as ETH, MATIC, and AVAX into the contract, and receive a corresponding amount of the wrapped native asset in return (e.g. [MATICx](https://polygonscan.com/address/0x3aD736904E9e65189c3000c7DD2c8AC8bB7cD4e3) for MATIC).&#x20;

Native Super Tokens have canonical deployments for each chain Superfluid deploys on. You can find the addresses in [Contract Addresses](../networks.md).
