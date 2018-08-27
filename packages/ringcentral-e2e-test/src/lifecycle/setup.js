import config, { getDriverConfig } from '../config';
import drivers from '../drivers';
import {
  isNil,
  isPlainobject
} from '../utils/checkType';
import screenshot from '../plugins/screenshot';
import logger from '../plugins/logger';

function getPattern(value) {
  let pattern;
  if (Array.isArray(value)) {
    pattern = value;
  } else if (isPlainobject(value)) {
    pattern = Object.keys(value);
  } else if (!isNil(value)) {
    pattern = [value];
  } else {
    pattern = null;
  }
  return pattern;
}

function flattenTestConfig(config) {
  const generalParams = Object.entries(config.params).filter(([key]) => key !== 'projects');
  return Object.entries(config.params.projects).reduce(
    (projects, [project, {
      params = []
    } = {}]) => ([
      ...projects, [
        project,
        Object.entries(params).reduce((patterns, [name, pattern]) => {
          const values = getPattern(pattern);
          if (!values) return patterns;
          return ({
            ...patterns,
            [name]: values,
          });
        }, generalParams.reduce((generalParams, [name, values]) => ({
          ...generalParams,
          [name]: values
        }), {}))
      ]
    ]), []);
}

function getDriver(name, {
  caseParams,
  option,
  tag,
  level
}) {
  const { Driver, setting, } = drivers[name];
  const config = getDriverConfig({
    projects: global.execGlobal.params.projects,
    tag,
  });
  const options = {
    global: global.execGlobal,
    caseParams,
    option,
    tag,
    level,
    driver: {
      config,
      setting,
    },
  };
  return new Driver(options);
}
// TODO optimizing about once get generator from `globalSetup`
function setup({
  config,
  plugins,
}) {
  global.defaultTestConfig = flattenTestConfig(config);
  global.testBeforeAll = ({
    caseParams,
    execTags,
  }) => {
    // TODO setup plugins
  };
  global.testBeforeEach = ({
    caseParams,
    option,
    tag,
    level
  }) => (global.execDrivers.reduce((_drivers, name) => {
    // TODO setup plugins
    _drivers[name] = getDriver(name, {
      caseParams,
      option,
      tag,
      level
    });
    return _drivers;
  }, {}));
}

const setting = {
  config,
  plugins: [screenshot, logger]
};

setup(setting);
