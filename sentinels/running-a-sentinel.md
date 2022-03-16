---
description: How to run a Sentinel
---

# 🛡 Running a Sentinel

In our section on [Liquidations & TOGA](liquidations-and-toga.md), we described how the Superfluid protocol handles solvency & liquidations. Sentinels play a vital role in this process. This page provides links to various resources that will aid you on your journey to help secure the protocol 🛡⚔️

### Who Should Run a Sentinel?

1. Crypto enthusiasts who want to help secure a new, innovative primitive for web3 😁
2. Teams that have a service running on Superfluid. Perhaps you’ve launched your own dapp or your own Super Token, and you want to be 100% certain that your users are in good standing.
3. Professional operators who want to run profitable enterprises. If you have DevOps skills and/or you’re able to acquire capital to become the PIC for several tokens, participating in this process could be a good opportunity!

## Getting Started&#x20;

### Sentinel Repository

If you want to start running a Sentinel today, you can clone [this repo](https://github.com/superfluid-finance/superfluid-sentinel) and customize your own `.env` file before starting the software. At minimum, you're going to need a reliable RPC URL, and a private key with native tokens to pay for gas when performing liquidations. Detailed instructions for running your Sentinel can be found in the repository's README and in the above video.

{% embed url="https://github.com/superfluid-finance/superfluid-sentinel" %}
The Superfluid Sentinel Repo
{% endembed %}

### Becoming the PIC

You can become the PIC by connecting your wallet at the [TOGA dashboard.](https://toga.superfluid.finance) There, you'll also see information on the current PIC stake amount, stream data by token, and a real time list of all liquidations. TOGA contract addresses are also available in our [directory](../protocol-developers/networks/) for each network.

{% embed url="https://toga.superfluid.finance" %}
The TOGA Dashboard
{% endembed %}

### Additional Resources

Various communities are beginning to emerge around running Sentinels. If you're interested in learning more about these communities and engaging them directly, we recommend checking out the Sentinel Guild:&#x20;

{% embed url="https://discord.gg/ptHwrxmA" %}

## Glossary of Terms:&#x20;

**Buffer**: The amount of tokens that an account must temporarily lock up when a stream is started.&#x20;

**Liquidation**: Occurs when a stream is closed by a sentinel once an account's token balance hits zero while still streaming funds&#x20;

**Sentinel**: A node that watches the Superfluid network & closes streams when they become critical or insolvent. Anyone can become a Sentinel by running a node&#x20;

**PIC**: The Patrician in Charge who receives rewards each time a stream is closed in the priority period when an account goes critical&#x20;

**TOGA**: the Transparent Ongoing Auction which allows anyone to become the Patrician in Charge (PIC) if they put up a higher staked amount than the previous PIC

**Stake**: The amount of funds locked in the TOGA contract by the Patrician in Charge (PIC)

