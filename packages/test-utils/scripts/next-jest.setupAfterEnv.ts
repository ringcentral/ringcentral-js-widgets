import 'reflect-metadata';

if (process.env.L10N_CAPTURE === '1') {
  require('../../../libs/l10n-validator/runtime/l10n-capture-preload.js');
}
