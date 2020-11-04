"use strict";

require("core-js/modules/es6.date.now");

(function () {
  'use strict';

  var module = angular.module('agent_ui.factories.localeLoader', []);
  module.factory('localeLoader', Loader);

  function Loader($q, $http) {
    var deferred;
    return function (options) {
      if (!deferred) {
        deferred = $q.defer();
        var url = window.__settings.assetsUrl;
        url += 'assets/languages/locale-';
        url += options.key;
        url += '.json?v='; // TODO: here should update from ev side.
        // url += uuid.v4();

        url += Date.now();
        $http.get(url).success(function (data) {
          deferred.resolve(data);
        });
      }

      return deferred.promise;
    };
  }
})();
//# sourceMappingURL=localeLoader.js.map
