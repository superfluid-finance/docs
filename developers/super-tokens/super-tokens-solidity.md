---
description: Interacting with Super Tokens in Solidity
---

# Super Tokens - Solidity

Super Tokens have basic ERC20 functionality, some ERC777 functionality, and several functions to accommodate Superfluid Protocol functionality.&#x20;

**Super Token Contract**

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/superfluid/SuperToken.sol" %}

**Super Token Interface**

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol" %}

**Remix Example Contract**

{% embed url="https://remix.ethereum.org/?#gist=3cabe40d7440589167df80116372e549&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.14+commit.80d49f37.js" %}
An example contract that you can deploy to Goerli and use to experiment with Super Tokens in Solidity
{% endembed %}

Notice that the Super Token interface doesn't appear to show any [Super Agreement](../../protocol-overview/in-depth-overview/super-agreements/) functionality (i.e. there's no function in them that starts a stream or does a distribution). Why? Basically, Super Agreements are separate contracts! Computing your Super Token balance is a matter of netting the effects of each Super Agreement into your actual balance. This all happens when you view your balance with `balanceOf`. See this explained in our [Super Token In-Depth Explainer](../../protocol-overview/in-depth-overview/super-tokens.md),

## Getting Set To Interact With Super Tokens

Import the Super Token interface in your .sol file.

```
import { ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";
```

## Interacting With Super Tokens

### **ERC20** Functions

Super Tokens offer you all the basic ERC20 features. Learn more about these functions [here](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20) on OpenZeppelin.

**Interface**

```solidity
function totalSupply() external view override(IERC777, IERC20) returns (uint256);
function balanceOf(address account) external view override(IERC777, IERC20) returns(uint256 balance);
function transfer(address recipient, uint256 amount) external override(IERC20) returns (bool);
function allowance(address owner, address spender) external override(IERC20) view returns (uint256);
function approve(address spender, uint256 amount) external override(IERC20) returns (bool);
function transferFrom(address sender, address recipient, uint256 amount) external override(IERC20) returns (bool);
function increaseAllowance(address spender, uint256 addedValue) external returns (bool);
function decreaseAllowance(address spender, uint256 subtractedValue) external returns (bool);
```

#### Example: Calling `transfer`

```solidity
ISuperToken(superTokenAddress).transfer(receiverAddress, amountToTransfer) 
```

### ERC20 **W**rapping Functions

These are functions for Wrapper Super Tokens to implement such that you can wrap an underlying ERC20 token into and out of the Wrapper Super Token contract. See this [quick explainer](https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-tokens#wrapper) on Wrapper Super Tokens.

**Interface**

```solidity
function getUnderlyingToken() external view returns(address tokenAddr);
function upgrade(uint256 amount) external;
function upgradeTo(address to, uint256 amount, bytes calldata data) external;
function downgrade(uint256 amount) external;
```

#### Example: Using `upgrade` to wrap tokens into Super Tokens

The `upgrade` function does the wrapping using `transferFrom` to pull the underlying ERC20 token from your wallet. As a result, before you can wrap your tokens into Super Tokens, you need to `approve` the Super Token contract to be able to spend your underlying ERC20.&#x20;

```solidity
// approving
IERC20(underlyingTokenAddress).approve(superTokenAddress, amountToWrap)

// wrapping
ISuperToken(superTokenAddress).upgrade(amountToWrap);
```

#### Example: Calling `upgradeTo`

Usage of `upgradeTo` is rare but useful. **** It allows you to designate another address that will receive the upgraded tokens and call the `tokensReceived` implementation on it. Essentially, it combines the ERC777 `send` with plain `upgrade`. &#x20;

```solidity
// approving
IERC20(underlyingTokenAddress).approve(superTokenAddress, amountToWrap)

// using upgradeTo (use "0x" for calldata if you don't want to pass in anything)
ISuperToken(superTokenAddress).upgradeTo(receiverAddress, amountToWrap, "0x");
```

#### Example: Using `downgrade` to unwrap Super Tokens

Unwrap your Super Tokens into the underlying ERC20 tokens.

```solidity
// unwrapping
ISuperToken(superTokenAddress).downgrade(amountToUnwrap)
```

### **ERC777** Functions

Super Tokens also have some ERC777 features. Learn more about these functions [here](https://docs.openzeppelin.com/contracts/2.x/api/token/erc777) on OpenZeppelin. Note that not all ERC777 functionality is available - read more below 👇

{% content-ref url="super-tokens/erc777-in-super-tokens.md" %}
[erc777-in-super-tokens.md](super-tokens/erc777-in-super-tokens.md)
{% endcontent-ref %}

#### Interface

```solidity
function granularity() external view override(IERC777) returns (uint256);
function send(address recipient, uint256 amount, bytes calldata data) external override(IERC777);
function burn(uint256 amount, bytes calldata data) external override(IERC777);
function isOperatorFor(address operator, address tokenHolder) external override(IERC777) view returns (bool);
function authorizeOperator(address operator) external override(IERC777);
function revokeOperator(address operator) external override(IERC777);
function defaultOperators() external override(IERC777) view returns (address[] memory);
function operatorSend(
    address sender,
    address recipient,
    uint256 amount,
    bytes calldata data,
    bytes calldata operatorData
) external override(IERC777);
function operatorBurn(
    address account,
    uint256 amount,
    bytes calldata data,
    bytes calldata operatorData
) external override(IERC777);
```

### Full Super Token Interface

See our GitHub for full comments

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol" %}

<pre class="language-solidity"><code class="lang-solidity">interface ISuperToken is ISuperfluidToken, TokenInfo, IERC20, IERC777 {

    function initialize(
        IERC20 underlyingToken,
        uint8 underlyingDecimals,
        string calldata n,
        string calldata s
    ) external;

    /**************************************************************************
    * TokenInfo &#x26; ERC777
    *************************************************************************/

    function name() external view override(IERC777, TokenInfo) returns (string memory);
    function symbol() external view override(IERC777, TokenInfo) returns (string memory);
    function decimals() external view override(TokenInfo) returns (uint8);
    
    /**************************************************************************
    * ERC20 &#x26; ERC777
    *************************************************************************/
    
    function totalSupply() external view override(IERC777, IERC20) returns (uint256);
    function balanceOf(address account) external view override(IERC777, IERC20) returns(uint256 balance);
    
    
    /**************************************************************************
    * ERC20
    *************************************************************************/
    
<strong>    function transfer(address recipient, uint256 amount) external override(IERC20) returns (bool);
</strong>    function allowance(address owner, address spender) external override(IERC20) view returns (uint256);
    function approve(address spender, uint256 amount) external override(IERC20) returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external override(IERC20) returns (bool);
    function increaseAllowance(address spender, uint256 addedValue) external returns (bool);
    function decreaseAllowance(address spender, uint256 subtractedValue) external returns (bool);

    /**************************************************************************
    * ERC777
    *************************************************************************/

    function granularity() external view override(IERC777) returns (uint256);
    function send(address recipient, uint256 amount, bytes calldata data) external override(IERC777);
    function burn(uint256 amount, bytes calldata data) external override(IERC777);
    function isOperatorFor(address operator, address tokenHolder) external override(IERC777) view returns (bool);
    function authorizeOperator(address operator) external override(IERC777);
    function revokeOperator(address operator) external override(IERC777);
    function defaultOperators() external override(IERC777) view returns (address[] memory);
    function operatorSend(
        address sender,
        address recipient,
        uint256 amount,
        bytes calldata data,
        bytes calldata operatorData
    ) external override(IERC777);
    function operatorBurn(
        address account,
        uint256 amount,
        bytes calldata data,
        bytes calldata operatorData
    ) external override(IERC777);
    
    /**************************************************************************
     * SuperToken custom token functions
     *************************************************************************/
    
    function selfMint(
        address account,
        uint256 amount,
        bytes memory userData
    ) external;
   function selfBurn(
       address account,
       uint256 amount,
       bytes memory userData
   ) external;
   function selfTransferFrom(
        address sender,
        address spender,
        address recipient,
        uint256 amount
   ) external;
   function selfApproveFor(
        address account,
        address spender,
        uint256 amount
   ) external;
    
   /**************************************************************************
    * SuperToken extra functions
    *************************************************************************/

   function transferAll(address recipient) external;
   
   /**************************************************************************
   * ERC20 wrapping
   *************************************************************************/
   
   function getUnderlyingToken() external view returns(address tokenAddr);
   function upgrade(uint256 amount) external;
   function upgradeTo(address to, uint256 amount, bytes calldata data) external;
   function downgrade(uint256 amount) external;
   
   /**************************************************************************
   * Batch Operations
   *************************************************************************/
   
   function operationApprove(
        address account,
        address spender,
        uint256 amount
   ) external;
   function operationTransferFrom(
        address account,
        address spender,
        address recipient,
        uint256 amount
   ) external;
   function operationUpgrade(address account, uint256 amount) external;
   function operationDowngrade(address account, uint256 amount) external;
   
}
</code></pre>

### Native Asset Super Tokens

Note that native asset super tokens work a bit differently. Here is the interface for ETHx (SETH.sol), but this also applies to other native assets like MATICx or AVAXx.

Tokens are wrapped by sending a transfer of that native asset to the token contract, where a `receive()` function is implemented to handle the wrapping on reciept. Downgrading is done using `downgradeToETH`.

```solidity
// SPDX-License-Identifier: AGPLv3
pragma solidity 0.8.16;

import {
    ISuperToken,
    CustomSuperTokenBase
}
from "../interfaces/superfluid/CustomSuperTokenBase.sol";
import { ISETHCustom } from "../interfaces/tokens/ISETH.sol";
import { UUPSProxy } from "../upgradability/UUPSProxy.sol";

/**
 * @dev Super ETH (SETH) custom super token implementation
 * @author Superfluid
 *
 * It is also called a Native-Asset Super Token.
 */
contract SETHProxy is ISETHCustom, CustomSuperTokenBase, UUPSProxy {
    event TokenUpgraded(address indexed account, uint256 amount);
    event TokenDowngraded(address indexed account, uint256 amount);

    // fallback function which mints Super Tokens for received ETH
    receive() external payable override {
        ISuperToken(address(this)).selfMint(msg.sender, msg.value, new bytes(0));
        emit TokenUpgraded(msg.sender, msg.value);
    }

    function upgradeByETH() external override payable {
        ISuperToken(address(this)).selfMint(msg.sender, msg.value, new bytes(0));
        emit TokenUpgraded(msg.sender, msg.value);
    }

    function upgradeByETHTo(address to) external override payable {
        ISuperToken(address(this)).selfMint(to, msg.value, new bytes(0));
        emit TokenUpgraded(to, msg.value);
    }

    function downgradeToETH(uint wad) external override {
        ISuperToken(address(this)).selfBurn(msg.sender, wad, new bytes(0));
        payable(msg.sender).transfer(wad);
        emit TokenDowngraded(msg.sender, wad);
    }
}
```
