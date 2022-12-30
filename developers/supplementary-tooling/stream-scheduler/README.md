# Stream Scheduler

## What’s the Stream Scheduler?

The Stream Scheduler allows you to:

1. Schedule when an existing stream is to be closed
2. Schedule when to start a new stream
3. Schedule when to start a new stream and when that new stream is to be closed

This can be soon performed on the Superfluid Dashboard or by making use of the underlying contracts in conjunction with off-chain automations (detailed in documentation here).

## Why Schedule Streams?

If you have an intended end date and/or start date for a stream, instead of having to _manually_ trigger the action, you could use the Stream Scheduler to _automatically_ trigger the action at the desired time. This is especially useful in the case of streaming payroll, subscriptions and token vesting.

Superfluid streams are perpetual by default - they run until you cancel them or you run out of balance. If you want to be streaming someone tokens for a fixed duration and not have to deal with automatically triggering the creation or deletion of the stream, the Stream Scheduler is the solution.

## Example:

(view these Miro diagrams [here](https://miro.com/app/board/uXjVP--AM4I=/?share\_link\_id=524959909457))

1\.  It’s January 1st. You give the Stream Scheduler contract [operator permissions](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfa-access-control-list-acl) and then schedule a stream with the below details:

_Flow Rate_: 100 DAIx/mo.\
_To_: Alice’s account\
_Start_: March 1st, 2023 at 12:00am\
_End_: March 20th, 2023 at 12:00am

<figure><img src="../../../.gitbook/assets/image (1) (3).png" alt=""><figcaption></figcaption></figure>

2\.  March 1st comes and the stream is initiated from you to Alice.

<figure><img src="../../../.gitbook/assets/image (3) (1).png" alt=""><figcaption></figcaption></figure>

3\.  March 20th comes and the stream from you to Alice is cancelled.

<figure><img src="../../../.gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>

## Setting Up Stream Scheduling

{% embed url="https://superfluidhq.notion.site/Setting-Up-Stream-Scheduling-551888de690e402caee50e8d87cb6930" %}
