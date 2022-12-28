# Vesting Scheduler

## What’s the Vesting Scheduler?

The Vesting Scheduler smart contract allows you to set up a vesting schedule of tokens for a specific recipient. The Vesting Scheduler contract is non-custodial, it does not hold any tokens, rather it uses permissions to move them from your wallet (or Safe).

The Vesting Scheduler comes with the option to add a cliff date (and amount), after which it vests tokens linearly sending them to the recipient via a by-the-second Superfluid stream (the receiver does not need to claim as these tokens will appear directly in their wallet).

Setting up vesting schedules via the Vesting Scheduled contract will soon be possible directly on the Superfluid Dashboard, however you can already do so now by interacting with the contract directly in conjunction with off-chain automations (detailed in documentation [here](https://www.notion.so/superfluidhq/Setting-Up-Automated-Vesting-f3e11a257a2d4b0b89210def54a59278)).

## Why Automate Vesting with Superfluid?

Superfluid Protocol allows you to set up a linear vesting schedule with (or without) a cliff while keeping all the to-be-vested tokens in your wallet or Safe (to limit any exposure to our protocol smart contracts).

In a nutshell:

* Set up linear vesting with (or without a cliff)
* Specify both a custom cliff date/time and a custom cliff amount
* Specify your custom total vesting amount and its time framework
* Keep all tokens in your wallet (or Safe) until they are sent directly to the recipient
* I.e. “I’d like to set up a 4 years vesting schedule, that sends 4000 AMZNx linearly with a cliff of 1 year for 1000 AMZNx”

### Example:

1\.   It’s January 1st. You are essentially looking to vest **400 AMZNx** to Alice **from February 1st to June 1st**, with linear vesting and a one month cliff.

To do so, you schedule vesting for an employee with the below details:

_To_: Alice’s account\
_Start Date_: February 1st\
_Cliff Date_: March 1st\
_End Date_: June 1st\
_Cliff Amount_: 100 AMZNx\
_Flow Rate_: 100 AMZNx/mo.

<figure><img src="../../../.gitbook/assets/image (4) (1).png" alt=""><figcaption></figcaption></figure>

2\.   It’s March 1st - the cliff amount is transferred to Alice and the vesting stream begins

**Note: there were no actions to be taken on the Feb. 1st start date as a cliff date was provided**

<figure><img src="../../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

3\.   It’s June 1st and the vesting is complete - the stream is cancelled.

<figure><img src="../../../.gitbook/assets/image (12) (2).png" alt=""><figcaption></figcaption></figure>

## Setting Up Vesting Scheduling

{% embed url="https://www.notion.so/superfluidhq/Setting-Up-Automated-Vesting-f3e11a257a2d4b0b89210def54a59278" %}
