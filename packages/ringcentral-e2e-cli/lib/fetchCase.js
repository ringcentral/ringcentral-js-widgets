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
    cmdServices = cmd.serviceName ? { list: [{ name: cmd.serviceName, caseID: caseIDArray }] } : { list: [{ caseID: caseIDArray }] };
  } else {
    try {
      cmdServices = JSON.parse(cmd.service);
    } catch (error) {
      throw new Error(error);
    }
  }
  cmdServices.list.forEach((cmdService, index) => {
    config.caseServices.list.forEach((configService) => {
      if (!cmdService.name || configService.name === cmdService.name) {
        cmdServices.list[index] = { ...configService, ...cmdService };
      }
    });
  });
  let EinsteinServices;
  cmdServices.list.forEach(async ({
    handler, username, password, caseID
  }) => {
    try {
      const einsteinServicesModule = require(resolve(process.cwd(), handler));
      EinsteinServices = (einsteinServicesModule && einsteinServicesModule.__esModule) ? einsteinServicesModule.default : einsteinServicesModule;
    } catch (error) {
      throw new Error(error);
    }
    const einsteinServices = new EinsteinServices({ username, password });
    caseID.forEach(async (id) => {
      await einsteinServices.createCaseTemplate(id);
    });
  });
};

export { create as default, };
