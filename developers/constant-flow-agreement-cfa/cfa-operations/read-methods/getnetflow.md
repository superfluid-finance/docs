# getNetFlow

Get the net flow rate value for an account

<pre class="language-javascript"><code class="lang-javascript">//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const daix = await sf.loadSuperToken("DAIx");

<strong>let res = await daix.getNetFlow({
</strong>  account: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});
</code></pre>

### Parameters

<table><thead><tr><th width="182">Parameter</th><th width="231.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>account</code></td><td><code>string</code></td><td>Address of account you're getting net flow rate for</td></tr><tr><td><code>providerOrSigner</code></td><td><code>ethers.providers.Provider</code> <em>or</em> <code>ethers.Signer</code></td><td>ethers provider or ethers signer object</td></tr></tbody></table>

### Return Value(s)

Returns a string with the below info:

<table><thead><tr><th width="126.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>string</code></td><td><p>Net flow rate (wei/second) of <code>account</code> for the specified <code>superToken</code>. </p><p></p><p>Can be positive or negative as it's the sum of the account's inbound and outbound CFA flow rates.</p></td></tr></tbody></table>

### Example Usage

{% embed url="https://github.com/superfluid-finance/super-examples/blob/311e5a95d3505dc8c5d8afd420e9edc8b5a57426/projects/borrow-against-salary/test/EmploymentLoan.test.js#L150" %}
