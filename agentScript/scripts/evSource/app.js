"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.iterator");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.freeze");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.iterator");
require("core-js/modules/es.string.split");
require("core-js/modules/web.dom-collections.iterator");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
angular.module('scriptingStudio', ['templates-app', 'templates-common', 'ui.router', 'ui.router.stateHelper', 'ui.bootstrap', 'ui.sortable', 'LocalStorageModule', 'ui.select', 'ui.ace', 'ngAnimate', 'ngSanitize', 'ngMaterial', 'angular-growl', 'angularUUID2', 'pascalprecht.translate', 'formly', 'formlyBootstrap', 'gridstack-angular', 'ngQuill', 'ngMask', 'angular-loading-bar', 'angular.filter', 'prettyXml', 'ngMessages', 'cf.branding', 'PackageConfig' /* loads environment variables provided by grunt */,
// has formly, htmlElementsFactory and render directive
'scriptingStudio.render',
// Scripting Studio Modules
'scriptingStudio.app.base',
// default state for this app
'scriptingStudio.app.configure', 'scriptingStudio.app.render',
// Tool Config Controllers
'scriptingStudio.configure.javascript', 'scriptingStudio.configure.page', 'scriptingStudio.configure.www', 'scriptingStudio.configure.switch', 'scriptingStudio.configure.mapping', 'scriptingStudio.configure.dataBuilder',
// Directives
'scriptingStudio.directives.jsPlumb', 'scriptingStudio.directives.preview', 'scriptingStudio.directives.toolbar', 'scriptingStudio.directives.uiSelectCustom',
// Tools directives
'scriptingStudio.directives.tools.scriptingTool', 'scriptingStudio.directives.tools.toolbarTool', 'scriptingStudio.directives.cfResizeable',
// Factories
'scriptingStudio.factories.localeLoader', 'scriptingStudio.factories.plumbInstance', 'scriptingStudio.factories.scriptDocument', 'scriptingStudio.factories.ngBootstrap', 'scriptingStudio.factories.ngBootstrap.confirmModal', 'scriptingStudio.factories.ngBootstrap.renderModal', 'scriptingStudio.factories.ngBootstrap.inputModal',
// Services
'scriptingStudio.service.interceptor', 'scriptingStudio.service.script', 'scriptingStudio.service.session', 'scriptingStudio.service.scriptData', 'scriptingStudio.service.mapping', 'scriptingStudio.service.aceEditor', 'scriptingStudio.service.javascriptBuilder', 'scriptingStudio.service.object', 'scriptingStudio.service.sorting', 'scriptingStudio.service.render.renderService', 'scriptingStudio.service.render.navService', 'scriptingStudio.service.apiCalls', 'scriptingStudio.service.editorInfo',
// HTML Form Builder
'scriptingStudio.directives.textEditor', 'scriptingStudio.directives.modelTag', 'scriptingStudio.directives.modelTag.modal', 'scriptingStudio.directives.modelTag.data.modal', 'scriptingStudio.directives.customFormats', 'scriptingStudio.directives.cfInputs', 'scriptingStudio.directives.formBuilder', 'scriptingStudio.directives.formBuilder.form', 'scriptingStudio.directives.formBuilder.form.element', 'scriptingStudio.directives.formBuilder.form.element.edit', 'scriptingStudio.directives.formBuilder.select', 'scriptingStudio.directives.formBuilder.select.icon',
// HTML Renderer
'scriptingStudio.directives.render.scriptRenderer']).config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', '$translateProvider', '$mdThemingProvider', '$httpProvider', 'growlProvider', 'cfpLoadingBarProvider', 'ngQuillConfigProvider', function myAppConfig($stateProvider, $urlRouterProvider, localStorageServiceProvider, $translateProvider, $mdThemingProvider, $httpProvider, growlProvider, cfpLoadingBarProvider, ngQuillConfigProvider) {
  $urlRouterProvider.otherwise('/');

  // set a prefix for localStorage
  localStorageServiceProvider.setPrefix('engage-admin');

  // setup translation file loader factory
  $translateProvider.preferredLanguage('us');
  $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
  $translateProvider.useLoader('localeLoader');

  // SET THE DEFAULT GROWL SETTINGS
  growlProvider.globalTimeToLive({
    success: 6000,
    error: -1,
    warning: 6000,
    info: 6000
  });
  growlProvider.globalDisableCountDown(true);
  $mdThemingProvider.theme('default').primaryPalette('blue-grey').accentPalette('blue');
  $httpProvider.interceptors.push('AuthInterceptor');
  cfpLoadingBarProvider.parentSelector = '#mainNav';
  cfpLoadingBarProvider.includeSpinner = false;
  ngQuillConfigProvider.set({
    modules: {
      toolbar: [[{
        font: []
      }], [{
        color: []
      }, {
        background: []
      }],
      // dropdown with defaults from theme
      ['bold', 'italic', 'underline', 'strike'],
      // toggled buttons
      [{
        size: ['small', false, 'large', 'huge']
      }],
      // custom dropdown
      [{
        header: [1, 2, 3, 4, 5, 6, false]
      }], [{
        list: 'ordered'
      }, {
        list: 'bullet'
      }], [{
        indent: '-1'
      }, {
        indent: '+1'
      }],
      // outdent/indent

      [{
        align: []
      }], ['blockquote', 'code-block'], ['link'],
      // link and image, video

      ['clean'] // remove formatting button
      ]
    }
  });
}]).run(['$rootScope', '$window', 'ENV_VARS', function run($rootScope, $window, ENV_VARS) {
  // this adds a redirectTo param to the $stateProvider, allowing default views from parent
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (toState.redirectTo) {
      event.preventDefault();
      $state.go(toState.redirectTo, toParams);
    }
  });
  var curSettings = $window.__settings;
  $window.__settings = !!curSettings && _typeof(curSettings) === 'object' && curSettings || {};
  $window.__settings.static_version = Object.freeze({
    bamboo_repository_revision_number: ENV_VARS.bamboo_repository_revision_number,
    bamboo_buildResultKey: ENV_VARS.bamboo_buildResultKey
  });
}]).controller('AppCtrl', ['$scope', 'RenderNav', 'BrandingSvc', function AppCtrl($scope, RenderNav, BrandingSvc) {
  $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (toState.name === 'base') {
      $scope.loadingScript = true;
    }

    // set this if it's missing, happens on page refresh
    if (!toParams.toolType) {
      var split = toState.name.split('.');
      toParams.toolType = split[split.length - 1];
    }
  });
  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $scope.pageTitle = 'Scripting Studio | ';
    $scope.pageTitle += toState.pageTitle || 'Configuration';
    if (toState.name === 'base') {
      $scope.loadingScript = false;
    }
    RenderNav.addState(toState.name, toParams);
  });
  $scope.favImg = BrandingSvc.getFavUrl();
  $scope.$on('$stateChangeError', console.log.bind(console));
}]);
//# sourceMappingURL=app.js.map
