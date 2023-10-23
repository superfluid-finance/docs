# getFlowOperatorData

flow operator permissions data for a particular pair of sender and flow operator.

<pre class="language-javascript"><code class="lang-javascript">//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const daix = await sf.loadSuperToken("DAIx");
<strong>
</strong><strong>let res = await daix.getFlowOperatorData({
</strong>  sender: string,
  flowOperator: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});
</code></pre>

### Parameters

<table><thead><tr><th width="182">Parameter</th><th width="231.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>sender</code></td><td><code>string</code></td><td>Address of sender account</td></tr><tr><td><code>flowOperator</code></td><td><code>string</code></td><td>Address of flow operator account</td></tr><tr><td><code>providerOrSigner</code></td><td><code>ethers.providers.Provider</code> <em>or</em> <code>ethers.Signer</code></td><td>ethers provider or ethers signer object</td></tr></tbody></table>

### Return Value(s)

Returns a JSON object literal with the below info:

<table><thead><tr><th width="183">Key</th><th width="126.33333333333331">Value Type</th><th>Description</th></tr></thead><tbody><tr><td><code>flowOperatorId</code></td><td><code>string</code></td><td>The keccak256 hash of encoded string "flowOperator", sender and flowOperator</td></tr><tr><td><code>permissions</code></td><td><code>number</code></td><td>Permissions the flowOperator possesses. Explained <a href="../#permissions-parameter"><strong>here</strong></a>.</td></tr><tr><td><code>flowRateAllowance</code></td><td><code>string</code></td><td><a href="../#flowrateallowance-parameter">see here</a></td></tr></tbody></table>
