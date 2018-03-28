export default function isBlank(str) {
  if (!str) {
    return true;
  }
  return !/\S/.test(str);
}
