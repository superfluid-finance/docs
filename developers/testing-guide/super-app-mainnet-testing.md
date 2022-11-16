---
description: Learn how to test Super Apps on Hardhat mainnet forks
---

# Super App Mainnet Testing

{% hint style="success" %}
This section is based off the [work](https://mirror.xyz/0x52EF1F3c4A1068d0079093cD2DCAe9eBE9Edcb8F/z2uHwWCZcphEnEHhDJ15UZGw\_dMwm-uVD2Iy4Dp76M0) of [omnifient](https://mobile.twitter.com/omnifient), a valued community member r🚀
{% endhint %}

In order for a Super App's callbacks to work, it needs to be registered with the Superfluid host.

On testnets, this is done permissionlessly, but on a mainnet it requires a registration key which is permissioned by Superfluid governance. See the constructor below 👇 &#x20;

```
constructor(
    ISuperfluid host,
    string memory registrationKey
) {

    uint256 configWord = SuperAppDefinitions.APP_LEVEL_FINAL |
        SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
        SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
        SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP;

    if (bytes(registrationKey).length > 0) {
        // works on MAINNET
        host.registerAppWithKey(configWord, registrationKey);
    } else {
        // works on TESTNET
        host.registerApp(configWord);
    }
    
}
```

So, in order to test a Super App on a mainnet fork, you are going to need to be able to _simulate the creation of a registration key_ so that you can provide it to your Super App upon deployment.&#x20;

Here's how you do it in Hardhat's Node.js-based environment.

## Simulating Creation of a Registration Key

First, get an instance of the Superfluid Host. Here, we're just setting up the instance with the only function we'll be using - `getGovernance`

```
const HOST_ABI = ["function getGovernance() external view returns (address)"];
const HOST_ADDR = "0x3E14dC1b13c488a8d5D310918780c983bD5982E7";

const hostInstance = new ethers.Contract(HOST_ADDR, HOST_ABI, <<providerOrSigner>>);
```

Next, let's get an instance of the Superfluid Governance contract and its owner's address.

```
const GOV_ABI = [
  "function setConfig(address host, address superToken, bytes32 key, uint256 value) external",
  "function setAppRegistrationKey(address host, address deployer, string memory registrationKey, uint256 expirationTs) external",
  "function getConfigAsUint256(address host, address superToken, bytes32 key) external view returns (uint256 value)",
  "function verifyAppRegistrationKey(address host, address deployer, string memory registrationKey) external view returns (bool validNow, uint256 expirationTs)",
  "function owner() public view returns (address)",
];

const govInstance = new ethers.Contract(
  await hostInstance.getGovernance(),
  GOV_ABI,
  <<providerOrSigner>>
);

const govOwnerAddr = await govInstance.owner();
```

Now, impersonate the governance owner!

<pre><code>// impersonate the governance owner
await network.provider.request({
  method: "hardhat_impersonateAccount",
  params: [govOwnerAddr],
});

// give it a lot of ETH (or MATIC because we're on Polygon!)
await network.provider.send("hardhat_setBalance", [
  govOwnerAddr,
  hexValue(parseEther("1000000")),
]);

<strong>const govOwnerSigner = await ethers.getSigner(govOwnerAddr);</strong></code></pre>

Time to make your registration key

```
// Set your registration key string
const registrationKey = `GM-${Date.now()}`;

// Get a configuration key
const configKey = ethers.utils.keccak256(
  ethers.utils.defaultAbiCoder.encode(
    ["string", "address", "string"],
    [
      "org.superfluid-finance.superfluid.appWhiteListing.registrationKey",
      <<account that will deploy the Super App>>,
      registrationKey
    ]
  )
);

// Set it in Governance - now your registrationKey is good to go!
let tx = await govInstance.setConfig(
  HOST_ADDR,
  "0x0000000000000000000000000000000000000000",
  configKey,
  Math.floor(Date.now() / 1000) + 3600 * 24 * 180 // 180 day expiration for key
);
await tx.wait();
```

**Finally, deploy the Super App with the `registrationKey` you've permissioned!**

```
const superAppFactory = await hre.ethers.getContractFactory(<<SuperAppContractName>>);
const mySuperApp = await factory.deploy(HOST_ADDR, registrationKey);

await mySuperApp.deployed();
```
