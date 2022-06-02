# ISuperTokenFactory

**Super token factory interface**

## Fn getHost

```solidity
function getHost(
) 
    external 
    returns (address host)
```
_Get superfluid host contract address_

## Fn initialize

```solidity
function initialize(
) 
    external
```
_Initialize the contract_

## Fn getSuperTokenLogic

```solidity
function getSuperTokenLogic(
) 
    external 
    returns (contract ISuperToken superToken)
```
_Get the current super token logic used by the factory_

## Upgradability

```solidity
enum Upgradability {
  NON_UPGRADABLE,
  SEMI_UPGRADABLE,
  FULL_UPGRADABE
}
```

## Fn createERC20Wrapper

```solidity
function createERC20Wrapper(
    contract IERC20 underlyingToken,
    uint8 underlyingDecimals,
    enum ISuperTokenFactory.Upgradability upgradability,
    string name,
    string symbol
) 
    external 
    returns (contract ISuperToken superToken)
```
_Create new super token wrapper for the underlying ERC20 token_

### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `underlyingToken` | contract IERC20 | Underlying ERC20 token |
| `underlyingDecimals` | uint8 | Underlying token decimals |
| `upgradability` | enum ISuperTokenFactory.Upgradability | Upgradability mode |
| `name` | string | Super token name |
| `symbol` | string | Super token symbol |

## Fn createERC20Wrapper

```solidity
function createERC20Wrapper(
    contract ERC20WithTokenInfo underlyingToken,
    enum ISuperTokenFactory.Upgradability upgradability,
    string name,
    string symbol
) 
    external 
    returns (contract ISuperToken superToken)
```
_Create new super token wrapper for the underlying ERC20 token with extra token info_

### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `underlyingToken` | contract ERC20WithTokenInfo | Underlying ERC20 token |
| `upgradability` | enum ISuperTokenFactory.Upgradability | Upgradability mode |
| `name` | string | Super token name |
| `symbol` | string | Super token symbol

NOTE:
- It assumes token provide the .decimals() function |

## Fn initializeCustomSuperToken

```solidity
function initializeCustomSuperToken(
    address customSuperTokenProxy
) 
    external
```

### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `customSuperTokenProxy` | address |  |

## Event SuperTokenLogicCreated

```solidity
event SuperTokenLogicCreated(
    contract ISuperToken tokenLogic
)
```

Super token logic created event

### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `tokenLogic` | contract ISuperToken | Token logic address |
## Event SuperTokenCreated

```solidity
event SuperTokenCreated(
    contract ISuperToken token
)
```

Super token created event

### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperToken | Newly created super token address |
## Event CustomSuperTokenCreated

```solidity
event CustomSuperTokenCreated(
    contract ISuperToken token
)
```

Custom super token created event

### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperToken | Newly created custom super token address |

