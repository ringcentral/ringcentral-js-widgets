import readPackages from '../lib/readPackages';

(async () => {
  const packages = Object.keys(await readPackages()).reduce((result, item) => {
    result.add(item);
    return result;
  }, new Set());
  console.log([...packages]);
})();
