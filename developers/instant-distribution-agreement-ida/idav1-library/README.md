---
description: >-
  The Super Token Library allows you to work with instant distributions in
  Solidity
---

# IDA - Solidity

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol" %}

### Agreement Abstraction

The objective of the `SuperTokenV1Library` is to abstract the code required to call an agreement. Below is a comparative example of how an index might be created with and without the library.

```solidity
function createWithoutLibrary() external {
    _host.callAgreement(
        _ida,
        abi.encodeWithSelector(
            _ida.createIndex.selector,
            publisher,
            indexId,
            new bytes(0)
        ),
        new bytes(0)
    );
}

function createWithLibrary(ISuperToken token) external {
    token.createIndex(indexId);
}
```

### Importing and Initialization

```solidity
import {
    ISuperfluid,
    ISuperToken
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {
    IInstantDistributionAgreementV1
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

import {
    SuperTokenV1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

contract MyContract {
    // use the SuperTokenV1Library for the ISuperToken type
    using SuperTokenV1Libary for ISuperToken;
    
    ISuperToken public token;
    
    constructor(
        ISuperToken _token,
    ) {
       
       token = _token
    }
    
    // your code here...
}
```

### Basic Usage

Once this is initialized, we can use the library to create, read, update, and delete IDAv1 agreements as demonstrated in this `createIndex` example.

```solidity
function myFunction(ISuperToken token, uint32 indexId) {
    token.createIndex(indexId);
}
```

### Callback Usage

To use this library inside of a Super App callback, you will need to use the equivalent function with `WithCtx` at the end of it. For example, instead of creating an index in a callback with `createIndex`, you should use `createIndexWithCtx` and return the result, `newCtx`, of type `bytes memory`.

```solidity
function afterAgreementCreated(
    ISuperToken superToken,
    address /*agreementClass*/,
    bytes32 /*agreementId*/,
    bytes calldata /*agreementData*/,
    bytes calldata /*cbdata*/,
    bytes calldata ctx
} external override returns (bytes memory newCtx) {

    require(msg.sender == address(host), "only host");
    uint32 indexId = 0;
    return superToken.createIndexWithCtx(indexId, ctx);

}
```

### API Specification

The following documents the library function's declaration along with the usage the function, assuming the `InitData` struct is named `_idav1Lib`.

Each function has four variants:

1. First is the standard function shown in the Basic Usage section above.
2. Second is an override of the standard usage to include arbitrary user data.
3. Third is the `WithCtx` function shown in the Callback Usage section above.
4. Fourth is an override of the `WithCtx` function to include arbitrary user data.

Note that each function below includes the "library function declaration". This is not necessary to write in your own code and is simply there for reference. The code following "usage" is what you would write in your own contract.

For more information on each parameter, please refer to the code comment documentation for each function in the library.

#### Create Index

Creates an index with a super token and an index id. The function caller is the publisher of the index.

```solidity
// library function declaration
function createIndex(
    ISuperToken token,
    uint32 indexId
) internal;

// usage
token.createIndex(indexId);
```

#### Create Index with User Data

```solidity
// library function declaration
function createIndex(
    ISuperToken token,
    uint32 indexId,
    bytes memory userData
) internal;

// usage
token.createIndex(indexId, userData);
```

#### Create Index in a Super App Callback

```solidity
// library function declaration
function createIndexWithCtx(
    ISuperToken token,
    uint32 indexId,
    bytes memory ctx // ctx passed to the callback function
) internal returns (bytes memory newCtx);

// usage
return token.createIndexWithCtx(indexId, ctx);
```

#### Update Index Value

Updates the value of the index. This updates the real time balances of all approved subscribers in a single transaction. Notice that this is similar to `distribute`, except here you must specify the new total index value in the `indexValue` parameter. This fails if it is not greater than the last index value.

```solidity
// library function decalaration
function updateIndexValue(
    ISuperToken token,
    uint32 indexId,
    uint128 indexValue
) internal;

// usage
token.updateIndexValue(indexId, indexValue);
```

####

#### Update Index Value with User Data

```solidity
// library function declaration
function updateIndexValue(
    ISuperToken token,
    uint32 indexId,
    uint128 indexValue,
    bytes memory userData
) internal;

// usage
token.updateIndexvalue(indexId, indexValue, userData);
```

#### Update Index Value in a Super App Callback

```solidity
// library function declaration
function updateIndexValueWithCtx(
    ISuperToken token,
    uint32 indexId,
    uint128 indexValue,
    bytes memory ctx,
) internal returns(bytes memory newCtx);

// usage
return token.updateIndexValueWithCtx(indexId, indexValue, ctx);
```

#### Update Index Value in a Super App Callback

```solidity
// library function declaration
function updateIndexValueWithCtx(
    ISuperToken token,
    uint32 indexId,
    uint128 indexValue,
    bytes memory ctx,
) internal returns(bytes memory newCtx);

// usage
return token.updateIndexValueWithCtx(indexId, indexValue, ctx);
```

#### Distribute

This function is functionally similar to `updateIndexValue`, but instead of having to specify the new `indexValue`, you can pass an `amount` by which the `indexValue` should be incremented. This is simply another way to distribute tokens.

```solidity
// library function declaration
function distribute(
    ISuperToken token,
    uint32 indexId,
    uint256 amount
) internal;

// usage
token.distribute(indexId, amount);
```

#### Distribute with User Data

```solidity
// library function declaration
function distribute(
    ISuperToken token,
    uint32 indexId,
    uint256 amount,
    bytes memory userData
) internal;

// usage
token.distribute(indexId, amount, userData);
```

#### Distribute in a Super App Callback

```solidity
// library function declaration
function distributeWithCtx(
    ISuperToken token,
    uint32 indexId,
    uint256 amount,
    bytes memory ctx,
) internal returns (bytes memory newCtx);

// usage
return token.distributeWithCtx(indexId, amount, ctx);
```

#### Approve Subscription

Approves a subscription to an index. This is called by the subscriber to the index and can be called even before units are issued to the subscriber, though the index must at least exist first.

```solidity
// library function declaration
function approveSubscription(
    ISuperToken token,
    address publisher,
    uint32 indexId
) internal;

// usage
token.approveSubscription(publisher, indexId);
```

#### Approve Subscription with User Data

```solidity
// library function declaration
function approveSubscription(
    ISuperToken token,
    address publisher,
    uint32 indexId,
    bytes memory userData
) internal;

// usage
token.approveSubscription(publisher, indexId, userData);
```

#### Approve Subscription in a Super App Callback

```solidity
// library function declaration
function approveSubscriptionWithCtx(
    ISuperToken token,
    address publisher,
    uint32 indexId,
    bytes memory ctx,
) internal returns (bytes memory newCtx);

// usage
return token.approveSubscriptionWithCtx(publisher, indexId, ctx);
```

#### Revoke Subscription

Revokes a previously approved subscription. This is called by the subscriber.

```solidity
// library function declaration
function revokeSubscription(
    ISuperToken token,
    address publisher,
    uint32 indexId
) internal;

// usage
token.revokeSubscription(publisher, indexId);
```

#### Revoke Subscription with User Data

```solidity
// library function declaration
function revokeSubscription(
    ISuperToken token,
    address publisher,
    uint32 indexId,
    bytes memory userData
) internal;

// usage
token.revokeSubscription(publisher, indexId, userData);
```

#### Revoke Subscription in a Super App Callback

```solidity
// library function declaration
function revokeSubscriptionWithCtx(
    ISuperToken token,
    address publisher,
    uint32 indexId,
    bytes memory ctx,
) internal returns (bytes memory newCtx);

// usage
return token.revokeSubscriptionWithCtx(publisher, indexId, ctx);
```

#### Update Subscription Units

Updates the number of units, or "shares", of the index assigned to a subscriber. This is called by the publisher of the index.

```solidity
// library function declaration
function updateSubscriptionUnits(
    ISuperToken token,
    uint32 indexId,
    address subscriber,
    uint128 units
) internal;

// usage
token.updateSubscriptionUnits(indexId, subscriber, units);
```

#### Update Subscription Units with User Data

```solidity
// library function declaration
function updateSubscriptionUnits(
    ISuperToken token,
    uint32 indexId,
    address subscriber,
    uint128 units,
    bytes memory userData
) internal;

// usage
token.updateSubscriptionUnits(indexId, subscriber, units, userData);
```

#### Update Subscription Units in a Super App Callback

```solidity
// library function declaration
function updateSubscriptionUnitsWithCtx(
    ISuperToken token,
    uint32 indexId,
    address subscriber,
    uint128 units,
    bytes memory ctx,
) internal returns (bytes memory newCtx);

return token.updateSubscriptionUnitsWithCtx(indexId, subscriber, units, ctx)
```

#### Delete Subscription

Deletes an existing subscription, setting the subscriber's units to zero. This is called by the publsiher.

```solidity
// library function declaration
function deleteSubscription(
    ISuperToken token,
    address publisher,
    uint32 indexId,
    address subscriber
) internal;

// usage
token.deleteSubscription(publisher, indexId, subscriber);
```

#### Delete Subscription with User Data

```solidity
// library function declaration
function deleteSubscription(
    ISuperToken token,
    address publisher,
    uint32 indexId,
    address subscriber,
    bytes memory userData
) internal;

// usage
token.deleteSubscription(publisher, indexId, subscriber, userData);
```

#### Delete Subscription in a Super App Callback

```solidity
// library function declaration
function deleteSubscriptionWithCtx(
    ISuperToken token,
    address publisher,
    uint32 indexId,
    address subscriber,
    bytes memory ctx,
) internal returns (bytes memory newCtx);

// usage
return token.deleteSubscriptionWithCtx(publisher, indexId, subscriber, ctx);
```

#### Claim

Claims a pending distribution of an index. This is called by the subscriber and updates their real time balance instantly.

```solidity
// library function declaration
function claim(
    ISuperToken token,
    address publisher,
    uint32 indexId,
    address subscriber
) internal;

// usage
token.claim(publisher, indexId, subscriber);
```

#### Claim with User Data

```solidity
// library function declaration
function claim(
    ISuperToken token,
    address publisher,
    uint32 indexId,
    address subscriber,
    bytes memory userData
) internal;

// usage
token.claim(publisher, indexId, subscriber, userData);
```

#### Claim in a Super App Callback

```solidity
// library function declaration
function claimWithCtx(
    ISuperToken token,
    address publisher,
    uint32 indexId,
    address subscriber,
    bytes memory ctx,
) internal returns (bytes memory newCtx);

// usage
return token.claimWithCtx(publisher, indexId subscriber, ctx);
```
