---
description: Create Your Own NFT Billboard with User Data
---

# NFT Billboard Example

### Build an NFT Billboard with Superfluid UserData

In this tutorial, we make a small tweak to the contracts used in the TradeableCashflow Super App to test out Superfluid's userData parameters. We set up a Scaffold-eth based repo, remove (comment out) some of the extra front end stuff, and then create a few scripts to allow us to easily create, read, update, and delete flows (we love CRUD).&#x20;

> NOTE: We recommend reading through our [Super Apps tutoria](https://docs.superfluid.finance/superfluid/protocol-tutorials/super-apps)l before completing this tutorial.

Our dapp will turn the TradeableCashflow into a tradeable NFT billboard that can be rented with streams. The message displayed on our billboard will be the parameter passed in as userData. If the billboard is traded, all rental cashflows will be redirected toward the new owner.

![This tutorial is most certainly NOT investment advice, but we'll assume that someone out there will want others to HODL their favorite assets...a decent use case for a billboard](<../../../.gitbook/assets/Screen Shot 2021-10-13 at 8.34.19 PM.png>)

You can follow along with the video version of this tutorial on Youtube, and fork the repo here as well:

{% embed url="https://github.com/superfluid-finance/protocol-monorepo/tree/dev/examples/nftbillboard-userdata" %}

{% embed url="https://www.youtube.com/watch?v=WJ7Ug0vxA04" %}

Before we get started with project setup, you'll also want to head over to the [Superfluid Dashboard](http://app.superfluid.finance) to claim testnet Super DAI (fDAIx) in at least one account on the network you'd like to use for the tutorial (I would suggest claiming these tokens on Mumbai, the Matic Testnet). To claim test DAI, you can head to the currencies tab in the dashboard and click the plus button on the far right in the DAI row to get your hands on some test Super DAIx.

![](<../../../.gitbook/assets/Screen Shot 2021-10-16 at 8.45.29 AM.png>)

![](<../../../.gitbook/assets/Screen Shot 2021-10-15 at 11.24.31 AM (1) (1).png>)

You'll want to have 2 Ethereum addresses ready: one of which you'll need your private key for (that has our test tokens), the other which we'll just be observing.



#### Scaffold-Eth and Hardhat Configuration

![](<../../../.gitbook/assets/Screen Shot 2021-10-14 at 10.48.18 AM (1).png>)

![To get your URL, click on your project, select 'View Key' and copy the HTTP URL.](<../../../.gitbook/assets/Screen Shot 2021-10-14 at 10.49.45 AM.png>)

You'll want to create a new .env file and put this URL there - in my case I've called it `MUMBAI_ALCHEMY_URL`.

I've also gotten the private key associated with the address I'll be using to deploy contracts and create flows. I've set this as an environment variable as well called `MUMBAI_DEPLOYER_PRIV_KEY`.

> NOTE: be VERY careful with your private keys. Do not push them to github or share them publicly. If you need help locating your keys within metamask, you can click on 'Account Details' in the menu and enter your password to 'Export Private Key.'

The standard hardhat.config file will have quite a few network options to choose from. However, in our case, I need to change my default network to "polytest," and include my Alchemy URL and keys under 'accounts' so that hardhat can use my account as a signer when deploying contracts.

Note: if you choose to use a different testnet, you'll need to change the default network to network you wish to use.

```
//inside of hardhat.config on line 29

// Select the network you want to deploy to here:
//
//using polytest (mumbai)
const defaultNetwork = "polytest";
```

Next, scroll down to 'polytest' in the list of potential networks that Scaffold-eth lists in hardhat.config. Add in your URL from Alchemy in 'url' and your private key in 'accounts.' Note: you'll need to prepend '0x' onto your private key. Again - these should be saved as environment variables - don't openly share your private key!

Note: if you choose to use a different testnet, you'll need to add this data for the network you wish to use (i.e. goerli, ropsten, etc.)

```
//inside of hardhat.config on line 163
polytest: {
    url: `${process.env.MUMBAI_ALCHEMY_URL}`,// using alchemy instead of moralis. add your own URL in .env
    gasPrice: 1000000000,
    accounts: [`0x${process.env.MUMBAI_DEPLOYER_PRIV_KEY}`]
    },
 },
```

Finally, we need to adjust our solidity compiler so that it's compatible with our project.&#x20;

```
//in hardhat.config on line 280
solidity: {
    compilers: [
      {
			//set compiler to version 0.7.0
        version: "0.7.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  }
```

#### Contracts

Next, we'll add in our two key contracts: RedirectAll.sol and TradeableCashflow.sol. As I mentioned, these are very similar to the example in our SuperApps tutorial, but with a few small changes to the RedirectAll.sol contract:

1\) We need to add variables which will store the incoming context and userData within the callbacks

```
//public variables which we'll set userData values to
    ISuperfluid.Context public uData;
    string public userData;
```

2\) We'll add new logic at the bottom of each callback:

Inside of the `afterAgreementCreated` callback:

```
// decode Context - store full context as uData variable for easy visualization purposes
ISuperfluid.Context memory decompiledContext = _host.decodeCtx(_ctx);
uData = decompiledContext;

//set userData variable to decoded value
//for now, this value is hardcoded as a string - this will be made clear in flow creation scripts within the tutorial
//this string will serve as a message on an 'NFT billboard' when a flow is created with recipient = tradeableCashflow
//it will be displayed on a front end for assistance in userData explanation

userData = abi.decode(decompiledContext.userData, (string));
```

Inside of the `afterAgreementUpdated` callback:

```
//update the context with the same logic...

ISuperfluid.Context memory decodedContext = _host.decodeCtx(_ctx);
uData = decodedContext;
userData = abi.decode(decodedContext.userData, (string));
```

Inside of the `afterAgreementTerminated` callback:

```
//set the userData (i.e. the billboard message) to an empty string
userData = "";
```

This logic will take in the message passed in as userData to calls made to the constant flow agreement which target the flow into this app, decode it, and set it to a storage variable so that we can very easily see what's going on throughout this process. Feel free to make this code your own and do your own gas optimization as you see fit 😁&#x20;

#### Contract Deployment

Scaffold-eth makes contract deployment easy: we simply need to use the already installed hardhat plugin, hardhat-deploy, to run our deployments. Each time we want to deploy a new NFT billboard contract, we can simply run `yarn deploy` to do so.

Inside of the already created deploy folder from Scaffold-eth, we'll pass in a few key addresses from the superfluid protocol as variables, and use them to write a deployment script for our Tradeable Cashflow (NFT billboard) contract.

We get the addresses for `host`, `cfa`, and `fDAIx` from the [Superfluid network directory.](https://docs.superfluid.finance/superfluid/networks/networks) If you want to deploy to a different testnet, you'll need to make adjustments here.

```
//inside of deploy/00_deploy_tradeable_cashflow.js
//mumbai addresses - change if using a different network

const host = '0xEB796bdb90fFA0f28255275e16936D25d3418603';
const cfa = '0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873';
const fDAIx = '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f';
//your address here...
const owner = '0x...';
```

Next, we'll need to add a deployment script for our TradeableCashflow.sol contract. Remember, TradeableCashflow.sol inherits from RedirectAll.sol, so we only need to deploy the single NFT contract.

We'll use the function getNamedAccounts() to get our deployer address. Because we included our account in the 'accounts' property in 'polytest' within hardhat.config, we'll get our address first when calling that function.

We can then deploy our contract fromm that address, and pass in the necessary parameters to the constructor of the TradeableCashflow contract (owner, name, symbol, host, cfa, acceptedToken).

```
//inside of deploy/00_deploy_tradeable_cashflow.js
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  console.log(deployer);

  await deploy("TradeableCashflow", {
    from: deployer,
    args: [owner, 'nifty_billboard', 'NFTBoard', host, cfa, fDAIx],
    log: true,
  })

//...

module.exports.tags = ["YourContract"];
```

#### Hardhat Scripts For Flow CRUD Functionality

```
//at the top of each script
const hre = require("hardhat");
require("dotenv");
const Web3 = require("web3");

//all addresses hardcoded for mumbai
const hostJSON = require("../artifacts/@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol/ISuperfluid.json")
const hostABI = hostJSON.abi;
const hostAddress = "0xEB796bdb90fFA0f28255275e16936D25d3418603";

const cfaJSON = require("../artifacts/@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol/IConstantFlowAgreementV1.json")
const cfaABI = cfaJSON.abi;
const cfaAddress = "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873";

const tradeableCashflowJSON = require("../artifacts/contracts/TradeableCashflow.sol/TradeableCashflow.json");
const tradeableCashflowABI = tradeableCashflowJSON.abi; 

//temporarily hardcode contract address and sender address
//need to manually enter contract address and sender address here
const deployedTradeableCashflow = require("../deployments/polytest/TradeableCashflow.json");
const tradeableCashflowAddress = deployedTradeableCashflow.address;

//your address here
const _sender = "0x...";
```

Then, in the bulk of our createFlow, updateFlow, and deleteFlow scripts, we'll create contract objects, define a web3 provider, and submit our call using the pattern outlined in Alchemy's docs on submitting transactions with web3.js.

```
//create a flow
async function main() {


  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.MUMBAI_ALCHEMY_URL));

  //create contract instances for each of these
  const host = new web3.eth.Contract(hostABI, hostAddress);
  const cfa = new web3.eth.Contract(cfaABI, cfaAddress);
  const tradeableCashflow = new web3.eth.Contract(tradeableCashflowABI, tradeableCashflowAddress);
  
  const fDAIx = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f"
  const userData = web3.eth.abi.encodeParameter('string', 'HODL BTC');

  const nonce = await web3.eth.getTransactionCount(_sender, 'latest'); // nonce starts counting from 0

  //create flow by calling host directly in this function
  //create flow from sender to tradeable cashflow address
  //pass in userData to the flow as a parameter
  async function startFlow() {
      let cfaTx = (await cfa.methods
     .createFlow(
      fDAIx,
      // _sender,
      tradeableCashflowAddress,
      "3858024691358",
      "0x"
     )
     .encodeABI())

     let txData = (await host.methods.callAgreement(
      cfaAddress, 
      cfaTx, 
      userData
    ).encodeABI());

    let tx = {
      'to': hostAddress,
      'gas': 3000000,
      'nonce': nonce,
      'data': txData
    }

    let signedTx = await web3.eth.accounts.signTransaction(tx, process.env.MUMBAI_DEPLOYER_PRIV_KEY);

    await web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
      if (!error) {
        console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
      } else {
        console.log("❗Something went wrong while submitting your transaction:", error)
      }
     });

    }
  

  await startFlow();

  }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Updating a flow is almost identical, but with a change in the userData and flowRate parameters:

```
//update a flow
async function main() {

  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.MUMBAI_ALCHEMY_URL));


  //create contract instances for each of these
  const host = new web3.eth.Contract(hostABI, hostAddress);
  const cfa = new web3.eth.Contract(cfaABI, cfaAddress);
  const tradeableCashflow = new web3.eth.Contract(tradeableCashflowABI, tradeableCashflowAddress);

  const fDAIx = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f"
  const userData = web3.eth.abi.encodeParameter('string', 'HODL ETH');


  const nonce = await web3.eth.getTransactionCount(_sender, 'latest'); // nonce starts counting from 0

  //create flow by calling host directly in this function
  //create flow from sender to tradeable cashflow address
  //pass in userData to the flow as a parameter
  async function updateFlow() {
      let cfaTx = (await cfa.methods
     .updateFlow(
      fDAIx,
      // _sender,
      tradeableCashflowAddress,
      "6858024691358",
      "0x"
     )
     .encodeABI())

     let txData = (await host.methods.callAgreement(
      cfaAddress, 
      cfaTx, 
      userData
    ).encodeABI());

    let tx = {
      'to': hostAddress,
      'gas': 3000000,
      'nonce': nonce,
      'data': txData
    }

    let signedTx = await web3.eth.accounts.signTransaction(tx, process.env.MUMBAI_DEPLOYER_PRIV_KEY);

    await web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
      if (!error) {
        console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
      } else {
        console.log("❗Something went wrong while submitting your transaction:", error)
      }
     });

    }

  await updateFlow();

  }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Our delete flow script has 2 key differences: there is no flowrate passed in, and no userData either. We set the value of userData inside of our contract back to an empty string when an agreement is terminated.

```
//delete a flow
async function main() {

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.MUMBAI_ALCHEMY_URL));

  //create contract instances for each of these
  const host = new web3.eth.Contract(hostABI, hostAddress);
  const cfa = new web3.eth.Contract(cfaABI, cfaAddress);
  const tradeableCashflow = new web3.eth.Contract(tradeableCashflowABI, tradeableCashflowAddress);

  const _sender = "0x9421FE8eCcAfad76C3A9Ec8f9779fAfA05A836B3"

  const accts = await web3.eth.getAccounts();

  const fDAIx = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f"

  const nonce = await web3.eth.getTransactionCount(_sender, 'latest'); // nonce starts counting from 0

  async function cancelFlow() {
      let cfaTx = (await cfa.methods
     .deleteFlow(
      fDAIx,
      _sender,
      tradeableCashflowAddress,
      "0x"
     )
     .encodeABI())
    //try using callAgreement vs callagreement w context
     let txData = (await host.methods.callAgreement(
      cfaAddress, 
      cfaTx, 
      //pass in empty field for userData
      "0x"
    ).encodeABI());

    let tx = {
      'to': hostAddress,
      'gas': 3000000,
      'nonce': nonce,
      'data': txData
    }

    let signedTx = await web3.eth.accounts.signTransaction(tx, process.env.MUMBAI_DEPLOYER_PRIV_KEY);

    await web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
      if (!error) {
        console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
      } else {
        console.log("❗Something went wrong while submitting your transaction:", error)
      }
     });

    }
  

  await cancelFlow();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Finally, we'll also create a script which helps us read on chain data that corresponds to our flow. This will allow us to see what Context looks like when passed around within the protocol, and it allows us to see what userData looks like when appended onto it as a bytes value. Once we can identify its place in the Context struct, we just need to decode it to make use of it.

```
//read flowData
async function main() {

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.MUMBAI_ALCHEMY_URL));

  //create contract instances for each of these
  const host = new web3.eth.Contract(hostABI, hostAddress);
  const cfa = new web3.eth.Contract(cfaABI, cfaAddress);
  const tradeableCashflow = new web3.eth.Contract(tradeableCashflowABI, tradeableCashflowAddress);
  const fDAIx = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f"


  //get data
  const decodedContext = await tradeableCashflow.methods.uData().call();
  const decodedUserData = web3.eth.abi.decodeParameter('string', decodedContext.userData);
  console.log(decodedContext)
  console.log(decodedUserData)
  
  //get jail info
  const jailed = await host.methods.getAppManifest(tradeableCashflowAddress).call()
  console.log(jailed)
  const isJailed = await host.methods.isAppJailed(tradeableCashflowAddress).call();
  console.log(`is jailed: ${isJailed}`);

  const flowInfo = await cfa.methods.getFlow(fDAIx, tradeableCashflowAddress, "0x00471Eaad87b91f49b5614D452bd0444499c1bd9").call();
  const outFlowRate = Number(flowInfo.flowRate);
  console.log(`Outflow Rate: ${outFlowRate}`);

  const netFlow = await cfa.methods.getNetFlow(fDAIx, tradeableCashflowAddress).call();
  console.log(`Net flow: ${netFlow}`);

  const inFlowRate = Number(netFlow) + outFlowRate;
  console.log(`Inflow rate: ${inFlowRate}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

A sample output from readData.js:

```
//decoded context in terminal

appLevel: '1',
callType: '3',
timestamp: '1634263831',
msgSender: '0x9421FE8eCcAfad76C3A9Ec8f9779fAfA05A836B3',
agreementSelector: '0x62fc305e',
userData: '0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000008484f444c20425443000000000000000000000000000000000000000000000000',
appAllowanceGranted: '13888889148145664',
appAllowanceWanted: '0',
appAllowanceUsed: '0',
appAddress: '0xB04FCcCc7Ef4cfCff6F1693492DdE15BcEbEe71f',
appAllowanceToken: '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f'
}
//decoded userData
"HODL BTC"
```

If you want, you can also check out the Superfluid dashboard to see these flows being created in real time (you just can't see the userData there)!



#### The Front End - Displaying our Billboard

In this repository, you'll see that you have many of the other components and UI elements from scaffold-eth still there. We left them there to give you the opportunity to continue tinkering with the rest of the framework if you choose to. However, to display our NFT Billboard, we'll need to make a few changes.

First, within the views folder, we'll make a copy of the 'ExampleUI.jsx' file called 'NFTBillboard.jsx' and make a few changes.

We'll add `message` and `billboardOwner` to our list of exports, and remove some of the items from ExampleUI:

```
export default function NFTBillboard({
  message,
  billboardOwner,
  mainnetProvider,
  readContracts,
}) 
```

And we'll also change the content our function component returns to reflect our data:

```
return (
    <div>
      {/*
        ⚙️ Here is a UI that displays and sets the message in your NFT Billboard:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h1>NFT Billboard</h1>
        <h2>Message: <b>{message}</b></h2>
        <Divider />
        <div style={{ margin: 8 }}>
            <h3>Owner:</h3>
            <h4>
                <Address address={billboardOwner} />
            </h4>
        </div>
                
      </div>


      <div style={{ width: 600, margin: "auto", marginTop: 32, paddingBottom: 256 }}>
      
      Billboard Contract Address:
        <Address
          address={readContracts && readContracts.TradeableCashflow ? readContracts.TradeableCashflow.address : null}
          ensProvider={mainnetProvider}
          fontSize={16}
        />

      </div>
    </div>
```

If you peer into the original 'ExampleUI.jsx' file, you'll see that we removed a great deal of content. All that's left is the top section and an Address component where we'll display our content's address. Again - you're welcome to utilize the other front end content if you'd like in your own applications 😎

Next, we need to add our NFTBillboard component to our App.jsx file, and make sure that we have logic that will read the message (i.e. `userData`) and owner of our billboard (the `_receiver` we pass in when we deployed our contract).

At the top of our file, we'll import the component

```
//in the top section of our App.jsx file
//add NFT billboard here
import NFTBillboard from "./views/NFTBillboard";
```

We'll then need to make sure that our react app is reading data from the right network. To do this, we'll need to make a change to targetNetwork . In our case, we'll set the network to NETWORKS.mumbai - but if you're using a different network, you'll need to specify that here.

```
//on line 57 within App.jsx
/// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS.mumbai; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
```

To get the values for the billboard owner and message, we'll need to use the useContractReader hook that's included in scaffold-eth from eth-hooks. You can read more about eth-hooks here.

The scaffold-eth framework already defines a helpful `readContracts` variable that we can pass to useContractReader which will allow us to read data from our deployed contracts. If you want to create new contracts that you can write to, you'll use the `writeContracts` variable instead.

```
//already included for us from Scaffold-eth
// Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider, contractConfig);
```

We can set our message and billboardOwner variables like this:

```
//two new variables that we'll use
const message = useContractReader(readContracts, "TradeableCashflow", "userData")
const billboardOwner = useContractReader(readContracts, "TradeableCashflow", "_receiver")
```

Finally, we'll include our NFTBillboard component in our body, and set the "/" route to render our billboard component.

```
// Some code
//at the top of our Switch statement
<Switch>
<Route exact path="/">
          
<NFTBillboard
    address={address}
    mainnetProvider={mainnetProvider}
    readContracts={readContracts}
    billboardOwner={billboardOwner}
    message={message}

  />

//...
</Route>
</Switch>
```

You'll notice that much of the body in App.jsx is commented out. If you're curious about what the other elements do, feel free to uncomment them and play around.

There you have it! You can run `yarn start` to run your react app locally, then `yarn deploy` on your contracts to see things render! To send your message, you can call `createFlow` to see the message appear on your billboard in real time.

I would also recommend opening up the superfluid dashboard to see how flows are moving into and out of your NFT contract. In the account you're using to deploy the contract, you'll see that you have a flow created into the contract.

Then, if you look at the account you used for the owner of the tradeable cashflow (i.e. billboard) contract, you'll see that you have an incoming stream from the contract itself.
