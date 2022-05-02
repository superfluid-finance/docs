---
description: Using Superfluid at the Smart Contract Level
---

# 📜 Interacting With Superfluid Smart Contracts

### Working With Superfluid Using Solidity

Inside of the[ Interactive Tutorials](../interactive-tutorials/) section, you can learn how to use the Superfluid Core SDK to work with money streams or instant distributions. Under the hood, what you're really doing is interacting with Superfluid _agreements_. Money streams are created by interacting primarily with the [constant flow agreement (CFA)](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/agreements/ConstantFlowAgreementV1.sol), while calls related to instant distributions are done by working with the [instant distribution agreement (IDA)](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/agreements/InstantDistributionAgreementV1.sol).&#x20;

To get started, you'll need to be sure to import, at minimum, the Superfluid host interface & agreement interface that you'd like to work with. In a situation where you'd like to use both the CFA and IDA in the same contract, you would import these contracts like this:

```
pragma solidity ^0.8.0

import { ISuperfluid }from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol"; //"@superfluid-finance/ethereum-monorepo/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import { IConstantFlowAgreementV1 } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import { IInstantDistributionAgreementV1 } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";
```

If you'd like to interact with a Superfluid agreement directly by using solidity, you need to make a function call first to the Superfluid _host_ contract. You'll call the `callAgreement` or `callAgreementWithContext` function on the host contract ([`Superfluid.sol`](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/superfluid/Superfluid.sol)), and pass in a few parameters:

**`ISuperAgreement agreementClass`** - the the agreement you're going to interact with (either the CFA or IDA)

**`bytes memory calldata`** - the transaction you're calling on the agreement you're interacting with, compiled to bytecode (using one of solidity's [encoding methods](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html#argument-encoding))

**`bytes memory userData`** - any additional data you'd like to include with your function call. If you don't plan to add userData, you can pass in an empty bytes value (i.e. `"0x"`). You can learn more about this parameter [here](../super-apps/user-data/).

Here's an example of how this looks in action when interacting with the constant flow agreement. This pattern will be the same whether you're creating, updating, or deleting flows.

```
//creating a flow in pure solidity
host.callAgreement(
    cfa,
    abi.encodeWithSelector(
        cfa.createFlow.selector,
        token,
        receiver,
        flowRate,
        new bytes(0) // placeholder - always pass in bytes(0)
    ),
    "0x" //userData
);
```

The following is an example for interacting with the instant distribution agreement using solidity. This pattern is the same for each interaction you'd like to make with the IDA:

```
// distributing tokens with the instant distribution agreement
host.callAgreement(
    ida,
    abi.encodeWithSelector(
        ida.distribute.selector,
        token,
        index,
        amountToDistribute,
        new bytes(0) // placeholder ctx
    ),
    "0x" // user data
);
```

> NOTE: If you're interacting with agreements inside of a Super App callback, this process will work differently. See [this section](../super-apps/super-app-callbacks/calling-agreements-in-super-apps.md) for details.&#x20;

### Common Mistakes

One other thing to keep in mind is the value of `msg.sender` when working with Superfluid from a contract. For example, developers will occasionally want to create a function which will let an account create a flow into the contract itself. So, they'll write a function that looks like this, expecting it to create a flow into the contract from the `msg.sender` of the function:

```
//this will fail because a contract cannot create a flow to itself

function createFlowFail(ISuperToken DAIx, int96 flowRate) external {
    cfaV1.createFlow(address(this), DAIx, flowRate);
}
```

In the above function, you have set the receiver on the `cfaV1.createFlow` function to be the contract's address. Under the hood, even though `msg.sender` on the broader `createFlowFail` function is an external address, the msg.sender on the `cfa.createFlow` call to the Superfluid protocol is the address of the _contract_. The Superfluid `callAgreement` function will see that the contract is trying to create a flow into itself, and revert.&#x20;

If you want to create a flow into a contract, we recommend that you use either the[ Core-SDK](../interactive-tutorials/money-streaming-1.md) from outside of a contract or a 2nd contract which already has some balance of Super Tokens.

A similar mistake which stems from this `msg.sender` misunderstanding occurs when developers want to allow external accounts to create flows directly to other accounts via a function on the contract. For example:

```
//remember that this will revert if the contract has a zero balance of DAIx
//msg.sender on the call to the Superfluid framework is the contract

function createFlow2Receiver(address receiver, ISuperToken DAIx, int96 flowRate) external {
    cfaV1.createFlow(receiver, DAIx, flowRate);
}
```

Recall that the value of `msg.sender` on the `cfaV1.createFlow` function will be the contract's address, not the external address calling the broader `createFlow2Receiver` function. If you're intending to create a flow from the contract to another address, then this code is what you need (just make sure your contract has a balance of Super tokens!). However, if you're running this with the expectation that it will open a flow directly from an external account calling the function to the intended receiver, it will not work as expected.
