import '../reporter';
import config, { defaultCaseLevel } from '../config';
import { compile } from '../utils/template';

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

async function beforeEachStart(context) {
  await context.launch();
}

async function afterEachEnd(context) {
  await context.close();
}

function testCase(caseParams, fn) {
  const {
    title,
    options,
    tags = global.defaultTestConfig,
    level = defaultCaseLevel
  } = caseParams;
  const testCaseTags = mergeTags(tags, global.defaultTestConfig);
  const execTags = mergeTags(global.execTags, testCaseTags);
  const isExecTagsNil = execTags.length === 0;
  const isOverExecLevels = global.execLevels.indexOf(level) < 0;
  if (isExecTagsNil || isOverExecLevels) {
    console.warn(`\`${title}\` is skipped.`);
    _test.skip();
    return;
  }
  let context = global.testBeforeAll({
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
          context = global.testBeforeEach({
            caseParams,
            option,
            tag,
            level,
          }, context)[driver];
          const tail = ` => (${project} in ${group.join(' & ')} on ${driver})`;
          // TODO
          // global.beforeEach(beforeEachStart.bind(null, context));
          global.afterEach(afterEachEnd.bind(null, context));
          const func = async function (context, ...args) {
            await context.launch();
            await fn(...args);
          };
          _test(`${name}${tail}`, func.bind(null, context, {
            context,
            option,
            tag,
            level,
            driver,
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
console.log('postSetup');
global.test = testCase;
global.describe = testDescribe;
