import Web3 from 'web3';
import Promise from 'bluebird';
import cryptoWaterMarginABI from './abi/cryptoWaterMargin.json';

const rpc = 'https://ropsten.infura.io/3YGCODEa1zvOrH3kBUjL';

const web3Provider = window.web3 ? window.web3.currentProvider : null;
const web3 = web3Provider ? new Web3(web3Provider) : new Web3(new Web3.providers.HttpProvider(rpc));
web3.eth.defaultAccount = web3.eth.accounts[0];

const cryptoWaterMarginContract = web3.eth.contract(cryptoWaterMarginABI).at('0x46478a8e504078252166d224b1d164e9c09301f6');

export const getGift = id => new Promise((resolve, reject) => {
  cryptoWaterMarginContract.ownerOf(id, (err, result) => (err ? reject(err) : resolve(result,
  )));
});

export const getItem = async (id) => {
  const item = { id };
  [item.owner, item.nextPrice, item.startingPrice, item.price] = await Promise.all([
    Promise.promisify(cryptoWaterMarginContract.ownerOf)(id),
    Promise.promisify(cryptoWaterMarginContract.nextPriceOf)(id),
    Promise.promisify(cryptoWaterMarginContract.startingPriceOf)(id),
    Promise.promisify(cryptoWaterMarginContract.priceOf)(id),
  ]);
  return item;
};

export const buyGift = value => new Promise((resolve, reject) => {
  cryptoWaterMarginContract.buy((err, result) => (err ? reject(err) : resolve(result)));
});

export const getTotal = () => new Promise((resolve, reject) => {
  cryptoWaterMarginContract.totalSupply((err, result) => (err ? reject(err) : resolve(result)));
});
