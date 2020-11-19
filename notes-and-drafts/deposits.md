# Flow deposits

When bob created a flow, he also made a deposit. This explains why when we used `balanceOf` to calculate the balances of alice and bob, they did not add to 50 DAI. We can see bob's "real time balance", which also includes the deposit using these commands.

```bash
rtb = await daix.realtimeBalanceOf(bob, parseInt((Date.now())/1000))

(await rtb.availableBalance).toString() / 1e18
```

So how much did bob `deposit` to create the flow? We can query this directly, using `rtb`.

```bash
(await rtb.deposit).toString() / 1e18
```

This amount will be returned when bob stops the flow. It serves as insurance in case bob starts running out of money. When this happens, the off-chain components earn the deposit as payment for submitting an on-chain transaction to stop the flow.

