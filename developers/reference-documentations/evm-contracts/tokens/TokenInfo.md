# TokenInfo

**ERC20 token info interface**

ERC20 standard interface does not specify these functions, but
     often the token implementations have them.

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
called.

NOTE: This information is only used for _display_ purposes: it in
no way affects any of the arithmetic of the contract, including
{IERC20-balanceOf} and {IERC20-transfer}._

