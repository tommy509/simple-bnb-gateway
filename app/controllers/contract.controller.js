require('dotenv').config({path:__dirname+'../../../.env'})
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
const contract = require("../../artifacts/contracts/RNFTGeneric.sol/RNFTGeneric.json")
const contractAddress = process.env.MASTER_ADDRESS
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)


exports.getContractAddress = (req, res) => {
    res.status(200).send({address:contractAddress});
};

exports.getRNFTAbi = (req, res) => {
  res.status(200).send({contract});
};


    