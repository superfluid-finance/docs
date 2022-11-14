# IInstantDistributionAgreementV1

**Instant Distribution Agreement interface**

- A publisher can create as many as indices as possibly identifiable with `indexId`.
    - `indexId` is deliberately limited to 32 bits, to avoid the chance for sha-3 collision.
      Despite knowing sha-3 collision is only theoretical.
  - A publisher can create a subscription to an index for any subscriber.
  - A subscription consists of:
    - The index it subscribes to.
    - Number of units subscribed.
  - An index consists of:
    - Current value as `uint128 indexValue`.
    - Total units of the approved subscriptions as `uint128 totalUnitsApproved`.
    - Total units of the non approved subscription as `uint128 totalUnitsPending`.
  - A publisher can update an index with a new value that doesn't decrease.
  - A publisher can update a subscription with any number of units.
  - A publisher or a subscriber can delete a subscription and reset its units to zero.
  - A subscriber must approve the index in order to receive distributions from the publisher
    each time the index is updated.
    - The amount distributed is $$\Delta{index} * units$$
  - Distributions to a non approved subscription stays in the publisher's deposit until:
    - the subscriber approves the subscription (side effect),
    - the publisher updates the subscription (side effect),
    - the subscriber deletes the subscription even if it is never approved (side effect),
    - or the subscriber can explicitly claim them.

## IDA_INDEX_SHOULD_GROW

```solidity
error IDA_INDEX_SHOULD_GROW()
```

## IDA_OPERATION_NOT_ALLOWED

```solidity
error IDA_OPERATION_NOT_ALLOWED()
```

## IDA_INDEX_ALREADY_EXISTS

```solidity
error IDA_INDEX_ALREADY_EXISTS()
```

## IDA_INDEX_DOES_NOT_EXIST

```solidity
error IDA_INDEX_DOES_NOT_EXIST()
```

## IDA_SUBSCRIPTION_DOES_NOT_EXIST

```solidity
error IDA_SUBSCRIPTION_DOES_NOT_EXIST()
```

## IDA_SUBSCRIPTION_ALREADY_APPROVED

```solidity
error IDA_SUBSCRIPTION_ALREADY_APPROVED()
```

## IDA_SUBSCRIPTION_IS_NOT_APPROVED

```solidity
error IDA_SUBSCRIPTION_IS_NOT_APPROVED()
```

## IDA_INSUFFICIENT_BALANCE

```solidity
error IDA_INSUFFICIENT_BALANCE()
```

## IDA_ZERO_ADDRESS_SUBSCRIBER

```solidity
error IDA_ZERO_ADDRESS_SUBSCRIBER()
```

## Fn agreementType

```solidity
function agreementType(
) 
    external 
    returns (bytes32)
```
_ISuperAgreement.agreementType implementation_

## Fn createIndex

```solidity
function createIndex(
    contract ISuperfluidToken token,
    uint32 indexId,
    bytes ctx
) 
    external 
    returns (bytes newCtx)
```
_Create a new index for the publisher_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `indexId` | uint32 | Id of the index |
| `ctx` | bytes | Context bytes (see ISuperfluid.sol for Context struct) |

#### Callbacks 

None
## Event IndexCreated

```solidity
event IndexCreated(
    contract ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    bytes userData
)
```

Index created event

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `publisher` | address | Index creator and publisher |
| `indexId` | uint32 | The specified indexId of the newly created index |
| `userData` | bytes | The user provided data |

## Fn getIndex

```solidity
function getIndex(
    contract ISuperfluidToken token,
    address publisher,
    uint32 indexId
) 
    external 
    returns (bool exist, uint128 indexValue, uint128 totalUnitsApproved, uint128 totalUnitsPending)
```
_Query the data of a index_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `publisher` | address | The publisher of the index |
| `indexId` | uint32 | Id of the index |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `exist` | bool | Does the index exist |
| `indexValue` | uint128 | Value of the current index |
| `totalUnitsApproved` | uint128 | Total units approved for the index |
| `totalUnitsPending` | uint128 | Total units pending approval for the index |

## Fn calculateDistribution

```solidity
function calculateDistribution(
    contract ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    uint256 amount
) 
    external 
    returns (uint256 actualAmount, uint128 newIndexValue)
```
_Calculate actual distribution amount_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `publisher` | address | The publisher of the index |
| `indexId` | uint32 | Id of the index |
| `amount` | uint256 | The amount of tokens desired to be distributed |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `actualAmount` | uint256 | The amount to be distributed after ensuring no rounding errors |
| `newIndexValue` | uint128 | The index value given the desired amount of tokens to be distributed |

## Fn updateIndex

```solidity
function updateIndex(
    contract ISuperfluidToken token,
    uint32 indexId,
    uint128 indexValue,
    bytes ctx
) 
    external 
    returns (bytes newCtx)
```
_Update index value of an index_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `indexId` | uint32 | Id of the index |
| `indexValue` | uint128 | Value of the index |
| `ctx` | bytes | Context bytes (see ISuperfluid.sol for Context struct) |

#### Callbacks 

None
## Event IndexUpdated

```solidity
event IndexUpdated(
    contract ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    uint128 oldIndexValue,
    uint128 newIndexValue,
    uint128 totalUnitsPending,
    uint128 totalUnitsApproved,
    bytes userData
)
```

Index updated event

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `publisher` | address | Index updater and publisher |
| `indexId` | uint32 | The specified indexId of the updated index |
| `oldIndexValue` | uint128 | The previous index value |
| `newIndexValue` | uint128 | The updated index value |
| `totalUnitsPending` | uint128 | The total units pending when the indexValue was updated |
| `totalUnitsApproved` | uint128 | The total units approved when the indexValue was updated |
| `userData` | bytes | The user provided data |

## Fn distribute

```solidity
function distribute(
    contract ISuperfluidToken token,
    uint32 indexId,
    uint256 amount,
    bytes ctx
) 
    external 
    returns (bytes newCtx)
```
_Distribute tokens through the index_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `indexId` | uint32 | Id of the index |
| `amount` | uint256 | The amount of tokens desired to be distributed |
| `ctx` | bytes | Context bytes (see ISuperfluid.sol for Context struct) |

#### Note 

- This is a convenient version of updateIndex. It adds to the index
  a delta that equals to &#x60;amount / totalUnits&#x60;
- The actual amount distributed could be obtained via
  &#x60;calculateDistribution&#x60;. This is due to precision error with index
  value and units data range

#### Callbacks 

None

## Fn approveSubscription

```solidity
function approveSubscription(
    contract ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    bytes ctx
) 
    external 
    returns (bytes newCtx)
```
_Approve the subscription of an index_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `publisher` | address | The publisher of the index |
| `indexId` | uint32 | Id of the index |
| `ctx` | bytes | Context bytes (see ISuperfluid.sol for Context struct) |

#### Callbacks 

- if subscription exist
  - AgreementCreated callback to the publisher:
     - agreementId is for the subscription
- if subscription does not exist
  - AgreementUpdated callback to the publisher:
     - agreementId is for the subscription
## Event IndexSubscribed

```solidity
event IndexSubscribed(
    contract ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    address subscriber,
    bytes userData
)
```

Index subscribed event

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `publisher` | address | Index publisher |
| `indexId` | uint32 | The specified indexId |
| `subscriber` | address | The approved subscriber |
| `userData` | bytes | The user provided data |
## Event SubscriptionApproved

```solidity
event SubscriptionApproved(
    contract ISuperfluidToken token,
    address subscriber,
    address publisher,
    uint32 indexId,
    bytes userData
)
```

Subscription approved event

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `subscriber` | address | The approved subscriber |
| `publisher` | address | Index publisher |
| `indexId` | uint32 | The specified indexId |
| `userData` | bytes | The user provided data |

## Fn revokeSubscription

```solidity
function revokeSubscription(
    contract ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    bytes ctx
) 
    external 
    returns (bytes newCtx)
```
_"Unapproves" the subscription and moves approved units to pending_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `publisher` | address | The publisher of the index |
| `indexId` | uint32 | Id of the index |
| `ctx` | bytes | Context bytes (see ISuperfluid.sol for Context struct) |

Revoke the subscription of an index

#### Callbacks 

- AgreementUpdated callback to the publisher:
   - agreementId is for the subscription
## Event IndexUnsubscribed

```solidity
event IndexUnsubscribed(
    contract ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    address subscriber,
    bytes userData
)
```

Index unsubscribed event

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `publisher` | address | Index publisher |
| `indexId` | uint32 | The specified indexId |
| `subscriber` | address | The unsubscribed subscriber |
| `userData` | bytes | The user provided data |
## Event SubscriptionRevoked

```solidity
event SubscriptionRevoked(
    contract ISuperfluidToken token,
    address subscriber,
    address publisher,
    uint32 indexId,
    bytes userData
)
```

Subscription approved event

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `subscriber` | address | The approved subscriber |
| `publisher` | address | Index publisher |
| `indexId` | uint32 | The specified indexId |
| `userData` | bytes | The user provided data |

## Fn updateSubscription

```solidity
function updateSubscription(
    contract ISuperfluidToken token,
    uint32 indexId,
    address subscriber,
    uint128 units,
    bytes ctx
) 
    external 
    returns (bytes newCtx)
```
_Update the nuber of units of a subscription_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `indexId` | uint32 | Id of the index |
| `subscriber` | address | The subscriber of the index |
| `units` | uint128 | Number of units of the subscription |
| `ctx` | bytes | Context bytes (see ISuperfluid.sol for Context struct) |

#### Callbacks 

- if subscription exist
  - AgreementCreated callback to the subscriber:
     - agreementId is for the subscription
- if subscription does not exist
  - AgreementUpdated callback to the subscriber:
     - agreementId is for the subscription
## Event IndexUnitsUpdated

```solidity
event IndexUnitsUpdated(
    contract ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    address subscriber,
    uint128 units,
    bytes userData
)
```

Index units updated event

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `publisher` | address | Index publisher |
| `indexId` | uint32 | The specified indexId |
| `subscriber` | address | The subscriber units updated |
| `units` | uint128 | The new units amount |
| `userData` | bytes | The user provided data |
## Event SubscriptionUnitsUpdated

```solidity
event SubscriptionUnitsUpdated(
    contract ISuperfluidToken token,
    address subscriber,
    address publisher,
    uint32 indexId,
    uint128 units,
    bytes userData
)
```

Subscription units updated event

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `subscriber` | address | The subscriber units updated |
| `publisher` | address | Index publisher |
| `indexId` | uint32 | The specified indexId |
| `units` | uint128 | The new units amount |
| `userData` | bytes | The user provided data |

## Fn getSubscription

```solidity
function getSubscription(
    contract ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    address subscriber
) 
    external 
    returns (bool exist, bool approved, uint128 units, uint256 pendingDistribution)
```
_Get data of a subscription_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `publisher` | address | The publisher of the index |
| `indexId` | uint32 | Id of the index |
| `subscriber` | address | The subscriber of the index |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `exist` | bool | Does the subscription exist? |
| `approved` | bool | Is the subscription approved? |
| `units` | uint128 | Units of the suscription |
| `pendingDistribution` | uint256 | Pending amount of tokens to be distributed for unapproved subscription |

## Fn getSubscriptionByID

```solidity
function getSubscriptionByID(
    contract ISuperfluidToken token,
    bytes32 agreementId
) 
    external 
    returns (address publisher, uint32 indexId, bool approved, uint128 units, uint256 pendingDistribution)
```
_indexId (agreementId) is the keccak256 hash of encodePacked("publisher", publisher, indexId)_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `agreementId` | bytes32 | The agreement ID |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `publisher` | address | The publisher of the index |
| `indexId` | uint32 | Id of the index |
| `approved` | bool | Is the subscription approved? |
| `units` | uint128 | Units of the suscription |
| `pendingDistribution` | uint256 | Pending amount of tokens to be distributed for unapproved subscription |

Get data of a subscription by agreement ID

## Fn listSubscriptions

```solidity
function listSubscriptions(
    contract ISuperfluidToken token,
    address subscriber
) 
    external 
    returns (address[] publishers, uint32[] indexIds, uint128[] unitsList)
```
_List subscriptions of an user_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `subscriber` | address | The subscriber's address |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `publishers` | address[] | Publishers of the subcriptions |
| `indexIds` | uint32[] | Indexes of the subscriptions |
| `unitsList` | uint128[] | Units of the subscriptions |

## Fn deleteSubscription

```solidity
function deleteSubscription(
    contract ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    address subscriber,
    bytes ctx
) 
    external 
    returns (bytes newCtx)
```
_Delete the subscription of an user_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `publisher` | address | The publisher of the index |
| `indexId` | uint32 | Id of the index |
| `subscriber` | address | The subscriber's address |
| `ctx` | bytes | Context bytes (see ISuperfluid.sol for Context struct) |

#### Callbacks 

- if the subscriber called it
  - AgreementTerminated callback to the publsiher:
     - agreementId is for the subscription
- if the publisher called it
  - AgreementTerminated callback to the subscriber:
     - agreementId is for the subscription

## Fn claim

```solidity
function claim(
    contract ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    address subscriber,
    bytes ctx
) 
    external 
    returns (bytes newCtx)
```
_Claim pending distributions_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `publisher` | address | The publisher of the index |
| `indexId` | uint32 | Id of the index |
| `subscriber` | address | The subscriber's address |
| `ctx` | bytes | Context bytes (see ISuperfluid.sol for Context struct) |

#### Note 

The subscription should not be approved yet

#### Callbacks 

- AgreementUpdated callback to the publisher:
   - agreementId is for the subscription
## Event IndexDistributionClaimed

```solidity
event IndexDistributionClaimed(
    contract ISuperfluidToken token,
    address publisher,
    uint32 indexId,
    address subscriber,
    uint256 amount
)
```

Index distribution claimed event

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `publisher` | address | Index publisher |
| `indexId` | uint32 | The specified indexId |
| `subscriber` | address | The subscriber units updated |
| `amount` | uint256 | The pending amount claimed |
## Event SubscriptionDistributionClaimed

```solidity
event SubscriptionDistributionClaimed(
    contract ISuperfluidToken token,
    address subscriber,
    address publisher,
    uint32 indexId,
    uint256 amount
)
```

Subscription distribution claimed event

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperfluidToken | Super token address |
| `subscriber` | address | The subscriber units updated |
| `publisher` | address | Index publisher |
| `indexId` | uint32 | The specified indexId |
| `amount` | uint256 | The pending amount claimed |

