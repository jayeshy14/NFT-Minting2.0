import React from 'react'
import { Link } from 'react-router-dom'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'

function Info({nftitem, marketplace}) {
  const handleBuy = async() =>{
      toast.info("Wait till transaction Confirms....", {
      position: "top-center"
      })
      try{
        const priceInWei = ethers.parseEther(nftitem.price);
        const transaction =  await (await marketplace.purchaseToken(nftitem.tokenId, {value: priceInWei, gas:4000000}));
        await transaction.wait();
        toast.success("Transaction Confirmed!", {
          position: "top-center"
         })                 
        }catch(error){
        console.error(error);
         toast.info("Transaction Failed!", {
          position: "top-center"
         })
      }

  }
  console.log(nftitem)
  return (
    <div className='flex items-center px-48 gap-4 pt-32'>
        <div className='h-full'>
            <img src={nftitem.image} alt="" srcSet="" className='h-[450px] rounded'/>
        </div>
        <div className='card-inner card-info p-5'>
          <div className='text-2xl'>
          <h1 className='text-white font-semibold text-3xl'>Name: {nftitem.name}</h1>
          <h1 className='text-white font-semibold text-3xl'>Price: {nftitem.price} ETH</h1>
          </div>
           
           <div className='border border-zinc-700 mt-2 mb-4'></div>
           <div className='flex flex-col items-start border border-zinc-700 h-[250px] rounded'>
           <h3 className='text-xl font-samll text-zinc-300 w-full border p-2 border-zinc-700 '>Description</h3>
           <p className='p-2 text-zinc-400'>{nftitem.description}</p>
           </div>
            {nftitem.isForSale && <button className=" mt-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm px-5 py-2 text-center me-2 mb-2"
             onClick={handleBuy}>Buy</button>}
           <Link as={Link} to="/all-nft">
           
           <button className=" mt-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm px-5 py-2 text-center me-2 mb-2" >
                 Back
                </button>
                </Link>

        </div>
    </div>
  )
}

export default Info