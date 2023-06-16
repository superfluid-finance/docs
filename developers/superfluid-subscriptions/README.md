---
description: Learn how to add streaming subscriptions features to your apps with Superfluid
---

# 🔁 Superfluid Subscriptions

## Building Subscriptions with Superfluid

When building a subscriptions product on Superfluid, we expect that you’ll need a few things

1. You’ll need to enable users to create a subscription stream, update that stream if they change their plan, or delete that stream if they opt to cancel -> our widget offers these features off-the-shelf, check out [superfluid-checkout-widget.md](superfluid-checkout-widget.md "mention")
2. You may need to validate whether an address is currently streaming to you, and perhaps get a list of all addresses currently streaming to you -> see [#getting-stream-data](implementing-subscriptions-in-your-app.md#getting-stream-data "mention")
3. You’ll need to know when a user deletes a stream or updates their plan so that you may make the proper changes to their account. -> see [#events](implementing-subscriptions-in-your-app.md#events "mention")

There are many ways that this process can be managed, and your implementation will depend on the needs of your users. With that said, here are a few concepts & code examples that should help you in your development.
