/** @type {import('@ringcentral/mfe-builder').SiteConfigFile} */

module.exports = () => {
  const { getProjectConfig } = require('@ringcentral-integration/next-builder');
  /** @type {import('./config/index').AppConfig} */
  const appConfig = getProjectConfig(__dirname, false).appConfig;
  /** @type {import('./config/index').AppConfig} */
  return {
    name: `@ringcentral-integration/micro-next-commons`,
    dependencies: {},
    version: appConfig.version.appVersion,
    exposes: {
      './src/app': './src/app',
      './src/micro-auth/services': './src/micro-auth/services',
      './src/micro-auth/views': './src/micro-auth/views',
      './src/micro-auth/components': './src/micro-auth/components',
      './src/micro-contacts/services': './src/micro-contacts/services',
      './src/micro-contacts/views': './src/micro-contacts/views',
      './src/micro-contacts/components': './src/micro-contacts/components',
      './src/micro-core/hooks': './src/micro-core/hooks',
      './src/micro-core/plugins': './src/micro-core/plugins',
      './src/micro-core/services': './src/micro-core/services',
      './src/micro-core/views': './src/micro-core/views',
      './src/micro-core/components': './src/micro-core/components',
      './src/micro-meeting/services': './src/micro-meeting/services',
      './src/micro-meeting/views': './src/micro-meeting/views',
      './src/micro-message/services': './src/micro-message/services',
      './src/micro-message/views': './src/micro-message/views',
      './src/micro-phone/services': './src/micro-phone/services',
      './src/micro-phone/views': './src/micro-phone/views',
      './src/micro-phone/hooks': './src/micro-phone/hooks',
      './src/micro-phone/components': './src/micro-phone/components',
      './src/micro-setting/services': './src/micro-setting/services',
      './src/micro-setting/views': './src/micro-setting/views',
      './src/models': './src/models',
    },
    optimization: {
      injectMeta: ['main'],
    },
    shared: {
      '@ringcentral-integration/micro-core': { singleton: true, eager: true },
      '@ringcentral-integration/micro-auth': { singleton: true, eager: true },
      '@ringcentral-integration/micro-contacts': {
        singleton: true,
        eager: true,
      },
      '@ringcentral-integration/micro-coworker': {
        singleton: true,
        eager: true,
      },
      '@ringcentral-integration/micro-meeting': {
        singleton: true,
        eager: true,
      },
      '@ringcentral-integration/micro-message': {
        singleton: true,
        eager: true,
      },
      '@ringcentral-integration/micro-phone': { singleton: true, eager: true },
      '@ringcentral-integration/micro-setting': {
        singleton: true,
        eager: true,
      },
      '@ringcentral/mfe-react': { singleton: true, eager: true },
      react: {
        singleton: true,
        requiredVersion: '17.0.2',
        eager: true,
      },
      'react-dom': {
        singleton: true,
        requiredVersion: '17.0.2',
        eager: true,
      },
      '@ringcentral-integration/next-core': {
        singleton: true,
        requiredVersion: '0.0.1',
        eager: true,
      },
      '@ringcentral-integration/next-micro': {
        singleton: true,
        requiredVersion: '0.0.1',
        eager: true,
      },
      'styled-components': {
        singleton: true,
        requiredVersion: '^5.3.3',
        eager: true,
      },
      '@material-ui/styles': {
        singleton: true,
        requiredVersion: '^4.11.4',
        eager: true,
      },
      '@ringcentral-integration/i18n': {
        singleton: true,
        eager: true,
      },
      rxjs: {
        singleton: true,
        requiredVersion: '^7.8.0',
        eager: true,
      },
    },
  };
};
