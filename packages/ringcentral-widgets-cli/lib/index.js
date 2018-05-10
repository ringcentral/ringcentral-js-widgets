const program = require('commander');
const { version } = require('../package');
const { generateModule } = require('./module');
const { getModulesDistination } = require('./helper');

program
  .version(version)
  .description('RingCentral Widgets CLI');

program
  .command('generate <resource> <name>')
  .alias('g')
  .description('Generate a resource')
  .action((resource, name) => {
    if (resource === 'Module') {
      const distination = getModulesDistination();
      console.log(distination);
      if (!distination) {
        throw Error('Modules folder not found');
      }
      generateModule({ name, distination });
    }
  });

program.parse(process.argv);
