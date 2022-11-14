# ISuperTokenFactory

**Super token factory interface**

## SUPER_TOKEN_FACTORY_ALREADY_EXISTS

```solidity
error SUPER_TOKEN_FACTORY_ALREADY_EXISTS()
```

## SUPER_TOKEN_FACTORY_DOES_NOT_EXIST

```solidity
error SUPER_TOKEN_FACTORY_DOES_NOT_EXIST()
```

## SUPER_TOKEN_FACTORY_UNINITIALIZED

```solidity
error SUPER_TOKEN_FACTORY_UNINITIALIZED()
```

## SUPER_TOKEN_FACTORY_ONLY_HOST

```solidity
error SUPER_TOKEN_FACTORY_ONLY_HOST()
```

## SUPER_TOKEN_FACTORY_ZERO_ADDRESS

```solidity
error SUPER_TOKEN_FACTORY_ZERO_ADDRESS()
```

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
  FULL_UPGRADABLE
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

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `underlyingToken` | contract IERC20 | Underlying ERC20 token |
| `underlyingDecimals` | uint8 | Underlying token decimals |
| `upgradability` | enum ISuperTokenFactory.Upgradability | Upgradability mode |
| `name` | string | Super token name |
| `symbol` | string | Super token symbol |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `superToken` | contract ISuperToken | The deployed and initialized wrapper super token |

Create new super token wrapper for the underlying ERC20 token

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

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `underlyingToken` | contract ERC20WithTokenInfo | Underlying ERC20 token |
| `upgradability` | enum ISuperTokenFactory.Upgradability | Upgradability mode |
| `name` | string | Super token name |
| `symbol` | string | Super token symbol |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `superToken` | contract ISuperToken | The deployed and initialized wrapper super token
NOTE:
- It assumes token provide the .decimals() function |

Create new super token wrapper for the underlying ERC20 token with extra token info

## Fn createCanonicalERC20Wrapper

```solidity
function createCanonicalERC20Wrapper(
    contract ERC20WithTokenInfo _underlyingToken
) 
    external 
    returns (contract ISuperToken)
```
_salt for create2 is the keccak256 hash of abi.encode(address(_underlyingToken))_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `_underlyingToken` | contract ERC20WithTokenInfo | Underlying ERC20 token |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `[0]` | contract ISuperToken | ISuperToken the created supertoken |

Creates a wrapper super token AND sets it in the canonical list OR reverts if it already exists

## Fn computeCanonicalERC20WrapperAddress

```solidity
function computeCanonicalERC20WrapperAddress(
    address _underlyingToken
) 
    external 
    returns (address superTokenAddress, bool isDeployed)
```
_We return from our canonical list if it already exists, otherwise we compute it
note that this function only computes addresses for SEMI_UPGRADABLE SuperTokens_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `_underlyingToken` | address | Underlying ERC20 token address |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `superTokenAddress` | address | Super token address |
| `isDeployed` | bool | whether the super token is deployed AND set in the canonical mapping |

Computes/Retrieves wrapper super token address given the underlying token address

## Fn getCanonicalERC20Wrapper

```solidity
function getCanonicalERC20Wrapper(
    address _underlyingTokenAddress
) 
    external 
    returns (address superTokenAddress)
```
_We return the address if it exists and the zero address otherwise_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `_underlyingTokenAddress` | address | Underlying ERC20 token address |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `superTokenAddress` | address | Super token address |

Gets the canonical ERC20 wrapper super token address given the underlying token address

## Fn initializeCustomSuperToken

```solidity
function initializeCustomSuperToken(
    address customSuperTokenProxy
) 
    external
```
_Creates a new custom super token_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `customSuperTokenProxy` | address | address of the custom supertoken proxy |

## Event SuperTokenLogicCreated

```solidity
event SuperTokenLogicCreated(
    contract ISuperToken tokenLogic
)
```

Super token logic created event

#### Parameters

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

#### Parameters

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

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `token` | contract ISuperToken | Newly created custom super token address |

