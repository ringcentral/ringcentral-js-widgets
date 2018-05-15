const program = require('commander');
const inquirer = require('inquirer');
const { version } = require('../package');
const { generateModule } = require('./module');
const { generateProject } = require('./project');
const { getModulesDistination } = require('./helper');

program
  .version(version)
  .description('RingCentral Widgets CLI');

program
  .command('generate <resource> <name>')
  .alias('g')
  .option('-d, --dependencies [dependencies]', 'dependencies', (val, memo) => {
    memo.push(val);
    return memo;
  }, [])
  .description('Generate a resource')
  .action((resource, name, options) => {
    if (resource === 'Module') {
      const distination = getModulesDistination();
      if (!distination) {
        throw Error('Modules folder not found');
      }
      generateModule({ name, distination, dependencies: options.dependencies });
    }
  });

program
  .command('new [projectName]')
  .description('Generate a new project')
  .action((name) => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'Enter APP name:',
        default: name || 'RingCentral Widget App'
      },
    ]).then((answers) => {
      generateProject({
        appName: answers.appName,
        name,
      });
    });
  });

program.parse(process.argv);
