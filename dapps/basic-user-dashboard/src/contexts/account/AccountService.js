const mint = async (account, drizzle, amount) => {
  const web3 = drizzle.web3;
  const contract = drizzle.contracts["TestToken"];
  const web3TestTokenContract = new web3.eth.Contract(
    contract.abi,
    contract.address
  );
  await web3TestTokenContract.methods
    .mint(account, amount)
    .send({ from: account });
};

const approve = async (account, drizzle, amount) => {
  const web3 = drizzle.web3;
  const SuperTestTokenContract = drizzle.contracts["SuperTestToken"];
  const contract = drizzle.contracts["TestToken"];
  const web3TestTokenContract = new web3.eth.Contract(
    contract.abi,
    contract.address
  );
  await web3TestTokenContract.methods
    .approve(SuperTestTokenContract.address, amount)
    .send({ from: account });
};

const loadNetwork = async (drizzle) => {
  return await drizzle.web3.eth.net.getNetworkType();
};

const loadAccount = async (drizzleState) => {
  return await drizzleState.accounts[0];
};

const findFirst = (events) => {
  if (!events) return undefined;
  return events.find((e) => !!e);
};

const sortEvents = (events) => {
  if (!events) return undefined;
  return events.sort((a, b) => (a.blockNumber < b.blockNumber ? 1 : -1));
};

const filterEvents = (event) => {
  if (!event) return undefined;
  const rate = parseInt(event.returnValues["flowRate"]);
  if (rate > 0) {
    return event;
  }
  return undefined;
};

const groupBy = ({ Group: array, By: props }) => {
  const getGroupedItems = (item) => {
    const returnArray = [];
    let i;
    for (i = 0; i < props.length; i++) {
      const key = item[props[i]];
      if (!key) continue;
      returnArray.push(key.toLowerCase());
    }
    return returnArray;
  };

  let groups = {};
  for (let i = 0; i < array.length; i++) {
    const arrayRecord = array[i];
    const group = JSON.stringify(getGroupedItems(arrayRecord.returnValues));
    groups[group] = groups[group] || [];
    groups[group].push(arrayRecord);
  }
  return Object.keys(groups).map((group) => {
    return groups[group];
  });
};

const createResult = (events) => {
  const groupByProperties = ["sender", "receiver"];
  const groupedEvent = groupBy({ Group: events, By: groupByProperties });
  const result = [];
  for (let i = 0; i < groupedEvent.length; i++) {
    const event = groupedEvent[i];
    const length = event.length;
    const sortedEvents = sortEvents(event);
    const latestEvent = findFirst(sortedEvents);
    const filtered = filterEvents(latestEvent);
    if (!filtered) continue;
    result.push({ total: length, data: filtered });
  }
  return result;
};

const listEvents = async (drizzle, account) => {
  const web3 = drizzle.web3;
  const contract = drizzle.contracts["FlowAgreement"];
  const web3Contract = new web3.eth.Contract(contract.abi, contract.address);
  const outEvents = await web3Contract.getPastEvents("FlowUpdated", {
    filter: { sender: account },
    fromBlock: 0,
  });

  const inEvents = await web3Contract.getPastEvents("FlowUpdated", {
    filter: { receiver: account },
    fromBlock: 0,
  });

  return {
    out: createResult(outEvents),
    in: createResult(inEvents),
  };
};

const remove = async (senderAccount, drizzle, receiverAccount, fromAccount) => {
  const web3 = drizzle.web3;
  const superTestTokenContract = drizzle.contracts["SuperTestToken"];
  const contract = drizzle.contracts["FlowAgreement"];
  const web3FlowAgreementContract = new web3.eth.Contract(
    contract.abi,
    contract.address
  );
  await web3FlowAgreementContract.methods
    .deleteFlow(superTestTokenContract.address, senderAccount, receiverAccount)
    .send({ from: fromAccount });
};

const update = async (account, drizzle, toAccount, amount) => {
  const web3 = drizzle.web3;
  const SuperTestTokenContract = drizzle.contracts["SuperTestToken"];
  const contract = drizzle.contracts["FlowAgreement"];
  const web3FlowAgreementContract = new web3.eth.Contract(
    contract.abi,
    contract.address
  );
  await web3FlowAgreementContract.methods
    .updateFlow(SuperTestTokenContract.address, account, toAccount, amount)
    .send({ from: account });
};

const upgrade = async (account, drizzle, amount) => {
  const web3 = drizzle.web3;
  const superTestTokenContract = drizzle.contracts["SuperTestToken"];
  const web3SuperTestTokenContract = new web3.eth.Contract(
    superTestTokenContract.abi,
    superTestTokenContract.address
  );
  await web3SuperTestTokenContract.methods
    .upgrade(amount)
    .send({ from: account });
};

const REFRESH_PERIOD = 2 * 60;

const getSuperTokenRealTimeBalance = async (
  drizzle,
  drizzleState,
  lastRefreshedTime,
  setSuperFluidTokenAmount: (superFluidTokenAmount: number) => void,
  account,
  setLastRefreshedTime: (lastRefreshedTime: number) => void
) => {
  if (
    !lastRefreshedTime ||
    drizzleState.currentBlock.timestamp - lastRefreshedTime >= REFRESH_PERIOD
  ) {
    setSuperFluidTokenAmount("refreshing...");
    setLastRefreshedTime(drizzleState.currentBlock.timestamp);
    const SuperTestTokenContract = drizzle.contracts["SuperTestToken"];
    const timestamp = drizzleState.currentBlock.timestamp
      ? drizzleState.currentBlock.timestamp
      : Date.now();
    const realTimeBalance = await SuperTestTokenContract.methods
      .realtimeBalanceOf(account, timestamp)
      .call();
    setSuperFluidTokenAmount(
      new Number(drizzle.web3.utils.fromWei(realTimeBalance, "ether")).toFixed(
        5
      )
    );
  }
};

export {
  mint,
  approve,
  loadNetwork,
  loadAccount,
  listEvents,
  remove,
  update,
  upgrade,
  getSuperTokenRealTimeBalance,
};
