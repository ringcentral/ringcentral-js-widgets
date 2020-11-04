"use strict";

(function () {
  'use strict';

  setGlobalStateHelper.$inject = ['GlobalStateHelperProvider', 'stateHelperProvider'];
  var module = angular.module('scriptingStudio.app.render', []);
  module.config(setGlobalStateHelper);
  module.provider('GlobalStateHelper', GlobalStateHelper); // set the state helper in a config block

  function setGlobalStateHelper(GlobalStateHelperProvider, stateHelperProvider) {
    var globalHelper = GlobalStateHelperProvider.$get();
    globalHelper.setGlobalStateHelper(stateHelperProvider);
    stateHelperProvider.setNestedState({
      name: 'render',
      url: '/render/:type',
      params: {
        uii: new Date().getTime()
      },
      views: {
        main: {
          templateUrl: 'render/render.tpl.html',
          controllerAs: 'vm',
          controller: ['$scope', '$state', '$stateParams', 'document', 'model', '$q', 'ApiKbGroupSvc', function ($scope, $state, $stateParams, document, model, $q, ApiKbGroupSvc) {
            var vm = this;
            vm.script = document;
            vm.model = model;
            vm.type = $state.params.type;
            vm.uii = $stateParams.uii;
            vm.config = document;
            vm.callbacks = {
              setScriptResult: setScriptResult,
              setRecordingState: setRecordingState,
              setHoldState: setHoldState,
              requestColdRequeue: requestColdRequeue,
              requestWarmRequeue: requestWarmRequeue,
              requestHangup: requestHangup,
              getScriptData: getCallData,
              requestColdTransfer: requestColdTransfer,
              requestWarmTransfer: requestWarmTransfer,
              requestDisposition: requestDisposition,
              allowSendKbArticle: allowSendKbArticle,
              sendKbArticle: sendKbArticle,
              getKnowledgeBaseArticles: getKnowledgeBaseArticles,
              changeScript: changeScript
            };

            function setScriptResult() {
              return true;
            }

            function setRecordingState(state) {
              return _returnPromise(state);
            }

            function setHoldState(state) {
              return _returnPromise(state);
            }

            function requestColdRequeue() {
              return _returnPromise(true);
            }

            function requestWarmRequeue() {
              return _returnPromise(true);
            }

            function requestHangup() {
              return _returnPromise(true);
            }

            function getCallData() {
              return _returnPromise({
                model: {},
                call: {},
                lead: {}
              });
            }

            function requestColdTransfer() {
              return _returnPromise(true);
            }

            function requestWarmTransfer() {
              return _returnPromise(true);
            }

            function requestDisposition() {
              return _returnPromise(true);
            }

            function getKnowledgeBaseArticles(kbGroupIds) {
              return ApiKbGroupSvc.getGroupsWithChildren(kbGroupIds);
            }

            function allowSendKbArticle() {
              return true;
            }

            function sendKbArticle(uii, content) {
              return [uii, content];
            }

            function changeScript(scriptId) {
              return true;
            }

            function _returnPromise(result) {
              var defer = $q.defer();
              defer.resolve(result);
              return defer.promise;
            }
          }],
          resolve: {
            document: ['scriptDocument', 'localStorageService', function (scriptDocument, localStorageService) {
              try {
                var data = localStorageService.get('script:currentScript');
                var json = JSON.parse(angular.isDefined(data) ? data : null);
                scriptDocument.setDocument(json);
                return scriptDocument.getDocument();
              } catch (e) {
                console.error('error parsing json for render', e);
              }
            }],
            model: ['$q', 'ScriptRenderSvc', function ($q, ScriptRenderSvc) {
              return $q(function (resolve) {
                ScriptRenderSvc.getCallData().then(function (result) {
                  resolve(result);
                });
              });
            }]
          }
        }
      },
      pageTitle: 'Script'
    });
  } // service that holds the state provider, can get and set it to use outside of config


  function GlobalStateHelper() {
    var that = this;

    that.$get = function () {
      return that;
    };

    that.$stateProviderGlobal = null;

    that.setGlobalStateHelper = function (helper) {
      that.$stateProviderGlobal = helper;
    };

    that.getGlobalStateHelper = function () {
      return that.$stateProviderGlobal;
    };
  }
})();
//# sourceMappingURL=render.js.map
