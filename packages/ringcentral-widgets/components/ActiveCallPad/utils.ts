/**
 * @file utils for active call pad
 */

export function pickElements(ids = [], rawList = []) {
  const rawListMap = rawList.reduce((acc, item) => {
    const { id } = item;
    acc[id] = item;
    return acc;
  }, {});
  const result = ids.reduce((acc, expectId) => {
    if (rawListMap[expectId]) {
      acc.push(rawListMap[expectId]);
    }
    return acc;
  }, []);
  return result;
}
