import React, { useState, useEffect } from "react";

const EventsCounter = ({ drizzle, drizzleState, contractName, eventName }) => {
  const [value, setValue] = useState();

  useEffect(() => {
    async function loadWeb3() {
      const web3 = drizzle.web3;
      const contract = drizzle.contracts[contractName];
      const web3Contract = new web3.eth.Contract(
        contract.abi,
        contract.address
      );
      const evs = await web3Contract.getPastEvents(eventName, {
        fromBlock: "0",
      });
      setValue(evs.length);
    }
    loadWeb3();
  }, []);

  return <span>{value}</span>;
};

export default EventsCounter;
