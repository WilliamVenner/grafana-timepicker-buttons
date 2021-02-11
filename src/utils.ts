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
