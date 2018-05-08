import listFileMatchers from '../packages/monorepo-tools/lib/listFileMatchers';

(async () => {
  console.log(JSON.stringify(await listFileMatchers(), null, 2));
})();
