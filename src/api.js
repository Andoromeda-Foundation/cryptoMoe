import Web3 from 'web3';
import kittyAbi from './abi/A.json';

const rpc = 'https://ropsten.infura.io/3YGCODEa1zvOrH3kBUjL';

const web3Provider = window.web3 ? window.web3.currentProvider : null;
const web3 = web3Provider ? new Web3(web3Provider) : new Web3(new Web3.providers.HttpProvider(rpc));

// this.contract = web3.eth.contract(contractJson.abi).at(contractAddress);
// const rpc = "https://api.myetherapi.com/eth";
// const rpc = "https://mainnet.infura.io/WtTerXFEBdFeRdCPm58K";


const KittyContract = web3.eth.contract(kittyAbi).at('0xb80107de25b619da3dcd7f7614d53b69300fe799');
window.w = web3;
window.cc = KittyContract;

web3.eth.defaultAccount = web3.eth.accounts[0];

export const getGift = id => new Promise((resolve, reject) => {
  KittyContract.ownerOf(id, (err, result) => (err ? reject(err) : resolve({
    birthTime: 'birth time',
    buyer: result,
    message: 'far',
    from: 'from',
    to: 'to',
    value: 1,
    id,
  })));
});

export const buyGift = (itemId, value) => new Promise((resolve, reject) => {
  KittyContract.buy(itemId, {
    value: web3.toWei(Number(value), 'ether'),
    gas: 220000,
  },
  (err, result) => (err ? reject(err) : resolve(result)));
});

export const getTotal = () => new Promise((resolve, reject) => {
  KittyContract.totalSupply((err, result) => (err ? reject(err) : resolve(result)));
});

