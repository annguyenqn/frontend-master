import { ASSET_STATUS, FORMAT_TIME_KEY, TIME_KEY } from 'constants/config';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const getDurationObject = (startTime, endTime) => {
  return {
    [TIME_KEY.Y]: dayjs?.duration(endTime - startTime).years(),
    [TIME_KEY.M]: dayjs?.duration(endTime - startTime).months(),
    [TIME_KEY.D]: dayjs?.duration(endTime - startTime).days(),
    [TIME_KEY.h]: dayjs?.duration(endTime - startTime).hours(),
    [TIME_KEY.m]: dayjs?.duration(endTime - startTime).minutes(),
    [TIME_KEY.s]: dayjs?.duration(endTime - startTime).seconds(),
  };
};

export const formatDurationOpening = (startTime, endTime) => {
  const durationObj = getDurationObject(startTime, endTime);
  if (durationObj.Y) {
    return {
      [TIME_KEY.Y]: dayjs?.duration(endTime - startTime).years(),
      [TIME_KEY.M]: dayjs?.duration(endTime - startTime).months(),
      [TIME_KEY.D]: dayjs?.duration(endTime - startTime).days(),
      [TIME_KEY.h]: dayjs?.duration(endTime - startTime).hours(),
    };
  } else if (durationObj.M) {
    return {
      [TIME_KEY.M]: dayjs?.duration(endTime - startTime).months(),
      [TIME_KEY.D]: dayjs?.duration(endTime - startTime).days(),
      [TIME_KEY.h]: dayjs?.duration(endTime - startTime).hours(),
      [TIME_KEY.m]: dayjs?.duration(endTime - startTime).minutes(),
    };
  } else {
    return (
      durationObj.s >= 0 && {
        [TIME_KEY.D]: dayjs?.duration(endTime - startTime).days(),
        [TIME_KEY.h]: dayjs?.duration(endTime - startTime).hours(),
        [TIME_KEY.m]: dayjs?.duration(endTime - startTime).minutes(),
        [TIME_KEY.s]: dayjs?.duration(endTime - startTime).seconds(),
      }
    );
  }
};

export const formatTimePast = (time) => {
  const durationObj = getDurationObject(time, dayjs());
  if (durationObj[TIME_KEY.Y]) {
    return dayjs(time).format('DD-MM-YYYY HH:mm');
  } else if (durationObj[TIME_KEY.M]) {
    return `${durationObj[TIME_KEY.M]} ${FORMAT_TIME_KEY[TIME_KEY.M]} trước`;
  } else if (durationObj[TIME_KEY.D]) {
    return `${durationObj[TIME_KEY.D]} ${FORMAT_TIME_KEY[TIME_KEY.D]} trước`;
  } else if (durationObj[TIME_KEY.h]) {
    return `${durationObj[TIME_KEY.h]} ${FORMAT_TIME_KEY[TIME_KEY.h]} trước`;
  } else if (durationObj[TIME_KEY.m]) {
    return `${durationObj[TIME_KEY.m]} ${FORMAT_TIME_KEY[TIME_KEY.m]} trước`;
  } else if (durationObj[TIME_KEY.s]) {
    return durationObj[TIME_KEY.s] < 10
      ? `Vài giây trước`
      : `${durationObj[TIME_KEY.s]} ${FORMAT_TIME_KEY[TIME_KEY.s]} trước`;
  }
  return time;
};

export const formatTimeForBadge = (project) => {
  return project?.status === ASSET_STATUS.OPENING
    ? project?.closeTime
    : project?.status === ASSET_STATUS.PREPARE_FOR_SALE
    ? project?.openTime
    : project?.status === ASSET_STATUS.WHITELIST_SOON
    ? project?.whitelist?.openTime
    : project?.status === ASSET_STATUS.WHITELIST_OPENING
    ? project?.whitelist?.closeTime
    : '';
};
