export default function validateAreaCode(code) {
  if (code === undefined) {
    return true;
  }
  if (code === null) {
    return false;
  }
  const areaCode = code.trim();
  if (areaCode.length === 0) {
    return true;
  }
  return (areaCode.length === 3) && areaCode[0] !== '0';
}
