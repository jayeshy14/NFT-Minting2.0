import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import {ethers} from "ethers";

function NFTs({ marketplace, setNFTitem}) {
  useEffect(()=>{
    document.title = "NFT Museum ETH"
},[]);
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const loadMarketplaceItems = async () => {
    let itemCount, getItems;

    try{
        itemCount = await marketplace.nextTokenId();
        getItems = await marketplace.getTokens();
    }catch(error){
      console.log(error);
    }
    let items = []

    for (let i = 0; i < itemCount; i++) {
      const item = getItems[i];
      if (item.isForSale) {
       console.log(1);
        const uri = await marketplace.tokenURI(i)
        console.log(2);        
        const response = await fetch(uri)
        const metadata = await response.json();
      
        const price = ethers.formatEther(item.price);
       
        items.push({
          price:price,
          tokenId: i,
          isForSale:item.isForSale,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        })
      }
    }
    setLoading(false)
    setItems(items)
    
  }

  useEffect(() => {
    loadMarketplaceItems()
  },[] )

  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2 className='text-white font-bold pt-24 text-2xl text-center'>Loading...</h2>
    </main>
  )

  return (
    <div className='flex flex-wrap gradient-bg-welcome   gap-10 justify-center pt-24 pb-5 px-16'>
         {
     ( items.length > 0 ?
    
            items.map((item) => (
              
              <Cards key={item.tokenId} item={item} setNFTitem={setNFTitem}  marketplace={marketplace} />

             
            ))
            
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2 className='text-white'>No listed assets</h2>
          </main>
        ) )}
    </div>
  )
}

export default NFTs