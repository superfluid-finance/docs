# ISuperfluidGovernance

**Superfluid governance interface**

## Fn replaceGovernance

```solidity
function replaceGovernance(
    contract ISuperfluid host,
    address newGov
) 
    external
```
_Replace the current governance with a new governance_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `host` | contract ISuperfluid |  |
| `newGov` | address |  |

## Fn registerAgreementClass

```solidity
function registerAgreementClass(
    contract ISuperfluid host,
    address agreementClass
) 
    external
```
_Register a new agreement class_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `host` | contract ISuperfluid |  |
| `agreementClass` | address |  |

## Fn updateContracts

```solidity
function updateContracts(
    contract ISuperfluid host,
    address hostNewLogic,
    address[] agreementClassNewLogics,
    address superTokenFactoryNewLogic
) 
    external
```
_Update logics of the contracts_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `host` | contract ISuperfluid |  |
| `hostNewLogic` | address |  |
| `agreementClassNewLogics` | address[] |  |
| `superTokenFactoryNewLogic` | address |  |

#### Note 

- Because they might have inter-dependencies, it is good to have one single function to update them all

## Fn batchUpdateSuperTokenLogic

```solidity
function batchUpdateSuperTokenLogic(
    contract ISuperfluid host,
    contract ISuperToken[] tokens
) 
    external
```
_Update supertoken logic contract to the latest that is managed by the super token factory_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `host` | contract ISuperfluid |  |
| `tokens` | contract ISuperToken[] |  |

## Fn setConfig

```solidity
function setConfig(
    contract ISuperfluid host,
    contract ISuperfluidToken superToken,
    bytes32 key,
    address value
) 
    external
```
_Set configuration as address value_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `host` | contract ISuperfluid |  |
| `superToken` | contract ISuperfluidToken |  |
| `key` | bytes32 |  |
| `value` | address |  |

## Fn setConfig

```solidity
function setConfig(
    contract ISuperfluid host,
    contract ISuperfluidToken superToken,
    bytes32 key,
    uint256 value
) 
    external
```
_Set configuration as uint256 value_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `host` | contract ISuperfluid |  |
| `superToken` | contract ISuperfluidToken |  |
| `key` | bytes32 |  |
| `value` | uint256 |  |

## Fn clearConfig

```solidity
function clearConfig(
    contract ISuperfluid host,
    contract ISuperfluidToken superToken,
    bytes32 key
) 
    external
```
_Clear configuration_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `host` | contract ISuperfluid |  |
| `superToken` | contract ISuperfluidToken |  |
| `key` | bytes32 |  |

## Fn getConfigAsAddress

```solidity
function getConfigAsAddress(
    contract ISuperfluid host,
    contract ISuperfluidToken superToken,
    bytes32 key
) 
    external 
    returns (address value)
```
_Get configuration as address value_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `host` | contract ISuperfluid |  |
| `superToken` | contract ISuperfluidToken |  |
| `key` | bytes32 |  |

## Fn getConfigAsUint256

```solidity
function getConfigAsUint256(
    contract ISuperfluid host,
    contract ISuperfluidToken superToken,
    bytes32 key
) 
    external 
    returns (uint256 value)
```
_Get configuration as uint256 value_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `host` | contract ISuperfluid |  |
| `superToken` | contract ISuperfluidToken |  |
| `key` | bytes32 |  |

