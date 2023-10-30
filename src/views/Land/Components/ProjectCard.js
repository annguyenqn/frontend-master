// import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'components/ProgessBar/ProgressBar';
import { FiCompass, FiInfo } from 'react-icons/fi';
import BadgeProject from './BadgeProject';
import ThumbnailBackdrop from './ThumbnailBackdrop';
import dayjs from 'dayjs';
import { Tooltip } from 'react-tippy';
import { DUMMY_TOTAL_NEEDED_INVEST } from 'constants/DummyData';
import { formatInvest } from 'utils/formatBalance';
import { formatTimeForBadge } from 'utils/formatTime';

const ProjectCard = ({ className = '', project, onClick }) => {
  const time = formatTimeForBadge(project);

  return (
    <div className={className} onClick={onClick}>
      <div className="max-w-sm mx-auto rounded-lg lg:mx-0 bg-black-3">
        <div className="relative rounded-lg">
          <div className="absolute z-10 w-full top-3">
            <BadgeProject status={project?.status} time={time} />
          </div>
          <ThumbnailBackdrop status={project?.status} className="rounded-lg" />
          <div className="overflow-hidden rounded-lg ">
            <img
              src={project?.images?.[0]?.url || '/images/default-image.png'}
              alt="project-card"
              className="object-cover object-center w-full h-48"
            />
          </div>
        </div>
        <div className="divide-y divide-black">
          <div className="py-4 px-7">
            <h5 className="text-lg font-bold">{project?.name}</h5>
            <div className="flex items-center mb-4">
              <FiCompass className="flex-none mr-2 text-2xl text-primary" size={'1.1rem'} />
              <span className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                {`${project?.location?.street}, ${project?.location?.district?.name}, ${project?.location?.province?.name}`}
              </span>
            </div>
            <div className="flex justify-between">
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
              <span className="text-primary">{project?.projectInfo?.totalInvestTime}</span>
            </div>
            <div className="flex justify-between">
              <span>Lợi nhuận kỳ vọng</span>
              <span className="text-primary">{project?.projectInfo?.expectedProfit}</span>
            </div>
          </div>
          <div className="py-4 px-7">
            <div className="flex items-end justify-between mb-1 text-sm">
              <span>{project?.investors} Nhà đầu tư</span>
              <span className="">
                {project?.investedSlot?.toLocaleString('vi-VN')}/{project?.totalSlot?.toLocaleString('vi-VN')} Phần
              </span>
            </div>
            <ProgressBar successRate={project?.totalInvested / (project?.value || +DUMMY_TOTAL_NEEDED_INVEST)} />
            <div className="flex justify-between mt-1 text-sm-md">
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
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object,
  onClick: PropTypes.func,
};

export default ProjectCard;
