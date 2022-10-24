import { useState, useEffect } from "react";
import Web3 from "web3";
import ContractArtifact from "./HelloWorld.json";
import './App.css';

function App() {
  const [message, setMessage] = useState("");
  const [myAccount, setAccount] = useState("");

  const checkWallet = async () => {
      //check if MetaMask is installed in the browser
    if (window.ethereum) {
      setMessage("Wallet Found");
    } else {
      setMessage("Please Install MetaMask");
    }
  };

  const readSmartContract = async () => {
    if (window.ethereum) {
      // if MetaMask found, request Connexion to the Wallet Accounts (log in)
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      }); 

      // select the last used account, store it in state variable
      setAccount(account[0]); 

      // Web3.js

      // select the ABI and contract address from Artifact file
      const contractABI = ContractArtifact.abi;
      const contractAddress = ContractArtifact.networks[97].address;


      // Create a Web3 instance (Metamask + Infura)
      const web3 = new Web3(Web3.givenProvider); 

      // Get the deployed contract as an object
      const HelloContract = new web3.eth.Contract(contractABI, contractAddress); 

      // Return(call) the hello function of the contract
      const theResponse = await HelloContract.methods.hello().call();

      // Store the result as State Variable
      setMessage(theResponse);


    } else {
      // If no Wallet
      alert("Get MetaMask to connect");
    }
  };

  // Run CheckWallet on Page Loading
  useEffect(() => {
    checkWallet();
  }, []);

  return (
    <div className="App">
      <p>
      {/* If the Wallet is connected to an Account returns the message. Else show connect button */ }
        {myAccount ? (
          message
        ) : (
          <button onClick={readSmartContract}> Connect </button>
        )}
      </p>

    </div>
  );

}

export default App;
