/* eslint-disable no-use-before-define */
const app = window.app;
const initDebounceTime = 1000;
const eventKeys = app.eventKeys;

window.__settings = {
  assetsUrl: 'agentScript/',
};

function StateParams() {
  this.$get = () => {
    return {
      uii: '1',
    };
  };
}

// eslint-disable-next-line no-undef
angular
  .module('render', [
    'ui.select',
    'ngSanitize',
    'angular-growl',
    'pascalprecht.translate',
    'formly',
    'formlyBootstrap',
    'gridstack-angular',
    'ngAnimate',
    'ngMaterial',
    'scriptingStudio.render',
    'agent_ui.factories.localeLoader',
  ])
  .config(function ($mdThemingProvider, $translateProvider) {
    $mdThemingProvider
      .theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('blue');

    // setup translation file loader factory
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.preferredLanguage('us');
    $translateProvider.fallbackLanguage('us');
    $translateProvider.useLoader('localeLoader');
  })
  .provider('$stateParams', StateParams)
  .controller('RenderCtrl', ($scope, $timeout, $q) => {
    function bindAppEvent(key, cb) {
      app.eventEmitter.on(app.toAngularKey + key, cb);
    }

    function sendToOurApp(key, message) {
      app.eventEmitter.emit(app.fromAngularKey + key, message);
    }

    function requestToOurApp(key, message) {
      // return new Promise((resolve) => {
      // that $q is like promise in angular scope
      return $q((resolve) => {
        sendToOurApp(key, message);
        app.eventEmitter.once(app.toAngularKey + key, (value) => {
          console.log(value);
          resolve(value);
        });
      });
    }

    bindAppEvent(eventKeys.updateScript, (data) => {
      console.log('setScript', data);

      _updateScript(data);
    });

    app.init();

    setTimeout(() => {
      if (!$scope.config) {
        $scope.$apply(function () {
          $scope.showMessage = 'No Engage Script';
        });
      }
    }, initDebounceTime);

    $scope.uii = 1;
    $scope.callbacks = {
      setScriptResult,
      setRecordingState,
      setHoldState,
      requestColdRequeue,
      requestWarmRequeue,
      requestHangup,
      getScriptData,
      requestColdTransfer,
      requestWarmTransfer,
      requestDisposition,
      changeScript,
      allowSendKbArticle,
      sendKbArticle,
      getKnowledgeBaseArticles,
    };

    function _updateScript(data) {
      $scope.$apply(function () {
        // console.log(JSON.stringify(data));
        // $scope.uii = data.call.uii;
        $scope.config = data.config;
        $scope.call = data.call;
      });
    }

    function _returnPromise(result) {
      const defer = $q.defer();
      defer.resolve(result);
      return defer.promise;
    }

    function setScriptResult(e) {
      sendToOurApp(eventKeys.setScriptResult, e);
      return true;
    }

    function setRecordingState(state) {
      console.log(state);
      return _returnPromise(state);
    }

    function setHoldState(state) {
      console.log(state);
      return _returnPromise(state);
    }

    function requestColdRequeue() {
      console.log('ColdRequeue');
      return _returnPromise(true);
    }

    function requestWarmRequeue() {
      console.log('WarmRequeue');
      return _returnPromise(true);
    }

    function requestHangup() {
      console.log('Hangup');
      return _returnPromise(true);
    }

    function getScriptData() {
      return _returnPromise({
        model: {},
        lead: {},
        call: {
          uii: $scope.uii,
          dispositions:
            $scope.call && $scope.call.outdialDispositions
              ? $scope.call.outdialDispositions.dispositions
              : [],
        },
      });
    }

    function requestColdTransfer() {
      console.log('ColdTransfer');
      return _returnPromise(true);
    }

    function requestWarmTransfer() {
      console.log('WarmTransfer');
      return _returnPromise(true);
    }

    function requestDisposition(
      uii,
      disp,
      notes,
      isCallback,
      contactForwardNum,
      callbackDts,
    ) {
      // console.log(
      //   'Disposition',
      //   uii,
      //   disp,
      //   notes,
      //   isCallback,
      //   contactForwardNum,
      //   callbackDts,
      // );
      sendToOurApp(eventKeys.updateDisposition, {
        dispositionId: disp.dispositionId,
        notes,
      });

      return _returnPromise(true);
    }

    function changeScript(e) {
      console.log('!!change', e);
    }
    function allowSendKbArticle() {}
    function sendKbArticle() {}
    function getKnowledgeBaseArticles(kbGroupIds) {
      return requestToOurApp(eventKeys.getKnowledgeBaseArticles, kbGroupIds);
    }

    window.updateScript = () =>
      _updateScript(
        {
          scriptId: '2967',
          data: {
            tools: [
              {
                id: 'start',
                label: 'start',
                x: 760,
                y: 211,
                connections: [
                  {
                    label: '',
                    type: ['default', '', 'default,,flowLink', 'flowLink'],
                    target: 'page_1',
                  },
                ],
                type: 'start',
                icon: 'start',
                hasConfig: false,
                hideInToolbar: true,
                maxConnections: 1,
              },
              {
                id: 'end',
                label: 'end',
                x: 1250,
                y: 624,
                connections: [],
                type: 'end',
                icon: 'end',
                hasConfig: false,
                hideInToolbar: true,
                maxConnections: 0,
              },
              {
                type: 'page',
                icon: 'page',
                hasConfig: true,
                id: 'page_0',
                label: 'page_0',
                x: 1105,
                y: 274,
                connections: [
                  {
                    label: '',
                    type: [
                      'default',
                      '',
                      'default,,flowLink',
                      'inactive',
                      'flowLink',
                    ],
                    target: 'end',
                  },
                ],
                properties: {
                  pageData: [
                    {
                      type: 'checkbox',
                      id: 'checkbox_1',
                      key: 'model.tttt',
                      data: {
                        layout: { x: 0, y: 0, h: 8, w: 12 },
                        javascript: { trigger: 'BLUR', delay: 250 },
                        mouseover: false,
                        lastEdit: 1594187545964,
                      },
                      templateOptions: { label: 'checkbox field' },
                      extras: {},
                      validation: { messages: {} },
                      controller: 'optionCtrl',
                      ngModelElAttrs: { 'scripting-input-javascript': '' },
                      name: 'checkbox_1',
                    },
                    {
                      type: 'button',
                      id: 'button_2',
                      key: 'button_2',
                      data: {
                        layout: { x: 0, y: 8, h: 8, w: 12 },
                        ignoreModel: true,
                        action: {
                          type: 'navigation',
                          view: 'goTo',
                          location: 'next',
                        },
                        class: 'default',
                        size: 'default',
                        javascript: {
                          trigger: 'BLUR',
                          delay: 250,
                          script: "console.log('1234')",
                        },
                        mouseover: false,
                        lastEdit: 1594187988831,
                      },
                      templateOptions: { label: 'aaaaaaaaaaaaa' },
                      extras: {},
                      validation: { messages: {} },
                      controller: 'InputType_buttonCtrl',
                      name: 'button_2',
                    },
                  ],
                },
              },
              {
                type: 'page',
                icon: 'page',
                hasConfig: true,
                id: 'page_1',
                label: 'page_1',
                x: 857,
                y: 411,
                connections: [
                  {
                    label: '',
                    type: [
                      'default',
                      '',
                      'default,,flowLink',
                      'inactive',
                      'flowLink',
                    ],
                    target: 'page_0',
                  },
                ],
                properties: {
                  pageData: [
                    {
                      type: 'button',
                      id: 'button_1',
                      key: 'button_1',
                      data: {
                        layout: { x: 0, y: 0, h: 8, w: 12 },
                        ignoreModel: true,
                        action: {
                          type: 'navigation',
                          view: 'goTo',
                          location: 'next',
                        },
                        class: 'default',
                        size: 'default',
                        javascript: { trigger: 'BLUR', delay: 250 },
                        mouseover: false,
                      },
                      templateOptions: { label: 'button field' },
                      extras: {},
                      validation: { messages: {} },
                      controller: 'InputType_buttonCtrl',
                      name: 'button_1',
                    },
                    {
                      type: 'multipleSelectBox',
                      id: 'multipleSelectBox_2',
                      key: 'model.abc',
                      data: {
                        layout: { x: 0, y: 8, h: 8, w: 12 },
                        javascript: { trigger: 'BLUR', delay: 250 },
                        mouseover: false,
                        dataSource: '',
                        lastEdit: 1597736076606,
                      },
                      templateOptions: {
                        label: 'multipleSelectBox field',
                        placeholder: '123123',
                        options: [
                          { name: 'sda', value: 'sdaf' },
                          { name: '3dsa', value: 'dsa' },
                        ],
                        required: true,
                      },
                      extras: {},
                      validation: { messages: {} },
                      controller: 'optionCtrl',
                      ngModelElAttrs: { 'scripting-input-javascript': '' },
                      name: 'multipleSelectBox_2',
                      defaultValue: ['sdaf'],
                    },
                    {
                      type: 'checkbox',
                      id: 'checkbox_3',
                      key: 'model.abc',
                      data: {
                        layout: { x: 0, y: 16, h: 8, w: 12 },
                        javascript: { trigger: 'BLUR', delay: 250 },
                        mouseover: false,
                        lastEdit: 1597739136311,
                      },
                      templateOptions: {
                        label: 'checkbox field',
                        options: [
                          { name: 'a', value: 'wq' },
                          { name: 'ff', value: 'ff' },
                        ],
                      },
                      extras: {},
                      validation: { messages: {} },
                      controller: 'optionCtrl',
                      ngModelElAttrs: { 'scripting-input-javascript': '' },
                      name: 'checkbox_3',
                    },
                    {
                      type: 'radio',
                      id: 'radio_4',
                      key: 'model.c',
                      data: {
                        layout: { x: 0, y: 24, h: 8, w: 12 },
                        javascript: { trigger: 'BLUR', delay: 250 },
                        mouseover: false,
                        lastEdit: 1597739340775,
                      },
                      templateOptions: {
                        label: 'radio field',
                        options: [
                          { name: 'd', value: 'd' },
                          { name: 'b', value: 'b' },
                        ],
                      },
                      extras: {},
                      validation: { messages: {} },
                      controller: 'optionCtrl',
                      ngModelElAttrs: { 'scripting-input-javascript': '' },
                      name: 'radio_4',
                    },
                    {
                      type: 'textarea',
                      id: 'textarea_5',
                      key: 'model.awqer',
                      data: {
                        layout: { x: 0, y: 32, h: 8, w: 12 },
                        javascript: { trigger: 'BLUR', delay: 250 },
                        mouseover: false,
                        lastEdit: 1597739399683,
                      },
                      templateOptions: {
                        label: 'textarea field',
                        placeholder: 'fdsaf',
                      },
                      extras: {},
                      validation: { messages: {} },
                      controller: 'optionCtrl',
                      ngModelElAttrs: { 'scripting-input-javascript': '' },
                      name: 'textarea_5',
                      defaultValue: 'adsfsa',
                    },
                    {
                      type: 'table',
                      id: 'table_6',
                      key: 'model.d',
                      data: {
                        layout: { x: 0, y: 40, h: 8, w: 12 },
                        ignoreModel: true,
                        dataSource: '',
                        columns: [
                          {
                            title: 'A',
                            data: '',
                            report: false,
                            visible: true,
                          },
                          { title: 'B', data: '', report: true, visible: true },
                          { title: 'C', data: '', report: true, visible: true },
                        ],
                        searchable: true,
                        paging: true,
                        info: true,
                        ordering: true,
                        mouseover: false,
                        lastEdit: 1597739503862,
                      },
                      templateOptions: { label: 'table field' },
                      extras: {},
                      validation: { messages: {} },
                      name: 'table_6',
                    },
                    {
                      type: 'radio',
                      id: 'radio_7',
                      key: 'model.fd',
                      data: {
                        layout: { x: 0, y: 48, h: 8, w: 12 },
                        javascript: { trigger: 'BLUR', delay: 250 },
                        mouseover: false,
                        lastEdit: 1597739921987,
                      },
                      templateOptions: {
                        label: 'radio field',
                        options: [
                          { name: 'das', value: 'dsadsa' },
                          { name: '123', value: '123' },
                        ],
                      },
                      extras: {},
                      validation: { messages: {} },
                      controller: 'optionCtrl',
                      ngModelElAttrs: { 'scripting-input-javascript': '' },
                      name: 'radio_7',
                    },
                  ],
                },
              },
            ],
          },
        } || JSON.parse(localStorage.getItem('agentScript')),
      );
  });
