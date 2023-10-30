import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FiCompass, FiInfo } from 'react-icons/fi';
import ProgressBar from 'components/ProgessBar/ProgressBar';
import BadgeProject from './BadgeProject';
import { Tooltip } from 'react-tippy';
import dayjs from 'dayjs';
import { DUMMY_TOTAL_NEEDED_INVEST } from 'constants/DummyData';
import { formatInvest } from 'utils/formatBalance';
import { formatTimeForBadge } from 'utils/formatTime';

const Representative = ({ className, project }) => {
  const history = useHistory(0);
  const time = formatTimeForBadge(project);

  return (
    <div
      className={`flex flex-col-reverse md:flex-row bg-black-3 cursor-pointer hover:scale-105 transform transition-transform duration-500 rounded-xl ${className}`}
      onClick={() => history.push(`/land/detail/${project?.id}`)}
    >
      <div className="w-full divide-y divide-black md:w-1/2">
        <div className="px-8 py-10 md:px-14">
          <Tooltip title={project?.name} position="top-start" trigger="mouseenter">
            <h5 className="overflow-hidden text-2xl font-bold md:text-5xl whitespace-nowrap overflow-ellipsis">
              {project?.name}
            </h5>
          </Tooltip>
          <div className="flex items-center">
            <FiCompass className="flex-none mr-2 text-2xl text-primary" />
            <span className="overflow-hidden whitespace-nowrap overflow-ellipsis">
              {`${project?.location?.street}, ${project?.location?.district?.name}, ${project?.location?.province?.name}`}
            </span>
          </div>
        </div>
        <div className="px-8 py-10 md:px-14">
          <div className="flex justify-between mb-1">
            <span>
              Thời gian đầu tư
              <Tooltip
                html={
                  <>
                    Bắt đầu <b>{dayjs(project?.openTime).format('DD-MM-YYYY HH:mm')}</b> <br /> Kết thúc{' '}
                    <b>{dayjs(project?.closeTime).format('DD-MM-YYYY HH:mm')}</b>
                  </>
                }
              >
                <FiInfo className="inline-block ml-2 text-sm text-primary" strokeWidth={2} />
              </Tooltip>
            </span>
            <span className="font-bold text-primary">{project?.projectInfo?.totalInvestTime}</span>
          </div>
          <div className="flex justify-between">
            <span>Lợi nhuận kỳ vọng </span>
            <span className="font-bold text-primary">{project?.projectInfo?.expectedProfit}</span>
          </div>
        </div>
        <div className="px-8 py-6 md:px-14">
          <div className="flex justify-between mb-1">
            <span>{project?.investors} Nhà đầu tư </span>
            <span className="font-bold">
              {project?.investedSlot?.toLocaleString('vi-VN')}/{project?.totalSlot?.toLocaleString('vi-VN')} Phần
            </span>
          </div>

          <ProgressBar successRate={project?.totalInvested / (project?.value || +DUMMY_TOTAL_NEEDED_INVEST)} />

          <div className="flex justify-between pt-1 text-sm-md">
            <span className="">
              {((project?.totalInvested / (project?.value || +DUMMY_TOTAL_NEEDED_INVEST)) * 100)?.toLocaleString(
                'vi-VN',
                { maximumFractionDigits: 2 },
              )}{' '}
              %
            </span>

            <span className="flex items-center justify-end flex-none">
              {formatInvest(project?.totalInvested)}/
              {formatInvest(project?.value) || formatInvest(+DUMMY_TOTAL_NEEDED_INVEST)}
            </span>
          </div>
        </div>
      </div>
      <div className="relative md:w-1/2">
        <div className="absolute z-10 w-full top-3">
          <BadgeProject status={project?.status} time={time} />
        </div>
        <div className="h-full overflow-hidden rounded-xl ">
          <img
            src={project?.images?.[0]?.url || '/images/default-image-16x9.png'}
            alt="representative"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

Representative.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object,
};

Representative.defaultProps = {
  className: '',
  project: {},
};

export default React.memo(Representative);
