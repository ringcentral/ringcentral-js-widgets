"use strict";

require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.dom-collections.iterator.js");
(function () {
  'use strict';

  angular.module('scriptingStudio.render', []).directive('scriptRender', Directive);
  function Directive() {
    return {
      restrict: 'E',
      scope: {
        uii: '@',
        config: '=',
        callbacks: '='
      },
      templateUrl: 'scriptRender/render.tpl.html',
      link: function link(scope, element, attrs) {},
      controller: function controller($scope, $element, $timeout, Render_ScriptSvc, Router, NavSvc, htmlElementFactory, RENDER_TOOL_TYPES) {
        _init();
        function _init() {
          for (var key in RENDER_TOOL_TYPES) {
            Router.when(RENDER_TOOL_TYPES[key].type, RENDER_TOOL_TYPES[key]);
          }
          if (uiiListener) {
            uiiListener();
          }
          if ($scope.uii) {
            $scope.uii = $scope.uii.toString();
          }

          // don't load the directive until we have a script object
          var uiiListener = $scope.$watch('uii', function (newUii, oldUii) {
            if (newUii && $scope.config) {
              NavSvc.reset(newUii);
              Router.init(newUii);
              Router.onRouteChange('updateLastNav', _trackNav);
              $scope.scriptId = $scope.config.scriptId;
              $scope.scriptName = $scope.config.name;
              $scope.callbacks.getScriptData().then(function (initialModel) {
                $scope.model = $scope.config.scriptResult || initialModel;
                $scope.config.scriptResult = $scope.model;

                //$scope.config.navPosition = $scope.config.navPosition || 'start';
                $scope.config.navPosition = 'start';
                Render_ScriptSvc.setConfig($scope.config, $scope.callbacks);
                NavSvc.lookupGoTo($scope.config.navPosition, false);
              });
            }
          });
          $scope.$on("$destroy", function () {
            uiiListener();
            Router.removeUii($scope.uii);
            Render_ScriptSvc.removeUii($scope.uii);
          });
          function _trackNav(toRoute, fromRoute, params) {
            if (params && params.node) {
              var nodeId = params.node.id;
              if (params.parentId) {
                nodeId = [params.parentId, nodeId].join('.');
              }
              $scope.model.renderFormValid = true;
              Render_ScriptSvc.setScriptResult($scope.model);
              $scope.config.navPosition = nodeId;
            }
          }
        }
      }
    };
  }
})();
angular.module('scriptingStudio.render').run(['$templateCache', function ($templateCache) {
  $templateCache.put('scriptRender/render.tpl.html', '<div id="renderMain" class="container-fluid">\n\t<div class="render-router-view" render-router-view></div>\n</div>\n');
  $templateCache.put('scriptRender/tools/executing.tpl.html', '<div class="container-fluid">\n\t<md-progress-linear md-mode="indeterminate"></md-progress-linear>\n\n\t<h4 class="executing-node text-center">\n\t\texecuting {{ node.label }}...\n\t</h4>\n</div>\n');
  $templateCache.put('scriptRender/tools/endScript/EndScript.tpl.html', '<div class="container-fluid">\n\t<h2>Script Result</h2>\n\t<div ng-repeat="(key, value) in model.model">\n\t\t<label>{{key}}</label>\n\t\t<span> - {{value}}</span>\n\t</div>\n</div>\n');
  $templateCache.put('scriptRender/tools/page/Page.tpl.html', '<ng-form class="render-form" name="renderForm" role="form">\n\t<div class="grid-stack render-stack gridRender_{{ ::uii }}">\n\t\t<div class="grid-stack-item"\n\t\t\t ng-repeat="field in ::fields track by field.id"\n\t\t\t data-gs-id="{{ ::field.type.concat(\'_\').concat($index) }}"\n\t\t\t data-gs-x="{{ ::field.data.layout.x }}"\n\t\t\t data-gs-y="{{ ::field.data.layout.y }}"\n\t\t\t data-gs-width="{{ ::field.data.layout.w }}"\n\t\t\t data-gs-height="{{ ::field.data.layout.h }}"\n\t\t\t data-gs-no-move="true"\n\t\t\t data-gs-no-resize="true"\n\t\t\t cf-gridstack-layout\n\t\t\t ng-show="visible">\n\n\t\t\t<div class="grid-stack-item-content"\n\t\t\t     ng-if="field.type === \'view\' ? true : visible"\n\t\t\t\t formly-field data-get-value="getValue"\n\t\t\t\t data-model="model"\n\t\t\t\t data-options="field">\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</ng-form>\n');
  $templateCache.put('scriptRender/tools/recording/recording.tpl.html', '<div class="container-fluid recording">\n\t<h3>\n\t\t<i class="fa fa-circle fa-fw" ng-class="{ \'active\':status, \'connecting\':connecting }"></i>\n\t\tRecording\n\n\t\t<small>\n\t\t\tStatus: {{ status ? \'Recording\' : \'Not Recording\' }}\n\t\t</small>\n\t</h3>\n</div>\n');
  $templateCache.put('scriptRender/tools/startScript/StartScript.tpl.html', '<div class="container-fluid">\n\tloading...\n</div>\n');
}]);
(function () {
  'use strict';

  angular.module('scriptingStudio.render').constant('DATA_TYPES', {
    'ARRAY': 'ARRAY',
    'OBJECT': 'OBJECT',
    'CONSTANT': 'CONSTANT',
    'FIELD': 'FIELD'
  });
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').constant('RENDER_TOOL_TYPES', {
    "START_SCRIPT": {
      type: "start",
      controller: "StartScriptCtrl",
      templateUrl: "scriptRender/tools/startScript/StartScript.tpl.html"
    },
    "END_SCRIPT": {
      type: "end",
      controller: "EndScriptCtrl",
      templateUrl: "scriptRender/tools/endScript/EndScript.tpl.html"
    },
    "PAGE": {
      type: "page",
      controller: "PageCtrl",
      templateUrl: "scriptRender/tools/page/Page.tpl.html"
    },
    "WWW": {
      type: "www",
      controller: "WwwCtrl",
      templateUrl: "scriptRender/tools/executing.tpl.html"
    },
    "SCRIPT": {
      type: "javascript",
      controller: "JavascriptCtrl",
      templateUrl: "scriptRender/tools/executing.tpl.html"
    },
    "SWITCH": {
      type: "switch",
      controller: "JavascriptCtrl",
      templateUrl: "scriptRender/tools/executing.tpl.html"
    },
    "DATA_BUILDER": {
      type: "dataBuilder",
      controller: "JavascriptCtrl",
      templateUrl: "scriptRender/tools/executing.tpl.html"
    },
    "START_REC": {
      type: "startRecording",
      controller: "RecordingCtrl",
      templateUrl: "scriptRender/tools/recording/recording.tpl.html"
    },
    "STOP_REC": {
      type: "stopRecording",
      controller: "RecordingCtrl",
      templateUrl: "scriptRender/tools/recording/recording.tpl.html"
    },
    "MAPPING": {
      type: "mapping",
      controller: "MappingCtrl",
      templateUrl: "scriptRender/tools/executing.tpl.html"
    }
  });
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').directive('bindHtmlUnsafe', bindHtmlUnsafe);
  function bindHtmlUnsafe($compile) {
    return {
      restrict: 'A',
      controller: function controller($scope) {
        $scope.$on('$destroy', function () {
          if ($scope.nameWatcher) {
            $scope.nameWatcher();
            $scope.nameWatcher = null;
          }
        });
      },
      link: function link(scope, element, attrs) {
        var htmlName = attrs.bindHtmlUnsafe;
        scope.nameWatcher = scope.$watch(htmlName, function (newVal) {
          if (newVal) {
            _compile(newVal);
          }
        });
        function _compile(newHTML) {
          newHTML = $compile(newHTML)(scope);
          element.html(newHTML);
        }
      }
    };
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').directive('cfValidator', Directive);
  function Directive() {
    return {
      require: 'ngModel',
      scope: {
        cfRequired: '='
      },
      link: function link(scope, element, attrs, modelCtrl) {
        // modelCtrl = ngModel

        scope.$watch(function () {
          if (angular.isDefined(modelCtrl.$modelValue)) {
            return modelCtrl.$modelValue.length;
          }
        }, function () {
          if (angular.isDefined(modelCtrl.$modelValue) && !modelCtrl.$modelValue.length && scope.cfRequired) {
            modelCtrl.$setValidity('required', false);
          } else if (angular.isDefined(modelCtrl.$modelValue) && modelCtrl.$modelValue.length) {
            modelCtrl.$setValidity('required', true);
          }
        });
      }
    };
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').directive('renderDatePicker', Directive);
  function Directive() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        ngModel: '='
      },
      link: function link(scope, element, attrs, controller) {
        element.attr('id', new Date().getTime());
        scope.format = 'MM/DD/YYYY';
        if (attrs.timePicker) {
          scope.format += ' hh:mm a';
        }
        element.datetimepicker({
          format: scope.format,
          keepInvalid: true,
          useCurrent: true,
          timeZone: '',
          widgetParent: jQuery(element).closest('.grid-stack-item')
        });
        element.on('dp.change', function (e) {
          scope.ngModel = moment(e.date).format(scope.format);
        });
      }
    };
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').directive('scriptingInputJavascript', Directive).constant('INPUT_JAVASCRIPT_TRIGGER_TYPES', {
    "BLUR": "BLUR",
    "CHANGE": "CHANGE",
    "CLICK": "CLICK"
  });
  function Directive($timeout, Render_javascriptExecutor, INPUT_JAVASCRIPT_TRIGGER_TYPES) {
    return {
      restrict: 'A',
      require: "?ngModel",
      link: function link(scope, element, attrs, ngModelCtrl) {
        var script = scope.options && scope.options.data && scope.options.data.javascript && scope.options.data.javascript.script;
        if (script && script.length > 0) {
          $timeout(function () {
            var input = element.parent().find(':input');
            if (input && !input[0]) {
              input = element;
            }
            switch (scope.options.data.javascript.trigger) {
              case INPUT_JAVASCRIPT_TRIGGER_TYPES.BLUR:
                input.on('blur', function () {
                  _evalScript();
                });
                break;
              case INPUT_JAVASCRIPT_TRIGGER_TYPES.CHANGE:
                if (ngModelCtrl) {
                  scope.$watch(function () {
                    if (ngModelCtrl.$modelValue && angular.isArray(ngModelCtrl.$modelValue)) {
                      return ngModelCtrl.$modelValue.length;
                    } else {
                      return ngModelCtrl.$modelValue;
                    }
                  }, _.debounce(function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                      _evalScript();
                    }
                  }, scope.options.data.javascript.delay));
                } else {
                  input.on('change', _.debounce(function () {
                    _evalScript();
                  }, scope.options.data.javascript.delay));
                }
                break;
              case INPUT_JAVASCRIPT_TRIGGER_TYPES.CLICK:
                input.on('click', function () {
                  _evalScript();
                });
                break;
            }
          });
        }
        function _evalScript() {
          Render_javascriptExecutor.execute(scope, scope.options.data.javascript.script);
        }
      }
    };
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').factory('JavascriptBuilder', JavascriptBuilder);
  function JavascriptBuilder() {
    var goTo = 'goTo',
      getData = 'getData',
      putData = 'putData';
    function generateJavascript(connections) {
      var result = '\n\n',
        conn;
      if (connections.length > 0) {
        conn = connections[0];
      }
      if (conn) {
        result += _buildGoTo(conn.target);
        result += '\n';
      }
      return result;
    }
    function generateSwitch(tool) {
      var result = '';
      if (tool.properties) {
        _.each(tool.properties.switchCases, function (sc) {
          result += 'if(';
          _.each(sc.comparisons, function (comp, index) {
            if (comp.modelAttr && comp.value) {
              if (index > 0) {
                result += ' ';
                result += comp.join;
                result += ' ';
              }
              result += _buildGetData(comp.modelAttr);
              result += comp.comparator;
              result += ' ';
              result += _buildGetData(comp.value);
            }
          });
          result += ') {\n\t';
          result += _buildGoTo(sc.action);
          result += '\n}\n\n';
        });
      }
      return result;
    }
    function generateDataBuilder(tool) {
      var result = '',
        conn;
      result += putData;
      result += '("';
      result += tool.label;
      result += '", ';
      result += JSON.stringify(tool.properties.data);
      result += ');\n';
      if (tool.connections.length > 0) {
        conn = tool.connections[0];
      }
      if (conn) {
        result += _buildGoTo(conn.target);
      }
      return result;
    }
    function _buildGoTo(dest) {
      var result = 'return ';
      result += goTo;
      result += '("';
      result += dest;
      result += '");\n';
      return result;
    }
    function _buildGetData(attr) {
      var result = '';
      result += getData;
      result += '("';
      result += attr;
      result += '") ';
      return result;
    }
    return {
      generateJavascript: generateJavascript,
      generateSwitch: generateSwitch,
      generateDataBuilder: generateDataBuilder
    };
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').factory('Render_javascriptExecutor', Factory);
  function Factory(Render_ScriptSvc, Render_objectSvc, NavSvc) {
    var utils = {
      execute: execute
    };
    function execute(scope, script) {
      _jsClosure(scope, script);
    }
    function _jsClosure(scope, script) {
      var $scope = scope,
        callbacks = Render_ScriptSvc.getCallbacks(),
        model = scope.model,
        brackets = new RegExp(/({{).*(}})/g);
      function getData(name) {
        if (name.indexOf("model.") === 0 && !name.match(brackets)) {
          name = '{{' + name + '}}'; // byString expects braces
        }
        var result = Render_objectSvc.byString(scope, name);
        try {
          var parsed = JSON.parse(result);
          result = parsed;
        } catch (e) {
          // do nothing
        }
        return result;
      }
      function putData(attr, data) {
        scope.model['model'][attr] = data;
      }
      function startRecording() {
        callbacks.setRecordingState(true);
      }
      function stopRecording() {
        callbacks.setRecordingState(false);
      }
      function holdCall() {
        callbacks.setHoldState(true);
      }
      function resumeCall() {
        callbacks.setHoldState(false);
      }
      function coldRequeue(gateId, skillId) {
        callbacks.requestColdRequeue(gateId, skillId);
      }
      function warmRequeue(gateId, skillId) {
        callbacks.requestWarmRequeue(gateId, skillId);
      }
      function hangup() {
        callbacks.requestHangup();
      }
      function coldTransfer(dialDest, callerId) {
        callbacks.requestColdTransfer(dialDest, callerId);
      }
      function warmTransfer(dialDest, callerId) {
        callbacks.requestWarmTransfer(dialDest, callerId);
      }
      function dispositionCall(disposition, notes, isCallback, contactForwardNum, callbackDts) {
        // look up dispositions
        var disps = scope.model.call.dispositions,
          uii = scope.model.call.uii;
        var disp = _.find(disps, function (d) {
          return d.disposition.toUpperCase() === disposition.toUpperCase();
        });
        if (disp) {
          callbacks.requestDisposition(uii, disp, notes, isCallback, contactForwardNum, callbackDts);
        } else {
          console.error('disposition doesnt exist', disposition, disps);
        }
      }
      function changeScript(scriptId) {
        callbacks.changeScript(scope.model.call.uii, scriptId);
      }
      function goTo(state) {
        NavSvc.goTo({
          id: state,
          label: state
        });
      }
      try {
        // execute the saved script
        var scriptWrapper = '(function() {';
        scriptWrapper += script;
        scriptWrapper += '})();';
        eval(scriptWrapper); // jshint ignore:line
      } catch (error) {
        console.error("error in eval javascript", error);
      }
    }
    return utils;
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').factory('NavSvc', Service);
  function Service(RENDER_TOOL_TYPES, Render_ScriptSvc, Router) {
    var isFirstPage = true;
    Service.lookupGoTo = function (toolId, trackHistory) {
      var goToId = toolId,
        params = {};
      if (toolId && toolId.indexOf('.') > -1) {
        var parts = toolId.split('.');
        goToId = parts[0];
        params.forwardNode = parts[1];
        params.trackHistory = trackHistory;
      }
      Service.goTo(Service.asId(goToId), params, trackHistory);
    };
    Service.current = function () {
      return Router.getCurrent();
    };
    Service.next = function () {
      // get connected node, explictly go to it
      var curr = Service.current(),
        conn = curr && curr.resolve.node.connections[0],
        isActive = conn && conn.type.length > 0;
      if (angular.isDefined(conn) && isActive && angular.isDefined(conn.target)) {
        Service.goTo(Service.asId(conn.target));
      }
    };
    Service.prev = function () {
      Router.goBack();
    };
    Service.goTo = function (tool, params, trackHistory) {
      var next = _findTool(tool);
      if (angular.isDefined(next)) {
        params = params || {};
        params.node = next;
        var current = Service.current(),
          currNode = current && current.resolve && current.resolve.node,
          conn = currNode && currNode.connections && currNode.connections[0];
        params.isNestedView = angular.isDefined(params.isNestedView) && params.isNestedView || conn && conn.type.indexOf('nestedPage') > -1;

        // init the first page of type to disable nav
        if (next.type === RENDER_TOOL_TYPES.PAGE.type && isFirstPage) {
          params.isFirstPage = true;
          isFirstPage = false;
        }
        if (params.isNestedView) {
          params.parentId = Service.current().resolve.node.id;
        } else if (current && current.resolve && current.resolve.isNestedView) {
          params.parentId = current.resolve.parentId;
        }
        Router.go(next.type, params, trackHistory);
      }
    };
    Service.reset = function (uii) {
      Router.setNestedView(false); // reset for now
      Router.setCurrentRoute(null); // don't track where we were

      // set the first page tracker
      var history = Router.getHistory()[uii];
      if (history) {
        // see if there are any pages with the param isFirstPage
        var firstPageInHistory = _.some(history, function (p) {
          return p.resolve && p.resolve.isFirstPage;
        });
        isFirstPage = !firstPageInHistory;
      } else {
        isFirstPage = true;
      }
    };
    Service.setIsFirstPage = function (state) {
      isFirstPage = state;
    };
    Service.getIsFirstPage = function () {
      return isFirstPage;
    };
    function _findTool(tool) {
      var found = _.find(Render_ScriptSvc.getScript().data.tools, function (s) {
        return s.id === tool.id || tool.label === s.label;
      });
      return found;
    }
    Service.asId = function (str) {
      return {
        id: str
      };
    };
    return Service;
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').service('Render_objectSvc', ObjectService);
  function ObjectService(DATA_TYPES, $interpolate) {
    ObjectService.byString = function (scope, string, allOrNothing) {
      if (string && angular.isString(string)) {
        string = string.trim();
        if (string.indexOf('model.') === 0 && string.indexOf("{{") === -1 && string.indexOf("}}") === -1) {
          string = '{{' + string + '}}';
        }
        if (allOrNothing) {
          return $interpolate(string, false, null, true)(scope);
        } else {
          return $interpolate(string)(scope);
        }
      }
    };
    ObjectService.getType = function (obj) {
      if (angular.isArray(obj)) {
        return DATA_TYPES.ARRAY;
      } else if (angular.isObject(obj)) {
        return DATA_TYPES.OBJECT;
      } else {
        return DATA_TYPES.CONSTANT;
      }
    };
    return ObjectService;
  }
})();
(function () {
  // http://plnkr.co/edit/u03zden3OtK1LFK25bSP?p=preview

  'use strict';

  angular.module('scriptingStudio.render').provider('Router', Provider);
  function Provider() {
    var callbackStack = {},
      routes = {},
      history = {},
      currentRoute = {},
      isNestedView = false,
      stateParams;
    this.when = setPath;
    this.setCurrent = function (path) {
      currentRoute[stateParams.uii] = routes[path];
    };
    function setPath(path, config) {
      config.path = path;
      routes[path] = config;
      return this;
    }
    function triggerChange(toRoute, fromRoute, params, trackHistory) {
      params = params || {};
      params.isNestedView = isNestedView;
      toRoute.resolve = params;
      currentRoute[stateParams.uii] = toRoute;
      if (trackHistory && fromRoute && fromRoute.controller !== 'JavascriptCtrl' && fromRoute.controller !== 'RecordingCtrl' && fromRoute.controller !== 'WwwCtrl') {
        history[stateParams.uii].push(fromRoute);
      }
      for (var key in callbackStack[stateParams.uii]) {
        callbackStack[stateParams.uii][key](toRoute, fromRoute, params);
      }
    }
    this.$get = function ($stateParams) {
      stateParams = $stateParams;
      return {
        onRouteChange: function onRouteChange(key, callback) {
          if (!callbackStack[stateParams.uii]) {
            callbackStack[stateParams.uii] = {};
          }
          callbackStack[stateParams.uii][key] = callback;
        },
        go: function go(path, params, trackHistory) {
          if (!path || !routes[path]) {
            return currentRoute[stateParams.uii];
          }
          if (angular.isDefined(params) && params.isNestedView) {
            isNestedView = params.isNestedView;
          }
          trackHistory = angular.isDefined(trackHistory) ? trackHistory : true;
          triggerChange(angular.copy(routes[path]), angular.copy(currentRoute[stateParams.uii]), params, trackHistory);
        },
        goBack: function goBack() {
          var lastRoute = history[stateParams.uii].length > 0 && history[stateParams.uii].pop() || null;
          if (lastRoute && !lastRoute.path) {
            return currentRoute[stateParams.uii];
          }
          triggerChange(lastRoute, currentRoute[stateParams.uii], lastRoute.resolve);
        },
        init: function init(renderUii) {
          if (!history[renderUii]) {
            history[renderUii] = [];
          }
          if (!currentRoute[renderUii]) {
            currentRoute[renderUii] = {};
          }
          if (!callbackStack[renderUii]) {
            callbackStack[renderUii] = {};
          }
        },
        when: function when(path, config) {
          setPath(path, config);
        },
        getCurrent: function getCurrent() {
          return currentRoute[stateParams.uii];
        },
        setNestedView: function setNestedView(state) {
          isNestedView = state;
        },
        setCurrentRoute: function setCurrentRoute(route) {
          currentRoute[stateParams.uii] = route;
        },
        getHistory: function getHistory() {
          return history;
        },
        removeUii: function removeUii(uii) {
          delete callbackStack[uii];
          delete history[uii];
          delete currentRoute[uii];
        }
      };
    };
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').directive('renderRouterView', Directive);
  function Directive($compile, $controller, $templateCache, Router) {
    return {
      priority: 1,
      restrict: 'A',
      template: '<div id="scriptView_{{ uii }}"></div>',
      controller: function controller($scope, $stateParams) {
        $scope.uii = $stateParams.uii.toString();
      },
      link: function link(scope, element, attrs) {
        scope.compile = compile;
        Router.onRouteChange('updateView', _trackView);
        function compile(newRoute) {
          var params = {
            $scope: scope
          };
          var elemHtml = '<div>' + $templateCache.get(newRoute.templateUrl) + '</div>';
          var foundElement = jQuery(scope.isNestedView ? '#nestedScriptView_' + (scope.uii || '') : '#scriptView_' + (scope.uii || ''));
          var html = angular.element(elemHtml);
          foundElement.html(html);
          $controller(newRoute.controller, params);
          $compile(foundElement.contents())(scope);
        }
        function _trackView(newRoute, oldRoute, newParams) {
          for (var key in newParams) {
            scope[key] = newParams[key];
          }
          if (scope.compile) {
            scope.compile(newRoute);
          }
        }
      }
    };
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').factory('Render_ScriptSvc', Service);
  function Service($stateParams, Render_objectSvc) {
    var script = {},
      callbacks = {};
    Service.setConfig = function (config, agentCallbacks) {
      script[$stateParams.uii] = config;
      callbacks[$stateParams.uii] = agentCallbacks;
      if (!angular.isDefined(callbacks[$stateParams.uii].setScriptResult)) {
        console.warn('setScriptResult not defined');
      }
      if (!angular.isDefined(callbacks[$stateParams.uii].setRecordingState)) {
        console.warn('setRecordingState not defined');
      }
      if (!angular.isDefined(callbacks[$stateParams.uii].setHoldState)) {
        console.warn('setHoldState not defined');
      }
      if (!angular.isDefined(callbacks[$stateParams.uii].requestColdRequeue)) {
        console.warn('requestColdRequeue not defined');
      }
      if (!angular.isDefined(callbacks[$stateParams.uii].requestWarmRequeue)) {
        console.warn('requestWarmRequeue not defined');
      }
      if (!angular.isDefined(callbacks[$stateParams.uii].requestHangup)) {
        console.warn('requestHangup not defined');
      }
      if (!angular.isDefined(callbacks[$stateParams.uii].getScriptData)) {
        console.warn('getScriptData not defined');
      }
      if (!angular.isDefined(callbacks[$stateParams.uii].requestColdTransfer)) {
        console.warn('requestColdTransfer not defined');
      }
      if (!angular.isDefined(callbacks[$stateParams.uii].requestWarmTransfer)) {
        console.warn('requestWarmTransfer not defined');
      }
      if (!angular.isDefined(callbacks[$stateParams.uii].requestDisposition)) {
        console.warn('requestDisposition not defined');
      }
      if (!angular.isDefined(callbacks[$stateParams.uii].changeScript)) {
        console.warn('changeScript not defined');
      }
      if (!angular.isDefined(callbacks[$stateParams.uii].allowSendKbArticle)) {
        console.warn('allowSendKbArticle not defined');
      }
      if (!angular.isDefined(callbacks[$stateParams.uii].sendKbArticle)) {
        console.warn('sendKbArticle not defined');
      }
      if (!angular.isDefined(callbacks[$stateParams.uii].getKnowledgeBaseArticles)) {
        console.warn('getKnowledgeBaseArticles not defined');
      }
    };
    Service.removeUii = function (uii) {
      delete script[uii];
    };
    Service.getScript = function () {
      return script[$stateParams.uii];
    };
    Service.getCallbacks = function () {
      return callbacks[$stateParams.uii];
    };
    Service.setScriptResult = function (scope) {
      var modelCopy = angular.copy(scope);
      if (modelCopy.dataMaps) {
        var flattened = {};
        _.each(modelCopy.dataMaps, function (map) {
          _.each(map, function (value, key) {
            value.key = key;
            flattened[value.reportAs] = value;
          });
        });
        for (var key in flattened) {
          var value = flattened[key],
            modelVal = Render_objectSvc.byString(modelCopy, '{{model.' + value.key + '}}', true);
          if (value.report && angular.isDefined(modelVal)) {
            var reportKey = value.reportAs;
            modelCopy.model[reportKey] = {
              value: modelVal,
              leadField: value.leadField
            };
          }
        }
      } else {
        // no maps set, just keep everything
        _.each(modelCopy.model, function (value, key) {
          modelCopy.model[key] = {
            value: value,
            leadField: ''
          };
        });
      }
      return Service.getCallbacks().setScriptResult(modelCopy);
    };
    return Service;
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').service('SortSvc', Service);
  function Service() {
    var utils = {
      byLayout: byLayout
    };
    return utils;

    // order by layout.y, if on the same y, order by layout.x
    function byLayout(a, b) {
      if (a.data.layout.y > b.data.layout.y) {
        return 1;
      }
      if (a.data.layout.y < b.data.layout.y) {
        return -1;
      }
      if (a.data.layout.y === b.data.layout.y) {
        if (a.data.layout.x > b.data.layout.x) {
          return 1;
        } else {
          return -1;
        }
      }
      return 0;
    }
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').service('Render_wwwRequestSvc', Service);
  function Service($q, Render_objectSvc) {
    var executing = false; // limit execution to just 1 at a time
    Service.execute = function (props, scope) {
      var defer = $q.defer();
      var opts = {
        url: angular.copy(props.url),
        method: props.method,
        crossDomain: true,
        headers: {},
        success: function success(result) {
          defer.resolve(result);
        },
        error: function error(_error) {
          defer.reject(_error);
        },
        complete: function complete() {
          //defer.resolve(true);
          executing = false;
        }
      };
      if ((props.method === 'PUT' || props.method === 'POST' || props.method === 'PATCH') && props.bodyType) {
        var type = '';
        switch (props.bodyType) {
          case 'FORM':
            type = 'application/x-www-form-urlencoded';
            opts.type = false;
            opts['data'] = _getFormBody();
            break;
          case 'JSON':
            type = 'application/json';
            opts['data'] = _getBody();
            break;
          case 'XML':
            type = 'text/xml';
            opts['data'] = _getBody();
            break;
          case 'TEXT':
            type = 'text/plain';
            opts['data'] = _getBody();
            break;
          default:
            console.warn('invalid body type requested');
        }
        opts['headers']['Content-Type'] = type;
      }
      if (props.params) {
        _.each(props.params, function (p) {
          opts.url = opts.url.replace(':' + p.name, _getValue(p));
        });
      }
      if (props.headers.length) {
        _.each(props.headers, function (h, index) {
          opts['headers'][h.name] = _getValue(h);
        });
      }
      function _getFormBody() {
        var form = {};
        _.each(props.variables, function (variable) {
          form[variable.name] = _getValue(variable);
        });
        return form;
      }
      function _getBody() {
        var result = angular.copy(props.body),
          brackets = new RegExp(/\{{2}.*?\}{2}/g),
          tag,
          mockValue = {
            value: undefined
          };
        while (tag = brackets.exec(props.body)) {
          mockValue.value = tag[0];
          result = result.replace(new RegExp(tag[0], 'g'), _getValue(mockValue));
        }
        return result;
      }
      function _getValue(val) {
        var modelVal = Render_objectSvc.byString(scope, val.value),
          result = modelVal;
        if (angular.isDefined(modelVal) && _.isObject(modelVal) && 'data' in modelVal) {
          // modelVal exists, check for 'data' key

          result = modelVal.data;
        }
        return result;
      }
      if (!executing) {
        executing = true;
        jQuery.ajax(opts);
      }
      return defer.promise;
    };
    return Service;
  }
})();
(function () {
  // https://github.com/formly-js/angular-formly-templates-bootstrap
  'use strict';

  angular.module('scriptingStudio.render').factory('htmlElementFactory', Factory);
  function Factory(formlyConfig, $timeout) {
    var utils = {
        getAvailableHtml: getAvailableHtml,
        getConfigs: getConfigs
      },
      that = this;

    /**
     * filters all available types and removes any we don't want the user to see
     *
     * @returns  object with available formly types
     */
    function getAvailableHtml() {
      var allTypes = formlyConfig.getTypes();
      var blockedTypes = ['multiCheckbox', 'select'];
      var resultObj = {};
      _.each(allTypes, function (value, key) {
        if (blockedTypes.indexOf(key) === -1) {
          resultObj[key] = value;
        }
      });
      return resultObj;
    }
    function getConfigs(type) {
      type = type || '';
      var configs = {
          hasKey: true,
          hasLabel: true
        },
        configFunc = type.concat('Configs'),
        typeConfigs = {};
      if (angular.isDefined(type) && angular.isDefined(that[configFunc])) {
        typeConfigs = that[configFunc]();
      }
      return angular.extend({}, configs, typeConfigs);
    }

    /**
     *  Configs for all formly types.
     *  We use these to display the correct
     *  fields on the edit form
     */
    this.checkboxConfigs = function () {
      return {
        hasSource: true,
        hasOptions: true,
        hasRequired: true,
        hasInlineStyle: true,
        hasMultipleDefaults: true,
        hasScripting: true
      };
    };
    this.inputConfigs = function () {
      return {
        hasPlaceholder: true,
        hasDefaultValue: true,
        hasRequired: true,
        hasInputTypes: true,
        hasMaxLength: true,
        hasScripting: true
      };
    };
    this.hrConfigs = function () {
      return {
        hasKey: false,
        hasLabel: false
      };
    };
    this.emailConfigs = function () {
      return this.inputConfigs();
    };
    this.phoneConfigs = function () {
      var configs = this.inputConfigs();
      configs.hasMaxLength = false;
      return configs;
    };
    this.numberConfigs = function () {
      var configs = this.inputConfigs();
      configs.hasMaxLength = false;
      return configs;
    };
    this.customConfigs = function () {
      var configs = this.inputConfigs();
      configs.hasMaskInput = true;
      return configs;
    };
    this.dateConfigs = function () {
      var configs = this.inputConfigs();
      configs.hasInputTypes = false;
      configs.hasMaxLength = false;
      configs.hasMaskInput = false;
      return configs;
    };
    this.linkConfigs = function () {
      return {
        hasLabel: true,
        hasKey: false,
        hasHref: true,
        hasScripting: true
      };
    };
    this.imageConfigs = function () {
      var link = this.linkConfigs();
      link.hasScripting = false;
      return link;
    };
    this.iFrameConfigs = function () {
      var link = this.linkConfigs();
      link.hasHref = false;
      link.hasHttpsHref = true;
      link.hasScripting = false;
      return link;
    };
    this.radioConfigs = function () {
      return {
        hasSource: true,
        hasOptions: true,
        hasRequired: true,
        hasDefaultValue: true,
        hasInlineStyle: true,
        hasScripting: true
      };
    };
    this.selectConfigs = function () {
      return {
        hasSource: true,
        hasDefaultValue: true,
        hasOptions: true,
        hasScripting: true
      };
    };
    this.selectBoxConfigs = function () {
      return {
        hasSource: true,
        hasOptions: true,
        hasRequired: true,
        hasPlaceholder: true,
        hasDefaultValue: true,
        hasScripting: true
      };
    };
    this.multipleSelectBoxConfigs = function () {
      return {
        hasSource: true,
        hasOptions: true,
        hasRequired: true,
        hasPlaceholder: true,
        hasMultipleDefaults: true,
        hasScripting: true
      };
    };
    this.textareaConfigs = function () {
      return {
        hasPlaceholder: true,
        hasDefaultValue: true,
        hasRequired: true,
        hasMaxLength: true,
        hasScripting: true
      };
    };
    this.buttonConfigs = function () {
      return {
        hasKey: false,
        hasButtonSettings: true,
        hasActionType: true,
        hasNavigation: true,
        hasScripting: true
      };
    };
    this.navigationConfigs = function () {
      return {
        hasKey: false,
        hasButtonSettings: true,
        hasNavigationLabel: true
      };
    };
    this.pageBreakConfigs = function () {
      return {
        hasLabel: false,
        hasKey: false
      };
    };
    this.viewConfigs = function () {
      return {
        hasViewConfig: true,
        hasLabel: false,
        hasKey: false
      };
    };
    this.textConfigs = function () {
      return {
        hasLabel: false,
        hasKey: false,
        hasRichText: true
      };
    };
    this.tableConfigs = function () {
      return {
        hasLabel: false,
        hasSource: true,
        hasRequired: false,
        hasTableConfig: true
      };
    };
    this.dispositionsConfigs = function () {
      return {
        hasKey: false,
        hasSource: false,
        hasOptions: false,
        hasRequired: false,
        hasDefaultValue: false,
        hasPlaceholder: true,
        hasDispositionDisplayType: true
      };
    };
    this.knowledgeBaseConfigs = function () {
      return {
        hasLabel: false,
        hasKey: false,
        hasSource: false,
        hasOptions: false,
        hasRequired: false,
        hasDefaultValue: false,
        hasPlaceholder: false,
        hasKnowledgeBase: true
      };
    };
    function init() {
      // config custom formly fields
      formlyConfig.setType({
        name: 'radio',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        overwriteOk: true,
        template: '<md-radio-group layout="{{ to.isInline ? \'row\' : \'column\' }}" ng-model="model[options.key]" ng-required="to.required" md-no-ink>' + '<md-radio-button ng-repeat="option in to.options" ng-value="option.value" aria-label="{{option.name}}" class="md-accent">' + '{{ option.name }}' + '</md-radio-button>' + '</md-radio-group>',
        defaultOptions: {
          controller: 'optionCtrl',
          data: {
            javascript: {
              trigger: 'BLUR',
              delay: 250
            }
          },
          ngModelElAttrs: {
            'scripting-input-javascript': ""
          },
          link: function link(scope, element, attrs) {
            element.on('$destroy', function () {
              scope.$destroy();
            });
          }
        }
      });
      formlyConfig.setType({
        name: 'checkbox',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        overwriteOk: true,
        template: '<div layout="{{ to.isInline ? \'row\' : \'column\' }}" ng-model="model[keys[0]][keys[1]]" cf-validator cf-required="to.required">' + '<div ng-repeat="option in to.options" flex-gt-sm="100">' + '<md-checkbox ng-click="toggleCheckbox(option.value)" ng-checked="isChecked(option.value)" ng-name="to.label" ng-value="option.value" aria-label="{{option.name}}" class="md-accent" md-no-ink>{{ option.name }}</md-checkbox>' + '</div>' + '</div>',
        defaultOptions: {
          controller: 'optionCtrl',
          data: {
            javascript: {
              trigger: 'BLUR',
              delay: 250
            }
          },
          ngModelElAttrs: {
            'scripting-input-javascript': ""
          },
          link: function link(scope, elem, atts, modelCtrl) {
            scope.toggleCheckbox = toggleCheckbox;
            scope.isChecked = isChecked;
            var keys;
            _init();
            function _init() {
              if (scope.options && scope.options.key) {
                scope.keys = scope.options.key.split('.');
                keys = scope.keys;
                var modelArray = scope.model[keys[0]][keys[1]];
                if (!modelArray || !angular.isArray(modelArray)) {
                  scope.model[keys[0]][keys[1]] = [];
                }
              }
            }
            function isChecked(val) {
              var result = false,
                index = -1;
              if (angular.isDefined(keys)) {
                index = _isInModel(scope.model[keys[0]][keys[1]], val);
                if (index > -1) {
                  result = true;
                }
              }
              return result;
            }
            function toggleCheckbox(val) {
              if (angular.isDefined(keys)) {
                var index = _isInModel(scope.model[keys[0]][keys[1]], val);
                if (index > -1) {
                  scope.model[keys[0]][keys[1]].splice(index, 1);
                } else {
                  scope.model[keys[0]][keys[1]].push(val);
                }
              }
            }
            function _isInModel(model, val) {
              var index = _.findIndex(model, function (v) {
                return v === val;
              });
              return index;
            }
          }
        }
      });
      formlyConfig.setType({
        name: 'selectBox',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        template: '<ui-select ui-select-custom ng-model="model[options.key]" theme="bootstrap" title="{{ to.label }}" ng-required="to.required" append-to-body="true">' + '<ui-select-match placeholder="{{ options.templateOptions.placeholder }}">{{$select.selected.name}}</ui-select-match>' + '<ui-select-choices repeat="option.value as option in to.options | filter: $select.search">' + '<span ng-bind-html="option.name | highlight: $select.search"></span> ' + '</ui-select-choices>' + '</ui-select>',
        defaultOptions: {
          controller: 'optionCtrl',
          data: {
            javascript: {
              trigger: 'BLUR',
              delay: 250
            }
          },
          ngModelElAttrs: {
            'scripting-input-javascript': ""
          }
        }
      });
      formlyConfig.setType({
        name: 'multipleSelectBox',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        template: '<ui-select multiple ng-model="model[options.key]" theme="bootstrap" title="{{ to.label }}" append-to-body="true" ng-required="to.required" sortable="true" close-on-select="false">' + '<ui-select-match placeholder="{{ options.templateOptions.placeholder }}">{{ $item.name }}</ui-select-match>' + '<ui-select-choices repeat="option.value as option in to.options | filter: $select.search">' + '<span ng-bind-html="option.name | highlight: $select.search"></span> - ' + '<small ng-bind-html="option.value | highlight: $select.search"></small>' + '</ui-select-choices>' + '</ui-select>',
        defaultOptions: {
          controller: 'optionCtrl',
          data: {
            javascript: {
              trigger: 'BLUR',
              delay: 250
            }
          },
          ngModelElAttrs: {
            'scripting-input-javascript': ""
          }
        }
      });

      /**
       *      type: 'button',
       *      data: {
       *          action: function() { goToPage('2'); }
       *      },
       *      templateOptions: {
       *          label: 'save',
       *          className: 'btn-default'
       *      }
       **/
      formlyConfig.setType({
        name: 'button',
        template: '<button scripting-input-javascript ng-click="takeAction()" class="btn" ng-class="getClass()" ng-disabled="isDisabled()">{{ to.label | translate }}</button>',
        defaultOptions: {
          controller: 'InputType_buttonCtrl',
          link: function link(scope) {
            scope.getClass = function () {
              var result = 'btn-' + scope.options.data["class"];
              result += ' btn-' + scope.options.data.size;
              return result;
            };
          },
          data: {
            ignoreModel: true,
            action: {
              type: 'navigation',
              view: 'goTo',
              location: 'next'
            },
            "class": 'default',
            size: 'default',
            javascript: {
              trigger: 'BLUR',
              delay: 250
            }
          }
        }
      });
      formlyConfig.setType({
        name: 'navigation',
        template: '<div class="nav-buttons">' + '<div class="prev">' + '<button ng-click="prev()" class="btn" ng-class="getClass()" ng-disabled="isFirstPage()">' + '<i class="fa fa-fw fa-chevron-left"></i>' + '<span>{{ to.prevLabel }}</span>' + '</button>' + '</div>' + '<div class="next">' + '<button ng-click="next()" class="btn" ng-class="getClass()" ng-disabled="isDisabled()">' + '<span>{{ to.nextLabel }}</span>' + '<i class="fa fa-fw fa-chevron-right"></i>' + '</button>' + '</div>' + '</div>',
        defaultOptions: {
          controller: function controller($scope, NavSvc) {
            $scope.next = next;
            $scope.prev = prev;
            $scope.isFirstPage = isFirstPage;
            $scope.isDisabled = isDisabled;
            function next() {
              NavSvc.next();
            }
            function prev() {
              NavSvc.prev();
            }
            function isFirstPage() {
              return angular.isDefined(NavSvc.current()) && angular.isDefined(NavSvc.current().resolve) && NavSvc.current().resolve.isFirstPage || false;
            }
            function isDisabled() {
              if ($scope.options.data.action) {
                var disableInvalid = $scope.options.data.action.disableInvalid && !$scope.model.renderFormValid;
                var prop = $scope.options.expressionProperties && $scope.options.expressionProperties['templateOptions.disabled'];
                return disableInvalid || prop && $parse(prop)($scope);
              } else {
                return false;
              }
            }
          },
          link: function link(scope) {
            scope.getClass = function () {
              var result = 'btn-' + scope.options.data["class"];
              result += ' btn-' + scope.options.data.size;
              return result;
            };
          },
          templateOptions: {
            prevLabel: "Previous",
            nextLabel: "Next"
          },
          data: {
            "class": 'default',
            size: 'default'
          }
        }
      });
      formlyConfig.setType({
        name: 'input',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        overwriteOk: true,
        template: '<input class="form-control" ng-model="model[options.key]" maxlength="{{options.templateOptions.maxLength}}">',
        defaultOptions: {
          controller: 'optionCtrl',
          data: {
            javascript: {
              trigger: 'BLUR',
              delay: 250
            }
          },
          ngModelElAttrs: {
            'scripting-input-javascript': ""
          }
        }
      });
      formlyConfig.setType({
        name: 'phone',
        "extends": 'input',
        template: '<input class="form-control" mask="(999)999-9999" ng-model="model[options.key]" />'
      });
      formlyConfig.setType({
        name: 'email',
        "extends": 'input',
        template: '<input class="form-control" type="email" ng-model="model[options.key]" />'
      });
      formlyConfig.setType({
        name: 'number',
        "extends": 'input',
        template: '<input class="form-control" type="number" ng-model="model[options.key]" />'
      });
      formlyConfig.setType({
        name: 'custom',
        "extends": 'input',
        template: '<input class="form-control" mask="{{ options.data.inputMask }}" ng-model="model[options.key]" />'
      });
      formlyConfig.setType({
        name: 'date',
        "extends": 'input',
        template: '<input render-date-picker class="form-control" ng-model="model[options.key]" />',
        defaultOptions: {
          controller: 'optionCtrl',
          templateOptions: {
            placeholder: 'mm/dd/yyyy'
          },
          link: function link(scope, element, attrs) {}
        }
      });
      formlyConfig.setType({
        name: 'textarea',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        overwriteOk: true,
        template: '<textarea class="form-control" ng-model="model[options.key]" maxlength="{{options.templateOptions.maxLength}}"></textarea>',
        defaultOptions: {
          controller: 'optionCtrl',
          data: {
            javascript: {
              trigger: 'BLUR',
              delay: 250
            }
          },
          ngModelElAttrs: {
            'scripting-input-javascript': ""
          }
        }
      });
      formlyConfig.setType({
        name: 'hr',
        template: '<hr aria-label="page break" ng-style="{\'border-color\':options.data.style.color}">',
        defaultOptions: {
          data: {
            ignoreModel: true
          }
        }
      });

      /**
       *      type: 'view'
       *      templateOptions: {
       *          viewName: 'header'
       *      }
       */

      formlyConfig.setType({
        name: 'view',
        template: '<div class="row" id="nestedScriptView_{{ uii }}" nested-render-router-view data-name="{{options.data.view.name}}"></div>',
        defaultOptions: {
          data: {
            ignoreModel: true
          },
          controller: function controller($scope, $timeout, $stateParams, NavSvc) {
            $scope.uii = $stateParams.uii;
            $timeout(function () {
              var curr = NavSvc.current(),
                forward,
                track;
              if (curr) {
                if (curr.resolve.forwardNode) {
                  forward = curr.resolve.forwardNode;
                  track = curr.resolve.trackHistory;
                } else if (curr.params && curr.params.forwardNode) {
                  forward = curr.params.forwardNode;
                  track = curr.params.trackHistory;
                }
              }
              if (forward) {
                NavSvc.goTo(NavSvc.asId(forward), {
                  isNestedView: true
                }, track);
              } else if (!curr.resolve.isNestedView) {
                NavSvc.next();
              }
            });
          }
        }
      });

      /**
       *      type: 'text'
       *      data: {
       *          content: 'content text'
       *      }
       */

      formlyConfig.setType({
        name: 'text',
        template: '<div ng-aria-label="options.data.content" class="ql-editor" bind-html-unsafe="options.data.content"></div>',
        defaultOptions: {
          data: {
            ignoreModel: true,
            content: 'page text area'
          }
        }
      });
      formlyConfig.setType({
        name: 'link',
        template: '<a scripting-input-javascript href="{{ trustedUrl }}" ng-style="getStyle()" ng-alt="options.templateOptions.label" target="_blank">{{ options.templateOptions.label }}</a>',
        defaultOptions: {
          data: {
            ignoreModel: true,
            urlPrefix: 'http://',
            javascript: {
              trigger: 'BLUR',
              delay: 250
            }
          },
          controller: 'externalSourceUrlCtrl',
          link: function link(scope) {
            scope.getStyle = function () {
              var anchorColorObj = {
                "color": scope.options.data.style.color
              };
              return anchorColorObj;
            };
          }
        }
      });
      formlyConfig.setType({
        name: 'image',
        template: '<img alt="image" ng-src="{{ trustedUrl }}">',
        defaultOptions: {
          data: {
            ignoreModel: true,
            urlPrefix: 'http://'
          },
          controller: 'externalSourceUrlCtrl'
        }
      });
      formlyConfig.setType({
        name: 'iFrame',
        template: '<iframe ng-src="{{ trustedUrl }}" style="border:none;width:100%;height:100%;"></iframe>',
        defaultOptions: {
          data: {
            ignoreModel: true,
            urlPrefix: 'https://'
          },
          controller: 'externalSourceUrlCtrl'
        }
      });
      formlyConfig.setType({
        name: 'dispositions',
        template: '<div>' + '<form name="dispForm" novalidate>' + '<div class="row">' + '<div class="col-md-6">' + '<div ng-if="options.data.display.type === \'select\'" class="form-group disposition-select">' + '<label>{{ to.label }}</label>' + '<ui-select ng-model="disposition.disp" theme="bootstrap" title="{{ to.label }}" ng-required="to.required" append-to-body="true">' + '<ui-select-match placeholder="{{ to.placeholder }}">{{ $select.selected.disposition }}</ui-select-match>' + '<ui-select-choices repeat="disp in model.call.dispositions | filter: $select.search">' + '<span ng-bind-html="disp.disposition | highlight: $select.search"></span>' + '</ui-select-choices>' + '</ui-select>' + '</div>' + '<div ng-if="options.data.display.type === \'radio\'" class="form-group">' + '<label>{{ to.label }}</label>' + '<md-radio-group ng-model="disposition.disp" layout="{{ options.data.display.isInline ? \'row\' : \'column\' }}" ng-required="to.required">' + '<md-radio-button ng-repeat="disp in model.call.dispositions" ng-value="disp" aria-label="{{disp.disposition}}" class="md-accent">' + '{{ disp.disposition }}' + '</md-radio-button>' + '</md-radio-group>' + '</div>' + '<div ng-if="disposition.disp">' + '<div ng-if="disposition.disp.contactForwarding">' + '<div class="form-group">' + '<label translate="DISPOSITIONS.CONTACT_FORWARDING"></label>' + '<input ng-model="disposition.contactForwardNum" class="form-control" name="contactForwarding" id="contactForwarding" placeholder="{{\'DISPOSITIONS.CONTACT_FORWARDING.PLACEHOLDER\' | translate}}" maxlength="10" required/>' + '</div>' + '</div>' + '<div ng-if="disposition.disp.disposition && !disposition.disp.isComplete && !disposition.disp.contactForwarding">' + '<div class="checkbox">' + '<label>' + '<md-checkbox ng-model="disposition.isCallback" aria-label="{{\'DISPOSITIONS.CALL_BACK\' | translate}}" class="md-accent">{{ \'DISPOSITIONS.CALL_BACK\' | translate }}</md-checkbox>' + '</label>' + '</div>' + '</div>' + '</div>' + '</div>' + '<div class="col-md-6">' + '<div class="form-group">' + '<label translate="DISPOSITIONS.NOTES"></label>' + '<span class="text-right float-right" ng-if="disposition.disp && disposition.disp.requireNote" translate="GENERICS.LABELS.ERR_REQUIRED"></span>' + '<textarea ng-model="disposition.notes" class="form-control" ng-required="disposition.disp && disposition.disp.requireNote" rows="5"> </textarea>' + '</div>' + '</div>' + '</div>' + '<div class="row">' + '<div class="col-md-6" ng-if="disposition.isCallback">' + '<div class="row">' + '<div class="col-md-12 form-group">' + '<label translate="DISPOSITIONS.CALL_BACK_LEAD_TZ"></label>' + '<select required ng-model="disposition.leadTimezone" class="form-control" ng-options="timezone.value as (\'DISPOSITIONS.CALL_BACK_LEAD_TZ.\' +  timezone.label | translate) for timezone in timezones"></select>' + '</div>' + '</div>' + '<div class="row">' + '<div class="col-sm-6">' + '<div class="form-group">' + '<label translate="DISPOSITIONS.CALL_BACK.DATE" aria-label="Call Back Date"></label>' + '<cf-date-time-picker name="date" ' + 'append-to-body="true" ' + 'ng-model="disposition.leadDate" ' + 'data-format="MMM Do, YYYY" ' + 'data-required="true">' + '</cf-date-time-picker>' + '</div>' + '</div>' + '<div class="col-sm-6">' + '<div class="form-group">' + '<label translate="DISPOSITIONS.CALL_BACK.TIME" aria-label="Call Back Time"></label>' + '<cf-date-time-picker name="date" ' + 'append-to-body="true" ' + 'ng-model="disposition.leadTime" ' + 'data-format="hh:mm a" ' + 'data-required="true">' + '</cf-date-time-picker> ' + '</div> ' + '</div>' + '</div>' + '<div class="row">' + '<div class="col-md-12 no-left-padding" ng-if="localDts">' + '<div class="bs-callout bs-callout-info">' + '<h4>' + '{{ ::"DISPOSITIONS.CALL_BACK_LOCAL_TZ" | translate:localTimezone }}' + '</h4>' + '{{ localDts }}' + '</div>' + '</div>' + '</div>' + '</div>' + '<div class="col-md-6 text-right" ng-class="{\'col-md-offset-6\': !disposition.isCallback}">' + '<button class="btn btn-primary btn-sm" ng-disabled="dispForm.$invalid || !model.renderFormValid" ng-click="sendDisp()">{{ "DISPOSITIONS.SUBMIT" | translate}}</button>' + '</div>' + '</div>' + '</form>' + '</div>',
        defaultOptions: {
          data: {
            display: {
              type: 'select',
              isInline: false
            }
          },
          templateOptions: {
            placeholder: 'Select...'
          },
          controller: 'InputType_dispositionCtrl'
        }
      });
      formlyConfig.setType({
        name: 'table',
        wrapper: [],
        overwriteOk: true,
        template: '<table class="table table-striped"><thead></thead><tbody></tbody></table>',
        defaultOptions: {
          controller: function controller($scope, Render_objectSvc) {
            $scope.getTableData = function () {
              var result = [];
              if ($scope.options.data.dataSource) {
                try {
                  var data = Render_objectSvc.byString($scope, $scope.options.data.dataSource);
                  if (data) {
                    var parsed = JSON.parse(data);
                    result = parsed;
                  }
                } catch (e) {
                  console.error(e);
                }
              }
              return result;
            };
          },
          link: function link(scope, element, attrs) {
            element.attr('id', new Date().getTime());
            if (!angular.isDefined(scope.model)) {
              return;
            }
            var table = element.find('table.table');
            var cols = [];
            _.each(scope.options.data.columns, function (c) {
              cols.push({
                title: c.title,
                data: c.data,
                visible: c.visible
              });
            });
            if (cols.length > 0) {
              table.DataTable({
                searching: scope.options.data.searchable,
                paging: scope.options.data.paging,
                info: scope.options.data.info,
                ordering: scope.options.data.ordering,
                select: {
                  style: scope.options.data.selectable ? 'os' : false
                },
                language: {
                  search: '',
                  searchPlaceholder: "Search..."
                },
                data: scope.getTableData(),
                columns: cols
              }).on('select', function (e, dt, type, indexes) {
                var rowData = dt.rows(indexes).data().toArray();
                _setModel(rowData);
              });
            }
            function _setModel(val) {
              var key = scope.options.key.replace('model.', '');
              scope.model.model[key] = scope.model.model[key] || [];
              scope.model.model[key] = val;
            }
          },
          data: {
            ignoreModel: true,
            dataSource: '',
            columns: [],
            searchable: true,
            paging: true,
            info: true,
            ordering: true
          }
        }
      });
      formlyConfig.setType({
        name: 'knowledgeBase',
        wrapper: [],
        overwriteOk: true,
        template: '<div class="knowledge-base-display">' + '<div class="kb-search">' + '<input class="form-control" ng-model="kbSearch" placeholder="{{ \'GENERICS.ACTIONS.SEARCH\' | translate}}" ng-change="updateKb()" ng-model-options="{ debounce: 200 }" />' + '</div>' + '<div class="group-scroll">' + '<div class="group" ng-repeat="group in filteredKb">' + '<span class="title" ng-click="toggle(group)">' + '{{ ::group.name }}' + '<i class="fa collapse-icon" ng-class="{\'fa-angle-up\': !group.collapse, \'fa-angle-down\': group.collapse}"></i>' + '</span>' + '<div class="category cat_{{($index % 5) + 1}}" ng-if="!group.collapse" ng-repeat="category in group.knowledgeBaseCategories track by $index">' + '<span class="title" ng-click="toggle(category)">' + '{{ ::category.title }}' + '<i class="fa collapse-icon" ng-class="{\'fa-angle-up\': !category.collapse, \'fa-angle-down\': category.collapse}"></i>' + '</span>' + '<div ng-if="!category.collapse">' + '<div class="article" ng-class="{min: !article.collapse}" ng-repeat="article in category.knowledgeBaseArticles">' + '<span class="title" ng-click="toggle(article)">' + '{{ ::article.title }}' + '<small>{{ ::article.labels }}</small>' + '<a ng-if="article.showSend && allowSendArticle" ng-click="send($event, article)" class="btn btn-link pull-right">' + '{{ \'GENERICS.ACTIONS.SEND\' | translate }} <i class="fa fa-angle-right"></i>' + '</a>' + '</span>' + '<div class="content" ng-bind-html="article.content"></div>' + '<i class="fa fa-ellipsis-h article-toggle" ng-click="toggle(article)" ng-if="!category.collapse"></i>' + '</div>' + '</div>' + '</div>' + '</div>' + '<div class="empty-results" ng-if="filteredKb.length === 0"><h3>{{ \'GENERICS.MESSAGES.NO_RESULTS\' | translate }}</h3></div>' + '</div>' + '</div>',
        defaultOptions: {
          data: {
            kbGroups: []
          },
          controller: function controller($scope, Render_ScriptSvc) {
            $scope.updateKb = updateKb;
            $scope.send = send;
            $scope.toggle = toggle;
            var callbacks = Render_ScriptSvc.getCallbacks();
            $scope.allowSendArticle = callbacks.allowSendKbArticle();
            callbacks.getKnowledgeBaseArticles($scope.options.data.kbGroups).then(function (result) {
              _.each(result, function (group) {
                group.knowledgeBaseCategories = _.filter(group.knowledgeBaseCategories, 'active');
                _.each(group.knowledgeBaseCategories, function (category) {
                  category.knowledgeBaseArticles = _.filter(category.knowledgeBaseArticles, 'active');
                });
              });
              $scope.kb = result;
              // initiate kb
              updateKb();
            });
            function updateKb() {
              var cpy = angular.copy($scope.kb),
                str = angular.copy($scope.kbSearch);
              //var start = (new Date).getTime();
              _.each(cpy, function (group) {
                _.each(group.knowledgeBaseCategories, function (category) {
                  // filter articles
                  category.knowledgeBaseArticles = _.filter(category.knowledgeBaseArticles, function (article) {
                    return !str || str && article.labels && article.labels.toLowerCase().indexOf(str.toLowerCase()) > -1;
                  });
                });

                // if any are left, add the category
                group.knowledgeBaseCategories = _.filter(group.knowledgeBaseCategories, function (category) {
                  return category.knowledgeBaseArticles.length > 0;
                });
              });

              // if any categories have articles, leave the group
              cpy = _.filter(cpy, function (group) {
                return group.knowledgeBaseCategories.length > 0;
              });

              // set on model
              $scope.filteredKb = cpy;
              //var end = (new Date).getTime();
              //TODO: debug for filter times
              //console.log('filtered', start, end, end-start);
            }
            function send(event, article) {
              // TODO: interpolate labels?
              event.stopPropagation();
              if ($scope.allowSendArticle) {
                callbacks.sendKbArticle($scope.model.call.uii, article.title, article.content, article.contentPlain);
              }
            }
            function toggle(item) {
              item.collapse = !item.collapse;
            }
          },
          link: function link(scope, element, attrs) {}
        }
      });
      formlyConfig.setWrapper([{
        template: ['<div class="field-wrapper" ng-style="options.data.style.css">', '<formly-transclude></formly-transclude>', '</div>'].join(' ')
      }]);
    }

    // startup the formly types
    init();
    return utils;
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').controller('InputType_buttonCtrl', buttonCtrl);
  function buttonCtrl($scope, $parse, NavSvc, Render_ScriptSvc, Render_objectSvc, growl) {
    $scope.isDisabled = isDisabled;
    $scope.origLabel = angular.copy($scope.to.label);
    var callbacks = Render_ScriptSvc.getCallbacks(),
      isNavButton = $scope.options.data.action.type === 'navigation';
    function isDisabled() {
      var disableInvalid = $scope.options.data.action.disableInvalid && !$scope.model.renderFormValid;
      var prop = $scope.options.expressionProperties && $scope.options.expressionProperties['templateOptions.disabled'];
      var isFirstPageBack = isNavButton && angular.isDefined(NavSvc.current()) && NavSvc.current().resolve.isFirstPage && $scope.options.data.action.location === 'prev';
      return isFirstPageBack || disableInvalid || prop && $parse(prop)($scope);
    }
    $scope.takeAction = function () {
      var actionResult; // used for tracking promises for tests
      if (isNavButton) {
        var payload = {
          view: $scope.options.data.action.view,
          location: $scope.options.data.action.location
        };
        _navigate(payload);
      } else if ($scope.options.data.action.type === 'call') {
        switch ($scope.options.data.action.callAction) {
          case 'hold':
            actionResult = callbacks.setHoldState(!$scope.holdState).then(function (result) {
              $scope.to.label = result ? $scope.to.label_alt : $scope.origLabel;
              $scope.holdState = result;
              if (result) {
                if (_showGrowl()) {
                  growl.info('SCRIPTING.TOOLS.PAGE.CONFIG.ACTIONS.CALL_CONTROLS.MESSAGES.HOLD_START');
                }
              } else {
                if (_showGrowl()) {
                  growl.success('SCRIPTING.TOOLS.PAGE.CONFIG.ACTIONS.CALL_CONTROLS.MESSAGES.HOLD_END');
                }
              }
            });
            break;
          case 'hangup':
            actionResult = callbacks.requestHangup().then(function () {});
            break;
          case 'warmXfer':
            var xferTo = Render_objectSvc.byString($scope, $scope.options.data.action.transferTo),
              callerId = Render_objectSvc.byString($scope, $scope.options.data.action.transferCallerId),
              xfer_header = _buildXferHeader();
            actionResult = callbacks.requestWarmTransfer(xferTo, callerId, xfer_header);
            break;
          case 'coldXfer':
            var xferTo = Render_objectSvc.byString($scope, $scope.options.data.action.transferTo),
              callerId = Render_objectSvc.byString($scope, $scope.options.data.action.transferCallerId),
              xfer_header = _buildXferHeader();
            actionResult = callbacks.requestColdTransfer(xferTo, callerId, xfer_header);
            break;
          case 'record':
            actionResult = callbacks.setRecordingState(true).then(function () {
              if (_showGrowl()) {
                growl.success('SCRIPTING.TOOLS.PAGE.CONFIG.ACTIONS.CALL_CONTROLS.MESSAGES.REC_START');
              }
            });
            break;
          case 'pauseRecord':
            actionResult = callbacks.setRecordingState(false).then(function () {
              if (_showGrowl()) {
                growl.info('SCRIPTING.TOOLS.PAGE.CONFIG.ACTIONS.CALL_CONTROLS.MESSAGES.REC_PAUSED');
              }
            });
            break;
          case 'warmRequeue':
            actionResult = _handleRequeue(true);
            break;
          case 'coldRequeue':
            actionResult = _handleRequeue(false);
            break;
          case 'dispositionCall':
            var disp = Render_objectSvc.byString($scope, $scope.options.data.action.disposition);
            // look up dispositions
            var disps = $scope.model.call.dispositions;
            var disposition = _.find(disps, function (d) {
              return d.disposition.toUpperCase() === disp.toUpperCase();
            });
            if (disposition) {
              actionResult = callbacks.requestDisposition($scope.model.call.uii, disposition, Render_objectSvc.byString($scope, $scope.options.data.action.notes), Render_objectSvc.byString($scope, $scope.options.data.action.callback), Render_objectSvc.byString($scope, $scope.options.data.action.forwardNum), Render_objectSvc.byString($scope, $scope.options.data.action.callbackDts));
            }
            break;
          case 'changeScript':
            actionResult = callbacks.changeScript($scope.model.call.uii, $scope.options.data.action.newScriptId);
            break;
          default:
            console.warn('call control action was not found, please check button actions configuration');
        }
      }
      return actionResult;
    };
    function _buildXferHeader() {
      if ($scope.options.data.action.xfer_header) {
        _.each($scope.options.data.action.xfer_header, function (header) {
          header.value = Render_objectSvc.byString($scope, header.value);
        });
      }
      return $scope.options.data.action.xfer_header;
    }
    function _handleRequeue(isWarm) {
      var gateId = $scope.options.data.action.requeueTo;
      var skillId = $scope.options.data.action.requeueSkill;
      if (!$scope.options.data.action.requeueToGate) {
        gateId = Render_objectSvc.byString($scope, gateId);
      }
      var promise;
      if (isWarm) {
        promise = callbacks.requestWarmRequeue(gateId, skillId);
      } else {
        promise = callbacks.requestColdRequeue(gateId, skillId);
      }
      promise.then(function () {
        if (_showGrowl()) {
          growl.success('GENERICS.MESSAGES.SUCCESS');
        }
      });
      return promise;
    }
    function _showGrowl() {
      return false; // TODO: since we don't have translate set up yet, don't show growl
      //return $scope.options.data.action.showMessages;
    }
    function _navigate(data) {
      if (data.location === 'next') {
        NavSvc.next();
      } else if (data.location === 'prev') {
        NavSvc.prev();
      } else {
        NavSvc.lookupGoTo(data.location, true);
      }
    }
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').controller('InputType_dispositionCtrl', dispositionCtrl).service('InputType_dispositionSvc', dispositionSvc);
  function dispositionCtrl($scope, Render_ScriptSvc, InputType_dispositionSvc) {
    var callbacks = Render_ScriptSvc.getCallbacks();
    $scope.sendDisp = sendDisp;
    $scope.localDts = "";
    $scope.disposition = InputType_dispositionSvc.currDisp;
    $scope.localTimezone = {
      tz: moment.tz.guess()
    };
    $scope.timezones = [{
      value: "US/Eastern",
      label: "Eastern"
    }, {
      value: "US/Central",
      label: "Central"
    }, {
      value: "US/Mountain",
      label: "Mountain"
    }, {
      value: "US/Pacific",
      label: "Pacific"
    }, {
      value: "US/Alaska",
      label: "Alaska"
    }, {
      value: "US/Hawaii",
      label: "Hawaii"
    }];
    _init();
    function _init() {
      if ($scope.disposition && !$scope.disposition.leadTimezone) {
        $scope.disposition.leadTimezone = $scope.timezones[0].value;
      }
      if ($scope.disposition && !$scope.disposition.leadDate && !$scope.disposition.leadTime) {
        // default timeout for callback, 120 min.
        var nowPlusTimeout = moment().add('minutes', 120);
        $scope.disposition.leadDate = nowPlusTimeout.format();
        $scope.disposition.leadTime = nowPlusTimeout.format();
      }
      var dispWatch = $scope.$watch('disposition', function (disp) {
        if (disp && disp.leadTimezone && disp.leadDate && disp.leadTime) {
          var date = moment(disp.leadDate);
          var time = moment(disp.leadTime);
          date.hours(time.hours());
          date.minutes(time.minutes());
          date.seconds(time.seconds());
          var leadDts = moment.tz(date.format("YYYY-MM-DD HH:mm:ss"), disp.leadTimezone);
          $scope.localDts = moment.tz(leadDts, $scope.localTimezone.tz).format('MMM Do, YYYY hh:mm a');
          $scope.disposition.leadDts = leadDts;
        }
      }, true);
      $scope.$on('$destroy', function () {
        if (dispWatch) {
          dispWatch();
          dispWatch = null;
        }
      });
    }
    function sendDisp() {
      var disp = angular.copy($scope.disposition);
      if (disp && disp.disp && disp.disp.dispositionId) {
        InputType_dispositionSvc.reset();
        return callbacks.requestDisposition($scope.model.call.uii, disp.disp, disp.notes, disp.isCallback, disp.contactForwardNum, disp.leadDts);
      }
    }
  }

  // this is only used to hold the state of the disposition
  function dispositionSvc() {
    var self = this,
      defaultDisp = {
        disp: {},
        contactForwardNum: '',
        callback: {},
        notes: '',
        isCallback: false
      };
    self.reset = function () {
      self.currDisp = angular.copy(defaultDisp);
    };
    self.reset();
    return self;
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').controller('externalSourceUrlCtrl', ExternalSourceUrlCtrl);
  function ExternalSourceUrlCtrl($scope, $sce, Render_objectSvc) {
    var comp = Render_objectSvc.byString($scope, $scope.options.data.url);
    var fullUrl = $scope.options.data.urlPrefix + comp;
    $scope.trustedUrl = $sce.trustAsResourceUrl(fullUrl);
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').controller('optionCtrl', OptionCtrl);
  function OptionCtrl($scope, Render_objectSvc) {
    if (angular.isDefined($scope.model) && angular.isDefined($scope.options.data) && angular.isDefined($scope.options.data.dataSource) && $scope.options.data.dataSource !== '') {
      var opts = Render_objectSvc.byString($scope, $scope.options.data.dataSource),
        newVal = {};
      var result;
      try {
        result = JSON.parse(opts);
        opts = result;
      } catch (e) {
        // not json...
      }
      $scope.options.templateOptions.options = _.map(opts, function (o) {
        newVal = {
          name: o[$scope.options.data.name],
          value: o[$scope.options.data.value]
        };
        return newVal;
      });
    }
    if (angular.isDefined($scope.model) && angular.isDefined($scope.options.templateOptions) && angular.isDefined($scope.options.templateOptions.placeholder)) {
      $scope.options.templateOptions.placeholder = Render_objectSvc.byString($scope, $scope.options.templateOptions.placeholder);
    }
    if (angular.isDefined($scope.model) && angular.isDefined($scope.options.defaultValue)) {
      var keys = $scope.options.key.split('.'),
        currentModel = $scope.model[keys[0]][keys[1]],
        parsedModelVal = Render_objectSvc.byString($scope, $scope.options.defaultValue),
        bracketRegex = new RegExp('(\{{2}.*\}{2})', 'g'),
        replaceModel = currentModel && angular.isString(currentModel) && currentModel.match(bracketRegex),
        isNumericInput = $scope.options.type === 'number';

      // check uii here
      if (parsedModelVal && !isNaN(parsedModelVal) && parsedModelVal.length !== 30) {
        // uii length will be 30
        // this is a number, set that on the model
        parsedModelVal = Number(parsedModelVal);
      }
      if (replaceModel) {
        $scope.model[keys[0]][keys[1]] = parsedModelVal;
      } else if (isNumericInput && !isNaN(currentModel)) {
        $scope.model[keys[0]][keys[1]] = parsedModelVal;
      }
    }
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').controller('EndScriptCtrl', Controller);
  function Controller($scope, Render_ScriptSvc) {
    console.log('script end', $scope.model);
    if ($scope.model) {
      $scope.model.scriptComplete = true;
      Render_ScriptSvc.setScriptResult($scope.model);
    }
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').controller('JavascriptCtrl', Controller);
  function Controller($scope, Render_javascriptExecutor, JavascriptBuilder, RENDER_TOOL_TYPES) {
    var script = $scope.node.properties && $scope.node.properties.javascript;
    if ($scope.node.type === RENDER_TOOL_TYPES.SWITCH.type && !$scope.node.properties.advancedMode) {
      script = JavascriptBuilder.generateSwitch($scope.node);
    } else if ($scope.node.type === RENDER_TOOL_TYPES.DATA_BUILDER.type) {
      script = JavascriptBuilder.generateDataBuilder($scope.node);
    }
    Render_javascriptExecutor.execute($scope, script);
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').controller('MappingCtrl', Controller);
  function Controller($scope, NavSvc) {
    $scope.model.dataMaps = $scope.model.dataMaps || [];
    $scope.model.dataMaps.push($scope.node.properties.dataMap);
    NavSvc.next();
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').controller('PageCtrl', Controller).directive('cfGridstackLayout', Directive);
  function Controller($scope, $timeout, $stateParams, Render_ScriptSvc, Render_objectSvc, SortSvc) {
    $scope.$on('$destroy', function () {
      if (modelWatch) {
        modelWatch();
        modelWatch = null;
      }
      if (validWatch) {
        validWatch();
        validWatch = null;
      }
    });
    $scope.getValue = getValue;
    $scope.uii = $stateParams.uii.toString();
    $scope.renderForm = {};
    $scope.fields = $scope.node && $scope.node.properties && $scope.node.properties.pageData || [];
    // order fields by y, then x asc
    $scope.fields = $scope.fields && $scope.fields.sort(SortSvc.byLayout) || $scope.fields;

    // need to set this on the field so it can track the model changes
    _.each($scope.fields, function (f) {
      f.model = $scope.model;
    });
    $scope.options = {
      cellHeight: 5,
      verticalMargin: 5
    };
    var modelWatch = $scope.$watch('model.model', function (newVal) {
      if ($scope.model) {
        Render_ScriptSvc.setScriptResult($scope.model);
      }
    }, true);
    var validWatch = $scope.$watch('renderForm.$valid', function () {
      if (angular.isDefined($scope.renderForm) && angular.isDefined($scope.renderForm.$valid)) {
        $scope.model.renderFormValid = $scope.renderForm.$valid;
        Render_ScriptSvc.setScriptResult($scope.model);
      }
    });
    $timeout(function () {
      $scope.$digest();
      $timeout(function () {
        var inputs = jQuery('#scriptView').find(':input:not([type=hidden])');
        inputs.first().focus();
        jQuery('.gridRender_' + ($scope.uii || '')).each(function () {
          $scope.gridstack = jQuery(this).gridstack($scope.options).data('gridstack');
        });
      });
    });
    function getValue(key) {
      return Render_objectSvc.byString($scope, key);
    }
  }
  function Directive($interpolate) {
    return {
      restrict: 'A',
      controller: function controller($scope, $element) {
        $scope.watcher = null;
        $scope.$on('$destroy', function () {
          if ($scope.watcher) {
            $scope.watcher();
            $scope.watcher = null;
          }
          if ($scope.parentWatcher) {
            $scope.parentWatcher();
            $scope.parentWatcher = null;
          }
        });
        $element.on('$destroy', function () {
          $scope.$destroy();
        });
      },
      link: function link(scope, element, attrs) {
        scope.field.runExpressions = angular.noop;
        if (scope.field.hideExpression) {
          scope.visible = false;
          scope.parentWatcher = scope.$watch(function () {
            return scope.$parent.gridstack;
          }, function (newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
              if (scope.parentWatcher) {
                scope.parentWatcher();
              }
              if (!scope.watcher) {
                _initHiddenWatcher();
              }
            }
          });
        } else {
          scope.visible = true;
        }
        function _initHiddenWatcher() {
          scope.watcher = scope.$watch(function () {
            return $interpolate('{{' + scope.field.hideExpression + '}}')(scope.$parent);
          }, function (newVal, oldVal) {
            var grid = scope.$parent.gridstack;
            if (newVal === 'false') {
              // add to grid
              grid.update(element, null, null, null, scope.field.data.layout.h);
              scope.visible = true;
            } else if (newVal === 'true') {
              // remove from grid
              grid.update(element, null, null, null, 0);
              scope.visible = false;
            }
          });
        }
      }
    };
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').controller('StartScriptCtrl', Controller);
  function Controller($scope, NavSvc) {
    NavSvc.lookupGoTo($scope.node.connections[0].target);
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').controller('RecordingCtrl', Controller);
  function Controller($scope, RENDER_TOOL_TYPES, NavSvc, Render_ScriptSvc) {
    var callbacks = Render_ScriptSvc.getCallbacks();
    var startRecording = $scope.node.type === RENDER_TOOL_TYPES.START_REC.type;
    $scope.connecting = true;
    $scope.callbackPromise = callbacks.setRecordingState(startRecording).then(function (result) {
      if ($scope.node.type === RENDER_TOOL_TYPES.START_REC.type || $scope.node.type === RENDER_TOOL_TYPES.STOP_REC.type) {
        $scope.status = result;
        $scope.connecting = false;
        NavSvc.next();
      }
    }, function (error) {});
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').controller('WwwCtrl', Controller);
  function Controller($scope, NavSvc, Render_wwwRequestSvc) {
    var tool = $scope.node;
    Render_wwwRequestSvc.execute(tool.properties, $scope).then(function (result) {
      console.log('www result', result);
      $scope.model.model[tool.label] = result;
      NavSvc.next();
    }, function (error) {
      console.error('error in www', error);
      $scope.model.model[tool.label] = error;
      NavSvc.next();
    });
  }
})();
(function () {
  'use strict';

  angular.module('scriptingStudio.render').controller('StartScriptCtrl', Controller);
  function Controller($scope, NavSvc) {
    NavSvc.lookupGoTo($scope.node.connections[0].target);
  }
})();
//# sourceMappingURL=render.js.map
