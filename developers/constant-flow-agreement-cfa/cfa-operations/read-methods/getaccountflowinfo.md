# getAccountFlowInfo

Get _net_ stream information for an account pertaining to a specified Super Token

```
let res = await sf.cfaV1.getAccountFlowInfo({
  superToken: string,
  account: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});
```

### Parameters

| Parameter          | Type                                             | Description                                              |
| ------------------ | ------------------------------------------------ | -------------------------------------------------------- |
| `superToken`       | `string`                                         | Address of Super Token being streamed                    |
| `account`          | `string`                                         | Address of account you're getting stream information for |
| `providerOrSigner` | `ethers.providers.Provider` _or_ `ethers.Signer` | ethers provider or ethers signer object                  |

### Return Value(s)

Returns a JSON object literal with the below info:

| Key           | Value Type | Description                                                                                                                                                                                                          |
| ------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `timestamp`   | `Date`     | Timestamp when a stream was last updated for the superToken                                                                                                                                                          |
| `flowRate`    | `string`   | <p>Net flow rate (wei/second) of <code>account</code> for the specified <code>superToken</code>. </p><p></p><p>Can be positive or negative as it's the sum of the account's inbound and outbound CFA flow rates.</p> |
| `deposit`     | `string`   | Total [buffer deposits](https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-agreements/constant-flow-agreement-cfa#buffer) of all streams being sent by `account`                   |
| `owedDeposit` | `string`   | Total [additional deposits](https://docs.superfluid.finance/superfluid/sentinels/liquidations-and-toga#liquidation-and-solvency) for all streams to Super Apps                                                       |
