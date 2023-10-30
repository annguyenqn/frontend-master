import { showToastError } from 'components/CustomToast/CustomToast';
import { getAddress } from '@ethersproject/address';

export const searchRegExp = /\./g;
export const replaceWith = '';

export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function getParameterCaseInsensitive(object, key) {
  if (object instanceof Object) {
    return object[Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase())];
  }
  return undefined;
}

export const getLink = (link) => {
  if (link) {
    if (link?.match(/^http[s]?:\/\//)) {
      return link;
    }
    return 'http://' + link;
  }
  return '';
};

export const formatNumberMinifiedCharacters = (number, decimals = 2) => {
  if (isNaN(number)) {
    return {
      value: '???',
      unit: '',
    };
  }
  if (number === Infinity) {
    return {
      value: number,
      unit: '',
    };
  }
  // billion
  if (number > 1000 * 1000 * 1000000000) {
    return {
      value: (number / 1000000000)?.toExponential(decimals),
      unit: 'B',
    };
  }
  if (number > 100 * 1000000000) {
    return {
      value: (number / 1000000000)?.toFixed(decimals),
      unit: 'B',
    };
  }
  // million
  if (number > 100 * 1000000) {
    return {
      value: (number / 1000000)?.toFixed(decimals),
      unit: 'M',
    };
  }
  return {
    value: number?.toFixed(decimals),
    unit: '',
  };
};

export const handleToastError = (error) => {
  console.log(error);
  if (error?.response?.data?.errors?.[0]?.msg) {
    showToastError(error.response.data.errors[0].msg);
  } else {
    showToastError('Đang có lỗi xảy ra, xin vui lòng thử lại sau!');
  }
};

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address, chars = 4) {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

// ---------------
// VALID FORM
export const validateName = (name) => {
  return /^([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]+)$/.test(
    name,
  );
};

export const validateEmail = (email) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );

// check first 4 character
export const validateBank = (str) => {
  const value = str.substring(0, 4);
  if (value !== '9704') return false;
  return true;
};

export const validatePhone = (phone) => /^(03|05|07|08|09)+([0-9]{8})\b/.test(phone);

export const validatePasswordNumber = (password) => password?.length >= 8;

export const validatePassword = (password) =>
  !/^([^0-9]+)$/.test(password) && !/^([^A-Z]+)$/.test(password) && !/^([^!|@|#|$|%|^|&|*|~|.|?|,]+)$/.test(password);

export const validateMinInvest = (value, limit) => {
  const valueNumber = value?.replace(searchRegExp, replaceWith);
  return +valueNumber >= +limit;
};

export const validateMultiplesInvest = (value) => {
  const valueNumber = value?.replace(searchRegExp, replaceWith);
  return +valueNumber % 1000 === 0;
};

export const validateSocical = (url) => url?.includes('http');

export const validateNumber = (number) => !Number.isNaN(+number) && number >= 0;

export const validateGoogleEmbed = (url) => !url || /^(http|https):\/\/www.google.com\/maps\/embed/.test(url);

export const validateYoutubeEmbed = (url) => !url || /^(http|https):\/\/www.youtube.com\/watch\?v\=/.test(url);

// ------------------
// Format value price
export const getFee = (value, percent = 0) => {
  const valueNumber = value?.replace(searchRegExp, replaceWith);
  return (+((+valueNumber * percent) / 100)?.toFixed(0))?.toLocaleString('vi-VN');
};

export const getTotal = (investAmount, feeInvestAmount) => {
  const totalNumber =
    +investAmount?.replace(searchRegExp, replaceWith) + +feeInvestAmount?.replace(searchRegExp, replaceWith);
  return (+totalNumber)?.toLocaleString('vi-VN');
};

export const formatCurrencyVND = (value) => {
  let valueNumber = value?.replace(searchRegExp, replaceWith);
  if (!Number.isNaN(+valueNumber) && value) {
    valueNumber = (+valueNumber)?.toLocaleString('vi-VN');
    return valueNumber;
  }
  return (+valueNumber?.slice(0, -1))?.toLocaleString('vi-VN');
};

// ------------------
export const getURLSearchParams = (url) => {
  if (url) {
    const searchParams = new URL(url)?.searchParams;
    const params = new URLSearchParams(searchParams);
    return params;
  } else {
    return false;
  }
};
