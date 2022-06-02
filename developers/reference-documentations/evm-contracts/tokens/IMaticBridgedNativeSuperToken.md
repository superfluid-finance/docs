# IMaticBridgedNativeSuperTokenCustom

**Matic Bridged Native SuperToken Custom interface**

Functionality specific for Matic Bridged Native Super Tokens

## Fn deposit

```solidity
function deposit(
    address user,
    bytes depositData
) 
    external
```
_triggers minting of tokens to the given user, called by the child chain manager_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `user` | address |  |
| `depositData` | bytes |  |

## Fn withdraw

```solidity
function withdraw(
    uint256 amount
) 
    external
```
_triggers burning of tokens on the child chain and unlocking on L1_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `amount` | uint256 |  |

## Fn updateChildChainManager

```solidity
function updateChildChainManager(
    address newChildChainManager
) 
    external
```
_governance can change the child chain manager_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `newChildChainManager` | address |  |

## Event ChildChainManagerChanged

```solidity
event ChildChainManagerChanged(
    address newAddress
)
```

emitted when the child chain manager changes

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `newAddress` | address |  |

# IMaticBridgedNativeSuperToken

Matic Bridged Native SuperToken full interface

