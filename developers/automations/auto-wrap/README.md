# Auto Wrap

## **What's Auto Wrap?**

Auto Wrap is an automated token wrapping system that automatically wraps ERC20 tokens to Super Tokens just in time to keep your streams running.

When your Super Token balance reaches a certain lower threshold, Auto Wrap steps in and wraps enough tokens into the needed Super Token on your behalf to ensure you never run out of balance, as that would make all streams stop.

## **Why Auto Wrap?**

Most organizations don’t hold their assets as Super Tokens. DAOs are more likely to hold USDC than USDCx in their treasury to limit exposure to third party protocols. So when a DAO is paying contributors in streams of USDCx they need to ensure they periodically wrap additional USDC in USDCx to keep their streams running.

This can be a tedious manual process because it requires you to:

1. Periodically check the Super Token balance to make sure it isn’t reaching zero
2. If is approaching zero, manually wrap additional USDC to USDCx to avoid running out of USDCx balance.

With Auto Wrap, this manual process is fully automated.

The system keeps monitoring a wallet balance of a specific token (i.e. USDC) and when it’s too low (normally less than 2 days worth of outgoing streaming) it automatically wraps a variable amount (normally 7 days worth of outgoing streaming) to keep streams running over time.&#x20;

All payroll admin needs to do is ensure they’re holding enough USDC in their wallet - the wrapping part is taken care of by Auto Wrap.

## **Example:**

1\.  Auto Wrap identifies that the DAO’s DAIx balance is running low. In this example, it’s less than a two days away from running out of DAIx.

<figure><img src="../../../.gitbook/assets/image (5) (3).png" alt=""><figcaption></figcaption></figure>

2\.  Auto Wrap automatically steps in and replenishes the DAIx balance back to seven days worth of outgoing stream so payment continues without interruption. No manual triggering required!

<figure><img src="../../../.gitbook/assets/image (8).png" alt=""><figcaption></figcaption></figure>

## Setting Up Auto Wrap

{% embed url="https://www.notion.so/superfluidhq/Setting-Up-Superfluid-Auto-Wrap-9a565d53bbee4bdc953cc2a656c43761" %}
