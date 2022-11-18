# Read Methods

## Method Catalog

```javascript
await sf.cfaV1.getFlow({
  superToken: string,
  sender: string,
  receiver: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});

await sf.cfaV1.getNetFlow({
  superToken: string,
  account: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});

await sf.cfaV1.getAccountFlowInfo({
  superToken: string,
  account: string,
  providerOrSigner: ethers.providers.Provider | ethers.Signer
});
```
