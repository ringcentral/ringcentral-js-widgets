import { getArgs } from '@ringcentral-integration/utils/scripts';

const { buildEnv } = getArgs();

export const sharedConfigs = {
  environment: buildEnv,
};
