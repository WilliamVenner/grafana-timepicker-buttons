import { dateTimeFormatWithAbbrevation, UrlQueryMap } from '@grafana/data';
import { getLocationSrv } from '@grafana/runtime';

/**
 * This formats a time field to ensure the millisecond portion of the epoch time is
 * included.
 *
 * @param time the epoch time to format
 *
 * @returns the formatted epoch time containing milliseconds.
 */
export const getEpochWithMillis = (time: number): number => {
  return time < 100000000000 ? time * 1000 : time;
};

export const getQueryMap = (time_from: number, time_to?: number): UrlQueryMap => {
  let queryMap: UrlQueryMap = { from: getEpochWithMillis(time_from), to: 'now' };
  if (typeof time_to !== 'undefined' && time_to !== null && !isNaN(time_to)) {
    queryMap.to = getEpochWithMillis(time_to);
  }
  return queryMap;
};

export function getQueryMapo(time_from: number, time_to?: number) {
  let queryMap: UrlQueryMap = { from: getEpochWithMillis(time_from), to: 'now' };
  if (typeof time_to !== 'undefined' && time_to !== null && !isNaN(time_to)) {
    queryMap.to = getEpochWithMillis(time_to);
  }
  getLocationSrv().update({
    partial: true,
    replace: true,
    query: queryMap,
  });
}

export const getPrettyDate = (time?: number): string => {
  if (typeof time !== 'undefined' && time !== null && !isNaN(time)) {
    return dateTimeFormatWithAbbrevation(getEpochWithMillis(time));
  }
  return 'now';
};
