---
description: The CFAv1Library makes it easy to work with money streams in Solidity!
---

# CFA - Solidity

The [Constant Flow Agreement library](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/apps/CFAv1Library.sol) (`CFAv1Library.sol)` makes money streams in Solidity a piece of cake.&#x20;

**CFAv1Library Contract**

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/apps/CFAv1Library.sol" %}

**Quickstart Guide**

{% embed url="https://ethglobal.com/guides/introduction-to-superfluid-protocol-be10i#1-introduction" %}
Make a contract that streams money in under 10 minutes!
{% endembed %}

**Example Code**

{% embed url="https://github.com/superfluid-finance/super-examples/blob/main/projects/money-streaming-intro/contracts/MoneyRouter.sol" %}
Simple contract showing usage of many CFAv1Library functions
{% endembed %}

## Getting Set To Start Streams

Initialize the CFAv1Library in your constructor with the below code.

### Initializing the Library

```solidity
// initializing the CFA Library
pragma solidity 0.8.14;

import { 
    ISuperfluid 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import { 
    IConstantFlowAgreementV1 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {
    CFAv1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

contract SomeContractWithCFAv1Library {

    using CFAv1Library for CFAv1Library.InitData;
    
    //initialize cfaV1 variable
    CFAv1Library.InitData public cfaLib;
    
    constructor(
        ISuperfluid host
    ) {
    
        //initialize InitData struct, and set equal to cfaV1
        cfaLib= CFAv1Library.InitData(
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

## Interacting With The CFA

### Create, Update, Delete Streams

```solidity
// You simply make the calls directly through the `cfaV1` CFAv1Library object
cfaLib.createFlow(address receiver, ISuperToken token, int96 flowRate)
cfaLib.updateFlow(address receiver, ISuperToken token, int96 flowRate);
cfaLib.deleteFlow(address sender, address receiver, ISuperToken token);
```

**`receiver`** - the `address` of the receiver

**`token`** - the `ISuperToken` used in the stream

**`flowRate`** - an `int96` variable which represents the wei/_second_ rate you'd like to stream `token` to the receiver, denominated in `wei`. Money streams always move tokens per second so `flowRate` is always per second!

### Getting Stream Data

To view stream data, you have to tap into the [CFA contract](https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol) - note the calls on `cfaLib.cfa` instead of just `cfaLib`

```solidity
// Get the flow data between `sender` and `receiver` of `token`
function getFlow(
    ISuperfluidToken token,
    address sender,
    address receiver
) external view returns (
    uint256 timestamp,     // when the stream was started
    int96 flowRate,        // wei/second flow rate between sender and receiver
    uint256 deposit,       // security buffer held during the lifetime of the flow
    uint256 owedDeposit    // Extra deposit amount borrowed to a SuperApp receiver by the flow sender
);


// Get the net flow rate of the account, accounting for all inbound/outbound streams
function getNetFlow(
    ISuperfluidToken token,
    address account
) external view returns (
    int96 flowRate         // net flow rate
);
```

#### Example - calling `getFlow`

```solidity
// You just want to see the flow rate between Bob's address and Alice's address
(,int96 currentFlowRate ,,) = cfaLib.cfa.getFlow([Super Token], [Bob], [Alice]);
```

#### Example - calling `getNetFlow`

```solidity
// Alice has numerous inbound and outbound streams. What's her net flow rate?
int96 netFlowRate = cfaLib.cfa.getNetFlow([Super Token], [Alice]);
```

### Create, Update, Delete Streams _With_ [_User Data_](../super-apps/user-data/)__

<pre class="language-solidity"><code class="lang-solidity">// Same function call just with additional parameter for user data
<strong>cfaLib.createFlow(address receiver, ISuperToken token, int96 flowRate, bytes memory userData);
</strong>cfaLib.updateFlow(address receiver, ISuperToken token, int96 flowRate, bytes memory userData);
cfaLib.deleteFlow(address sender, address receiver, ISuperToken token, bytes memory userData);</code></pre>

**`userData`** - an optional `bytes` value which represents additional data you'd like to pass along with your function call. You can learn more about the usefulness of user data [here](../super-apps/user-data/).

### Create, Update, Delete Streams _In a_ [_Super App Callbacks_](../super-apps/super-app-callbacks/calling-agreements-in-super-apps.md)__

As you can learn about [here](../super-apps/super-app-callbacks/calling-agreements-in-super-apps.md), Super Agreement calls in Super App callbacks require the updating of a context bytes variable. That context is returned at the end of the callback.

Below, the `newCtx` is the context bytes variable that will be updated with each Super Agreement call.

```solidity
// Example Super App Callback
function afterAgreementCreated(
    ISuperToken superToken,
    address agreementClass,
    bytes32, // _agreementId,
    bytes calldata /_agreementData/,
    bytes calldata ,// _cbdata,
    bytes calldata ctx
) external returns (bytes memory newCtx) {
    
     newCtx = ctx; // `newCtx` is context bytes variable for updating
     
     // ... callback logic
    
}
```

So, to do CFA operations inside of Super App callbacks, you'll need to use the **withCtx** versions of each function.  These calls all return the updated context (a bytes memory)

<pre class="language-solidity"><code class="lang-solidity">// We're assuming here that newCtx is what you've named the context bytes 
// object that will be updated throughout the callback and returned

// Without user data
cfaLib.createFlowWithCtx(
    bytes memory ctx, // Pass in the context bytes variable for updating here
    address receiver, 
    ISuperToken token, 
    int96 flowRate
) returns (bytes memory);
cfaLib.updateFlowWithCtx(bytes memory ctx, address receiver, ISuperToken token, flowRate) returns (bytes memory);
cfaLib.deleteFlowWithCtx(bytes memory ctx, address sender, address receiver,token) returns (bytes memory);

// With user data
cfaLib.createFlowWithCtx(bytes memory ctx, address receiver, ISuperToken token, int96 flowRate, bytes memory userData) returns (bytes memory);
<strong>cfaLib.updateFlowWithCtx(bytes memory ctx, address receiver, ISuperToken token, int96 flowRate, bytes memory userData) returns (bytes memory);
</strong>cfaLib.deleteFlowWithCtx(bytes memory ctx, address sender, address receiver,token, userData) returns (bytes memory);</code></pre>

**Example** - Here's the callback snippet continued showing the proper syntax

```solidity
// Example Super App Callback
function afterAgreementCreated(
    ISuperToken superToken,
    address agreementClass,
    bytes32, // _agreementId,
    bytes calldata /_agreementData/,
    bytes calldata ,// _cbdata,
    bytes calldata ctx
) external returns (bytes memory newCtx) {
    
     newCtx = ctx; // `newCtx` is context bytes variable for updating
     
     // start a stream to another address
     newCtx = cfaV1.createFlowWithCtx(
         newCtx,    // notice `newCtx` being passed in and updated here
         [someReceiverAddress], 
         [Super Token you want to stream],
         [flow rate]
     );
    
}
```
