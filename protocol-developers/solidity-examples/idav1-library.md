---
description: >-
  The IDAv1 Library is a thin layer of abstraction on the Instant Distribution
  Agreement V1. This guide covers how to import, initialize, and use the
  library, as well as documentation for each function.
---

# IDAv1 Library

### Agreement Abstraction

The objective of the `IDAv1Library` is to abstract the code required to call an agreement. Below is a comparative example of how an index might be created with and without the library.

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

function createWithLibrary() external {
    _idav1Lib.createIndex(publisher, indexId);
}
```

### Importing and Initialization

```solidity
import {
    ISuperfluid
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {
    IInstantDistributionAgreementV1
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

import {
    IDAv1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/IDAv1Library.sol";

contract MyContract {
    // use the IDAv1Library for the InitData struct
    using IDAv1Library for IDAv1Library.InitData;
    
    // declare `_idaLib` of type InitData
    IDAv1Library.InitData internal _idaLib;
    
    constructor(
        ISuperfluid host,
        IInstantDistributionAgreementV1 ida
    ) {
        // assign it the host and ida addresses
        _idav1Lib = IDAv1Library.InitData(host, ida);
    }
    // ...
}
```

First, we bring `ISuperfluid.sol`, `IInstantDistributionAgreementV1`, and `IDAv1Library` into scope from the `@superfluid-finance` package for Ethereum contracts.

We will need to use a struct in the library called `InitData`. This struct is defined in the library as follows.

```solidity
struct InitData {
    ISuperfluid host,
    IInstantDistributionAgreementV1
}
```

We use the `IDAv1Library` for the `InitData` struct, then we create a local state variable called `_idav1Lib` of type `InitData`.

Finally, we define the `_idav1Lib` with the `host` and `ida` addresses passed into the constructor.

### Basic Usage

Once this is initialized, we can use the library to create, read, update, and delete IDAv1 agreements as demonstrated in this `createIndex` example.

```solidity
function myFunction(ISuperfluidToken token, uint32 indexId) {
    _idav1Lib.createIndex(token, indexId);
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

    require(msg.sender == address(_idav1Lib.host), "only host");
    uint32 indexId = 0;
    return _idav1Lib.createIndexWithCtx(ctx, superToken, indexId);

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
    ISuperfluidToken token,
    uint32 indexId
) internal;

// usage
_idav1Lib.createIndex(token, indexId);
```

#### Create Index with User Data

```solidity
// library function declaration
function createIndex(
    ISuperfluidToken token,
    uint32 indexId,
    bytes memory userData
) internal;

// usage
_idav1Lib.createIndex(token, indexId, userData);
```

#### Create Index in a Super App Callback

```solidity
// library function declaration
function createIndexWithCtx(
    bytes memory ctx, // ctx passed to the callback function
    ISuperfluidToken token,
    uint32 indexId
) internal returns (bytes memory newCtx);

// usage
return _idav1Lib.createIndexWithCtx(ctx, token, indexId);
```

#### Create Index with User Data in a Super App Callback

```solidity
// library function declaration
function createIndexWithCtx(
    bytes memory ctx, // ctx passed to the callback function
    ISuperfluidToken token,
    uint32 indexId,
    bytes memory userData
) internal returns (bytes memory newCtx);

// usage
return _idav1Lib.createIndexWithCtx(ctx, token, indexId, userData);
```

#### Update Index Value

Updates the value of the index. This updates the real time balances of all approved subscribers in a single transaction. Notice that this is similar to `distribute`, except here you must specify the new total index value in the `indexValue` parameter. This fails if it is not greater than the last index value.

```solidity
// library function decalaration
function updateIndexValue(
    ISuperfluidToken token,
    uint32 indexId,
    uint128 indexValue
) internal;

// usage
_idav1Lib.updateIndexValue(token, indexId, indexValue);
```

####

#### Update Index Value with User Data

```solidity
// library function declaration
function updateIndexValue(
    ISuperfluidToken token,
    uint32 indexId,
    uint128 indexValue,
    bytes memory userData
) internal;

// usage
_idav1Lib.updateIndexvalue(token, indexId, indexValue, userData);
```

#### Update Index Value in a Super App Callback

```solidity
// library function declaration
function updateIndexValueWithCtx(
    bytes memory ctx,
    ISuperfluidToken token,
    uint32 indexId,
    uint128 indexValue
) internal returns(bytes memory newCtx);

// usage
return _idav1Lib.updateIndexValueWithCtx(ctx, token, indexId, indexValue);
```

#### Update Index Value with User Data in a Super App Callback

```solidity
// library function declaration
function updateIndexValueWithCtx(
    bytes memory ctx,
    ISuperfluidToken token,
    uint32 indexId,
    uint128 indexValue,
    bytes memory userData
) internal returns(bytes memory newCtx);

// usage
return _idav1Lib.updateIndexValueWithCtx(ctx, token, indexId, indexValue, userData);
```

#### Distribute

This function is functionally similar to `updateIndexValue`, but instead of having to specify the new `indexValue`, you can pass an `amount` by which the `indexValue` should be incremented. This is simply another way to distribute tokens.

```solidity
// library function declaration
function distribute(
    ISuperfluidToken token,
    uint32 indexId,
    uint256 amount
) internal;

// usage
_idav1Lib.distribute(token, indexId, amount);
```

#### Distribute with User Data

```solidity
// library function declaration
function distribute(
    ISuperfluidToken token,
    uint32 indexId,
    uint256 amount,
    bytes memory userData
) internal;

// usage
_idav1Lib.distribute(token, indexId, amount, userData);
```

#### Distribute in a Super App Callback

```solidity
// library function declaration
function distributeWithCtx(
    bytes memory ctx,
    ISuperfluidToken token,
    uint32 indexId,
    uint256 amount
) internal returns (bytes memory newCtx);

// usage
return _idav1Lib.distributeWithCtx(ctx, token, indexId, amount);
```

#### Distribute with User Data in a Super App Callback

```solidity
// library function declaration
function distributeWithCtx(
    bytes memory ctx,
    ISuperfluidToken token,
    uint32 indexId,
    uint256 amount,
    bytes memory userData
) internal returns (bytes memory newCtx);

// usage
return _idav1Lib.distributeWithCtx(ctx, token, indexId, amount, userData);
```

#### Approve Subscription

Approves a subscription to an index. This is called by the subscriber to the index and can be called even before units are issued to the subscriber, though the index must at least exist first.

```solidity
// library function declaration
function approveSubscription(
    ISuperfluidToken token,
    address publisher,
    uint32 indexId
) internal;

// usage
_idav1Lib.approveSubscription(token, publisher, indexId);
```

#### Approve Subscription with User Data

```solidity
// library function declaration
function approveSubscription(
    ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    bytes memory userData
) internal;

// usage
_idav1Lib.approveSubscription(token, publisher, indexId, userData);
```

#### Approve Subscription in a Super App Callback

```solidity
// library function declaration
function approveSubscriptionWithCtx(
    bytes memory ctx,
    ISuperfluidToken token,
    address publisher,
    uint32 indexId
) internal returns (bytes memory newCtx);

// usage
return _idav1Lib.approveSubscriptionWithCtx(ctx, token, publisher, indexId);
```

#### Approve Subscription with User Data in a Super App Callback

```solidity
// library function declaration
function approveSubscriptionWithCtx(
    bytes memory ctx,
    ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    bytes memory userData
) internal returns (bytes memory newCtx);

// usage
return _idav1Lib.approveSubscriptionWithCtx(ctx, token, publisher, indexId, userData);
```

#### Revoke Subscription

Revokes a previously approved subscription. This is called by the subscriber.

```solidity
// library function declaration
function revokeSubscription(
    ISuperfluidToken token,
    address publisher,
    uint32 indexId
) internal;

// usage
_idav1Lib.revokeSubscription(token, publisher, indexId);
```

#### Revoke Subscription with User Data

```solidity
// library function declaration
function revokeSubscription(
    ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    bytes memory userData
) internal;

// usage
_idav1Lib.revokeSubscription(token, publisher, indexId, userData);
```

#### Revoke Subscription in a Super App Callback

```solidity
// library function declaration
function revokeSubscriptionWithCtx(
    bytes memory ctx,
    ISuperfluidToken token,
    address publisher,
    uint32 indexId
) internal returns (bytes memory newCtx);

// usage
return _idav1Lib.revokeSubscriptionWithCtx(ctx, token, publisher, indexId);
```

#### Revoke Subscription with User Data in a Super App Callback

```solidity
// library function declaration
function revokeSubscriptionWithCtx(
    bytes memory ctx,
    ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    bytes memory userData
) internal returns (bytes memory newCtx);

// usage
return _idav1Lib.revokeSubscriptionWithCtx(ctx, token, publisher, indexId, userData);
```

#### Update Subscription Units

Updates the number of units, or "shares", of the index assigned to a subscriber. This is called by the publisher of the index.

```solidity
// library function declaration
function updateSubscriptionUnits(
    ISuperfluidToken token,
    uint32 indexId,
    address subscriber,
    uint128 units
) internal;

// usage
_idav1Lib.updateSubscriptionUnits(token, indexId, subscriber, units);
```

#### Update Subscription Units with User Data

```solidity
// library function declaration
function updateSubscriptionUnits(
    ISuperfluidToken token,
    uint32 indexId,
    address subscriber,
    uint128 units,
    bytes memory userData
) internal;

// usage
_idav1Lib.updateSubscriptionUnits(token, indexId, subscriber, units, userData);
```

#### Update Subscription Units in a Super App Callback

```solidity
// library function declaration
function updateSubscriptionUnitsWithCtx(
    bytes memory ctx,
    ISuperfluidToken token,
    uint32 indexId,
    address subscriber,
    uint128 units
) internal returns (bytes memory newCtx);

return _idav1Lib.updateSubscriptionUnitsWithCtx(ctx, token, indexId, subscriber, units)
```

#### Update Subscription Units with User Data in a Super App Callback

```solidity
// library function declaration
function updateSubscriptionUnitsWithCtx(
    bytes memory ctx,
    ISuperfluidToken token,
    uint32 indexId,
    address subscriber,
    uint128 units,
    bytes memory userData
) internal returns (bytes memory newCtx);

return _idav1Lib.updateSubscriptionUnitsWithCtx(ctx, token, indexId, subscriber, units, userData)
```

#### Delete Subscription

Deletes an existing subscription, setting the subscriber's units to zero. This is called by the publsiher.

```solidity
// library function declaration
function deleteSubscription(
    ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    address subscriber
) internal;

// usage
_idav1Lib.deleteSubscription(tokne, publisher, indexId, subscriber);
```

#### Delete Subscription with User Data

```solidity
// library function declaration
function deleteSubscription(
    ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    address subscriber,
    bytes memory userData
) internal;

// usage
_idav1Lib.deleteSubscription(tokne, publisher, indexId, subscriber, userData);
```

#### Delete Subscription in a Super App Callback

```solidity
// library function declaration
function deleteSubscriptionWithCtx(
    bytes memory ctx,
    ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    address subscriber
) internal returns (bytes memory newCtx);

// usage
return _idav1Lib.deleteSubscriptionWithCtx(ctx, token, publisher, indexId, subscriber);
```

#### Delete Subscription with User Data in a Super App Callback

```solidity
// library function declaration
function deleteSubscriptionWithCtx(
    bytes memory ctx,
    ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    address subscriber,
    bytes memory userData
) internal returns (bytes memory newCtx);

// usage
return _idav1Lib.deleteSubscriptionWithCtx(ctx, token, publisher, indexId, subscriber, userData);
```

#### Claim

Claims a pendind distribution of an index. This is called by the subscriber and updates their real time balance instantly.

```solidity
// library function declaration
function claim(
    ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    address subscriber
) internal;

// usage
_idav1Lib.claim(token, publisher, indexId, subscriber);
```

#### Claim with User Data

```solidity
// library function declaration
function claim(
    ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    address subscriber,
    bytes memory userData
) internal;

// usage
_idav1Lib.claim(token, publisher, indexId, subscriber, userData);
```

#### Claim in a Super App Callback

```solidity
// library function declaration
function claimWithCtx(
    byte memory ctx,
    ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    address subscriber
) internal returns (bytes memory newCtx);

// usage
return _idav1Lib.claimWithCtx(ctx, token, publisher, indexId subscriber);
```

#### Claim with User Data in a Super App Callback

```solidity
// library function declaration
function claimWithCtx(
    byte memory ctx,
    ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    address subscriber,
    bytes memory userData
) internal returns (bytes memory newCtx);

// usage
return _idav1Lib.claimWithCtx(ctx, token, publisher, indexId subscriber, userData)
```

