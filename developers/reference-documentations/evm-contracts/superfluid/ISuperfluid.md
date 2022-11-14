# ISuperfluid

**Host interface**

This is the central contract of the system where super agreement, super app
and super token features are connected.

The Superfluid host contract is also the entry point for the protocol users,
where batch call and meta transaction are provided for UX improvements.

## HOST_AGREEMENT_CALLBACK_IS_NOT_ACTION

```solidity
error HOST_AGREEMENT_CALLBACK_IS_NOT_ACTION()
```

## HOST_CANNOT_DOWNGRADE_TO_NON_UPGRADEABLE

```solidity
error HOST_CANNOT_DOWNGRADE_TO_NON_UPGRADEABLE()
```

## HOST_CALL_AGREEMENT_WITH_CTX_FROM_WRONG_ADDRESS

```solidity
error HOST_CALL_AGREEMENT_WITH_CTX_FROM_WRONG_ADDRESS()
```

## HOST_CALL_APP_ACTION_WITH_CTX_FROM_WRONG_ADDRESS

```solidity
error HOST_CALL_APP_ACTION_WITH_CTX_FROM_WRONG_ADDRESS()
```

## HOST_INVALID_CONFIG_WORD

```solidity
error HOST_INVALID_CONFIG_WORD()
```

## HOST_MAX_256_AGREEMENTS

```solidity
error HOST_MAX_256_AGREEMENTS()
```

## HOST_NON_UPGRADEABLE

```solidity
error HOST_NON_UPGRADEABLE()
```

## HOST_NON_ZERO_LENGTH_PLACEHOLDER_CTX

```solidity
error HOST_NON_ZERO_LENGTH_PLACEHOLDER_CTX()
```

## HOST_ONLY_GOVERNANCE

```solidity
error HOST_ONLY_GOVERNANCE()
```

## HOST_UNKNOWN_BATCH_CALL_OPERATION_TYPE

```solidity
error HOST_UNKNOWN_BATCH_CALL_OPERATION_TYPE()
```

## HOST_AGREEMENT_ALREADY_REGISTERED

```solidity
error HOST_AGREEMENT_ALREADY_REGISTERED()
```

## HOST_AGREEMENT_IS_NOT_REGISTERED

```solidity
error HOST_AGREEMENT_IS_NOT_REGISTERED()
```

## HOST_MUST_BE_CONTRACT

```solidity
error HOST_MUST_BE_CONTRACT()
```

## HOST_ONLY_LISTED_AGREEMENT

```solidity
error HOST_ONLY_LISTED_AGREEMENT()
```

## APP_RULE

```solidity
error APP_RULE(uint256 _code)
```

## HOST_INVALID_OR_EXPIRED_SUPER_APP_REGISTRATION_KEY

```solidity
error HOST_INVALID_OR_EXPIRED_SUPER_APP_REGISTRATION_KEY()
```

## HOST_NOT_A_SUPER_APP

```solidity
error HOST_NOT_A_SUPER_APP()
```

## HOST_NO_APP_REGISTRATION_PERMISSIONS

```solidity
error HOST_NO_APP_REGISTRATION_PERMISSIONS()
```

## HOST_RECEIVER_IS_NOT_SUPER_APP

```solidity
error HOST_RECEIVER_IS_NOT_SUPER_APP()
```

## HOST_SENDER_IS_NOT_SUPER_APP

```solidity
error HOST_SENDER_IS_NOT_SUPER_APP()
```

## HOST_SOURCE_APP_NEEDS_HIGHER_APP_LEVEL

```solidity
error HOST_SOURCE_APP_NEEDS_HIGHER_APP_LEVEL()
```

## HOST_SUPER_APP_IS_JAILED

```solidity
error HOST_SUPER_APP_IS_JAILED()
```

## HOST_SUPER_APP_ALREADY_REGISTERED

```solidity
error HOST_SUPER_APP_ALREADY_REGISTERED()
```

## HOST_UNAUTHORIZED_SUPER_APP_FACTORY

```solidity
error HOST_UNAUTHORIZED_SUPER_APP_FACTORY()
```

## Fn getNow

```solidity
function getNow(
) 
    external 
    returns (uint256)
```

## Fn getGovernance

```solidity
function getGovernance(
) 
    external 
    returns (contract ISuperfluidGovernance governance)
```
_Get the current governance address of the Superfluid host_

## Fn replaceGovernance

```solidity
function replaceGovernance(
    contract ISuperfluidGovernance newGov
) 
    external
```
_Replace the current governance with a new one_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `newGov` | contract ISuperfluidGovernance |  |

## Event GovernanceReplaced

```solidity
event GovernanceReplaced(
    contract ISuperfluidGovernance oldGov,
    contract ISuperfluidGovernance newGov
)
```

Governance replaced event

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `oldGov` | contract ISuperfluidGovernance | Address of the old governance contract |
| `newGov` | contract ISuperfluidGovernance | Address of the new governance contract |

## Fn registerAgreementClass

```solidity
function registerAgreementClass(
    contract ISuperAgreement agreementClassLogic
) 
    external
```
_Register a new agreement class to the system_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `agreementClassLogic` | contract ISuperAgreement | Initial agreement class code |

#### Modifiers 

- onlyGovernance
## Event AgreementClassRegistered

```solidity
event AgreementClassRegistered(
    bytes32 agreementType,
    address code
)
```

Agreement class registered event

agreementType is the keccak256 hash of: "org.superfluid-finance.agreements.<AGREEMENT_NAME>.<VERSION>"

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `agreementType` | bytes32 | The agreement type registered |
| `code` | address | Address of the new agreement |

## Fn updateAgreementClass

```solidity
function updateAgreementClass(
    contract ISuperAgreement agreementClassLogic
) 
    external
```
_Update code of an agreement class_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `agreementClassLogic` | contract ISuperAgreement | New code for the agreement class |

#### Modifiers 

 - onlyGovernance
## Event AgreementClassUpdated

```solidity
event AgreementClassUpdated(
    bytes32 agreementType,
    address code
)
```

Agreement class updated event

agreementType is the keccak256 hash of: "org.superfluid-finance.agreements.<AGREEMENT_NAME>.<VERSION>"

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `agreementType` | bytes32 | The agreement type updated |
| `code` | address | Address of the new agreement |

## Fn isAgreementTypeListed

```solidity
function isAgreementTypeListed(
    bytes32 agreementType
) 
    external 
    returns (bool yes)
```
_agreementType is the keccak256 hash of: "org.superfluid-finance.agreements.<AGREEMENT_NAME>.<VERSION>"_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `agreementType` | bytes32 |  |

Check if the agreement type is whitelisted

## Fn isAgreementClassListed

```solidity
function isAgreementClassListed(
    contract ISuperAgreement agreementClass
) 
    external 
    returns (bool yes)
```
_Check if the agreement class is whitelisted_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `agreementClass` | contract ISuperAgreement |  |

## Fn getAgreementClass

```solidity
function getAgreementClass(
    bytes32 agreementType
) 
    external 
    returns (contract ISuperAgreement agreementClass)
```
_agreementType is the keccak256 hash of: "org.superfluid-finance.agreements.<AGREEMENT_NAME>.<VERSION>"_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `agreementType` | bytes32 |  |

Get agreement class

## Fn mapAgreementClasses

```solidity
function mapAgreementClasses(
    uint256 bitmap
) 
    external 
    returns (contract ISuperAgreement[] agreementClasses)
```
_Map list of the agreement classes using a bitmap_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `bitmap` | uint256 | Agreement class bitmap |

## Fn addToAgreementClassesBitmap

```solidity
function addToAgreementClassesBitmap(
    uint256 bitmap,
    bytes32 agreementType
) 
    external 
    returns (uint256 newBitmap)
```
_agreementType is the keccak256 hash of: "org.superfluid-finance.agreements.<AGREEMENT_NAME>.<VERSION>"_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `bitmap` | uint256 | Agreement class bitmap |
| `agreementType` | bytes32 |  |

Create a new bitmask by adding a agreement class to it

## Fn removeFromAgreementClassesBitmap

```solidity
function removeFromAgreementClassesBitmap(
    uint256 bitmap,
    bytes32 agreementType
) 
    external 
    returns (uint256 newBitmap)
```
_agreementType is the keccak256 hash of: "org.superfluid-finance.agreements.<AGREEMENT_NAME>.<VERSION>"_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `bitmap` | uint256 | Agreement class bitmap |
| `agreementType` | bytes32 |  |

Create a new bitmask by removing a agreement class from it

## Fn getSuperTokenFactory

```solidity
function getSuperTokenFactory(
) 
    external 
    returns (contract ISuperTokenFactory factory)
```
_Get the super token factory_

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `factory` | contract ISuperTokenFactory | The factory |

## Fn getSuperTokenFactoryLogic

```solidity
function getSuperTokenFactoryLogic(
) 
    external 
    returns (address logic)
```
_Get the super token factory logic (applicable to upgradable deployment)_

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `logic` | address | The factory logic |

## Fn updateSuperTokenFactory

```solidity
function updateSuperTokenFactory(
    contract ISuperTokenFactory newFactory
) 
    external
```
_Update super token factory_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `newFactory` | contract ISuperTokenFactory | New factory logic |

## Event SuperTokenFactoryUpdated

```solidity
event SuperTokenFactoryUpdated(
    contract ISuperTokenFactory newFactory
)
```

SuperToken factory updated event

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `newFactory` | contract ISuperTokenFactory | Address of the new factory |

## Fn updateSuperTokenLogic

```solidity
function updateSuperTokenLogic(
    contract ISuperToken token
) 
    external
```
_Refer to ISuperTokenFactory.Upgradability for expected behaviours_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperToken |  |

Update the super token logic to the latest

## Event SuperTokenLogicUpdated

```solidity
event SuperTokenLogicUpdated(
    contract ISuperToken token,
    address code
)
```

SuperToken logic updated event

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperToken |  |
| `code` | address | Address of the new SuperToken logic |

## Fn registerApp

```solidity
function registerApp(
    uint256 configWord
) 
    external
```
_Message sender (must be a contract) declares itself as a super app._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `configWord` | uint256 | The super app manifest configuration, flags are defined in
`SuperAppDefinitions` |

#### Deprecated 

you should use &#x60;registerAppWithKey&#x60; or &#x60;registerAppByFactory&#x60; instead,
because app registration is currently governance permissioned on mainnets.

## Event AppRegistered

```solidity
event AppRegistered(
    contract ISuperApp app
)
```

App registered event

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `app` | contract ISuperApp | Address of jailed app |

## Fn registerAppWithKey

```solidity
function registerAppWithKey(
    uint256 configWord,
    string registrationKey
) 
    external
```
_Message sender declares itself as a super app._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `configWord` | uint256 | The super app manifest configuration, flags are defined in `SuperAppDefinitions` |
| `registrationKey` | string | The registration key issued by the governance, needed to register on a mainnet. |

See https://github.com/superfluid-finance/protocol-monorepo/wiki/Super-App-White-listing-Guide
On testnets or in dev environment, a placeholder (e.g. empty string) can be used.
While the message sender must be the super app itself, the transaction sender (tx.origin)
must be the deployer account the registration key was issued for.

## Fn registerAppByFactory

```solidity
function registerAppByFactory(
    contract ISuperApp app,
    uint256 configWord
) 
    external
```
_Message sender (must be a contract) declares app as a super app_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `app` | contract ISuperApp |  |
| `configWord` | uint256 | The super app manifest configuration, flags are defined in `SuperAppDefinitions` |

On mainnet deployments, only factory contracts pre-authorized by governance can use this.
See https://github.com/superfluid-finance/protocol-monorepo/wiki/Super-App-White-listing-Guide

## Fn isApp

```solidity
function isApp(
    contract ISuperApp app
) 
    external 
    returns (bool)
```
_Query if the app is registered_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `app` | contract ISuperApp | Super app address |

## Fn getAppCallbackLevel

```solidity
function getAppCallbackLevel(
    contract ISuperApp app
) 
    external 
    returns (uint8 appCallbackLevel)
```
_Query app callbacklevel_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `app` | contract ISuperApp | Super app address |

## Fn getAppManifest

```solidity
function getAppManifest(
    contract ISuperApp app
) 
    external 
    returns (bool isSuperApp, bool isJailed, uint256 noopMask)
```
_Get the manifest of the super app_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `app` | contract ISuperApp | Super app address |

## Fn isAppJailed

```solidity
function isAppJailed(
    contract ISuperApp app
) 
    external 
    returns (bool isJail)
```
_Query if the app has been jailed_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `app` | contract ISuperApp | Super app address |

## Fn allowCompositeApp

```solidity
function allowCompositeApp(
    contract ISuperApp targetApp
) 
    external
```
_Whitelist the target app for app composition for the source app (msg.sender)_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `targetApp` | contract ISuperApp | The target super app address |

## Fn isCompositeAppAllowed

```solidity
function isCompositeAppAllowed(
    contract ISuperApp app,
    contract ISuperApp targetApp
) 
    external 
    returns (bool isAppAllowed)
```
_Query if source app is allowed to call the target app as downstream app_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `app` | contract ISuperApp | Super app address |
| `targetApp` | contract ISuperApp | The target super app address |

## Fn callAppBeforeCallback

```solidity
function callAppBeforeCallback(
    contract ISuperApp app,
    bytes callData,
    bool isTermination,
    bytes ctx
) 
    external 
    returns (bytes cbdata)
```
_(For agreements) StaticCall the app before callback_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `app` | contract ISuperApp | The super app. |
| `callData` | bytes | The call data sending to the super app. |
| `isTermination` | bool | Is it a termination callback? |
| `ctx` | bytes | Current ctx, it will be validated. |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `cbdata` | bytes | Data returned from the callback. |

## Fn callAppAfterCallback

```solidity
function callAppAfterCallback(
    contract ISuperApp app,
    bytes callData,
    bool isTermination,
    bytes ctx
) 
    external 
    returns (bytes newCtx)
```
_(For agreements) Call the app after callback_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `app` | contract ISuperApp | The super app. |
| `callData` | bytes | The call data sending to the super app. |
| `isTermination` | bool | Is it a termination callback? |
| `ctx` | bytes | Current ctx, it will be validated. |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `newCtx` | bytes | The current context of the transaction. |

## Fn appCallbackPush

```solidity
function appCallbackPush(
    bytes ctx,
    contract ISuperApp app,
    uint256 appCreditGranted,
    int256 appCreditUsed,
    contract ISuperfluidToken appCreditToken
) 
    external 
    returns (bytes newCtx)
```
_(For agreements) Create a new callback stack_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `ctx` | bytes | The current ctx, it will be validated. |
| `app` | contract ISuperApp | The super app. |
| `appCreditGranted` | uint256 | App credit granted so far. |
| `appCreditUsed` | int256 | App credit used so far. |
| `appCreditToken` | contract ISuperfluidToken |  |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `newCtx` | bytes | The current context of the transaction. |

## Fn appCallbackPop

```solidity
function appCallbackPop(
    bytes ctx,
    int256 appCreditUsedDelta
) 
    external 
    returns (bytes newCtx)
```
_(For agreements) Pop from the current app callback stack_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `ctx` | bytes | The ctx that was pushed before the callback stack. |
| `appCreditUsedDelta` | int256 | App credit used by the app. |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `newCtx` | bytes | The current context of the transaction.

@custom:security
- Here we cannot do assertValidCtx(ctx), since we do not really save the stack in memory.
- Hence there is still implicit trust that the agreement handles the callback push/pop pair correctly. |

## Fn ctxUseCredit

```solidity
function ctxUseCredit(
    bytes ctx,
    int256 appCreditUsedMore
) 
    external 
    returns (bytes newCtx)
```
_(For agreements) Use app credit._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `ctx` | bytes | The current ctx, it will be validated. |
| `appCreditUsedMore` | int256 | See app credit for more details. |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `newCtx` | bytes | The current context of the transaction. |

## Fn jailApp

```solidity
function jailApp(
    bytes ctx,
    contract ISuperApp app,
    uint256 reason
) 
    external 
    returns (bytes newCtx)
```
_(For agreements) Jail the app._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `ctx` | bytes |  |
| `app` | contract ISuperApp | The super app. |
| `reason` | uint256 | Jail reason code. |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `newCtx` | bytes | The current context of the transaction. |

## Event Jail

```solidity
event Jail(
    contract ISuperApp app,
    uint256 reason
)
```

Jail event for the app

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `app` | contract ISuperApp | Address of jailed app |
| `reason` | uint256 | Reason the app is jailed (see Definitions.sol for the full list) |

## Fn callAgreement

```solidity
function callAgreement(
    contract ISuperAgreement agreementClass,
    bytes callData,
    bytes userData
) 
    external 
    returns (bytes returnedData)
```
_Call agreement function_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `agreementClass` | contract ISuperAgreement | The agreement address you are calling |
| `callData` | bytes | The contextual call data with placeholder ctx |
| `userData` | bytes | Extra user data being sent to the super app callbacks |

## Fn callAppAction

```solidity
function callAppAction(
    contract ISuperApp app,
    bytes callData
) 
    external 
    returns (bytes returnedData)
```
_Main use case is calling app action in a batch call via the host_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `app` | contract ISuperApp |  |
| `callData` | bytes | The contextual call data |

Call app action

#### Note 

See &quot;Contextless Call Proxies&quot; above for more about contextual call data.
## struct Context

```solidity
struct Context {
  uint8 appCallbackLevel;
  uint8 callType;
  uint256 timestamp;
  address msgSender;
  bytes4 agreementSelector;
  bytes userData;
  uint256 appCreditGranted;
  uint256 appCreditWantedDeprecated;
  int256 appCreditUsed;
  address appAddress;
  contract ISuperfluidToken appCreditToken;
}
```

## Fn callAgreementWithContext

```solidity
function callAgreementWithContext(
    contract ISuperAgreement agreementClass,
    bytes callData,
    bytes userData,
    bytes ctx
) 
    external 
    returns (bytes newCtx, bytes returnedData)
```

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `agreementClass` | contract ISuperAgreement |  |
| `callData` | bytes |  |
| `userData` | bytes |  |
| `ctx` | bytes |  |

## Fn callAppActionWithContext

```solidity
function callAppActionWithContext(
    contract ISuperApp app,
    bytes callData,
    bytes ctx
) 
    external 
    returns (bytes newCtx)
```

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `app` | contract ISuperApp |  |
| `callData` | bytes |  |
| `ctx` | bytes |  |

## Fn decodeCtx

```solidity
function decodeCtx(
    bytes ctx
) 
    external 
    returns (struct ISuperfluid.Context context)
```

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `ctx` | bytes |  |

## Fn isCtxValid

```solidity
function isCtxValid(
    bytes ctx
) 
    external 
    returns (bool)
```

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `ctx` | bytes |  |

## struct Operation

```solidity
struct Operation {
  uint32 operationType;
  address target;
  bytes data;
}
```

## Fn batchCall

```solidity
function batchCall(
    struct ISuperfluid.Operation[] operations
) 
    external
```
_Batch call function_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `operations` | struct ISuperfluid.Operation[] | Array of batch operations |

## Fn forwardBatchCall

```solidity
function forwardBatchCall(
    struct ISuperfluid.Operation[] operations
) 
    external
```
_Batch call function for trusted forwarders (EIP-2771)_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `operations` | struct ISuperfluid.Operation[] | Array of batch operations |

