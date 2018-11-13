import { resolve } from 'path';

const DEFAULT_CONFIG_FILE_PATH = './e2e.config.js';
const configPath = resolve(process.cwd(), DEFAULT_CONFIG_FILE_PATH);


const create = async (caseID, cmd) => {
  let config;
  try {
    // eslint-disable-next-line
    config = require(configPath);
  } catch (error) {
    console.error(`Unexpected import '${DEFAULT_CONFIG_FILE_PATH}' in root path.`);
    console.error(error);
    process.exit();
    return;
  }
  let cmdServices;
  if (caseID) {
    const isCaseIDs = (/,/).test(caseID);
    // eslint-disable-next-line radix
    const caseIDArray = caseID.split(isCaseIDs ? ',' : ' ').map(e => parseInt(e));
    if (!cmd.origin) {
      cmd.origin = config.caseServices.defaultOrigin;
      console.warn(`you are using defaultOrigin --> ${config.caseServices.defaultOrigin}`);
    }
    cmdServices = { list: [{ origin: cmd.origin, caseID: caseIDArray }] };
  } else {
    try {
      cmdServices = JSON.parse(cmd.service);
    } catch (error) {
      throw new Error(error);
    }
  }

  const {originField, handlerField, projectIdField, ulField} = config.caseServices;
  const configServicesList = config.caseServices.list.map((item) => {
      return {
        ...item,
        origin: item[originField || 'origin'],
        handler: item[handlerField || 'handler'],
        projectId: item[projectIdField || 'projectId'],
        ul: item[ulField || 'ul']
      }
  });
  const cmdServicesList = cmdServices.list;
  cmdServicesList.forEach((cmdService, index) => {
    const length = configServicesList.length;
    for (let i = 0; i < length; i++) {
      if (cmdService.origin === configServicesList[i].origin) {
        cmdServicesList[index] = { ...configServicesList[i], ...cmdService };
        break;
      }
    }
  });

  let Services;
  for (const { handler, caseID, ...params } of cmdServicesList) {
    try {
      const servicesModule = require(resolve(process.cwd(), handler));
      Services = (servicesModule && servicesModule.__esModule) ? servicesModule.default : servicesModule;
    } catch (error) {
      throw new Error(error);
    }
    const services = new Services(params);
    for (const id of caseID) {
      await services.createCaseTemplate(id);
    }
  }
};

export { create, };
