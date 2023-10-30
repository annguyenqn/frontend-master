import { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useState } from 'react';
import { useRef } from 'react';

// eslint-disable-next-line no-unused-vars
const ProgressBarPriceStep = ({ prices }) => {
  const [state, setState] = useState([]);
  const priceBarRef = useRef();

  const scrollYPriceBar = (index, lastIndex) => {
    setTimeout(() => {
      const target = document?.querySelector(`#filled-item-${index}`);
      const targetBounding = target?.getBoundingClientRect();
      priceBarRef?.current?.scrollTo(lastIndex == index ? targetBounding?.left : targetBounding?.left - 100, 0);
    }, 100);
  };

  useEffect(() => {
    const updateData = prices?.map((item) => ({
      ...item,
      tokenValue: item?.to - item?.from,
      totalFill: item?.price * (item?.to - item?.from),
    }));
    setState(updateData);
    scrollYPriceBar(
      updateData.findIndex((i) => !i.isFullFill),
      updateData?.length - 1,
    );
  }, [prices]);

  return (
    <div className="relative overflow-auto group" ref={priceBarRef}>
      <div className="flex flex-auto min-w-screen-xl xl:min-w-min">
        {/* BADGE CURRENCY */}
        <div className="flex flex-col justify-center pr-4 text-sm font-bold uppercase text-primary">
          <p className="mb-2">Phần</p>
          <p>Giá</p>
        </div>
        <div className="flex-auto">
          {/* UP OF BAR */}
          <div className="flex mt-2">
            {state.map((item, index) => (
              <div
                key={`token-bar-${index}`}
                className={classNames(
                  'text-center text-xs font-bold min-w-12',
                  item?.tokenValue <= 50 && 'flex-1',
                  item?.tokenValue > 50 && item?.tokenValue <= 300 && 'flex-2',
                  item?.tokenValue > 300 && item?.tokenValue <= 500 && 'flex-3',
                  item?.tokenValue > 500 && item?.tokenValue <= 700 && 'flex-4',
                  item?.tokenValue > 700 && 'flex-5',
                )}
              >
                <span>
                  {item?.from + 1}-{item?.to}
                </span>
              </div>
            ))}
          </div>
          {/* PROGRESS BAR */}
          <div className="relative">
            {/*PROGRESS BAR - FILL & BULKHEAD */}
            <div className="z-0 flex h-2 overflow-hidden bg-black rounded">
              {state.map((item, index) => (
                <div
                  key={`current-bar-${index}`}
                  className={classNames(
                    'flex min-w-12 relative',
                    item?.tokenValue <= 50 && 'flex-1',
                    item?.tokenValue > 50 && item?.tokenValue <= 300 && 'flex-2',
                    item?.tokenValue > 300 && item?.tokenValue <= 500 && 'flex-3',
                    item?.tokenValue > 500 && item?.tokenValue <= 700 && 'flex-4',
                    item?.tokenValue > 700 && 'flex-5',
                  )}
                >
                  {/* Fill */}
                  <div
                    id={`filled-item-${index}`}
                    style={{ width: item?.isFullFill ? '100%' : `${(item?.filled / item?.totalFill) * 100}%` }}
                    className={classNames(
                      item?.isFullFill && 'bg-teal-400',
                      item?.filled / item?.totalFill < 1 && 'bg-gradient-to-r from-teal-400 to-black',
                    )}
                  />
                  {/* bulkhead */}
                  <div
                    className={classNames(
                      index === state.length - 1 ? '' : 'border-r-4 ',
                      'w-full absolute top-0 left-0 h-full',
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* BELOW OF BAR */}
          <div className="flex mb-1">
            {state.map((item, index) => (
              <div
                key={`vnd-bar-${index}`}
                className={classNames(
                  'text-center text-sm min-w-12 font-bold',
                  item?.tokenValue <= 50 && 'flex-1',
                  item?.tokenValue > 50 && item?.tokenValue <= 300 && 'flex-2',
                  item?.tokenValue > 300 && item?.tokenValue <= 500 && 'flex-3',
                  item?.tokenValue > 500 && item?.tokenValue <= 700 && 'flex-4',
                  item?.tokenValue > 700 && 'flex-5',
                )}
              >
                {(item?.price / 10e5)?.toLocaleString('vi-VN')}
                <span className="text-xs">tr</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ProgressBarPriceStep.propTypes = {
  prices: PropTypes.array.isRequired,
};

ProgressBarPriceStep.defaultProps = {
  prices: [],
};

export default ProgressBarPriceStep;
