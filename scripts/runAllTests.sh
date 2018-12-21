#!/usr/bin/env bash

cd ./packages/i18n
echo 'Runing i18n tests'
yarn test
cd ../../
cd ./packages/locale-loader
echo 'Runing locale-loader tests'
yarn test
cd ../../
cd ./packages/phone-number
echo 'Runing phone-number tests'
yarn test
cd ../../
cd ./packages/ringcentral-integration
echo 'Runing ringcentral-integration tests'
yarn test
cd ../../
cd ./packages/ringcentral-widgets-test
echo 'Runing ringcentral-widgets tests'
yarn test
