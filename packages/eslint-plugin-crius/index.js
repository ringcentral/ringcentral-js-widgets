'use strict';
const fs = require('fs');
const path = require('path');
// eslint-disable-next-line lodash/import-scope
const _ = require('lodash');
const rules = fs
  .readdirSync(path.resolve(__dirname, 'rules'))
  .map((f) => f.replace(/\.js$/, ''));
const recommended = {
  plugins: ['crius'],
  rules: {
    'crius/common-export': 2,
  },
};
module.exports = {
  rules: _.zipObject(
    rules,
    rules.map((rule) => require(`./rules/${rule}`)),
  ),
  configs: {
    recommended,
  },
};
