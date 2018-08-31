import '../reporter';
import config, { defaultCaseLevel } from '../config';
import { compile } from '../utils/template';

// TODO configuration-based
jest.setTimeout(30000);

const _test = test;
const _describe = describe;
const _beforeAll = beforeAll;
const _beforeEach = beforeEach;
const _afterAll = afterAll;
const _afterEach = afterEach;

function mergeTags(tags, supersetTags) {
  if (Array.isArray(tags) && tags.length === 0) {
    return supersetTags;
  }
  const mergedTags = [];
  tags.forEach(([project, tag]) => {
    const matchTag = supersetTags.find(([_project]) => _project === project);
    if (matchTag) {
      const [_project, _tag] = matchTag;
      mergedTags.push([_project, {
        ..._tag,
        ...tag
      }]);
    }
  });
  return mergedTags;
}

function flattenTags(tags) {
  const _tags = Object.entries(tags)
    .map(([name, values]) => values.map(value => `${name}-${value}`));
  const groups = [];
  const group = [];
  const getGroups = (_tags, depth = 0) => {
    for (let i = 0; i < _tags[depth].length; i += 1) {
      group[depth] = _tags[depth][i];
      if (depth !== _tags.length - 1) {
        getGroups(_tags, depth + 1);
      } else {
        groups.push([...group]);
      }
    }
  };
  getGroups(_tags);
  return groups;
}

function restoreTags(group, project) {
  return group.reduce((_group, name) => {
    const [key, value] = name.split('-');
    return {
      ..._group,
      [key]: value,
    };
  }, {
    project
  });
}

async function beforeEachStart({ browser, isSandbox }) {
  // TODO HOOK
}

async function afterEachEnd({ browser, isSandbox }) {
  // TODO HOOK
  if (isSandbox) await browser.close();
}

function testCase(caseParams, fn) {
  const {
    title,
    options,
    tags = global.defaultTestConfig,
    level = defaultCaseLevel,
    modes = [],
  } = caseParams;
  const testCaseTags = mergeTags(tags, global.defaultTestConfig);
  const execTags = mergeTags(global.execTags, testCaseTags);
  const isExecTagsNil = execTags.length === 0;
  const isOverExecLevels = global.execLevels.indexOf(level) < 0;
  const isSandbox = [...modes, ...global.execModes].indexOf('sandbox') > -1;
  if (isExecTagsNil || isOverExecLevels) {
    console.warn(`\`${title}\` is skipped.`);
    _test.skip();
    return;
  }
  global.testBeforeAll({
    caseParams,
    execTags,
  });
  for (const driver of global.execDrivers) {
    for (const [project, tags] of execTags) {
      const groups = flattenTags(tags);
      for (const group of groups) {
        for (const option of options) {
          const name = compile({
            template: title,
            keys: Object.keys(option),
            values: Object.values(option),
          });
          const tag = restoreTags(group, project);
          const tail = ` => (${project} in ${group.join(' & ')} on ${driver})`;
          const { browser, config } = global.testBeforeEach({
            caseParams,
            option,
            tag,
            level,
          }, {
            drivers: global.drivers,
            driver,
            modes,
            isSandbox,
          });
          global.beforeEach(beforeEachStart.bind(null, { browser, isSandbox }));
          global.afterEach(afterEachEnd.bind(null, { browser, isSandbox }));
          /* eslint-disable */
          const func = async function ({ browser, isSandbox, config, ...args }) {
            global.browser = browser;
            global.page = isSandbox ?
              await browser.launch(config.location) :
              await browser.goto(config.location);
            // TODO HOOK
            await fn({ ...args, isSandbox, config});
          };
          /* eslint-enable */
          _test(`${name}${tail}`, func.bind(null, {
            browser,
            config,
            option,
            tag,
            level,
            driver,
            modes,
            isSandbox,
          }));
        }
      }
    }
  }
}

// TODO: inherit nativeDescribe／nativeTest(concurrent/only/skip)

function testDescribe(...args) {
  return _describe(...args);
}

global.test = testCase;
global.describe = testDescribe;
