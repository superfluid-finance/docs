---
description: Other useful queries for your integration
---

# Other Helpful Queries

## Other Helpful Queries

**How can I query month-on-month stats for Superfluid stream senders? e.g. monthly amount streamed, number of streams started/stopped, etc?**

{% hint style="info" %}
💡 NOTE: you probably want to define what start/end of the month means and be consistent and transparent about it: e.g. 12AM of the first of month 11:59PM on the last day of the month.
{% endhint %}

`ATS = AccountTokenSnapshot`

* it requires queries at the start and end of a month and a set of sender addresses and tokens they are interested in.
* find the `block.timestamp` for the months you’re interested in
* execute a query for `ATS`(s) for a set of senders and token at the start of a month/end of a month (timestamps).
* you could then get the delta between the two entities (end date `ATS` - start date `ATS`) on the two queries on the follow fields of `AccountTokenSnapshot`
* `totalNumberOfActiveStreams`
* `totalNumberOfClosedStream`
* `totalAmountStreamedInUntilUpdatedAt`
* for this last property, you need to do a check for both the start and end of month timestamp values you used for the query and check if it is equal to `updatedAtTimestamp` (it’s pretty much almost never going to be)
* and you’ll need to calculate the actual `totalAmountStreamedIn`
* e.g. if `totalAmountStreamedUntilUpdatedAt = 1`, `updatedAtTimestamp = 10` and `start of month timestamp = 15` and `outflowRate = 1`, your actual `totalAmountStreamedIn` for start of month is `6`
* You’ll have to do the same for the end of the month
