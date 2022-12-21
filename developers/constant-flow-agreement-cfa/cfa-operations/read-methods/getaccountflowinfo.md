# getAccountFlowInfo

Get _net_ stream information for an account pertaining to a specified Super Token

<pre class="language-javascript"><code class="lang-javascript">//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const daix = await sf.loadSuperToken("DAIx");
<strong>
</strong><strong>let res = await daix.getAccountFlowInfo({
</strong>  account: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});
</code></pre>

### Parameters

| Parameter          | Type                                             | Description                                              |
| ------------------ | ------------------------------------------------ | -------------------------------------------------------- |
| `account`          | `string`                                         | Address of account you're getting stream information for |
| `providerOrSigner` | `ethers.providers.Provider` _or_ `ethers.Signer` | ethers provider or ethers signer object                  |

### Return Value(s)

Returns a JSON object literal with the below info:

| Key           | Value Type | Description                                                                                                                                                                                                          |
| ------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `timestamp`   | `Date`     | Timestamp when a stream of `superToken` was last updated by the account                                                                                                                                              |
| `flowRate`    | `string`   | <p>Net flow rate (wei/second) of <code>account</code> for the specified <code>superToken</code>. </p><p></p><p>Can be positive or negative as it's the sum of the account's inbound and outbound CFA flow rates.</p> |
| `deposit`     | `string`   | Total [buffer deposits](https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-agreements/constant-flow-agreement-cfa#buffer) of all streams being sent by `account`                   |
| `owedDeposit` | `string`   | Total [additional deposits](https://docs.superfluid.finance/superfluid/sentinels/liquidations-and-toga#liquidation-and-solvency) for all streams to Super Apps                                                       |
