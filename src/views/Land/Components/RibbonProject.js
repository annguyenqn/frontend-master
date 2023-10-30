import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDurationOpening } from 'utils/formatTime';
import useRefresh from 'hooks/useRefresh';
import dayjs from 'dayjs';
import { BADGE_PROJECT, STATUS_PROJECT } from 'constants/config';

const RibbonProject = ({ status, time }) => {
  const [duration, setDuration] = useState({});
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    if (BADGE_PROJECT[status]?.isCountdown) {
      setDuration(formatDurationOpening(dayjs().valueOf(), time));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fastRefresh]);

  return (
    <div className="absolute left-0 flex justify-end w-full py-1 pr-2 space-x-2 text-sm font-bold leading-tight bg-white top-1 pl-28 text-black-3 z-9">
      {duration && BADGE_PROJECT[status]?.ribbonText}
      {!time ? (
        ''
      ) : !duration ? (
        <span>
          Sự kiện <span className="lowercase">{STATUS_PROJECT[status]} </span>kết thúc
        </span>
      ) : BADGE_PROJECT[status]?.isCountdown ? (
        <span>{Object.keys(duration).map((key) => `${duration[key]}${key} `)}</span>
      ) : (
        <span>{dayjs(time).format('DD-MM-YYYY HH:mm')}</span>
      )}
    </div>
  );
};

RibbonProject.propTypes = {
  status: PropTypes.string,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default RibbonProject;
