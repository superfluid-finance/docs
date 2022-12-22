---
description: The Super Token Library allows you to work with money streams in Solidity
---

# CFA - Solidity

#### **SuperTokenV1Library Contract**

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol" %}

#### **Quickstart Guide**

{% embed url="https://ethglobal.com/guides/introduction-to-superfluid-protocol-be10i#1-introduction" %}
Make a contract that streams money in under 10 minutes!
{% endembed %}

#### **Example Code**

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
    ISuperToken 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";

import {
    SuperTokenV1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

contract SomeContractWithSuperTokenV1Library {

    using SuperTokenV1Library for ISuperToken;
    ISuperToken public token;
    
    constructor(ISuperToken _token) {
        token = _token;
    }
    //your contract code here...
}
```

## Interacting With The CFA

### Create, Update, Delete Streams

```solidity
// You make the calls directly on the `token`
token.createFlow(address receiver, int96 flowRate)
token.updateFlow(address receiver, int96 flowRate);
token.deleteFlow(address sender, address receiver);
```

**`token`** - the `ISuperToken` used in the stream. Using the SuperTokenV1Library for the ISuperToken type means that you can call all of these functions directly on the token contract itself. Cool huh?

**`receiver`** - the `address` of the receiver

**`flowRate`** - an `int96` variable which represents the wei/_second_ rate you'd like to stream `token` to the receiver, denominated in `wei`. Money streams always move tokens per second so `flowRate` is always per second!

### Giving an Operator Permissions to Create, Update, & Delete Streams

```solidity
// You make the calls directly on the `token`

//allows for granular permissions
token.setFlowPermissions(flowOperator, allowCreate, allowUpdate, allowDelete, flowRateAllowance);

//gives max flow rate allowance 
//also gives ability to create, update, and delete
token.setMaxFlowPermissions(flowOperator);

//revokes 100% of all flow permissions
token.revokeFlowPermissions(flowOperator);
```

`flowOperator` - the account you are giving permissions to

`allowCreate` - a boolean, if `true`, the `flowOperator` can _create_ streams on behalf of `msg.sender`

`allowUpdate` - a boolean, if `true`, the `flowOperator` can _update_ streams on behalf of `msg.sender`

`allowDelete` - a boolean, if `true`, the `flowOperator` can _delete_ streams on behalf of `msg.sender`

`flowRateAllowance` - the total allowance provided to the `flowOperator`. More on this [here](cfa-access-control-list-acl/#flowrateallowance-parameter) (note that there is some nuance with flow rate allowances)

### Create, Update, and Delete Streams as an Operator

```solidity
// create, update, and delete flow as operator
//mirrors the ERC20 approve x transferFrom pattern
token.createFlowFrom(sender, receiver, flowRate);
token.updateFlowFrom(sender, receiver, flowRate);
token.deleteFlowFrom(sender, receiver);
```

### Getting Stream Data

To view stream data, you can use the following functions

```solidity
// Get the flow data between `sender` and `receiver` of `token`
token.getFlowInfo(
    address sender,
    address receiver
) external view returns (
    uint256 timestamp,     // when the stream was started
    int96 flowRate,        // wei/second flow rate between sender and receiver
    uint256 deposit,       // security buffer held during the lifetime of the flow
    uint256 owedDeposit    // Extra deposit amount borrowed to a SuperApp receiver by the flow sender
);

token.getFlowRate(
    address sender,
    address receiver
) external view returns (
    int96 flowRate        // wei/second flow rate between sender and receiver
);


// Get the net flow rate of the account, accounting for all inbound/outbound streams
token.getNetFlowRate(
    address account
) external view returns (
    int96 flowRate         // net flow rate
);
```

### Create, Update, Delete Streams _With_ [_User Data_](../super-apps/user-data/)__

<pre class="language-solidity"><code class="lang-solidity">// Same function call just with additional parameter for user data
<strong>token.createFlow(address receiver, int96 flowRate, bytes memory userData);
</strong>token.updateFlow(address receiver, int96 flowRate, bytes memory userData);
token.deleteFlow(address sender, address receiver, bytes memory userData);
</code></pre>

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

```solidity
// We're assuming here that newCtx is what you've named the context bytes 
// object that will be updated throughout the callback and returned

// Without user data
token.createFlowWithCtx(
    address receiver, 
    int96 flowRate,
    bytes memory ctx // Pass in the context bytes variable for updating here
) returns (bytes memory);

//these functions look very similar for updates and deletions
token.updateFlowWithCtx(address receiver, flowRate, bytes memory ctx) returns (bytes memory);
token.deleteFlowWithCtx(address sender, address receiver, bytes memory ctx) returns (bytes memory);
```

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
     //note that `token` is the asset you want to stream
     newCtx = token.createFlowWithCtx(
         [someReceiverAddress], 
         [flow rate],
         newCtx    // notice `newCtx` being passed in and updated here
     );
    
}
```
