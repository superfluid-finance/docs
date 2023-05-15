---
description: Making building Super Apps easier than ever
---

# SuperAppBaseFlow

{% hint style="warning" %}
You may see the name "SuperAppBaseCFA" instead of SuperAppBaseFlow around our [super-examples repo](https://github.com/superfluid-finance/super-examples). We are in the process or renaming; eventually all mentions of SuperAppBaseCFA will be replaced with SuperAppBaseFlow.
{% endhint %}

## What is the SuperAppBaseFlow

The SuperAppBaseFlow is an inheritable base contract that simplifies writing callbacks and abstracts away the redundancies of writing Super Apps. It can be used in lieu of the SuperAppBase.

#### SuperAppBaseFlow Code

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/blob/dev/packages/ethereum-contracts/contracts/apps/SuperAppBaseFlow.sol" %}

#### Example Usage - Growing NFT Example Using SuperAppBaseFlow

{% embed url="https://github.com/superfluid-finance/super-examples/blob/c784d239557d6fb5e56a2c8951ac4353256d611d/projects/growing-nft/contracts/Flower.sol" %}

## SuperAppBaseFlow Simplifies Callbacks

The original _SuperAppBase_ callback function headers are elaborate with unobvious parameter meanings. The SuperAppBase_Flow_ consolidates all callback development into 3 virtual functions (`onFlowCreated`, `onFlowUpdated`, `onFlowDeleted`) with much more readable parameters, making development easier for you.

<figure><img src="../../.gitbook/assets/image (30).png" alt=""><figcaption><p>Example: onFlowCreated is a more intuitive function than afterAgreementCreated </p></figcaption></figure>

## Using the SuperAppBaseFlow

### Import and Inherit

```solidity
// Example Code
...
import { SuperAppBaseCFA } from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBaseFlow.sol";

contract SomeSuperAppContract is SuperAppBaseCFA {
...
```

### Constructor

```solidity
constructor(
    ISuperfluid host_,
    bool activateOnCreated,
    bool activateOnUpdated,
    bool activateOnDeleted
)
```

**`host_`** - The address of the Superfluid Host for the network of choice. Find addresses [here](../networks.md).

**`activateOnCreated`** - True if the Super App will implement `onFlowCreated` to react to the creation of streams to it. False otherwise.

**`activateOnUpdated`** - True if the Super App will implement `onFlowUpdated` to react to the updating of streams being sent to it. False otherwise.

**`activateOnDeleted`** - True if the Super App will implement `onFlowDeleted` to react to the deletion of streams being sent to it. False otherwise.

### Token Acceptance

The SuperAppBaseFlow exposes a virtual `isAcceptedSuperToken` function, which can be overridden to specify streams of which Super Tokens the Super App's callbacks can react to.

You can forgo it and just use your own functions/modifiers/etc., but using `isAcceptedSuperToken` is the simplest and most convenient way to set up Super Token acceptance.

```solidity
 /**
  * @dev Optional (positive) filter for accepting only specific SuperTokens.
  *      The default implementation accepts all SuperTokens.
  *      Can be overridden by the SuperApp in order to apply arbitrary filters.
  */
 function isAcceptedSuperToken(ISuperToken /*superToken*/) public view virtual returns (bool) {
     return true;
 }
```

{% hint style="warning" %}
Every Super App ought to have functionality to restrict which Super Tokens can trigger callbacks to protect against vulnerabilities from malicious custom Super Tokens.
{% endhint %}

### Callback Functions

#### **`onFlowCreated`**

Override with custom logic that will trigger when a new flow to the Super App is **created**.

[Example from Tradeable Cashflow Example Project](https://github.com/superfluid-finance/super-examples/blob/main/projects/tradeable-cashflow/contracts/RedirectAll.sol#L90)

```solidity
/// @dev override if the SuperApp shall have custom logic invoked when a new flow
///      to it is created.
function onFlowCreated(
    ISuperToken superToken,
    address sender,
    bytes calldata ctx
) internal virtual returns (bytes memory /*newCtx*/) {
    return ctx;
}
```

| Parameter    | Description                                                                                                                                                                                                                                                                                                                            |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `superToken` | Super Token being streamed to the Super App                                                                                                                                                                                                                                                                                            |
| `sender`     | Address streaming `superToken` to the Super App                                                                                                                                                                                                                                                                                        |
| `ctx`        | <p>Contains the context of the stream being modified to the Super App. </p><p></p><p>The context gets updated when Super Agreement modifications are done in the callback body (<a href="super-app-callbacks/calling-agreements-in-super-apps.md">learn more</a>).<br><br>The context must be returned at the end of the callback.</p> |

#### `onFlowUpdated`

Override with custom logic that will trigger when an existing flow to the Super App is **updated**.

[Example from Growing NFT Example Project](https://github.com/superfluid-finance/super-examples/blob/main/projects/growing-nft/contracts/Flower.sol#L110)

```solidity
/// @dev override if the SuperApp shall have custom logic invoked when an existing flow
///      to it is updated (flowrate change).
function onFlowUpdated(
    ISuperToken superToken,
    address sender,
    int96 previousFlowRate,
    uint256 lastUpdated,
    bytes calldata ctx
) internal virtual returns (bytes memory /*newCtx*/) {
    return ctx;
}
```

| Parameter          | Description                                                                                                                                                                                                                                                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `superToken`       | Super Token being streamed to the Super App                                                                                                                                                                                                                                                                                            |
| `sender`           | Address streaming `superToken` to the Super App                                                                                                                                                                                                                                                                                        |
| `previousFlowRate` | The flow rate of the sender's stream to the Super App before the latest update.                                                                                                                                                                                                                                                        |
| `lastUpdated`      | The timestamp of when a sender's stream to the Super App was last modified.                                                                                                                                                                                                                                                            |
| `ctx`              | <p>Contains the context of the stream being modified to the Super App. </p><p></p><p>The context gets updated when Super Agreement modifications are done in the callback body (<a href="super-app-callbacks/calling-agreements-in-super-apps.md">learn more</a>).<br><br>The context must be returned at the end of the callback.</p> |

#### `onFlowDeleted`

Override with custom logic that will trigger when an existing flow to the Super App is **deleted**.&#x20;

[Example from Borrow Against Salary Example Project](https://github.com/superfluid-finance/super-examples/blob/main/projects/borrow-against-salary/contracts/EmploymentLoan.sol#L365)

{% hint style="danger" %}
If`onFlowDeleted` ever reverts, your [Super App will get "jailed](super-app.md#super-app-rules-jail-system)" causing its callbacks to no longer trigger in response to stream modifications. So, write your`onFlowDeleted` code such that it won't revert! Be careful with your logic and think about using try/catches where necessary.
{% endhint %}

```solidity
/// @dev override if the SuperApp shall have custom logic invoked when an existing flow
///      to it is deleted (flow rate set to 0).
///      Unlike the other callbacks, this method is NOT allowed to revert.
///      Failing to satisfy that requirement leads to jailing (defunct SuperApp).
function onFlowDeleted(
    ISuperToken superToken,
    address sender,
    address receiver,
    int96 previousFlowRate,
    uint256 lastUpdated,
    bytes calldata ctx
) internal virtual returns (bytes memory /*newCtx*/) {
    return ctx;
}
```

| Parameter          | Description                                                                                                                                                                                                                                                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `superToken`       | Super Token being streamed to the Super App                                                                                                                                                                                                                                                                                            |
| `sender`           | Address of the account streaming `superToken` to the Super App (or address of the account streaming `superToken` to the Super App if the Super App is deleting its own flow)   <mark style="background-color:green;">**\***</mark>                                                                                                     |
| `receiver`         | Address of Super App (or address of Super App if Super App is deleting its own flow)  <mark style="background-color:green;">**\***</mark>                                                                                                                                                                                              |
| `previousFlowRate` | The flow rate of the sender's stream to the Super App before the latest update.                                                                                                                                                                                                                                                        |
| `lastUpdated`      | The timestamp of when a sender's stream to the Super App was last modified.                                                                                                                                                                                                                                                            |
| `ctx`              | <p>Contains the context of the stream being modified to the Super App. </p><p></p><p>The context gets updated when Super Agreement modifications are done in the callback body (<a href="super-app-callbacks/calling-agreements-in-super-apps.md">learn more</a>).<br><br>The context must be returned at the end of the callback.</p> |

&#x20;<mark style="background-color:green;">**\***</mark>  If a stream is being deleted by the account streaming to the Super App, `sender` is the streaming account and `receiver` is the Super App (obviously). However, if the Super App itself is deleting a flow it's receiving, then that triggers `onFlowDeleted` as well. In this case, it's flipped - `sender` is the Super App and `receiver` is the streaming account.
