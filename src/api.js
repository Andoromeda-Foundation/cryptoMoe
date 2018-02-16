import Promise from 'bluebird';
import web3 from '@/web3';
import cryptoWaterMarginABI from './abi/cryptoWaterMargin.json';

const cryptoWaterMarginContract = web3.eth.contract(cryptoWaterMarginABI).at('0xb80107de25b619da3dcd7f7614d53b69300fe799');

export const getMe = async () => ({
  address: web3.eth.defaultAccount,
});

export const getItem = async (id) => {
  const exist = await Promise.promisify(cryptoWaterMarginContract.tokenExists)(id);
  if (!exist) return null;
  const item = { id };
  [item.owner, item.nextPrice, item.startingPrice, item.price, item.approved] = await Promise.all([
    Promise.promisify(cryptoWaterMarginContract.ownerOf)(id),
    Promise.promisify(cryptoWaterMarginContract.nextPriceOf)(id),
    Promise.promisify(cryptoWaterMarginContract.startingPriceOf)(id),
    Promise.promisify(cryptoWaterMarginContract.priceOf)(id),
    Promise.promisify(cryptoWaterMarginContract.approvedFor)(id),
  ]);
  return item;
};

export const buyItem = (id, price) => new Promise((resolve, reject) => {
  cryptoWaterMarginContract.buy(id, {
    value: price, // web3.toWei(Number(price), 'ether'),
    gas: 220000,
  },
  (err, result) => (err ? reject(err) : resolve(result)));
});

export const getTotal = () => Promise.promisify(cryptoWaterMarginContract.totalSupply)();

export const getItemIds = (offset, limit) => Promise.promisify(
  cryptoWaterMarginContract.itemsForSaleLimit)(offset, limit);
