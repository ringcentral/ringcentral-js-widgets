export default function padLeft(input, char, length) {
  const str = `${input}`;
  const padding = [];
  for (let i = str.length; i < length; i += 1) {
    padding.push(char);
  }
  return `${padding.join('')}${str}`;
}
