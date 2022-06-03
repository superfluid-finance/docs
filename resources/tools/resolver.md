---
description: >-
  This helper contract makes it easy to find the contract addresses for the
  protocol
---

# Resolver

The Resolver is a helper contract which allows you to quickly find all the contract addresses for the Superfluid Framework. You can think of it as on-chain Superfluid directory.

The resolver is always deployed when the protocol is deployed. You've probably used it already and didn't know it, as this is what the `@superfluid-finance/sdk-core` uses each time you call `Framework.create()`.

If you’re using the SDK Core, it’s unlikely that you need the resolver, because the SDK exposes various methods which call the resolver behind the scenes to access specific contract addresses. For example, if you need to access a Super Token, you can do so by symbol using:

`await sf.loadSuperToken(”USDCx”);`

Similarly, if you need the address of any specific agreement, you can access these addresses from the Framework object itself. For example, if the Framework object is instantiated for the Goerli network like so:

```
const sf = await Framework.create({
    networkName: "goerli",
    provider
});
```

You can access the address of the host contract using the Framework object:

`sf.settings.config.hostAddress`

And the addresses of the constant flow agreement or instant distribution agreement contracts like so:

```
sf.settings.config.cfaV1Address
sf.settings.config.idaV1Address
```

> These addresses are also accessible in the [Network Directory](../../developers/networks/) and with the [Superfluid Console](https://console.superfluid.finance/protocol).

### Accessing Contracts In Solidity with the Host and Resolver

Accessing these contracts in solidity is a bit different. However, it can be just as easy if you know how to use the Superfluid Resolver and/or the Superfluid Host contract to get these addresses. In the below contract, you’ll see 3 sample functions which demonstrate how to access the addresses of already deployed contracts:

```jsx
pragma solidity 0.8.13;

import { IResolver } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/utils/IResolver.sol";
import { ISuperfluid } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

contract ResolverExample {
    IResolver public resolver;
    ISuperfluid public host;

    constructor(IResolver _resolver, ISuperfluid _host) {
        resolver = _resolver;
        host = _host;
    }

    function getContractFromResolver(string calldata name) external view returns (address) {
        address addr = resolver.get(name);
        return addr;
    }

    function getCFAContract() external view returns (address) {
        bytes32 agreement;
        agreement = keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1");

        address agreementAddress = address(host.getAgreementClass(agreement));
        return agreementAddress;
    }

    function getIDAContract() external view returns (address) {
        bytes32 agreement;
        agreement = keccak256("org.superfluid-finance.agreements.InstantDistributionAgreement.v1");

        address aggrementAddress = address(host.getAgreementClass(agreement));
        return agreementAddress;
    }
}
```

To get the address of a Superfluid agreement like the Constant Flow Agreement or Instant Distribution agreement, you can use the Superfluid Host contract’s `getAgreementClass` method. You can see this being done in both the `getCFAContract()` and `getIDAContract()` examples in the above contract. You need to hash the following string:

```jsx
`org.superfluid-finance.agreements.${agreementName}.v1`
```

Then pass it as an argument to the `host.getAgreementClass` method. From here, you need to get the address of the returned contract using the same syntax seen in the above contract on lines 24 and 32.

In the case of other contracts, you can use the Resolver. If you look deep into the Superfluid SDK Core, you’ll see that the resolver makes use of the Superfluid Loader contract to load in the entire Framework.

To get a specific token address using the Resolver, you can use the `resolver.get()` method as seen in the above contract with the following schema:

```jsx
//for Super Tokens
resolver.get(`supertokens.${protocolReleaseVersion}.superTokenSymbol`);

//example
resolver.get('supertokens.v1.DAIx');
```

```jsx
//for ERC20 tokens listed with the protocol
resolver.get(`tokens.tokensymbol`);

//example
resolver.get('tokens.DAI');
```

If you'd like, you can also use the Resolver to get the entirety of the framework with the Superfluid Loader. You need to pass in the following argument to the `resolver.get()` function to make this happen:

```jsx
resolver.get('SuperfluidLoader-v1');
```

The above line of code will return the address of the Superfluid Loader contract on your current network. This method will return an array which contains 4 of the key addresses used within the protocol: the host, super token factory, CFA, and IDA contract. The function needed to do this is the `loadFramework` function, with the current protocol version passed in as a lone string parameter:

```
superfluidLoader.loadFramework("v1");
```
