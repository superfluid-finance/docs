---
description: What you need to know when working with Superfluid on Ethereum Layer 1
---

# 📜 Superfluid on Ethereum Mainnet

Ethereum L1 is a different environment from other places that Superfluid is been deployed. This is due to the fact that performing any operation on L1 is much more expensive in terms of gas cost than it is on other networks.&#x20;

### Minimum Deposits

Keep in mind that the [Superfluid sentinel network](../sentinels/liquidations-and-toga.md) is responsible for closing Superfluid streams when an account's balance hits zero before they close it themselves. To cover additional costs incurred by sentinels, tokens on L1 have been deployed with minimum deposit values. This means that the buffer on each of these tokens will not always be calculated as 4 hours worth of the stream as it is on lower cost networks. You can see current parameters on buffer amounts for Etheruem L1 [here](../sentinels/liquidations-and-toga.md).&#x20;

### Using Ethereum Mainnet in Superfluid Tooling

Additionally, while Superfluid is an open smart contract framework, Ethereum mainnet is not currently openly supported across our developer tooling, developer console, or our dashboard.&#x20;

If you're interested in using Superfluid on Ethereum Mainnet, and would like to be able to access it via our user dashboard, please fill out this [airtable form](https://airtable.com/shr8rwXolThzG0q5H).







