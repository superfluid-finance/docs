---
description: Working with the CFA & IDA in Solidity - and using the CFA Library
---

# 💻 Solidity Examples

### Working With Superfluid Using Solidity

Inside of the[ Interactive Tutorials](interactive-tutorials/) section, you can learn how to use the Superfluid Core SDK to work with money streams or instant distributions. Under the hood, what you're really doing is interacting with Superfluid _agreements_. Money streams are created by interacting primarily with the [constant flow agreement (CFA)](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/agreements/ConstantFlowAgreementV1.sol), while calls related to instant distributions are done by working with the [instant distribution agreement (IDA)](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/agreements/InstantDistributionAgreementV1.sol).&#x20;

To get started, you'll need to be sure to import, at minimum, the Superfluid host interface & agreement interface that you'd like to work with. In a situation where you'd like to use both the CFA and IDA in the same contract, you would import these contracts like this:

```
pragma solidity ^0.7.0

import { ISuperfluid }from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol"; //"@superfluid-finance/ethereum-monorepo/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import { IConstantFlowAgreementV1 } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import { IInstantDistributionAgreementV1 } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";
```

> **NOTE**: due to breaking changes in the Open Zeppelin solidity 0.8 contracts, we recommend using a version of the solidity 0.7.0 compiler for now when working with Superfluid (as of Feb 2022). This will avoid various versioning issues, particularly when using the CFALibrary which we'll outline later in this page.&#x20;

If you'd like to interact with a Superfluid agreement directly by using solidity, you need to make a function call first to the Superfluid _host_ contract. You'll call the `callAgreement` or `callAgreementWithContext` function on the host contract ([`Superfluid.sol`](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/superfluid/Superfluid.sol)), and pass in a few parameters:

**`ISuperAgreement agreementClass`** - the the agreement you're going to interact with (either the CFA or IDA)

**`bytes memory calldata`** - the transaction you're calling on the agreement you're interacting with, compiled to bytecode (using one of solidity's [encoding methods](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html#argument-encoding))

**`bytes memory userData`** - any additional data you'd like to include with your function call. If you don't plan to add userData, you can pass in an empty bytes value (i.e. `"0x"`). You can learn more about this parameter [here](guides/user-data.md).

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

> NOTE: If you're interacting with agreements inside of a Super App callback, this process will work differently. See [this section](super-apps/super-app-callbacks/calling-agreements-in-super-apps.md) for details.&#x20;

### The CFA Library

The [Constant Flow Agreement library](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/apps/CFAv1Library.sol) (`CFAv1Library.sol)` makes working with the CFA much simpler. Instead of following the `host.callAgreement(...)` pattern, you can make calls to the protocol in fewer lines of code. If you've already looked at the Superfluid [core-sdk](https://github.com/superfluid-finance/protocol-monorepo/tree/dev/packages/sdk-core), then the syntax for creating, updating, and deleting flows will look similar to what you may have already seen. For a more advanced set of examples using the CFA Library, you can refer to [this mock contract](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/mocks/CFALibraryMock.sol).

```
// initializing the CFA Library
pragma solidity ^0.7.0

import { 
    ISuperfluid 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol"; //"@superfluid-finance/ethereum-monorepo/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import { 
    IConstantFlowAgreementV1 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {
    CFAv1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

contract CFALibraryMock {

    using CFAv1Library for CFAv1Library.InitData;
    
    //initialize cfaV1 variable
    CFAv1Library.InitData public cfaV1;
    
    constructor(
        ISuperfluid host
    ) {
    
    //initialize InitData struct, and set equal to cfaV1
    cfaV1 = CFAv1Library.InitData(
        host,
        //here, we are deriving the address of the CFA using the host contract
        IConstantFlowAgreementV1(
            address(host.getAgreementClass(
                    keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1")
                ))
            )
        );
    }
    
    //your contract code here...
}
```

### Using the CFA Library

After initializing the library, it gets very simple to create, update, and delete flows:

```
// CFA CRUD functionality
cfaV1.createFlow(receiver, token, flowRate);
cfaV1.updateFlow(receiver, token, flowRate);
cfaV1.deleteFlow(sender, receiver, token);
```

If you'd like, you can also add user data as an optional parameter to each call to the CFA:

```
// with user data
cfaV1.createFlow(receiver, token, flowRate, userData);
cfaV1.updateFlow(receiver, token, flowRate, userData);
cfaV1.deleteFlow(sender, receiver, token, userData);
```

However, it's worth noting that the parameters passed to each function in the library need to be of the same type as the parameters used in the vanilla solidity syntax seen in the beginning of this page:

**`receiver`** - the `address` of the receiver

**`token`** - the `ISuperToken` used in the flow

**`flowRate`** - an `int96` variable which represents the total amount of the `token` you'd like to send per second, denominated in `wei`

**`userData`** - an optional `bytes` value which represents additional data you'd like to pass along with your function call. You can learn more about user data [here](guides/user-data.md).

### Using the CFA Library inside of a Super App

If you need to perform operations with the Constant Flow Agreement inside of Super App callbacks, the syntax for using the library will look somewhat different. You'll need to use the **withCtx** versions of each function. For more on why this is, you can see this section on [callAgreement vs callAgreementWithContext](super-apps/super-app-callbacks/calling-agreements-in-super-apps.md).

```
// with Ctx - to be used inside of super app callbacks
// NOTE: ctx is a bytes value
cfaV1.createFlowWithCtx(ctx, receiver,token, flowRate);
cfaV1.updateFlowWithCtx(ctx, receiver,token, flowRate);
cfaV1.deleteFlowWithCtx(ctx, sender, receiver,token);

//withCtx & userData - to be used inside of super app callbacks
cfaV1.createFlowWithCtx(ctx, receiver, token, flowRate, userData);
cfaV1.updateFlowWithCtx(ctx, receiver, token, flowRate, userData);
cfaV1.deleteFlowWithCtx(ctx, sender, receiver,token, userData);
```

All other variable fields will are the same as detailed in the previous section, but `ctx` will be the `ctx` which is passed in to the Super App callback by the framework where these functions are being called. This `ctx` value is of type **`bytes`**. For example, in the afterAgreementCreated callback:

```
//in super app callback
function afterAgreementCreated(
    ISuperToken superToken,
    address agreementClass,
    bytes32, // _agreementId,
    bytes calldata /_agreementData/,
    bytes calldata ,// _cbdata,
    bytes calldata ctx
) external returns (bytes memory newCtx) {
    
    //this function takes the callback's ctx value as the first param
    //and returns an updated ctx value upon completion
    return cfaV1.createFlowWithCtx(ctx, receiver,token, flowRate);
}
```

The final parameter passed into the callback - `ctx`, will be passed as the `ctx` value to the withCtx functions within the library.

Each withCtx function in the library also returns a new ctx value as well, which you will need to return inside of the super app callback. Again, more information on this can be found in this section on [callAgreement vs callAgreementWithContext](super-apps/super-app-callbacks/calling-agreements-in-super-apps.md#callagreement-vs-callagreementwithcontext).

### Common Mistakes

One other thing to keep in mind is the value of `msg.sender` when working with Superfluid from a contract. For example, developers will occasionally want to create a function which will let an account create a flow into the contract itself. So, they'll write a function that looks like this, expecting it to create a flow into the contract from the `msg.sender` of the function:

```
//this will fail because a contract cannot create a flow to itself

function createFlowFail(ISuperToken DAIx, int96 flowRate) external {
    cfaV1.createFlow(address(this), DAIx, flowRate);
}
```

In the above function, you have set the receiver on the `cfaV1.createFlow` function to be the contract's address. Under the hood, even though `msg.sender` on the broader `createFlowFail` function is an external address, the msg.sender on the `cfa.createFlow` call to the Superfluid protocol is the address of the _contract_. The Superfluid `callAgreement` function will see that the contract is trying to create a flow into itself, and revert.&#x20;

If you want to create a flow into a contract, we recommend that you use either the[ Core-SDK](interactive-tutorials/money-streaming-1.md) from outside of a contract or a 2nd contract which already has some balance of Super Tokens.

A similar mistake which stems from this `msg.sender` misunderstanding occurs when developers want to allow external accounts to create flows directly to other accounts via a function on the contract. For example:

```
//remember that this will revert if the contract has a zero balance of DAIx
//msg.sender on the call to the Superfluid framework is the contract

function createFlow2Receiver(address receiver, ISuperToken DAIx, int96 flowRate) external {
    cfaV1.createFlow(receiver, DAIx, flowRate);
}
```

Recall that the value of `msg.sender` on the `cfaV1.createFlow` function will be the contract's address, not the external address calling the broader `createFlow2Receiver` function. If you're intending to create a flow from the contract to another address, then this code is what you need (just make sure your contract has a balance of Super tokens!). However, if you're running this with the expectation that it will open a flow directly from an external account calling the function to the intended receiver, it will not work as expected.
