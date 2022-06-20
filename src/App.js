import logo from './assets/kresgelogo2.png';
import './App.css';
import {Connection, Transaction, SystemProgram, sendAndConfirmTransaction, TransactionInstruction, getLatestBlockhash, signTransaction, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL} from '@solana/web3.js';
import { Buffer } from 'buffer';

import { useState } from 'react';

function App() {
  const [wallet, setWallet] = useState(null);
  const [message, setMessage] = useState("");
  const [num, setNum] = useState(0);

 
   
  
  const connect = async() => {
    // console.log("connect");
    try{
      const provider = window.solana;
      if(provider.isPhantom){
        const resp = await window.solana.connect();
        setWallet(resp.publicKey)
        setMessage("Connected to\n"+resp.publicKey.toString().slice(0,4)+"..."+resp.publicKey.toString().slice(-4,-1));
        console.log(window.solana);
      }
      else{
        setWallet()
      }
    }
    catch{
      setMessage("Could not connect to Phantom")
    }
  }

  const updateNum = (e) =>{
    setNum(e.target.value);
    console.log(e.target.value);
  }

  const transfer = async() =>{
    window.Buffer=Buffer;
    const network = "https://api.devnet.solana.com";
    // const connection = new Connection(network);
    let connection = new Connection(clusterApiUrl('devnet'));
    const slot = await connection.getSlot();
    console.log(slot);
    const instruction = SystemProgram.transfer({
    fromPubkey: new PublicKey("79todjDMEaCpBrdNhpcwfAH4yuujxdxTqNtaE9zXFNEh"),
    toPubkey: new PublicKey("CSZaKampR4nssZbZyiAv96xofWjcYow9kQCQdJhdnSYr"),
    lamports: LAMPORTS_PER_SOL * num
    });
    const transaction = new Transaction();
    transaction.add(instruction);
    transaction.feePayer = wallet;
    let hash = await connection.getLatestBlockhash();
    console.log("blockhash", hash);
    transaction.recentBlockhash = hash.blockhash;
    console.log("Wallet:" + wallet);
    const receipt =  await window.solana.signAndSendTransaction(transaction);
    console.log("receipt: "+receipt);
  }
  
  return (
    <div className="App">
    <div id="landing">
      <br />
      <h1>Donate Solana</h1>
      <div id="connectButton"onClick={connect}>
        <h1>Connect Phantom Wallet</h1>
      </div>
      <h1>{message}</h1>
      <div id="inputSection">
        <h1>Select Amount</h1>
        <input onChange = {updateNum} type="number"></input>
        <div id="connectButton"onClick={transfer}>
        <h1>Transfer</h1>
      </div>
      </div>
      
    </div >
    <div id="logoBox">
    <img src={logo}></img>
    </div>
    </div>
   
  );
}

export default App;
