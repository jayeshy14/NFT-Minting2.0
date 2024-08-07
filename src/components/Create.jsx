import React, { useEffect, useState } from 'react'
import { ethers } from "ethers"
import axios from 'axios'
import { toast } from 'react-toastify'

function Create({marketplace}) {

    const [nftimage, setNFTImage] = useState();
    const [forminfo, setFormInfo] = useState({
      title:"",
      description:"",
      price:"",
    });

    useEffect(()=>{
      document.title = "Create"
  }, []);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormInfo((prevState) => ({ ...prevState, [name]: value }));
    };
  
    const changeHandler = (event) => {
      setNFTImage(event.target.files[0]);
    };
  
    const handleEvent = async (e) => {
      e.preventDefault();
      console.log(nftimage);
      console.log(forminfo);

      const formData = new FormData();
      const jsonformData = new FormData();
  
      formData.append('file', nftimage);
  
      const metadata = JSON.stringify({
          name: forminfo.title,
          description: forminfo.description
      });
      jsonformData.append('pinataMetadata', metadata);
      
      const options = JSON.stringify({
          cidVersion: 0,
      })
      jsonformData.append('pinataOptions', options);
  
      try{
  
          const resFile = await axios({
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
              data: formData,
              headers: {
                pinata_api_key: `0a13ef76fb9e01561e05`,
                pinata_secret_api_key: `f0a2d096004e4f0483a64d06236ddc252b8d8acf612cde6465bc78f013a08ab0`,
                "Content-Type": "multipart/form-data",
              },
            });
  
          console.log(resFile.data);
  
          const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
  
          const info ={
              name: forminfo.title,
              description: forminfo.description,
              image: ImgHash,
              price: forminfo.price,
          }
  
          async function pinJSONToPinata(info) {
              const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
              const headers = {
                  'Content-Type': 'application/json',
                  'pinata_api_key': `0a13ef76fb9e01561e05`,
                  'pinata_secret_api_key': `f0a2d096004e4f0483a64d06236ddc252b8d8acf612cde6465bc78f013a08ab0`
              };
  
              try {
                  const res = await axios.post(url, info, { headers });
                  const meta = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
                  // console.log(meta);
                  mintThenList(meta);
              } catch (error) {
                  console.error("Error:", error);
              }
  
          }
      
       pinJSONToPinata(info)
      
        } catch (error) {
          console.log(error);
        }
      
    };


  const mintThenList = async (uri) => { 
    try{

      toast.info("Confirm to Mint the NFT", {
        position: "top-center"
      })
  
    const price = ethers.parseEther(forminfo.price.toString());
    const tx1=  await(await marketplace.mint(uri, price));
  
    toast.info("Wait till transaction Confirms....", {
      position: "top-center"
    })
  
    await tx1.wait()
    toast.success("NFT added to marketplace successfully", {position:"top-center"})
    }catch(error){
      console.error(error);
    }


}


  return (
    <div className='h-screen pt-24'>
        <div className="container-fluid mt-5 text-left">
          <div className="content mx-auto">

<form className="max-w-sm mx-auto">

    <div className='max-w-lg mx-auto'>
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload Image</label>
  <input onChange={changeHandler} name="file" className="block w-full mb-4 h-8 text-m  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"  type="file" />
    </div>

  
  <div className="mb-4">
    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NFT Name</label>
    <input onChange={handleChange} type="text" id="title" name='title' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter NFT name" required />
  </div>

  <div className="mb-4">
    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Price</label>
    <input onChange={handleChange} type="text" id="price" name='price' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter price" required/>
  </div>

  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
  <textarea onChange={handleChange}  name="description" id="description" rows="4" className="block p-2.5 w-full text-sm  mb-4 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write description about NFT..."></textarea>
 
 <div className='text-center'>


  <button onClick={handleEvent} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >
                  Mint NFT
                </button>
                </div>
</form>  
          </div>
    </div>
    </div>
  )
}

export default Create