import createDriver from 'ringcentral-e2e-environment/createDriver';
import {
  isNil,
  isPlainobject
} from '../utils/checkType';
import { configPath } from '../../lib/run';
// import screenshot from '../plugins/screenshot';
// import logger from '../plugins/logger';

// eslint-disable-next-line
const { lookupConfig } = require(configPath);
const config = global.execGlobal;

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
  const { tags = [], ..._tags } = config.defaults || {};
  const generalParams = Object.entries(config.params).filter(([key]) => key !== 'projects');
  return Object.entries(config.params.projects).reduce(
    (projects, [
      project,
      {
        params = []
      } = {}
    ]) => ([
      ...projects,
      [
        project,
        {
          ...Object.entries(params).reduce((patterns, [name, pattern]) => {
            const values = getPattern(pattern);
            if (!values) return patterns;
            return ({
              ...patterns,
              [name]: values,
            });
          }, generalParams.reduce((generalParams, [name, values]) => ({
            ...generalParams,
            [name]: values
          }), {})),
          ..._tags,
          ...tags.reduce((tag, [_project, _tag]) => {
            if (_project !== project) return tag;
            return {
              ...tag,
              ..._tag
            };
          }, {})
        }
      ]
    ]), []);
}

function setup({
  config,
  // plugins,
}) {
  global.defaultTestConfig = flattenTestConfig(config);
  global.testBeforeAll = (...args) => {
    // console.log(JSON.stringify(args, null, 2));
    // TODO HOOK and setup plugins
  };
  global.testBeforeEach = ({
    tag,
  }, {
    drivers,
    driver,
    isSandbox,
  }) => {
    // TODO HOOK setup plugins
    const browser = isSandbox ? createDriver(driver) : drivers[driver];
    const config = lookupConfig({
      config: global.execGlobal,
      tag,
    });
    return {
      browser,
      config,
    };
  };
}

const setting = {
  config,
  // plugins: [screenshot, logger]
};
setup(setting);
