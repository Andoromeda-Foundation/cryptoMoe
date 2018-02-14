import Web3 from 'web3';
import kittyAbi from './abi/A.json';

const rpc = 'https://ropsten.infura.io/3YGCODEa1zvOrH3kBUjL';

const web3Provider = window.web3 ? window.web3.currentProvider : null;
const web3 = web3Provider ? new Web3(web3Provider) : new Web3(new Web3.providers.HttpProvider(rpc));

// this.contract = web3.eth.contract(contractJson.abi).at(contractAddress);
// const rpc = "https://api.myetherapi.com/eth";
// const rpc = "https://mainnet.infura.io/WtTerXFEBdFeRdCPm58K";


const KittyContract = web3.eth.contract(kittyAbi).at('0x46478a8e504078252166d224b1d164e9c09301f6');
window.w = web3;
window.cc = KittyContract;

web3.eth.defaultAccount = web3.eth.accounts[0];

export const getGift = id => new Promise((resolve, reject) => {
  KittyContract.ownerOf(id, (err, result) => (err ? reject(err) : resolve(result[0]
  )));
});

export const buyGift = (value) => new Promise((resolve, reject) => {
  KittyContract.buy(,
  (err, result) => (err ? reject(err) : resolve(result)));
});

export const getTotal = () => new Promise((resolve, reject) => {
  KittyContract.total((err, result) => (err ? reject(err) : resolve(result)));
});
