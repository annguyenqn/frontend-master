import { formatNumber } from '../../../../../utils/formatBalance';
import { PAYMENT_HISTORY_STATUS } from '../../../../../constants/payment';
import { FiInfo } from 'react-icons/fi';
import { Tooltip } from 'react-tippy';
import classnames from 'classnames';
import { Fragment } from 'react';

const THEAD = ['Mức giá (VND)', 'Số lượng (phần)', 'Tổng tiền (VND)'];

const AmountCell = ({ payment }) => {
  return (
    <div className="text-left">
      <p className="text-primary font-bold">
        {formatNumber(payment.amount, 0, 0)} {payment.currency}
      </p>
      {PAYMENT_HISTORY_STATUS[payment?.status] === PAYMENT_HISTORY_STATUS.SUCCESS && (
        <Tooltip
          // open={true}
          // sticky={true}
          distance={-20}
          position="bottom-start"
          html={
            <table className="whitespace-nowrap payment-detail">
              <thead>
                <tr>
                  {THEAD.map((title, index) => (
                    <th key={index} scope="col" className={classnames('px-1  py-2  sm:text-md text-white  text-left')}>
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payment.matchedPrices.map((price, index) => (
                  <Fragment key={index}>
                    <tr className="bg-blue1" key={index}>
                      <td className={classnames('px-2  py-2 sm:text-md text-white ')}>
                        {formatNumber(price.price, 0, 0)}
                      </td>
                      <td className={classnames('px-2  py-2 sm:text-md text-white ')}>
                        {formatNumber(price.slotFilled, 2, 3)}
                      </td>
                      <td className={classnames('px-2  py-2 sm:text-md text-white ')}>
                        {formatNumber(price.filled, 0, 0)}
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          }
        >
          <p className="text-primary font-bold flex items-center relative">
            ({payment.slotFilled?.toLocaleString('vi-VN') || 0} phần) <FiInfo className="ml-1" size={20} />
          </p>
        </Tooltip>
      )}
    </div>
  );
};

export default AmountCell;
