import childProcess from 'child_process';
import { resolve } from 'path';
import defaultsConfig from './config';
import createProcess from './utils/createProess';

const rootPath = resolve(__dirname, '../');
const setupFile = 'src/lifecycle/setup.js';
const transform = { '^.+\\.(jsx|js)$': 'babel-jest' };
const postSetupFile = 'src/lifecycle/postSetup.js';
const globalSetup = 'ringcentral-e2e-environment/setup';
const globalTeardown = 'ringcentral-e2e-environment/teardown';
const testEnvironment = 'ringcentral-e2e-environment';
const tails = ['--forceExit', '--no-cache'];
const command = 'node';
const tester = `${rootPath}/node_modules/.bin/${defaultsConfig.tester}`;

function getExecTags(
  { tags: rawTags, ...rest },
  { tags: execDefaultTags = [], ...execDefaultConfigs },
  defaultTags,
) {
  const isTagsNil = !rawTags || rawTags.length === 0;
  const tags = isTagsNil ? execDefaultTags || defaultTags : rawTags;
  return tags.map(([project, tag = {}]) => {
    const [_, _tag] = execDefaultTags.find(([_project]) => _project === project) || [];
    return [
      project, {
        // order(right priority): execDefaultTags < execDefaultProjectTags < userInputTags < userInputProjectTags
        ...execDefaultConfigs,
        ..._tag,
        ...rest,
        ...tag,
      }
    ];
  });
}

function runner({
  testerParams,
  testerCLI,
  modes,
  drivers,
  params, // CLI input tags
  config = {},
}, {
  exit,
}) {
  config = {
    ...config,
    exec: {
      ...defaultsConfig.exec,
      ...config.exec,
    },
    defaults: {
      ...defaultsConfig.defaults,
      ...config.defaults,
    },
    params: {
      ...defaultsConfig.params,
      ...config.params,
    },
  };
  const {
    exec = {}
  } = config;
  const defaultTags = Object.keys(config.params.projects).map(project => [project]);
  const execTags = getExecTags(params, exec, defaultTags);
  /* eslint-disable */
  // order: defaultsConfig < configfile < CLI args
  const execModes = modes && modes.length > 0 ?
    modes : (
      exec.modes && exec.modes.length > 0 ?
      exec.modes :
      defaultsConfig.modes
    );
  const execDrivers = drivers && drivers.length > 0 ?
    drivers : (
      exec.drivers && exec.drivers.length > 0 ?
      exec.drivers :
      defaultsConfig.exec.drivers
    );
  const customTesterConfig = config.tester && config.tester[defaultsConfig.tester] || {};
  /* eslint-enable */
  const testerConfig = {
    ...testerParams,
    globals: {
      execTags,
      execModes,
      execDrivers,
      execGlobal: config,
      execDefaults: {
        browsers: {
          // TODO config for browsers
        }
      }
    },
    setupFiles: [`${rootPath}/${setupFile}`],
    setupTestFrameworkScriptFile: `${rootPath}/${postSetupFile}`,
    globalSetup,
    globalTeardown,
    testEnvironment,
    transform,
    ...customTesterConfig
  };
  if (!testerConfig.reporter) {
    delete testerConfig.reporters;
  }
  delete testerConfig.reporter;
  const args = [
    tester,
    `--config=${JSON.stringify(testerConfig)}`,
    ...testerCLI,
    ...tails
  ];
  const close = () => {
    // TODO HOOK main process close
    if (typeof exit === 'function') {
      try {
        exit();
      } catch (e) {
        console.error(e);
      }
    }
    // TODO check chromedriver close abnormal
    childProcess.exec('kill $(ps aux | grep chromedriver | grep -v grep | awk \'{print $2}\')');
  };
  // TODO HOOK main process start
  createProcess({
    command,
    args,
    close
  });
}

export { runner as default };
