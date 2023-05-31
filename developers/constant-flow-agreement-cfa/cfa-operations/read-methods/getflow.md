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

<table><thead><tr><th width="182">Parameter</th><th width="231.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>sender</code></td><td><code>string</code></td><td>Address of sender</td></tr><tr><td><code>receiver</code></td><td><code>string</code></td><td>Address of receiver</td></tr><tr><td><code>providerOrSigner</code></td><td><code>ethers.providers.Provider</code> <em>or</em> <code>ethers.Signer</code></td><td>ethers provider or ethers signer object</td></tr></tbody></table>

### Return Value(s)

Returns a JSON object literal with the below info:

<table><thead><tr><th width="183">Key</th><th width="234.33333333333331">Value Type</th><th>Value Description</th></tr></thead><tbody><tr><td><code>timestamp</code></td><td><code>Date</code></td><td>Timestamp when the stream of <code>superToken</code> was last updated by the account</td></tr><tr><td><code>flowRate</code></td><td><code>string</code></td><td>Flow rate (wei/second) of the stream. Always zero or positive.</td></tr><tr><td><code>deposit</code></td><td><code>string</code></td><td><a href="https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-agreements/constant-flow-agreement-cfa#buffer">Buffer deposit</a> held for the stream</td></tr><tr><td><code>owedDeposit</code></td><td><code>string</code></td><td><a href="https://docs.superfluid.finance/superfluid/sentinels/liquidations-and-toga#liquidation-and-solvency">Additional deposit</a> if the stream is to a Super App</td></tr></tbody></table>

### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/311e5a95d3505dc8c5d8afd420e9edc8b5a57426/projects/borrow-against-salary/test/EmploymentLoan.test.js#L186" %}
