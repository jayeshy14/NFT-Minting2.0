import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
function Cards({item, setNFTitem}) {

  return (
    <div className='card-div'>
    <div className='card-inner p-2'>
        <img src={item.image} alt="" className='object-cover w-[230px] h-[230px] rounded overflow-hidden'/>
        <div className='flex flex-col justify-center items-center'>
        <h3 className='text-white text-2xl font-thin mt-3'>Name: {item.name}</h3>
        <h3 className='text-white text-2xl font-thin mt-3'>Price: {item.price} ETH</h3>
        <div className='flex text-white justify-between items-center mb-3 gap-4 mt-3'>
            <Link as={Link} to="/info">
            <button type="button"  onClick={()=>setNFTitem(item)}
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded text-sm px-5 py-1.5 text-center me-2 ">
              View</button>

          </Link> 


            
        </div>
        </div>
        
    </div>
    </div>
  )
}

export default Cards