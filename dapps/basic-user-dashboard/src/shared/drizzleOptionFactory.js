import Superfluid from "@superfluid-finance/ethereum-contracts";

const configs = {
  kovan: {
    resolverAddress: "0x6258d03724c90138baf05Ed7bb438a037C7bA6E4",
  },
};

const DrizzleOptionFactory = async (web3) => {
  const networkType = await web3.eth.net.getNetworkType();

  const contractInterfaces = await Superfluid.load(web3.currentProvider);
  const resolver = await contractInterfaces.TestResolver.at(
    configs[networkType].resolverAddress
  );
  const version = process.env.REACT_APP_CONTRACTS_VERSION;
  console.log("Using contracts version", version);
  const testTokenAddress = await resolver.get.call(`TestToken.${version}`);
  const superTestTokenAddress = await resolver.get.call(
    `SuperTestToken.${version}`
  );
  const flowAgreementAddress = await resolver.get.call(
    `FlowAgreement.${version}`
  );
  console.log("TestToken", testTokenAddress);
  console.log("SuperTestToken", superTestTokenAddress);
  console.log("FlowAgreement", flowAgreementAddress);

  return {
    web3: {
      customProvider: web3,
    },
    contracts: [
      {
        contractName: "TestToken",
        web3Contract: (await contractInterfaces.TestToken.at(testTokenAddress))
          .contract,
      },
      {
        contractName: "SuperTestToken",
        web3Contract: (
          await contractInterfaces.ISuperToken.at(superTestTokenAddress)
        ).contract,
      },
      {
        contractName: "FlowAgreement",
        web3Contract: (
          await contractInterfaces.IFlowAgreement.at(flowAgreementAddress)
        ).contract,
      },
    ],
    events: {
      ISuperToken: [
        "AgreementCreated",
        "AgreementTerminated",
        "AgreementAccountStateUpdated",
      ],
    },
  };
};

export default DrizzleOptionFactory;
