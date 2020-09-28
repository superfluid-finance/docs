import React, { useEffect, useState } from "react";

const AccountBalance = ({ drizzle, drizzleState, account, render }) => {
  const [value, setValue] = useState();

  useEffect(() => {
    async function loadWeb3() {
      const balance = await drizzle.web3.eth.getBalance(account);
      if (render) {
        setValue(render(balance));
      } else {
        setValue(balance);
      }
    }
    loadWeb3();
  });

  return <span>{value}</span>;
};

export default AccountBalance;
