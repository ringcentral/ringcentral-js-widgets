import listExtensions from '../packages/monorepo-tools/lib/listExtensions';

(async () => {
  console.log(JSON.stringify(await listExtensions(), null, 2));
})();
