import analyzeYarnLock from './lib/analyzeYarnLock';

(async () => {
  console.log(JSON.stringify(await analyzeYarnLock(process.cwd()), null, 2));
})();

