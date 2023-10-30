export const PAYMENT_TYPES = {
  VNP: 'VNP',
  MOMO: 'MOMO',
  PAYME: 'PAYME',
};
export const PAYME_PAYMENT_METHOD = {
  ATMCARD: 'ATMCARD',
  CREDITCARD: 'CREDITCARD',
  BANKTRANSFER: 'BANKTRANSFER',
};

export const STATUS_PROJECT_KEY = {
  SELLING: 'SELLING',
  END: 'END',
  PENDING: 'PENDING',
};

export const COLOR_BADGE = {
  FAIL: 'danger',
  INACTIVE: 'light',
  EXPIRED: 'secondary',
  ACTIVE: 'primary',
  NEW: '',
  OPENING: 'primary',
  SUCCESS: 'primary',
};

export const ASSET_STATUS = {
  NEW: 'NEW',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PREPARE_FOR_SALE: 'PREPARE_FOR_SALE',
  OPENING: 'OPENING',
  CLOSED: 'CLOSED',
  EXPIRED: 'EXPIRED',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  WHITELIST_SOON: 'WHITELIST_SOON', // Sắp bán mà chưa tới thời gian whitelist
  WHITELIST_OPENING: 'WHITELIST_OPENING', // Sắp bán và đang cho whitelist
};

//Cái new là mới tạo, active là đc duyệt rồi, inactive là gỡ bỏ, closed là mở bán giữa chừng mà muốn đóng, success là huy động đủ vốn, fail là huy động vốn ko thành công
// nếu status active mà:
//  - chưa tới thời gian mở bán thì -> PREPARE_FOR_SALE
//  - đang ở khung thời gian bán -> OPENING
//  - hết thời gian bán -> EXPIRED

export const STATUS_PROJECT = {
  [ASSET_STATUS.NEW]: 'Chờ xử lý',
  [ASSET_STATUS.ACTIVE]: 'Đã mở bán',
  [ASSET_STATUS.INACTIVE]: 'Khóa',
  [ASSET_STATUS.OPENING]: 'Mở bán',
  [ASSET_STATUS.SUCCESS]: 'Thành công',
  [ASSET_STATUS.CLOSED]: 'Kết thúc',
  [ASSET_STATUS.EXPIRED]: 'Hết hạn',
  [ASSET_STATUS.PREPARE_FOR_SALE]: 'Sắp bán',
  [ASSET_STATUS.WHITELIST_SOON]: 'Sắp mở whitelist',
  [ASSET_STATUS.WHITELIST_OPENING]: 'Mở whitelist',
  [ASSET_STATUS.FAIL]: 'Thất bại',
};
// -------------------------
export const REFUND_STATUS = {
  NEW: 'Chờ xử lý',
  FAIL: 'Thất bại',
  SUCCESS: 'Thành công',
};
//----------------------------
// LAND PAGE FILTER

export const COLOR_STATUS_LANDING_PAGE = {
  PREPARE_FOR_SALE: 'white-1',
  OPENING: 'yellow-1',
  SUCCESS: 'primary',
};
export const ASSET_STATUS_LANDING_PAGE = {
  PREPARE_FOR_SALE: 'PREPARE_FOR_SALE',
  OPENING: 'OPENING',
  SUCCESS: 'SUCCESS',
  // NEW: 'NEW',
  // ACTIVE: 'ACTIVE',
  // INACTIVE: 'INACTIVE',
  WHITELIST_SOON: 'WHITELIST_SOON', // Sắp bán mà chưa tới thời gian whitelist
  WHITELIST_OPENING: 'WHITELIST_OPENING', // Sắp bán và đang cho whitelist
  // CLOSED: 'CLOSED',
  EXPIRED: 'EXPIRED',
  FAIL: 'FAIL',
};

export const ASSET_STATUS_TITLE = {
  [ASSET_STATUS.PREPARE_FOR_SALE]: 'Sắp mở bán',
  [ASSET_STATUS.SUCCESS]: 'Gọi vốn thành công',
  [ASSET_STATUS.NEW]: 'Chờ xử lý',
  [ASSET_STATUS.ACTIVE]: 'Kích hoạt',
  [ASSET_STATUS.INACTIVE]: 'Khóa',
  [ASSET_STATUS.OPENING]: 'Đang mở bán',
  [ASSET_STATUS.CLOSED]: 'Đã Kết thúc',
  [ASSET_STATUS.EXPIRED]: 'Đã Hết hạn',
  [ASSET_STATUS.WHITELIST_SOON]: 'Sắp mở whitelist',
  [ASSET_STATUS.WHITELIST_OPENING]: 'Mở whitelist',
  [ASSET_STATUS.FAIL]: 'Thất bại',
};

export const ASSET_STATUS_FILTER = () => {
  const result = [{ id: 1, name: 'Tất cà trạng thái', value: '' }];
  result.push.apply(
    result,
    Object.values(ASSET_STATUS_LANDING_PAGE).map((item) => {
      return {
        id: item,
        name: ASSET_STATUS_TITLE[item],
        icon: <div className={`inline-block w-3 h-3 ml-2 rounded-full bg-${COLOR_STATUS_LANDING_PAGE[item] || ''}`} />,
        iconActive: (
          <div className={`inline-block w-5 h-5 rounded-full bg-${COLOR_STATUS_LANDING_PAGE[item] || 'black-1'}`} />
        ),
        value: item,
      };
    }),
  );
  return result;
};
//----------------------------

export const STATUS_USER = {
  [ASSET_STATUS.NEW]: 'Chờ xử lý',
  [ASSET_STATUS.ACTIVE]: 'Kích hoạt',
  [ASSET_STATUS.INACTIVE]: 'Khóa',
};

export const ROLE_USER = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const BADGE_PROJECT = {
  [ASSET_STATUS.WHITELIST_SOON]: {
    text: 'text-white-1',
    bg: 'bg-white-1',
    ribbonText: <span>Ngày mở whitelist:</span>,
    isCountdown: false,
  },
  [ASSET_STATUS.WHITELIST_OPENING]: {
    text: 'text-white-1',
    bg: 'bg-white-1',
    ribbonText: <span>Ngày đóng whitelist:</span>,
    isCountdown: true,
  },
  [ASSET_STATUS.PREPARE_FOR_SALE]: {
    text: 'text-white-1',
    bg: 'bg-white-1',
    ribbonText: <span>Ngày mở bán:</span>,
    isCountdown: true,
  },
  [ASSET_STATUS.OPENING]: {
    text: 'text-yellow-1',
    bg: 'bg-yellow-1',
    ribbonText: <span>Ngày kết thúc bán:</span>,
    isCountdown: true,
  },
  [ASSET_STATUS.SUCCESS]: {
    text: 'text-primary',
    bg: 'bg-primary',
    ribbonText: <span>Gọi vốn thành công</span>,
  },
  [ASSET_STATUS.EXPIRED]: {
    text: 'text-gray-300',
    bg: 'bg-gray-300',
    ribbonText: <span>Gọi vốn không thành công</span>,
  },
  [ASSET_STATUS.FAIL]: {
    text: 'text-gray-300',
    bg: 'bg-gray-300',
    ribbonText: <span>Gọi vốn không thành công</span>,
  },
};

export const PROJECT_INFO = {
  square: 'Diện tích sử dụng nhà ở',
  purposeOfUse: 'Mục đích sử dụng',
  legal: 'Pháp lý',
  totalInvestTime: 'Thời gian đầu tư',
  expectedProfit: 'Lợi nhuận kỳ vọng',
  assetOwnTime: 'Thời hạn sở hữu',
  usageForm: 'Hình thức sử dụng',
};

export const FORMAT_TIME_KEY = {
  Y: 'Năm',
  M: 'Tháng',
  D: 'Ngày',
  h: 'Giờ',
  m: 'Phút',
  s: 'Giây',
};
export const TIME_KEY = {
  Y: 'Y',
  M: 'M',
  D: 'D',
  h: 'h',
  m: 'm',
  s: 's',
};
