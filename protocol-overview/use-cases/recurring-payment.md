---
description: Superfluid is great for automating and scaling recurring payments
---

# Recurring Payment

Because transactions typically move value in a one-and-done fashion, on-chain recurring payments can be manual and less scalable. Superfluid money streams solves this, allowing us to perpetually and automatically move value between accounts. This lets us to realize many of automatic recurring payment use cases!

### Salary Streams

Real-time salaries are the most popular Superfluid money streaming use case. Imagine getting <mark style="background-color:green;">**paid every single second**</mark> instead of monthly or bi-weekly! Here are some advantages:

**Improved employee cashflow**: By getting paid by the second, friction between current financial needs and having to wait until your paycheck at end of month is greatly reduced

**Salary payment automation**: Starting a salary stream is a single transaction and eliminates the need for manual recurring payout transactions

**More fair way to pay and get paid**: When you give value through your work every workday, why do you only receive value at the end of the month? A salary stream makes that value exchange more fair as value received more closely matches value given.

**Ecosystem Applications**: Developers in the Superfluid ecosystem have created many applications that give Superfluid streams additional utility. For example, [Ricochet Exchange](https://ricochet.exchange/) provides a stream investing dApp where you can forward some of your salary stream into an investment of your choice, taking investment automation to another level!

Check out this article discussing the power of salary streams coupled with investment streams 👇

{% embed url="https://medium.com/superfluid-blog/the-real-world-benefits-of-salary-streaming-584d94688f84" %}

### Subscriptions

The potential of crypto native subscriptions is limited by the bad UX of subscribers having to manually permission recurring subscription payments themselves.

As a result, many Web3 services resort to charging for access through token-gating or large up-front payment which makes for poor financial sustainability.

Enter Superfluid payment streams which allow for perpetual payment that a subscriber can stop or update at any time. This solves the issue of recurring wallet authorization as a payment stream is totally automated beyond the initial start-stream transaction.&#x20;

For the business charging the subscription, access to the service can be granted by reading the on-chain flow rate that the subscriber is paying and providing appropriate access.

### Premium Payments

Insurance premiums are another recurring payment that could be done on-chain and automatically with money streaming.&#x20;

For instance, with DeFi insurance protocols such as InsurAce, users must specify an insurance duration and pay for it all up front. This is unideal for a user as they are paying for the insurance up front but only receiving the benefits of the insurance over the period they purchased it for. Also, if they want to extend their insurance upon period completion, they have to remember to submit another manual purchase.

Enter premium payment streams - A insurance policy holder can pay for their insurance as they go with a money stream. If they stop their stream, then their insurance coverage is instantly cancelled, simple as that. They could also update their stream to another flow rate for increased or reduced coverage!

### Rentals

Instead of having to manually pay for rent in large discrete lump-sums at the end of each month, you could pay for it automatically and gradually with a money stream.

This could be applied in a Web3-native way with NFTs or digital property rentals. Or,  with the proper compliancy work, this could be used to lease real-world property.

### Royalty or Dividend Distributions

Royalty and dividend distributions make use of the Superfluid [Instant Distribution Agreement](https://docs.superfluid.finance/superfluid/) for scalable one-to-many token transfers.

By assigning "units" to different accounts (which work like shares), a distributor can send royalties or dividends directly to recipient accounts (**no claiming needed!**). The more units an account holds, the more of each distribution that account will be able to receive.

What's cool is that these distribution units persist - they don't reset after a distribution happens. A distributor can send varying amounts of royalties/dividends each time and the tokens get split out to unit holders appropriately each time.

Check out this example of a "dividend rights token" ERC20 contract where each token represents a distribution unit 👇

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/tree/dev/examples/rewards-distribution-token" %}

### Public Goods or Grant Funding

Normally, when a person or organization contributes to public goods, grants, or other causes with digital currency they do it with one-time payments.&#x20;

Using a Superfluid perpetual payment stream, you can automatically provide continuous financial support to various causes. As well as providing the cause with ongoing funding, you also have on-chain proof that you are streaming them money. That proof can be made composable with other things such as decentralized social profiles, NFTs, etc.

For example, what if you could fund a [Gitcoin Aquaduct](https://twitter.com/gitcoin/status/1494467687161942016?s=20\&t=ZgHQaiG5y5YW2T98l9UJdQ) with a money stream? That's an available integration and we have a bounty available for it right now 👇

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/issues/729" %}
