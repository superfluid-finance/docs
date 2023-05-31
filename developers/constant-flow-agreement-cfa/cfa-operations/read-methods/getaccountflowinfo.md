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

<table><thead><tr><th width="182">Parameter</th><th width="231.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>account</code></td><td><code>string</code></td><td>Address of account you're getting stream information for</td></tr><tr><td><code>providerOrSigner</code></td><td><code>ethers.providers.Provider</code> <em>or</em> <code>ethers.Signer</code></td><td>ethers provider or ethers signer object</td></tr></tbody></table>

### Return Value(s)

Returns a JSON object literal with the below info:

<table><thead><tr><th width="183">Key</th><th width="126.33333333333331">Value Type</th><th>Description</th></tr></thead><tbody><tr><td><code>timestamp</code></td><td><code>Date</code></td><td>Timestamp when a stream of <code>superToken</code> was last updated by the account</td></tr><tr><td><code>flowRate</code></td><td><code>string</code></td><td><p>Net flow rate (wei/second) of <code>account</code> for the specified <code>superToken</code>. </p><p></p><p>Can be positive or negative as it's the sum of the account's inbound and outbound CFA flow rates.</p></td></tr><tr><td><code>deposit</code></td><td><code>string</code></td><td>Total <a href="https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-agreements/constant-flow-agreement-cfa#buffer">buffer deposits</a> of all streams being sent by <code>account</code></td></tr><tr><td><code>owedDeposit</code></td><td><code>string</code></td><td>Total <a href="https://docs.superfluid.finance/superfluid/sentinels/liquidations-and-toga#liquidation-and-solvency">additional deposits</a> for all streams to Super Apps</td></tr></tbody></table>
