import { reduce } from 'ramda';

function getMinutesList(MINUTE_SCALE: any) {
  return reduce(
    (result) => {
      const index = result.length;
      const value = (60 / MINUTE_SCALE) * index;
      const text = `${`${value}0`.slice(0, 2)} min`;
      return result.concat({
        // @ts-expect-error TS(2769): No overload matches this call.
        value,
        text,
      });
    },
    [],
    new Array(MINUTE_SCALE),
  );
}

function getHoursList(HOUR_SCALE: any) {
  if (HOUR_SCALE > 23) {
    throw new Error('HOUR_SCALE must be less than 23.');
  }
  return reduce(
    (result) => {
      const value = result.length;
      const text = `${`0${value}0`.slice(-3, -1)} hr`;
      return result.concat({
        // @ts-expect-error TS(2769): No overload matches this call.
        value,
        text,
      });
    },
    [],
    new Array(HOUR_SCALE),
  );
}

export { getHoursList, getMinutesList };
