# Read Methods

## Method Catalog

<pre class="language-javascript"><code class="lang-javascript">//load the token you'd like to use like this 
//note that tokens may be loaded by symbol or by address
const daix = await sf.loadSuperToken("DAIx");
<strong>
</strong><strong>await daix.getFlow({
</strong>  sender: string,
  receiver: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});

await daix.getNetFlow({
  account: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});

await daix.getAccountFlowInfo({
  account: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});
</code></pre>
