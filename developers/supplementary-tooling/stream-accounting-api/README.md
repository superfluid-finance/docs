# Stream Accounting API

## Overview

Streams move value every second, but accounting tools don’t record value transfer on a real-time basis (typically it’s monthly). The Stream Accounting API can be used to represent your streams in a manner that’s consumable by your traditional accounting tools.

## Functionality

The Stream Accounting API is RESTful and exposes a single endpoint which allows for fetching stream data across all Superfluid tokens and networks.

The API lets you **chop up the amounts an address has been streaming over time into accounting periods of your choice** (monthly, daily, even hourly).

**Token Pricing**

If the token you are streaming has price tracking from Coingecko, then you will be able to get price information for each period in a currency of your choice as well. You can also select price granularity. This lets you choose whether you want to get your prices as an average over a lagging timeframe of your choice or just the instantaneous price for each period.

**Accommodating Flow Rate Updates**

The Stream Accounting API accommodates changes in stream flow rates. Basically, a “stream period” is a period over which a stream’s flow rate is the same. Once the flow rate is updated, a new stream period begins. When getting accounting data over a certain duration in which the account in concern has a stream whose flow rate has been updated, you’ll see that the data is segmented into separate stream periods for each different flow rate.

**Outgoing & Incoming**

The API accounts for both outgoing and incoming streams in the same data export, denoting incoming streams with negative values and outbound streams with positive values.

**All Networks and All Tokens**

The Stream Accounting API supports all Superfluid-supported networks and tokens through use of the [Superfluid Subgraphs](https://docs.superfluid.finance/superfluid/developers/subgraph).

## Example

Alice is paying Bob in a stream of 0.1 ETHx per month.

<figure><img src="../../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

You want to get accounting info on the stream Alice is sending on a monthly basis between **June 1st and September 15th**.

<figure><img src="../../../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

The Stream Accounting API gives you information for the months between June 1st and September 15th.

<figure><img src="../../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

Let’s say Alice had updated her stream to 0.2 ETHx/month on September 15th.

<figure><img src="../../../.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>

Now, you want to get accounting info on the stream Alice is sending on a month basis between June 1st and **December 1st**.

<figure><img src="../../../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

The Stream Accounting API gives you information for the month between June 1st and December 1st.

<figure><img src="../../../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

## Using the Stream Accounting API

{% embed url="https://superfluidhq.notion.site/Using-the-Stream-Accounting-API-3d161745acfe4750acf43c546f84c724" %}
