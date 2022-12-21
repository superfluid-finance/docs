# getFlow

Get information regarding a stream going from a sender to a receiver for a specified Super Token

<pre class="language-javascript"><code class="lang-javascript"><strong>//load the token you'd like to use like this 
</strong><strong>//note that tokens may be loaded by symbol or by address
</strong><strong>const daix = await sf.loadSuperToken("DAIx");
</strong><strong>
</strong><strong>let res = await daix.getFlow({
</strong>  sender: string,
  receiver: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});
</code></pre>

### Parameters

| Parameter          | Type                                             | Description                             |
| ------------------ | ------------------------------------------------ | --------------------------------------- |
| `sender`           | `string`                                         | Address of sender                       |
| `receiver`         | `string`                                         | Address of receiver                     |
| `providerOrSigner` | `ethers.providers.Provider` _or_ `ethers.Signer` | ethers provider or ethers signer object |

### Return Value(s)

Returns a JSON object literal with the below info:

| Key           | Value Type | Value Description                                                                                                                                                        |
| ------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `timestamp`   | `Date`     | Timestamp when the stream of `superToken` was last updated by the account                                                                                                |
| `flowRate`    | `string`   | Flow rate (wei/second) of the stream. Always zero or positive.                                                                                                           |
| `deposit`     | `string`   | [Buffer deposit](https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-agreements/constant-flow-agreement-cfa#buffer) held for the stream |
| `owedDeposit` | `string`   | [Additional deposit](https://docs.superfluid.finance/superfluid/sentinels/liquidations-and-toga#liquidation-and-solvency) if the stream is to a Super App                |

### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/311e5a95d3505dc8c5d8afd420e9edc8b5a57426/projects/borrow-against-salary/test/EmploymentLoan.test.js#L186" %}
