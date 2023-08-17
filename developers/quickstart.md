---
description: Find what you need to getting off the ground quick with building on Superfluid
---

# 🏃♀ 🏃♀ Quickstart

{% tabs %}
{% tab title="Money Streaming" %}
The Constant Flow Agreement (CFA) allows for money streaming. Read this [short explainer](https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-agreements/constant-flow-agreement-cfa) on how it works and then find the resources you need below!\


### Money Streaming with SDK Core

* [**Set Up**](https://docs.superfluid.finance/superfluid/developers/sdk-initialization/sdk-core/sdk-core-initialization#infura-provider-initialization): How to initialize our SDK Core to start conveniently accessing Superfluid functionality
* [**Functionality**](https://docs.superfluid.finance/superfluid/developers/sdk-initialization/sdk-core/cfa-operations): See the functions that allow you to manage streams using the SDK Core.&#x20;
* [**Simple Example**](https://docs.superfluid.finance/superfluid/developers/interactive-tutorials/money-streaming-1): Very simple ReactJS examples showing how to allow a user to create, update, and delete their streams.

###

### Money Streaming with Solidity

* [**Set Up**](https://docs.superfluid.finance/superfluid/developers/solidity-examples/solidity-libraries/cfav1-library#the-cfa-library): Set up your smart contract with the SuperTokenV1Library to easily manage money streams in Solidity.
* [**Functionality**](https://docs.superfluid.finance/superfluid/developers/solidity-examples/solidity-libraries/cfav1-library#using-the-cfa-library): See the basic stream management functions of the SuperTokenV1Library
* [**ACL**:](constant-flow-agreement-cfa/more.../cfa-access-control-list-acl.md) See how you can provide other addresses with the ability to create, update, and delete streams on your behalf
* [**Simple Example**](https://github.com/superfluid-finance/super-examples/tree/main/projects/money-streaming-intro): "Money Router" smart contract example showing the very basics of coding stream management into a smart contract
* [**Video Tutorial**](https://www.youtube.com/watch?v=1mwbYQ429IU): Tutorial demonstrating coding the Money Router contract



### Testing With Money Streams

* [**Initializing**](https://docs.superfluid.finance/superfluid/developers/sdk-initialization/sdk-core/sdk-core-initialization#hardhat-signer-example): How to initialize our SDK Core for your Hardhat testing script to start conveniently accessing Superfluid functionality.
* [**Simple Example**](https://github.com/superfluid-finance/super-examples/tree/main/projects/tradeable-cashflow): Our "Tradeable Cashflow" example project Hardhat test script shows a lot of the basics.
{% endtab %}

{% tab title="Distributions" %}
## Instant Distributions

The Instant Distribution Agreement (IDA) allows for one-to-many instant distributions. Read this [short explainer](https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-agreements/instant-distribution-agreement-ida) on how it works and then find the resources you need below!

###

### Instant Distributions with SDK Core&#x20;

You want to let users to manage their instant distribution indices from your frontend.

* [**Set Up**](https://docs.superfluid.finance/superfluid/developers/sdk-initialization/sdk-core/sdk-core-initialization#infura-provider-initialization): How to initialize our Javascript SDK (the SDK Core) for your frontend to start conveniently accessing Superfluid functionality
* [**Functionality**](https://docs.superfluid.finance/superfluid/developers/sdk-initialization/sdk-core/ida-operations): See the functions that allow you to manage streams using the SDK Core.
* [**Simple Example**](https://docs.superfluid.finance/superfluid/developers/interactive-tutorials/instant-distribution): Very simple ReactJS examples showing how to allow a user to create and manage an Instant Distribution Agreement Index.

###

### Instant Distributions with Solidity

You want to create a smart contract that does instant distributions on its own.

* [**Set Up**](https://docs.superfluid.finance/superfluid/developers/solidity-examples/solidity-libraries/idav1-library#importing-and-initialization): Set up your smart contract with the Instant Distribution Agreement (IDA) library to easily start instant distributions in Solidity.
* [**Functionality**](https://docs.superfluid.finance/superfluid/developers/solidity-examples/solidity-libraries/idav1-library#api-specification): See the basic IDA management functions of the IDA Library
* [**Simple Example**](https://github.com/superfluid-finance/super-examples/tree/main/projects/instant-distribution-intro): "Token Spreader" smart contract example showing the very basics of coding IDA management into a smart contract
* [**Written Tutorial**](https://github.com/superfluid-finance/super-examples/tree/main/projects/instant-distribution-intro): Tutorial demonstrating coding the Token Spreader contract

###

### Testing With Instant Distributions

You want to work with instant distributions in your test scripts.

* [**Set Up**](https://docs.superfluid.finance/superfluid/developers/sdk-initialization/sdk-core/sdk-core-initialization#hardhat-signer-example) (Hardhat): How to initialize our SDK Core for your Hardhat testing script to start conveniently accessing Superfluid functionality.
* [**Functionality**](https://docs.superfluid.finance/superfluid/developers/sdk-initialization/sdk-core/ida-operations): See the functions that allow you to manage distributions using the SDK Core.
* [**Simple Example**](https://github.com/superfluid-finance/super-examples/tree/main/projects/instant-distribution-intro/test): Our "Token Spreader" example project Hardhat test script shows a lot of the basics.
{% endtab %}
{% endtabs %}
