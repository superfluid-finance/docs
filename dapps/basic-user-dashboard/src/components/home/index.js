import React, { useEffect, useState } from "react";
import Dashboard from "../dashboard";
import DrizzleOptionsFactory from "../../shared/drizzleOptionFactory";
import Web3 from "web3";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import { AccountProvider } from "../../contexts/account/AccountContext";
import { BrowserRouter as Router } from "react-router-dom";

const Home = () => {
  const [web3, setWeb3] = useState();
  const [drizzle, setDrizzle] = useState();

  useEffect(() => {
    async function loadWeb3() {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.enable();
        setWeb3(new Web3(window.ethereum));
      } else {
        setWeb3(new Web3("ws://localhost:8545"));
      }
    }
    loadWeb3();
  }, []);

  useEffect(() => {
    async function loadDrizzle() {
      if (!web3) return;
      const drizzleOptions = await DrizzleOptionsFactory(web3);
      setDrizzle(new Drizzle(drizzleOptions));
    }
    loadDrizzle();
  }, [web3]);

  return typeof drizzle !== "undefined" ? (
    <DrizzleContext.Provider drizzle={drizzle}>
      <Router>
        <DrizzleContext.Consumer>
          {(drizzleContext) => {
            const { drizzle, drizzleState, initialized } = drizzleContext;

            if (!initialized) {
              return "Initializing drizzle...";
            }

            return (
              <AccountProvider drizzle={drizzle} drizzleState={drizzleState}>
                <Dashboard />
              </AccountProvider>
            );
          }}
        </DrizzleContext.Consumer>
      </Router>
    </DrizzleContext.Provider>
  ) : (
    <div>Loading...</div>
  );
};

export default Home;
