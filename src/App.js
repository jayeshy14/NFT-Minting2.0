import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import Home from './components/Home';
import NFTs from './components/NFTs';
import {marketplace_abi} from "./ABI/Abi.js"
import Create from './components/Create';
import { useEffect, useState } from 'react';
import { ethers, Contract} from 'ethers';
import 'react-toastify/dist/ReactToastify.css';
import Info from './components/Info.jsx';
import MyNFTs from './components/MyNFTs.jsx';


function App() {

  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [marketplace, setMarketplace]= useState({});
  const [nftitem, setNFTitem] = useState({})



  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload()
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setLoading(false)
        let marketplaceAddress = "0xe4a8D0CE71f7Cbb49ed56f982b1B9d6A806C884e";
       
        const marketplacecontract = new Contract(
          marketplaceAddress,
          marketplace_abi,
          signer
        );

       
        // console.log(marketplacecontract);
        setMarketplace(marketplacecontract);
     
       
      } else {
        console.error("Metamask is not installed");
      }
    };

    provider && loadProvider();
  }, []);




  return (
    <BrowserRouter>
    <ToastContainer/>
    <div className="App min-h-screen">
      <div className='gradient-bg-welcome h-screen w-screen'>
      <Nav account={account}/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/all-nft" element={<NFTs marketplace={marketplace} setNFTitem={setNFTitem} />}></Route>
        <Route path="/create" element={<Create marketplace={marketplace}  />}></Route>
        <Route path="/info" element={<Info nftitem={nftitem} marketplace={marketplace} />}></Route>
        <Route path = "/my-nfts" element = {<MyNFTs setNFTitem={setNFTitem} marketplace = {marketplace}/>}></Route>
      </Routes>
      </div>
    </div>
  
    </BrowserRouter>
  );
}

export default App;


//kiichain: 0x482035207606Dccd3C12074869B86152d4867f93
//arbitrum-sepolia: 0x6ACabcaAa096Df132c2aF5F06D9008C1C49Ea7cA
//sepolia: 0xfA3d1A6290DeaC3c6241608AE4cB331074f3C463