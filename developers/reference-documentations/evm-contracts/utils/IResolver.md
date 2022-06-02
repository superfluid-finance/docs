# IResolver

**Abstraction for an address resolver contract**

## Event Set

```solidity
event Set(
    string name,
    address target
)
```

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `name` | string |  |
| `target` | address |  |

## Fn set

```solidity
function set(
    string name,
    address target
) 
    external
```
_Set resolver address name_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `name` | string |  |
| `target` | address |  |

## Fn get

```solidity
function get(
    string name
) 
    external 
    returns (address)
```
_Get address by name_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `name` | string |  |

