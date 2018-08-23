import google from './google';
import salesforce from './salesforce';
import widgets from './widgets';

const PROJECTS = {
  google,
  salesforce,
  widgets
};
const DEFAULT_TESTER = 'jest';
const BRANDS = ['rc', 'bt', 'telus', 'att'];
const LEVELS = ['p0', 'p1', 'p2', 'p3'];
const CASE_SERVICES = [{
  name: 'einstein',
  url: '',
  handler: '',
}];

const DEFAULT_LEVEL = 'p3';
const DEFAULT_BRANDS = ['rc'];
const DEFAULT_EXEC_BRANDS = ['rc'];
const DEFAULT_EXEC_LEVELS = ['p0', 'p1'];

export const defaultDrivers = ['puppeteer'];

export const defaultCaseConfig = {
  brands: DEFAULT_BRANDS,
};
export const defaultCaseLevel = DEFAULT_LEVEL;

export const defaultExecConfig = {
  brands: DEFAULT_EXEC_BRANDS,
};
export const defaultExecLevels = DEFAULT_EXEC_LEVELS;

export function getDriverConfig({
  projects,
  tag,
}) {
  return {
    ...projects[tag.project].params.brands[tag.brands],
    type: projects[tag.project].type,
  };
}

export default {
  caseServices: CASE_SERVICES,
  tester: DEFAULT_TESTER,
  levels: LEVELS,
  driverSetting: {}, // TODO add driverSetting(e.g., debugger)
  params: {
    projects: PROJECTS,
    brands: BRANDS,
  },
};
