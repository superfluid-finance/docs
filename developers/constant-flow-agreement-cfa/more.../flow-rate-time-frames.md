---
description: Understand flow rate time denominations better
---

# Flow Rate Time Frames

Superfluid Protocol accepts flow rates in wei/second! When you call `createFlow` or do any kind of operation where a `flowRate` parameter is required, be that with our Solidity library or with our SDK, you have to pass in a per-second rate.

So when I say I'm streaming you 10 DAIx/month, what flow rate am I really choosing under the hood? Read on to understand how to properly translate your desired flow rate into wei/second _as per our standards_.

Doing your math differently that what's suggested here may result in differences between how your flow rate shows between your expectations and what we show on our Superfluid Dashboard and Superfluid Console.&#x20;

## Reframing Flow Rates To Wei/Second

#### From Month

Ex: Convert a flow rate of 10 DAIx/month to a wei/sec flow rate.

<pre data-line-numbers data-full-width="false"><code> Monthly Time Frame = 10 DAIx / month
                    = 10 DAIx / ((365/12) * 24 * 60 * 60)
                    = 10 * <a data-footnote-ref href="#user-content-fn-1">(10^18)</a> / ((365/12) * 24 * 60 * 60)
 Wei/Sec Flow Rate  = 3805175038052 wei / second
</code></pre>

{% hint style="info" %}
If you didn't follow our recommendation and did this calculation by dividing by `(30 * 24 * 60 * 60)`, you'd end up with a slightly larger wei/sec flow rate of 3858024691358 which would result in your stream showing as slightly larger on our Dashboard and Console.
{% endhint %}

#### From Year

Ex: Convert a flow rate of 100 DAIx/year to a wei/sec flow rate.

{% code lineNumbers="true" %}
```
  Yearly Time Frame = 100 DAIx / year
                     = 100 DAIx / (365 * 24 * 60 * 60)
                     = 100 * (10^18) / (365 * 24 * 60 * 60)
  Wei/Sec Flow Rate  = 3170979198376 wei / second
```
{% endcode %}

[^1]: Super Tokens always have 18 decimals
