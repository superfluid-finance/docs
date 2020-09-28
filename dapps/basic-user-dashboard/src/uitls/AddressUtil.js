import React from "react";

const short = (address, web3) => {
  if (web3.utils.isAddress(address))
    return (
      address.substring(0, 10) +
      "..." +
      address.substring(address.length - 10, address.length)
    );
};

const isValidAddress = (address, web3) => {
  return web3.utils.isAddress(address);
};

export { short, isValidAddress };
