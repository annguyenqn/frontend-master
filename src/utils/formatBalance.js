import BigNumber from 'bignumber.js';
import { BIG_TEN } from './bigNumber';

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount, decimals = 18) => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals));
};

export const getBalanceAmount = (amount, decimals = 18) => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals));
};

/**
 * This function is not really necessary but is used throughout the site.
 */
export const getBalanceNumber = (balance, decimals = 18) => {
  return getBalanceAmount(balance, decimals).toNumber();
};

export const getFullDisplayBalance = (balance, decimals = 18, decimalsToAppear) => {
  return balance.dividedBy(BIG_TEN.pow(decimals)).toFixed(decimalsToAppear);
};

export const formatNumber = (number, minPrecision = 2, maxPrecision = 2, locale = 'vi-VN') => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  };
  return number.toLocaleString(locale, options);
};

export const formatInvest = (amount) => {
  if (amount < 10e6) {
    return amount.toLocaleString('vi-VN');
  } else if (amount < 10e8) {
    return (amount / 10e5).toLocaleString('vi-VN') + ' triệu';
  } else if (amount >= 10e8) {
    return (amount / 10e8).toLocaleString('vi-VN') + ' tỷ';
  }
};

export const formatTokenDecimal = (value) => {
  if (value) {
    const decimalValue = value - Math.floor(value);
    if (decimalValue.toString().length > 10) {
      return value.toFixed(8).replace('.', ',');
    } else {
      return value.toString().replace('.', ',');
    }
  }
};
