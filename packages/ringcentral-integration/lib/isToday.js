export default function (utcString) {
  const now = new Date();
  const t = new Date(utcString);
  return now.getFullYear() === t.getFullYear() &&
    now.getMonth() === t.getMonth() &&
    now.getDate() === t.getDate();
}
