# Notes

`StrollManager`

Contract checking rules on chain and seeing if it can call an action or not

Checks if strategy is approved, if balance is there, how much to wrap

`createTopUp`

User needs to approve ERC20 for the Strategy, not the StrollManager contract

trategy called auto top up

You set up the configuration on chain for how the top up will work&#x20;

![](<../../.gitbook/assets/image (13).png>)

Expiry: how long config will work until

When calling createTopUp, it first checks if the parameters passed are valid. We set minimum parameters (don't want top ups happening every second) and we can change them after deployment

Then we actually register the configuration for the address in the functions and allows the off-chain process to begin topping up based on that config

Lower limit: how many seconds do you want to perform a top up based on your config

&#x20;       We aren't going at seconds, we expect the lower limit to be in days

Upper limit: the target that when the lower limit is hit, the balance returns to. This is in DAYS not balance

\----

There are CRUD functions for your top up config

deleteTopUp: deletes your config, you're no longer getting strolled

checkTopUp: sees if you can perform a top up on a top up config now. This is what's being monitored by keeper to see if they should go ahead and call performTopUp

liquidityToken - the token being converted into the super token to continue your stream. Different strategies can have different ways to go from liquidityToken to superToken

getTopUpIndex() - hashes the parameters,&#x20;

performTopUpByIndex: actually does the action

topUpAmount is really the status to see if the top up is worth doing (it's NOT ACTUALLY AMOUNT OT TOP UP!) if it's anything other than zero, then only is that the target new balance and the top up will get it there

\----------

checkTopUpByIndex: checks if the top up status to see if it's time to do a top Up

![](<../../.gitbook/assets/image (6).png>)

if all the checks pass, then you get the target upper limit balance by upper limit \* flow rate and the top up will get it to that new balance

## strategy

Functions can only be called by StrollManager

on topUp, upgrade super tokens, and transfer back to user

Strategy contract is the address that needs to be approved to move your funds



## strategy base

all contracts will have this functionality

emergency Withdraw - if tokens get stuck we can withdraw

toUnderlyingTokenAmount - sugar to convert between decimals of underlying to 18 decimals of super token

1. You deploy manager
2. You deploy strategies with address of manager
   1. You can use changeStrollMAnager to connect a strategy to a new stroll manager



## aave



