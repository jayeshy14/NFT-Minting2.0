import { ethers } from 'ethers';

const buy = async(marketplace, tokenId, price) => {
    let transaction;
        try{
            const priceInWei = ethers.parseEther(price);
            console.log(price);
            console.log(tokenId);
         transaction = await (await marketplace.purchaseToken(tokenId, {value: priceInWei, gas:4000000}));
        transaction.wait();
         console.log(transaction);
        }
        catch(error){
            console.error(error);
     
        }
}
 

export default buy