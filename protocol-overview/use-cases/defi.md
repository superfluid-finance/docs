---
description: Using Superfluid to create novel DeFi apps
---

# DeFi

### Dollar-Cost Averaging

Like how Superfluid can automate recurring payments, you can also use the protocol to develop automated recurring investing applications. A Superfluid-powered DCA application would allow you to stream money towards an investment of your choice and receive periodic distributions of the desired investment back.

[Ricochet Exchange](https://ricochet.exchange/) is an example of a live application that accomplishes this.

On the developer side, our Stream-In-Distribute-Out example project provides a great framework to build scalable DCA applications. Check it out here 👇

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/tree/dev/examples/stream-in-distribute-out" %}

### Automated Savings

Most of us set aside a fixed amount each month for savings and investment. Using Superfluid, you are able to automatically accomplish that investment allocation with money streams combined with [real-time investing applications](https://medium.com/superfluid-blog/real-time-investing-empowering-the-next-generation-of-investors-b216d6ac8d3f). As a result, the transactional effort of investing is cut out and made set-and-forget.

Imagine a "streaming portfolio" where an individual or organization could gradually allocate a portion of their assets or revenue into a range of investments, from yield-bearing positions to Ethereum and Bitcoin.

### Undercollateralized Lending

When an employee is receiving a salary stream or a business is earning on-chain revenue through money streams, it provides an on-chain view at the creditworthiness of the employee/business. Assuming that the employee continues receiving their salary and the business continues to earn, that business/employee could be allowed to borrow against that income _without need for collateral_.

Here's a good example of how this might look: first, a lending contract would be given authorization to acquire control over the salary/revenue stream. Then, the lending contract would lend to this employee/business and expect the loan to be repaid by a certain date. If they fail to do so, then the lending contract could take control of their salary/revenue stream and make up the loan that way, essentially garnishing the borrower's income.

That whole process can be encapsulated in an undercollateralized lending contract. Check out the [Employement Based Loan](https://github.com/superfluid-finance/protocol-monorepo/tree/fc916ffca38749fb79a2a6f22edd3cbadaae7bac/examples/employment-based-loan) Example and this video of us breaking down how it works at a technical level 👇

{% embed url="https://youtu.be/yxzOimYwxHY?t=741" %}

### Lending in Streams

The way we traditionally experience on-chain lending is with one-time repays or borrows (i.e. "I borrow 100 USDC" or "I repay my loan with 500 DAI"). Using Superfluid, you can create lending applications where both repayment and borrowing can be done in streams instead of lump-sums.

On the repayment side, this offers a way to automatically repay a loan on-chain and on the borrowing side, allows credit to be taken out gradually against existing collateral instead of all at once.

Check out this example of a project that lets you take out a loan in the form of a money stream 👇

{% embed url="https://showcase.ethglobal.com/roadtoweb3/the-loan-stream" %}

### Streaming Options

With traditional options contracts, a buyer pays an upfront premium for the right (or "option") to buy or sell as asset at a particular price before a particular time. With Superfluid, you are able to replace the upfront payment to the option seller with a continuous by-the-second payment as long as the option remains unexercised (the buyer hasn't used the option).&#x20;

Here's an example: let's say you're selling an NFT [call option](https://www.investopedia.com/terms/c/calloption.asp) and the premium is getting paid in a stream. This means that you start receiving an inbound money stream as soon as the call option is purchased and right as it gets exercised (your buyer purchases the NFT off of you), you then stop receiving the stream.&#x20;

This is a very unique way to structure options and can be applied for perpetual options (as long as you're streaming your premium payment you have the option rights forever). Check out this example project of a streaming call option 👇

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/tree/dev/examples/archive/streaming-call-option" %}

### On-Chain Tradeable Cashflow Assets

Tradeable cashflow assets revolve around setting an NFT as a pointer for a money stream such that the holder of the NFT is receiving the money stream. Upon transfer of the NFT to a new address, the money stream to the previous holder is cancelled and started to the new holder.&#x20;

This design allows for the sale of future cashflow on-chain. You could sell an NFT that designates a portion of cashflows from a protocol, employment position, or business so long as that cashflow is in the form of on-chain money streams. By doing so, you acquire that cashflow up front.

Check out this basic tradeable cashflow example to see how you can tokenize money streams! 👇

![(Tradeable Cashflows are really neat)](<../../.gitbook/assets/image (50).png>)

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/tree/dev/examples/tradeable-cashflow" %}
