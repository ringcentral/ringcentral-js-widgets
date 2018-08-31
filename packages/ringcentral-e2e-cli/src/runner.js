import childProcess from 'child_process';
import config, {
  defaultExecConfig,
  defaultExecLevels,
  defaultDrivers
} from './config';
import createProcess from './utils/createProess';

const rootPath = require('path').resolve(__dirname, '../');

const setupFile = 'src/lifecycle/setup.js';
const postSetupFile = 'src/lifecycle/postSetup.js';
const defaultTags = Object.keys(config.params.projects)
  .map(project => [project]);

function getExecTags(rawTags) {
  const isTagsNil = !rawTags || rawTags.length === 0;
  const tags = isTagsNil ? defaultTags : rawTags;
  return tags.map(([project, tag = {}]) => ([
    project, {
      ...defaultExecConfig,
      ...tag,
    }
  ]));
}

function runner({
  inputTesterConfig,
  tags,
  drivers = defaultDrivers,
  levels = defaultExecLevels,
  options = [],
  modes = [],
}, {
  exit,
}) {
  // exec all project by default if `tags` is nil.
  // TODO alert if tags is nil
  const execTags = getExecTags(tags);
  const testerConfig = {
    ...inputTesterConfig,
    globals: {
      execTags,
      execModes: modes,
      execLevels: levels,
      execDrivers: drivers,
      execGlobal: config,
      execDefaults: {
        browsers: {
          //
        }
      }
    },
    setupFiles: [`${rootPath}/${setupFile}`],
    setupTestFrameworkScriptFile: `${rootPath}/${postSetupFile}`,
    globalSetup: 'ringcentral-e2e-environment/setup',
    globalTeardown: 'ringcentral-e2e-environment/teardown',
    testEnvironment: 'ringcentral-e2e-environment'
  };
  const command = config.tester;
  // TODO configurative tails
  const tails = ['--forceExit', '--maxWorkers=8', '--no-cache', '--detectOpenHandles'];
  const args = [`--config=${JSON.stringify(testerConfig)}`, ...options, ...tails];
  const close = () => {
    // TODO HOOK main process close
    if (typeof exit === 'function') {
      try {
        exit();
      } catch (e) {
        console.error(e);
      }
    }
    childProcess.exec('kill $(ps aux | grep chromedriver | grep -v grep | awk \'{print $2}\')');
  };
  createProcess({
    command,
    args,
    close
  });
}

export { runner as default };
