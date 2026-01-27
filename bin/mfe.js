#!/usr/bin/env tsx

/* eslint-disable no-console */
import { getArgs } from '@ringcentral-integration/next-integration/lib/getArgs';
import path from 'path';
import process from 'process';

const { deps } = getArgs();

const getMfeDeps = () => {
  const getMFEConfig = require(path.resolve(process.cwd(), './site.config.js'));
  const mfeConfig = getMFEConfig();
  if (deps) {
    console.log('MFE dependencies:');
    console.log(Object.keys(mfeConfig.dependencies).join(' '));
  } else {
    console.log(JSON.stringify(mfeConfig, null, 2));
  }
  return mfeConfig;
};

getMfeDeps();
