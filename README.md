---
description: A new DeFi primitive to automate recurring transactions and monetize Web3
---

# Superfluid

### CONTRACT ADDRESSES

{% content-ref url="networks/networks.md" %}
[networks.md](networks/networks.md)
{% endcontent-ref %}

### START THE TUTORIAL

{% content-ref url="protocol-tutorials/getting-started.md" %}
[getting-started.md](protocol-tutorials/getting-started.md)
{% endcontent-ref %}

### CONNECT TO XDAI, POLYGON, ETC.

* [xDAI Chain](networks/xdai-chain.md)
* [Polygon (Matic)](networks/polygon-network-matic.md)

### EXAMPLE APPS

{% content-ref url="resources/examples/" %}
[examples](resources/examples/)
{% endcontent-ref %}

### COMMUNITY + HELP

If you need any help or have any questions, please join our [**Discord**](http://discord.superfluid.finance),** **check out our [**help page**](http://help.superfluid.finance), or reach out to our team at **support@superfluid.finance**

> The Superfluid documentation is growing. Tell us what you dislike about it so we can make it better.

### **BLOG**

![](<.gitbook/assets/medium (1).png>) [**Blog**](https://medium.com/superfluid-blog)**   **

### **GITHUB**

{% embed url="https://github.com/superfluid-finance/protocol-monorepo" %}

## INTRODUCTION&#x20;

Superfluid is a smart contract framework on L1 Ethereum, enabling you to move assets on-chain following predefined rules called agreements. With a single on-chain transaction, the money will flow from your wallet to the receiver in real time! No further transactions required- it works like magic ✨

**Superfluid enables:**

💸 **Real money streaming** - constant flows on-chain with no capital lockups.

🎁 **Rewards distributions** - Fixed cost distribution in a single transaction for any number of receivers.

🔮 **Anything you can imagine** - Superfluid is very flexible!

**Superfluid Components: **

The current version of Superfluid is composed of the following key elements:

* _**Super Agreement Framework**_**:** a set of approved _super agreements_ contracts as building blocks.
* _**Super App Framework**_**:** a development framework for building real-time finance apps.
* _**Super Token Framework**_**: **an extended [ERC-777](https://eips.ethereum.org/EIPS/eip-777) implementation with real-time finance capability, and a registry.
* _**Batch Call & Meta Tx**_**:** for users (contracts or EOA) to interact with the system in batch on-chain, or off-chain through meta transactions.
* _**Governance**_**:** an external contract for managing protocol parameters and contract upgrades.
* _**Solvency Agents**_**:** an off-chain network of agents ensuring the solvency of the system. [Read more](docs/super-tokens.md)
