# ISuperToken

**Super token (Superfluid Token + ERC20 + ERC777) interface**

## SUPER_TOKEN_CALLER_IS_NOT_OPERATOR_FOR_HOLDER

```solidity
error SUPER_TOKEN_CALLER_IS_NOT_OPERATOR_FOR_HOLDER()
```

## SUPER_TOKEN_NOT_ERC777_TOKENS_RECIPIENT

```solidity
error SUPER_TOKEN_NOT_ERC777_TOKENS_RECIPIENT()
```

## SUPER_TOKEN_INFLATIONARY_DEFLATIONARY_NOT_SUPPORTED

```solidity
error SUPER_TOKEN_INFLATIONARY_DEFLATIONARY_NOT_SUPPORTED()
```

## SUPER_TOKEN_NO_UNDERLYING_TOKEN

```solidity
error SUPER_TOKEN_NO_UNDERLYING_TOKEN()
```

## SUPER_TOKEN_ONLY_SELF

```solidity
error SUPER_TOKEN_ONLY_SELF()
```

## SUPER_TOKEN_ONLY_HOST

```solidity
error SUPER_TOKEN_ONLY_HOST()
```

## SUPER_TOKEN_APPROVE_FROM_ZERO_ADDRESS

```solidity
error SUPER_TOKEN_APPROVE_FROM_ZERO_ADDRESS()
```

## SUPER_TOKEN_APPROVE_TO_ZERO_ADDRESS

```solidity
error SUPER_TOKEN_APPROVE_TO_ZERO_ADDRESS()
```

## SUPER_TOKEN_BURN_FROM_ZERO_ADDRESS

```solidity
error SUPER_TOKEN_BURN_FROM_ZERO_ADDRESS()
```

## SUPER_TOKEN_MINT_TO_ZERO_ADDRESS

```solidity
error SUPER_TOKEN_MINT_TO_ZERO_ADDRESS()
```

## SUPER_TOKEN_TRANSFER_FROM_ZERO_ADDRESS

```solidity
error SUPER_TOKEN_TRANSFER_FROM_ZERO_ADDRESS()
```

## SUPER_TOKEN_TRANSFER_TO_ZERO_ADDRESS

```solidity
error SUPER_TOKEN_TRANSFER_TO_ZERO_ADDRESS()
```

## Fn initialize

```solidity
function initialize(
    contract IERC20 underlyingToken,
    uint8 underlyingDecimals,
    string n,
    string s
) 
    external
```
_Initialize the contract_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `underlyingToken` | contract IERC20 |  |
| `underlyingDecimals` | uint8 |  |
| `n` | string |  |
| `s` | string |  |

## Fn name

```solidity
function name(
) 
    external 
    returns (string)
```
_Returns the name of the token._

## Fn symbol

```solidity
function symbol(
) 
    external 
    returns (string)
```
_Returns the symbol of the token, usually a shorter version of the
name._

## Fn decimals

```solidity
function decimals(
) 
    external 
    returns (uint8)
```
_Returns the number of decimals used to get its user representation.
For example, if `decimals` equals `2`, a balance of `505` tokens should
be displayed to a user as `5,05` (`505 / 10 ** 2`).

Tokens usually opt for a value of 18, imitating the relationship between
Ether and Wei. This is the value {ERC20} uses, unless {_setupDecimals} is
called._

#### Note 

SuperToken always uses 18 decimals.

This information is only used for _display_ purposes: it in
no way affects any of the arithmetic of the contract, including
{IERC20-balanceOf} and {IERC20-transfer}.

## Fn totalSupply

```solidity
function totalSupply(
) 
    external 
    returns (uint256)
```
_See {IERC20-totalSupply}._

## Fn balanceOf

```solidity
function balanceOf(
    address account
) 
    external 
    returns (uint256 balance)
```
_Returns the amount of tokens owned by an account (`owner`)._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `account` | address |  |

## Fn transfer

```solidity
function transfer(
    address recipient,
    uint256 amount
) 
    external 
    returns (bool)
```
_Moves `amount` tokens from the caller's account to `recipient`._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `recipient` | address |  |
| `amount` | uint256 |  |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `[0]` | bool | Returns Success a boolean value indicating whether the operation succeeded. |

#### Emits 

a {Transfer} event.

## Fn allowance

```solidity
function allowance(
    address owner,
    address spender
) 
    external 
    returns (uint256)
```
_Returns the remaining number of tokens that `spender` will be
        allowed to spend on behalf of `owner` through {transferFrom}. This is
        zero by default._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `owner` | address |  |
| `spender` | address |  |

This value changes when {approve} or {transferFrom} are called.

## Fn approve

```solidity
function approve(
    address spender,
    uint256 amount
) 
    external 
    returns (bool)
```
_Sets `amount` as the allowance of `spender` over the caller's tokens._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `spender` | address |  |
| `amount` | uint256 |  |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `[0]` | bool | Returns Success a boolean value indicating whether the operation succeeded. |

#### Note 

Beware that changing an allowance with this method brings the risk
that someone may use both the old and the new allowance by unfortunate
transaction ordering. One possible solution to mitigate this race
condition is to first reduce the spender&#x27;s allowance to 0 and set the
desired value afterwards:
https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729

#### Emits 

an {Approval} event.

## Fn transferFrom

```solidity
function transferFrom(
    address sender,
    address recipient,
    uint256 amount
) 
    external 
    returns (bool)
```
_Moves `amount` tokens from `sender` to `recipient` using the
        allowance mechanism. `amount` is then deducted from the caller's
        allowance._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `sender` | address |  |
| `recipient` | address |  |
| `amount` | uint256 |  |

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `[0]` | bool | Returns Success a boolean value indicating whether the operation succeeded. |

#### Emits 

a {Transfer} event.

## Fn increaseAllowance

```solidity
function increaseAllowance(
    address spender,
    uint256 addedValue
) 
    external 
    returns (bool)
```
_Atomically increases the allowance granted to `spender` by the caller.

This is an alternative to {approve} that can be used as a mitigation for
problems described in {IERC20-approve}._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `spender` | address |  |
| `addedValue` | uint256 |  |

#### Emits 

an {Approval} event indicating the updated allowance.

#### Requirements 

- &#x60;spender&#x60; cannot be the zero address.

## Fn decreaseAllowance

```solidity
function decreaseAllowance(
    address spender,
    uint256 subtractedValue
) 
    external 
    returns (bool)
```
_Atomically decreases the allowance granted to `spender` by the caller.

This is an alternative to {approve} that can be used as a mitigation for
problems described in {IERC20-approve}._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `spender` | address |  |
| `subtractedValue` | uint256 |  |

#### Emits 

an {Approval} event indicating the updated allowance.

#### Requirements 

- &#x60;spender&#x60; cannot be the zero address.
- &#x60;spender&#x60; must have allowance for the caller of at least
&#x60;subtractedValue&#x60;.

## Fn granularity

```solidity
function granularity(
) 
    external 
    returns (uint256)
```
_Returns the smallest part of the token that is not divisible. This
        means all token operations (creation, movement and destruction) must have
        amounts that are a multiple of this number._

#### Note 

For super token contracts, this value is always 1

## Fn send

```solidity
function send(
    address recipient,
    uint256 amount,
    bytes data
) 
    external
```
_Moves `amount` tokens from the caller's account to `recipient`.

If send or receive hooks are registered for the caller and `recipient`,
     the corresponding functions will be called with `data` and empty
     `operatorData`. See {IERC777Sender} and {IERC777Recipient}._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `recipient` | address |  |
| `amount` | uint256 |  |
| `data` | bytes |  |

#### Emits 

a {Sent} event.

#### Requirements 

- the caller must have at least &#x60;amount&#x60; tokens.
- &#x60;recipient&#x60; cannot be the zero address.
- if &#x60;recipient&#x60; is a contract, it must implement the {IERC777Recipient}
interface.

## Fn burn

```solidity
function burn(
    uint256 amount,
    bytes data
) 
    external
```
_Destroys `amount` tokens from the caller's account, reducing the
total supply.

If a send hook is registered for the caller, the corresponding function
will be called with `data` and empty `operatorData`. See {IERC777Sender}._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `amount` | uint256 |  |
| `data` | bytes |  |

#### Emits 

a {Burned} event.

#### Requirements 

- the caller must have at least &#x60;amount&#x60; tokens.

## Fn isOperatorFor

```solidity
function isOperatorFor(
    address operator,
    address tokenHolder
) 
    external 
    returns (bool)
```
_Returns true if an account is an operator of `tokenHolder`.
Operators can send and burn tokens on behalf of their owners. All
accounts are their own operator.

See {operatorSend} and {operatorBurn}._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `operator` | address |  |
| `tokenHolder` | address |  |

## Fn authorizeOperator

```solidity
function authorizeOperator(
    address operator
) 
    external
```
_Make an account an operator of the caller.

See {isOperatorFor}._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `operator` | address |  |

#### Emits 

an {AuthorizedOperator} event.

#### Requirements 

- &#x60;operator&#x60; cannot be calling address.

## Fn revokeOperator

```solidity
function revokeOperator(
    address operator
) 
    external
```
_Revoke an account's operator status for the caller.

See {isOperatorFor} and {defaultOperators}._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `operator` | address |  |

#### Emits 

a {RevokedOperator} event.

#### Requirements 

- &#x60;operator&#x60; cannot be calling address.

## Fn defaultOperators

```solidity
function defaultOperators(
) 
    external 
    returns (address[])
```
_Returns the list of default operators. These accounts are operators
for all token holders, even if {authorizeOperator} was never called on
them.

This list is immutable, but individual holders may revoke these via
{revokeOperator}, in which case {isOperatorFor} will return false._

## Fn operatorSend

```solidity
function operatorSend(
    address sender,
    address recipient,
    uint256 amount,
    bytes data,
    bytes operatorData
) 
    external
```
_Moves `amount` tokens from `sender` to `recipient`. The caller must
be an operator of `sender`.

If send or receive hooks are registered for `sender` and `recipient`,
the corresponding functions will be called with `data` and
`operatorData`. See {IERC777Sender} and {IERC777Recipient}._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `sender` | address |  |
| `recipient` | address |  |
| `amount` | uint256 |  |
| `data` | bytes |  |
| `operatorData` | bytes |  |

#### Emits 

a {Sent} event.

#### Requirements 

- &#x60;sender&#x60; cannot be the zero address.
- &#x60;sender&#x60; must have at least &#x60;amount&#x60; tokens.
- the caller must be an operator for &#x60;sender&#x60;.
- &#x60;recipient&#x60; cannot be the zero address.
- if &#x60;recipient&#x60; is a contract, it must implement the {IERC777Recipient}
interface.

## Fn operatorBurn

```solidity
function operatorBurn(
    address account,
    uint256 amount,
    bytes data,
    bytes operatorData
) 
    external
```
_Destroys `amount` tokens from `account`, reducing the total supply.
The caller must be an operator of `account`.

If a send hook is registered for `account`, the corresponding function
will be called with `data` and `operatorData`. See {IERC777Sender}._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `account` | address |  |
| `amount` | uint256 |  |
| `data` | bytes |  |
| `operatorData` | bytes |  |

#### Emits 

a {Burned} event.

#### Requirements 

- &#x60;account&#x60; cannot be the zero address.
- &#x60;account&#x60; must have at least &#x60;amount&#x60; tokens.
- the caller must be an operator for &#x60;account&#x60;.

## Fn selfMint

```solidity
function selfMint(
    address account,
    uint256 amount,
    bytes userData
) 
    external
```
_Mint new tokens for the account_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `account` | address |  |
| `amount` | uint256 |  |
| `userData` | bytes |  |

#### Modifiers 

 - onlySelf

## Fn selfBurn

```solidity
function selfBurn(
    address account,
    uint256 amount,
    bytes userData
) 
    external
```
_Burn existing tokens for the account_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `account` | address |  |
| `amount` | uint256 |  |
| `userData` | bytes |  |

#### Modifiers 

 - onlySelf

## Fn selfTransferFrom

```solidity
function selfTransferFrom(
    address sender,
    address spender,
    address recipient,
    uint256 amount
) 
    external
```
_Transfer `amount` tokens from the `sender` to `recipient`.
If `spender` isn't the same as `sender`, checks if `spender` has allowance to
spend tokens of `sender`._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `sender` | address |  |
| `spender` | address |  |
| `recipient` | address |  |
| `amount` | uint256 |  |

#### Modifiers 

 - onlySelf

## Fn selfApproveFor

```solidity
function selfApproveFor(
    address account,
    address spender,
    uint256 amount
) 
    external
```
_Give `spender`, `amount` allowance to spend the tokens of
`account`._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `account` | address |  |
| `spender` | address |  |
| `amount` | uint256 |  |

#### Modifiers 

 - onlySelf

## Fn transferAll

```solidity
function transferAll(
    address recipient
) 
    external
```
_Transfer all available balance from `msg.sender` to `recipient`_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `recipient` | address |  |

## Fn getUnderlyingToken

```solidity
function getUnderlyingToken(
) 
    external 
    returns (address tokenAddr)
```
_Return the underlying token contract_

#### Return Values

| Name | Type | Description |
| :--- | :--- | :---------- |
| `tokenAddr` | address | Underlying token address |

## Fn upgrade

```solidity
function upgrade(
    uint256 amount
) 
    external
```
_Upgrade ERC20 to SuperToken._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `amount` | uint256 | Number of tokens to be upgraded (in 18 decimals) |

#### Note 

It will use &#x60;transferFrom&#x60; to get tokens. Before calling this
function you should &#x60;approve&#x60; this contract

## Fn upgradeTo

```solidity
function upgradeTo(
    address to,
    uint256 amount,
    bytes data
) 
    external
```
_Upgrade ERC20 to SuperToken and transfer immediately_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `to` | address | The account to received upgraded tokens |
| `amount` | uint256 | Number of tokens to be upgraded (in 18 decimals) |
| `data` | bytes | User data for the TokensRecipient callback |

#### Note 

It will use &#x60;transferFrom&#x60; to get tokens. Before calling this
function you should &#x60;approve&#x60; this contract
## Event TokenUpgraded

```solidity
event TokenUpgraded(
    address account,
    uint256 amount
)
```

Token upgrade event

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `account` | address | Account where tokens are upgraded to |
| `amount` | uint256 | Amount of tokens upgraded (in 18 decimals) |

## Fn downgrade

```solidity
function downgrade(
    uint256 amount
) 
    external
```
_Downgrade SuperToken to ERC20.
It will call transfer to send tokens_

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `amount` | uint256 | Number of tokens to be downgraded |

## Event TokenDowngraded

```solidity
event TokenDowngraded(
    address account,
    uint256 amount
)
```

Token downgrade event

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `account` | address | Account whose tokens are upgraded |
| `amount` | uint256 | Amount of tokens downgraded |

## Fn operationApprove

```solidity
function operationApprove(
    address account,
    address spender,
    uint256 amount
) 
    external
```
_Perform ERC20 approve by host contract._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `account` | address | The account owner to be approved. |
| `spender` | address | The spender of account owner's funds. |
| `amount` | uint256 | Number of tokens to be approved. |

#### Modifiers 

 - onlyHost

## Fn operationTransferFrom

```solidity
function operationTransferFrom(
    address account,
    address spender,
    address recipient,
    uint256 amount
) 
    external
```
_Perform ERC20 transfer from by host contract._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `account` | address | The account to spend sender's funds. |
| `spender` | address | The account where the funds is sent from. |
| `recipient` | address | The recipient of thefunds. |
| `amount` | uint256 | Number of tokens to be transferred. |

#### Modifiers 

 - onlyHost

## Fn operationUpgrade

```solidity
function operationUpgrade(
    address account,
    uint256 amount
) 
    external
```
_Upgrade ERC20 to SuperToken by host contract._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `account` | address | The account to be changed. |
| `amount` | uint256 | Number of tokens to be upgraded (in 18 decimals) |

#### Modifiers 

 - onlyHost

## Fn operationDowngrade

```solidity
function operationDowngrade(
    address account,
    uint256 amount
) 
    external
```
_Downgrade ERC20 to SuperToken by host contract._

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `account` | address | The account to be changed. |
| `amount` | uint256 | Number of tokens to be downgraded (in 18 decimals) |

#### Modifiers 

 - onlyHost

