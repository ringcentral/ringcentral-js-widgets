import analyzeYarnlock from '../packages/monorepo-tools/lib/analyzeYarnLock';

(async () => {
  console.log(JSON.stringify(await analyzeYarnlock(), null, 2));
})();
