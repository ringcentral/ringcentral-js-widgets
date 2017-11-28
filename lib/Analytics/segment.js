'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;
function init() {
  if (typeof window !== 'undefined') {
    window.analytics = window.analytics || [];
    var _window = window,
        analytics = _window.analytics;

    if (analytics.initialize) {
      if (window.console && console.log) {
        console.log('Segment initialized!');
      }
    } else if (analytics.invoked) {
      // If the snippet was invoked already show an error.
      if (window.console && console.error) {
        console.error('Segment snippet included twice.');
      }
    } else {
      // Invoked flag, to make sure the snippet
      // is never invoked twice.
      analytics.invoked = true;

      // A list of the methods in Analytics.js to stub.
      analytics.methods = ['trackSubmit', 'trackClick', 'trackLink', 'trackForm', 'pageview', 'identify', 'reset', 'group', 'track', 'ready', 'alias', 'debug', 'page', 'once', 'off', 'on'];

      analytics.factory = function factory(method) {
        // console.debug(method);
        return function pushMethod() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          args.unshift(method);
          analytics.push(args);
          return analytics;
        };
      };

      analytics.methods.forEach(function (method) {
        analytics[method] = analytics.factory(method);
      });

      analytics.load = function load(key) {
        if (document !== undefined) {
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.async = true;
          script.src = 'https://cdn.segment.com/analytics.js/v1/' + key + '/analytics.min.js';
          // Insert our script next to the first script element.
          var first = document.getElementsByTagName('meta')[0];
          first.parentNode.insertBefore(script, first);
        }
      };

      analytics.SNIPPET_VERSION = '4.0.0';
    }
    return analytics;
  }
  return [];
}
//# sourceMappingURL=segment.js.map
