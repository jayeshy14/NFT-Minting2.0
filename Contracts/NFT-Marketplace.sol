// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is ERC721URIStorage, Ownable(msg.sender) {
    uint256 public itemCount;
    uint256 public tokenCount;

    struct Item {
        uint256 itemId;
        uint256 tokenId;
        uint256 price;
        address payable seller;
        bool itemview;
    }

    mapping(uint256 => Item) public items;
    event Offered(uint256 itemId, uint256 tokenId, uint256 price, address indexed seller);
    event Viewed(uint256 itemId, uint256 tokenId, uint256 price, address indexed seller);

    constructor() ERC721("Marketplace", "MKT") {}

    function mint(string memory _tokenURI, uint256 _price) external onlyOwner returns (uint256) {
        tokenCount++;
        _mint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        items[tokenCount] = Item(itemCount, tokenCount, _price, payable(msg.sender), false);
        itemCount++;
        return tokenCount;
    }

    function setview(uint256 _itemId) external {
        require(items[_itemId].seller == msg.sender, "Only seller can set view status");
        items[_itemId].itemview = true;
        emit Viewed(_itemId, items[_itemId].tokenId, items[_itemId].price, msg.sender);
    }

    function viewitem(uint256 _itemId) external view returns (uint256, uint256, uint256, address, bool) {
        Item memory item = items[_itemId];
        return (item.itemId, item.tokenId, item.price, item.seller, item.itemview);
    }


    function getTotalPrice(uint256 _itemId) public view returns (uint256) {
        return items[_itemId].price;
    }

    function getview(uint256 _itemId) public view returns (bool) {
        return items[_itemId].itemview;
    }

}
