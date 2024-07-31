import { ethers } from 'ethers';

const useFetchImages = async(marketplaceContract, provider) => {
      if (!provider&&!marketplaceContract) return [];

      const totalSupply = await marketplaceContract.nextTokenId();
      const fetchedImages = [];
      const getImages = await marketplaceContract.getTokens();
      // console.log(totalSupply);
      // console.log(getImages);
      for (let i = 0; i < totalSupply; i++) {
        try {
          const uri = await marketplaceContract.tokenURI(i);
          // console.log(uri);
          if(!getImages[i].isForSale)continue;
            fetchedImages.push({
            tokenId: i,
            price:ethers.formatEther(getImages[i].price),
            url:`https://gold-quick-antelope-719.mypinata.cloud/ipfs/${uri}`,
            isForSale: getImages[i].isForSale
            });
            // console.log(i);
        } catch (error) {
          console.error(`Failed to fetch metadata for tokenId ${i}:`, error);
        }
      }
      return fetchedImages;
  }

export default useFetchImages;
