---
description: How Superfluid gives the WORK token super-powers
---

# $WORK Super Token

> **UPDATE 5/10/21**: We are actively working on verifying the source-code on Blockscout for the WORK Super Token on xDAI. Due to the nature of proxies, verification tooling is not very straight-forward. We appreciate your patience.

The WORK token is an **ERC20 Wrapper Super Token**. This means there is an underlying ERC20 token, which is called _protoWORK_. The protoWORK is wrapped_  _or "upgraded" to enable Super Token features like streaming, batch calls, and Super App interactivity. 

The ERC20 wrapper contract works similarly to most token wrappers. When protoWORK tokens are sent to the contract using the **upgrade** function, new WORK tokens are minted for the sender. In reverse, **downgraded** WORK tokens are burned, and protoWORK are returned to the sender.

![](<../.gitbook/assets/image (28).png>)

### Do I need to upgrade/downgrade my WORK?

Probably not. Super Tokens are fully ERC20 and ERC777 compatible, so it should work in any ERC20-compatible defi protocol (most of them are). However, defi is innovating at a very rapid pace, so there's no way we can test every single new lending/staking/farming protocol released. If you're unsure, feel free to ask us in the [Discord](http://discord.superfluid.finance) for help. Or better yet, be a pioneer and "test on mainnet", then let the community know what you find!

:people_with_bunny_ears_partying: TLDR: Stick to using WORK. **There's no need to have multiple pairs for the same token (protoWORK & WORK) on every marketplace**. This just makes things more confusing for everyone. protoWork is really just a tool reserved for the Opolis governance and administration.

### Do all Super Tokens work this way?

The other main type of Super Token is called a Custom Super Token. These do not have an underlying asset, and therefore cannot be upgraded or downgraded. They are deployed as Super Tokens right from the start. The advantage of Custom Super Tokens is the ability to add custom logic, which is not possible with ERC20 Wrapper Super Tokens such as WORK.

### Show me the contracts!

Most Super Tokens rely on a shared logic contract using the EIP-1822 "UUPS" and EIP-1967 proxy pattern. This allows the logic to be updated based on protocol governance.

The **Superfluid** **Host** provides easy access to relevant contracts. For the most up-to-date version (including governance upgrades), see this link:

{% embed url="https://blockscout.com/poa/xdai/address/0x2dFe937cD98Ab92e59cF3139138f18c823a4efE7/read-proxy" %}

The addresses are also included below for completeness.

### Super Token logic for WORK

* Contract source: [SuperToken.sol](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/superfluid/SuperToken.sol) 
* xDAI address: 0x0872d200f74e4a45e830eccc9e8b8f605df7ce06

### Super Token Factory 

When ERC20 Wrapper Super Tokens are deployed, the Super Token Factory is used to initialize the proxy with the current Super Token logic. The factory can be found here:

* Contract source: [SuperTokenFactory.sol](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/superfluid/SuperTokenFactory.sol) 
* xDAI address: 0x23410e2659380784498509698ed70E414D384880

> :man_playing_handball: Pro-tip: See [🔗 Network Directory](../networks/networks.md) for all deployed contract addresses across all networks

### Why WORK uses the ERC20 Wrapper Super Token?

One of the reasons for selecting this type was to ensure cross-chain compatibility. By first deploying an ERC20 to Ethereum mainnet (Chain ID 1, "homestead"), the developers can be confident that there will always be a token bridge to other blockchains, even those which haven't been created yet. 

![](<../.gitbook/assets/bridging (1).png>)

At the time of WORK launch, Superfluid was not deployed on Ethereum mainnet. Therefore the protoWORK ERC20 was deployed on mainnet, bridged to xDAI and then upgraded to become the WORK Super Token.

### Resources

For more details check out the documentation on [Super Tokens](../docs/super-tokens.md)
