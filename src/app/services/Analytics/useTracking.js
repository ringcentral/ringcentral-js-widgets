"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTracking = void 0;
require("core-js/modules/es.array.concat.js");
var _core = require("@material-ui/core");
var _nextCore = require("@ringcentral-integration/next-core");
var _execTracking = require("./execTracking");
/**
 *
 * Provide you can use track hook inside component
 *
 * #### - when you just need trackEvent directly, `useTracking` without any callback

 * ```ts
 * const trackEvent = useTracking();
 *
 * const onClick = () => {
 *   // track that event directly
 *   trackEvent('come events');
 * };
 * ```
 *
 * #### - when you need use analytics module methods
 *
 * ```ts
 * const trackEvent2 = useTracking<[number, string], Analytics>(
 *   (times, message, analytics) => {
 *     const info = analytics.getAccountInfo?.();
 *
 *     return [
 *       'EventName',
 *       {
 *         info,
 *         times,
 *         message,
 *       },
 *     ];
 *   },
 * );
 *
 * const onClick2 = () => {
 *   const times = 1;
 *   const message = 'login';
 *   trackEvent2(times, message);
 * };
 * ```
 *
 * #### - also can track with object parameters
 * ```ts
 * const trackEvent3 = useTracking<[{ userId: string }]>(({ userId }) => {
 *   return [
 *     'EventName',
 *     {
 *       userId,
 *     },
 *   ];
 * });
 *
 * const onClick3 = () => {
 *   // track event with object
 *   trackEvent3({ userId: 'example user' });
 * };
 * ```
 */
var useTracking = exports.useTracking = function useTracking(trackCallback) {
  var analytics = (0, _nextCore.useContainer)('Analytics');
  var trackEvent = (0, _core.useEventCallback)(function () {
    // when not have track module, do nothing return directly
    if (!analytics) return;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var toTrackEvent = trackCallback !== null && trackCallback !== void 0 ? trackCallback : args[0];
    (0, _execTracking.execTracking)(analytics, toTrackEvent, [].concat(args, [analytics]));
  });
  return trackEvent;
};
//# sourceMappingURL=useTracking.js.map
