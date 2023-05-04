export function isBlank(str: string | undefined) {
  if (!str) {
    return true;
  }
  return !/\S/.test(str);
}

export default isBlank;
