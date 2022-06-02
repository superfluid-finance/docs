# SuperAppDefinitions

**Super app definitions library**

## APP_LEVEL_MASK

```solidity
uint256 APP_LEVEL_MASK
```

## APP_LEVEL_FINAL

```solidity
uint256 APP_LEVEL_FINAL
```

## APP_LEVEL_SECOND

```solidity
uint256 APP_LEVEL_SECOND
```

## Fn getAppLevel

```solidity
function getAppLevel(
    uint256 configWord
) 
    internal 
    returns (uint8)
```

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `configWord` | uint256 |  |

## APP_JAIL_BIT

```solidity
uint256 APP_JAIL_BIT
```

## Fn isAppJailed

```solidity
function isAppJailed(
    uint256 configWord
) 
    internal 
    returns (bool)
```

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `configWord` | uint256 |  |

## AGREEMENT_CALLBACK_NOOP_BITMASKS

```solidity
uint256 AGREEMENT_CALLBACK_NOOP_BITMASKS
```

## BEFORE_AGREEMENT_CREATED_NOOP

```solidity
uint256 BEFORE_AGREEMENT_CREATED_NOOP
```

## AFTER_AGREEMENT_CREATED_NOOP

```solidity
uint256 AFTER_AGREEMENT_CREATED_NOOP
```

## BEFORE_AGREEMENT_UPDATED_NOOP

```solidity
uint256 BEFORE_AGREEMENT_UPDATED_NOOP
```

## AFTER_AGREEMENT_UPDATED_NOOP

```solidity
uint256 AFTER_AGREEMENT_UPDATED_NOOP
```

## BEFORE_AGREEMENT_TERMINATED_NOOP

```solidity
uint256 BEFORE_AGREEMENT_TERMINATED_NOOP
```

## AFTER_AGREEMENT_TERMINATED_NOOP

```solidity
uint256 AFTER_AGREEMENT_TERMINATED_NOOP
```

## APP_RULE_REGISTRATION_ONLY_IN_CONSTRUCTOR

```solidity
uint256 APP_RULE_REGISTRATION_ONLY_IN_CONSTRUCTOR
```

## APP_RULE_NO_REGISTRATION_FOR_EOA

```solidity
uint256 APP_RULE_NO_REGISTRATION_FOR_EOA
```

## APP_RULE_NO_REVERT_ON_TERMINATION_CALLBACK

```solidity
uint256 APP_RULE_NO_REVERT_ON_TERMINATION_CALLBACK
```

## APP_RULE_NO_CRITICAL_SENDER_ACCOUNT

```solidity
uint256 APP_RULE_NO_CRITICAL_SENDER_ACCOUNT
```

## APP_RULE_NO_CRITICAL_RECEIVER_ACCOUNT

```solidity
uint256 APP_RULE_NO_CRITICAL_RECEIVER_ACCOUNT
```

## APP_RULE_CTX_IS_READONLY

```solidity
uint256 APP_RULE_CTX_IS_READONLY
```

## APP_RULE_CTX_IS_NOT_CLEAN

```solidity
uint256 APP_RULE_CTX_IS_NOT_CLEAN
```

## APP_RULE_CTX_IS_MALFORMATED

```solidity
uint256 APP_RULE_CTX_IS_MALFORMATED
```

## APP_RULE_COMPOSITE_APP_IS_NOT_WHITELISTED

```solidity
uint256 APP_RULE_COMPOSITE_APP_IS_NOT_WHITELISTED
```

## APP_RULE_COMPOSITE_APP_IS_JAILED

```solidity
uint256 APP_RULE_COMPOSITE_APP_IS_JAILED
```

## APP_RULE_MAX_APP_LEVEL_REACHED

```solidity
uint256 APP_RULE_MAX_APP_LEVEL_REACHED
```

## Fn isConfigWordClean

```solidity
function isConfigWordClean(
    uint256 configWord
) 
    internal 
    returns (bool)
```

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `configWord` | uint256 |  |

# ContextDefinitions

**Context definitions library**

## CALL_INFO_APP_LEVEL_MASK

```solidity
uint256 CALL_INFO_APP_LEVEL_MASK
```

## CALL_INFO_CALL_TYPE_SHIFT

```solidity
uint256 CALL_INFO_CALL_TYPE_SHIFT
```

## CALL_INFO_CALL_TYPE_MASK

```solidity
uint256 CALL_INFO_CALL_TYPE_MASK
```

## CALL_INFO_CALL_TYPE_AGREEMENT

```solidity
uint8 CALL_INFO_CALL_TYPE_AGREEMENT
```

## CALL_INFO_CALL_TYPE_APP_ACTION

```solidity
uint8 CALL_INFO_CALL_TYPE_APP_ACTION
```

## CALL_INFO_CALL_TYPE_APP_CALLBACK

```solidity
uint8 CALL_INFO_CALL_TYPE_APP_CALLBACK
```

## Fn decodeCallInfo

```solidity
function decodeCallInfo(
    uint256 callInfo
) 
    internal 
    returns (uint8 appLevel, uint8 callType)
```

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `callInfo` | uint256 |  |

## Fn encodeCallInfo

```solidity
function encodeCallInfo(
    uint8 appLevel,
    uint8 callType
) 
    internal 
    returns (uint256 callInfo)
```

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `appLevel` | uint8 |  |
| `callType` | uint8 |  |

# FlowOperatorDefinitions

**Flow Operator definitions library**

## AUTHORIZE_FLOW_OPERATOR_CREATE

```solidity
uint8 AUTHORIZE_FLOW_OPERATOR_CREATE
```

## AUTHORIZE_FLOW_OPERATOR_UPDATE

```solidity
uint8 AUTHORIZE_FLOW_OPERATOR_UPDATE
```

## AUTHORIZE_FLOW_OPERATOR_DELETE

```solidity
uint8 AUTHORIZE_FLOW_OPERATOR_DELETE
```

## AUTHORIZE_FULL_CONTROL

```solidity
uint8 AUTHORIZE_FULL_CONTROL
```

## REVOKE_FLOW_OPERATOR_CREATE

```solidity
uint8 REVOKE_FLOW_OPERATOR_CREATE
```

## REVOKE_FLOW_OPERATOR_UPDATE

```solidity
uint8 REVOKE_FLOW_OPERATOR_UPDATE
```

## REVOKE_FLOW_OPERATOR_DELETE

```solidity
uint8 REVOKE_FLOW_OPERATOR_DELETE
```

## Fn isPermissionsClean

```solidity
function isPermissionsClean(
    uint8 permissions
) 
    internal 
    returns (bool)
```

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `permissions` | uint8 |  |

# BatchOperation

**Batch operation library**

## OPERATION_TYPE_ERC20_APPROVE

```solidity
uint32 OPERATION_TYPE_ERC20_APPROVE
```

_ERC20.approve batch operation type

Call spec:
ISuperToken(target).operationApprove(
    abi.decode(data, (address spender, uint256 amount))
)_

## OPERATION_TYPE_ERC20_TRANSFER_FROM

```solidity
uint32 OPERATION_TYPE_ERC20_TRANSFER_FROM
```

_ERC20.transferFrom batch operation type

Call spec:
ISuperToken(target).operationTransferFrom(
    abi.decode(data, (address sender, address recipient, uint256 amount)
)_

## OPERATION_TYPE_SUPERTOKEN_UPGRADE

```solidity
uint32 OPERATION_TYPE_SUPERTOKEN_UPGRADE
```

_SuperToken.upgrade batch operation type

Call spec:
ISuperToken(target).operationUpgrade(
    abi.decode(data, (uint256 amount)
)_

## OPERATION_TYPE_SUPERTOKEN_DOWNGRADE

```solidity
uint32 OPERATION_TYPE_SUPERTOKEN_DOWNGRADE
```

_SuperToken.downgrade batch operation type

Call spec:
ISuperToken(target).operationDowngrade(
    abi.decode(data, (uint256 amount)
)_

## OPERATION_TYPE_SUPERFLUID_CALL_AGREEMENT

```solidity
uint32 OPERATION_TYPE_SUPERFLUID_CALL_AGREEMENT
```

_Superfluid.callAgreement batch operation type

Call spec:
callAgreement(
    ISuperAgreement(target)),
    abi.decode(data, (bytes calldata, bytes userdata)
)_

## OPERATION_TYPE_SUPERFLUID_CALL_APP_ACTION

```solidity
uint32 OPERATION_TYPE_SUPERFLUID_CALL_APP_ACTION
```

_Superfluid.callAppAction batch operation type

Call spec:
callAppAction(
    ISuperApp(target)),
    data
)_

# SuperfluidGovernanceConfigs

**Superfluid governance configs library**

## SUPERFLUID_REWARD_ADDRESS_CONFIG_KEY

```solidity
bytes32 SUPERFLUID_REWARD_ADDRESS_CONFIG_KEY
```

## CFAV1_PPP_CONFIG_KEY

```solidity
bytes32 CFAV1_PPP_CONFIG_KEY
```

## SUPERTOKEN_MINIMUM_DEPOSIT_KEY

```solidity
bytes32 SUPERTOKEN_MINIMUM_DEPOSIT_KEY
```

## Fn getTrustedForwarderConfigKey

```solidity
function getTrustedForwarderConfigKey(
    address forwarder
) 
    internal 
    returns (bytes32)
```

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `forwarder` | address |  |

## Fn getAppRegistrationConfigKey

```solidity
function getAppRegistrationConfigKey(
    address deployer,
    string registrationKey
) 
    internal 
    returns (bytes32)
```

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `deployer` | address |  |
| `registrationKey` | string |  |

## Fn getAppFactoryConfigKey

```solidity
function getAppFactoryConfigKey(
    address factory
) 
    internal 
    returns (bytes32)
```

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `factory` | address |  |

## Fn decodePPPConfig

```solidity
function decodePPPConfig(
    uint256 pppConfig
) 
    internal 
    returns (uint256 liquidationPeriod, uint256 patricianPeriod)
```

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `pppConfig` | uint256 |  |

