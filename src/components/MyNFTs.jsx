import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
const MyNFTs = ({setNFTitem, marketplace}) => {
    const [myNFTs, setMyNFTs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        let [getItems, getItemIds, getItemsCount] =[];
        const LoadItems = async() => {
            let items = [];
            try{
                 [getItems, getItemIds, getItemsCount] = await marketplace.getMyTokens();
                 console.log(getItemIds);
                setMyNFTs(items);
            }catch(error){
                console.error(error);
            }
            for(let i=0; i<getItemsCount; i++){
                const item = getItems[i];
                const uri = await marketplace.tokenURI(getItemIds[i]);

                const response = await fetch(uri);
                const metadata = await response.json();
                const price = ethers.formatEther(item.price);
                items.push({
                    price:price,
                    tokenId:getItemIds[i],
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image,
                })
            }
            setMyNFTs(items);
            setLoading(false);
        }
        LoadItems();


        console.log(myNFTs.length);



    }, [])

    if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h2 className='text-white font-bold pt-24 text-2xl text-center'>Loading...</h2>
        </main>
      )
  return (
    <div>
          <div className='flex flex-wrap gradient-bg-welcome   gap-10 justify-center pt-24 pb-5 px-16'>
            {
            (myNFTs.length > 0 ?
    
            myNFTs.map((item, idx) => (
              
                <div className='card-div'>
                <div className='card-inner p-2'>
                    <img src={item.image} alt="" className='object-cover w-[230px] h-[230px] rounded overflow-hidden'/>
                    <div className='flex flex-col justify-center items-center'>
                    <h3 className='text-white text-2xl font-thin mt-3'>{item.name}</h3>
                    <div className='flex text-white justify-between items-center mb-3 gap-4 mt-3'>
                        <Link as={Link} to="/info">
                        <button type="button"  onClick={() => setNFTitem(item)}
                        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded text-sm px-5 py-1.5 text-center me-2 ">
                          View</button>
            
                      </Link> 
            
            
                        
                    </div>
                    </div>
                    
                </div>
                </div>

            ))
            
            : (
            <main style={{ padding: "1rem 0" }}>
                <h2 className='text-white'>No listed assets</h2>
            </main>
            ) )}
        </div>
    </div>
  )
}

export default MyNFTs
