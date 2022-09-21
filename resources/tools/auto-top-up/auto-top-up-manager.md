---
description: Manage, monitor, and act upon Auto Top Up positions
---

# Auto Top Up Manager

The Auto Top Up Manager contract allows you to:

* Set up and manage your Auto Top Up
* View the state of an account and see if it's in need of topping up
* Call the top up on the account

## Set Up and Manage Your Auto Top Up

### Creating Your Top Up With `createTopUp()`

`createTopUp()` registers your top up task within the Auto Top Up Manager **.**

```solidity
function createTopUp(
    address _superToken,
    address _strategy,
    address _liquidityToken,
    uint64 _expiry,
    uint64 _lowerLimit,
    uint64 _upperLimit
) external
```

#### **Parameters**

**`_superToken`**&#x20;

The Super Token that your streaming with that you want to set up automatic balance top up with

**`_strategy`**&#x20;

The address of the [Strategy contract](strategies.md) for your top up.&#x20;

**`_liquidityToken`**

The address of the token that the `_strategy` contract provided will be pulling from your wallet to convert to the `_superToken`.&#x20;

If you're using the ERC20StrollOut strategy, your liquidity token is just the underlying token of `_superToken` (i.e. DAI for DAIx), but some other Strategies may use different liquidity tokens to convert to the desired `_superToken`.

{% hint style="info" %}
You will have to approve the `_strategy` to spend your `_liquidityToken` in order for the topping up to work.
{% endhint %}

**`expiry`**

Timestamp after which the top up is considered invalid. Attempts to top up after this time stamp won't work.

&#x20;**`_lowerLimit`**

The amount of `time` left until your stream hits zero at which a top up should be triggered.&#x20;

_Example_: Say you have a `_lowerLimit` of 10 days and a stream going at a flow rate of 20 DAIx/day. Then when your balance hits `_lowerLimit` \* flow rate, 200 DAIx (10 days \* 20 DAIx/day), then your account is ready for topping up.&#x20;

**`_upperLimit`**

After a top up, this would be the new amount of time left until your Super Token balance hits zero. You can think of it like the level that the top up "refills" your balance to.

_Example_: Say you have an `upperLimit` of 100 days and a stream going at a flow rate of 20 DAIx/day. Your balance reaches the `_lowerLimit` and a top up is triggered. Your Super Token balance will be topped up to 2000 DAIx (100 days \* 20 DAIx/day).

### Managing Your Top Up Positions

You can also adjust the limits/expiry of an existing top up position using `createTopUp` again.

```
function createTopUp(
    address _superToken,      // Same for your current top up
    address _strategy,        // Same for your current top up
    address _liquidityToken,  // Same for your current top up
    uint64 _expiry,           // Specify new expiry you want to set
    uint64 _lowerLimit,       // Specify new lowerLimit you want to set
    uint64 _upperLimit        // Specify new upperLimit you want to set
) external
```

You can delete a top up with `deleteTopUp`.

```
function deleteTopUp(
    address _user,
    address _superToken,
    address _liquidityToken
) external
```

## View Account Top Up State

### Checking In On Top Ups with `checkTopUp()`

The off-chain keeper system maintaining Auto Top Up positions will utilize the `checkTopUp()` external view function to check if a position is in need of topping up.

```
function checkTopUp(
    address _user,
    address _superToken,
    address _liquidityToken
) external view returns (uint256);
```

&#x20;**Parameters**

**`_user`**

The account whose top up is being checked.

**`_superToken`**

The Super Token that the `_user` is streaming.

**`_liquidityToken`**

The address of the token that will be used to convert to the `_superToken`.

**Return Values**

The amount that the `_superToken` balance should be topped up by. If there's no topping up needed, it will return zero.

## Call Top Up On Account

If calling `checkTopUp()` returns a non-zero top-up amount, then the Gelato keeper should kick in and call the `performTopUp()` function.

```
function performTopUp(
    address _user,
    address _superToken,
    address _liquidityToken
) external
```

**Parameters**

**`_user`**

The account whose top up is being checked.

**`_superToken`**

The Super Token that the `_user` is streaming.

**`_liquidityToken`**

The address of the token that will be used to convert to the `_superToken`.
