export const findFirstFIndex = (str: string, searchString: string) => {
  const index = str.indexOf(searchString);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
};
