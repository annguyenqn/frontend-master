import axios from 'axios';
import address from 'constants/contracts';
import { TOKENS } from 'constants/index';
// import tokens from 'constants/tokens'

const chunk = (arr, n) => (arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : []);

const lookUpPrices = async function (id_array) {
  const prices = {};
  for (const id_chunk of chunk(id_array, 50)) {
    let ids = id_chunk.join('%2C');
    let res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=' + ids + '&vs_currencies=usd');

    for (const [key, v] of Object.entries(res.data)) {
      if (v.usd) prices[key] = v.usd;
    }
  }
  return prices;
};

// export async function getBscPrices() {
//   const idPrices = await lookUpPrices(TOKENS.map(x => x.id));
//
//   const prices = {}
//   for (const bt of TOKENS)
//     if (idPrices[bt.id])
//       prices[bt.contract] = idPrices[bt.id];
//   return prices;
// }

export async function getPrices() {
  const idPrices = await lookUpPrices(TOKENS.map((x) => x.id));
  return idPrices;
  // const prices = {}
  // for (const bt of TOKENS)
  //   if (idPrices[bt.id])
  //     prices[bt.contract] = idPrices[bt.id];
  // return {
  //   ...prices,
  // [tokens.iPEFI.address[ChainId.AVALANCHE]]: prices[tokens.pefi.address[ChainId.AVALANCHE]] * 1.01,
  // [tokens.xJoe.address[ChainId.AVALANCHE]]: prices[tokens.joe.address[ChainId.AVALANCHE]] * 1.01
  // };
}

export async function getPricesKai() {
  const prices = {};
  // const idPrices = await lookUpPrices(TOKENS.map((x) => x.id))

  let res = await axios.get('https://api.info.kaidex.io/api/tokens');
  for (const [key, v] of Object.entries(res.data.data)) {
    if (v.price) prices[key.toLowerCase()] = +v.price;
  }

  return {
    ...prices,
    [address.dragon]: prices?.[address.defily.toLowerCase()],
  };

  // const prices = {}
  // for (const bt of TOKENS) if (idPrices[bt.id]) prices[bt.contract] = idPrices[bt.id]
  //
  // return {
  //   ...prices,
  //   [tokens.kusd.address.toLowerCase()]: 1,
  // }
}
