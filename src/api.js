import Promise from 'bluebird';
import web3 from '@/web3';
import * as config from '@/config';
import request from 'superagent';
import timeout from 'timeout-then';
import cryptoWaterMarginABI from './abi/cryptoWaterMargin.json';

const cryptoWaterMarginContract = web3.eth.contract(cryptoWaterMarginABI).at('0xb80107de25b619da3dcd7f7614d53b69300fe799');

let adStore = [];
let isInit = false;

export const init = async () => {
  await request
    .get('https://api.leancloud.cn/1.1/classes/ad')
    .set({
      'X-LC-Id': 'R6A46DH2meySCVNM1uWOoW2M-gzGzoHsz',
      'X-LC-Key': '8R6rGgpHa0Y9pq8uO53RAPCB',
    })
    .type('json')
    .accept('json')
    .then((response) => {
      if (response.body && response.body.results) {
        adStore = response.body.results;
      }
      isInit = true;
    });
};

init().then();

export const getMe = async () => {
  const address = web3.eth.defaultAccount;
  return address ? { address } : null;
};

export const getAd = async (id, time = 0) => {
  if (!isInit) {
    return timeout((time + 1) * 500).then(() => getAd(id, time + 1));
  }

  const item = adStore.find(x => x.id === `${id}`);

  if (item && item.ad) {
    return item.ad;
  }

  return '';
};

export const setAd = async (id, str) => {
  const response = await request
    .get('https://api.leancloud.cn/1.1/classes/ad')
    .set({
      'X-LC-Id': 'R6A46DH2meySCVNM1uWOoW2M-gzGzoHsz',
      'X-LC-Key': '8R6rGgpHa0Y9pq8uO53RAPCB',
    })
    .type('json')
    .accept('json');
  if (response.body && response.body.results) {
    adStore = response.body.results;
  }
  const item = adStore.find(x => x.id === `${id}`);

  if (item) {
    // update
    await request
      .put(`https://api.leancloud.cn/1.1/classes/ad/${item.objectId}`)
      .set({
        'X-LC-Id': 'R6A46DH2meySCVNM1uWOoW2M-gzGzoHsz',
        'X-LC-Key': '8R6rGgpHa0Y9pq8uO53RAPCB',
      })
      .type('json')
      .accept('json')
      .send({
        ad: str,
      });

    return str;
  }

  // create
  await request
    .post('https://api.leancloud.cn/1.1/classes/ad')
    .set({
      'X-LC-Id': 'R6A46DH2meySCVNM1uWOoW2M-gzGzoHsz',
      'X-LC-Key': '8R6rGgpHa0Y9pq8uO53RAPCB',
    })
    .type('json')
    .accept('json')
    .send({
      id: `${id}`,
      ad: str,
    });

  return str;
};

export const getItem = async (id) => {
  const exist = await Promise.promisify(cryptoWaterMarginContract.tokenExists)(id);
  if (!exist) return null;
  const card = config.cards[id] || {};
  const item = {
    id,
    name: card.name,
    nickname: card.nickname,
  };
  [[item.owner, item.startingPrice, item.price, item.nextPrice], item.ad] =
    await Promise.all([
      Promise.promisify(cryptoWaterMarginContract.allOf)(id),
      getAd(id),
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

export const isItemMaster = async (id) => {
  const me = await getMe();
  const item = await getItem(id);

  return me && me.address && item && item.owner && me.address === item.owner;
};

export const getItemsOf = async address => Promise.promisify(
  cryptoWaterMarginContract.tokensOf)(address)
  ;
