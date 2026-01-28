"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.repeat.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRepeatTrackingManager = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.number.max-safe-integer.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _chunk = _interopRequireDefault(require("lodash/chunk"));
var _rxjs = require("rxjs");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Creates a manager for repeat tracking of viewable items which linking.
 *
 * When the items be linked, will interval emit to the fromServerListener api that will provide you able to know what items still on the screen
 *
 * and the linked api trigger will have a throttle time to prevent the api be triggered too often
 *
 * @template T - Generic type extending Record<string, string> representing the data structure
 *
 * @param options - Configuration options object
 * @param options.sendToServer - Function to send data to server
 * @param options.ttl - Time-to-live duration in milliseconds for cache entries
 * @param options.groupKey - Key used to group items
 * @param options.itemKey - Key used to identify individual items
 * @param options.maxBatchRequestCount - Maximum number of items per batch request (defaults to Number.MAX_SAFE_INTEGER)
 * @param options.validate - Function to validate data items
 *
 * @returns An object containing methods to manage viewable items:
 * - link: Adds a new item to be tracked
 * - unlink: Removes an item from tracking
 * - setListenerDataFromClient: Updates data for a specific client
 * - fromClientListener: Creates an observable for client-side changes
 * - fromServerListener: Creates an observable for server-side async event to fetch data and return the cache success list
 * - clear: Resets all tracking data
 *
 * @example
 * const manager = createRepeatTrackingManager({
 *   sendToServer: async (data) => { ... },
 *   ttl: 30000,
 *   groupKey: 'accountId',
 *   itemKey: 'extensionId',
 *   validate: (data) => true
 * });
 */
var createRepeatTrackingManager = exports.createRepeatTrackingManager = function createRepeatTrackingManager(_ref) {
  var sendToServer = _ref.sendToServer,
    ttl = _ref.ttl,
    groupKey = _ref.groupKey,
    itemKey = _ref.itemKey,
    _ref$maxBatchRequestC = _ref.maxBatchRequestCount,
    maxBatchRequestCount = _ref$maxBatchRequestC === void 0 ? Number.MAX_SAFE_INTEGER : _ref$maxBatchRequestC,
    validate = _ref.validate;
  var link$ = new _rxjs.Subject();
  var unlink$ = new _rxjs.Subject();
  var clientsLinkedItemsMap$ = new _rxjs.BehaviorSubject(new Map());
  var isNever = ttl === 'never';
  var cacheMap = new Map();
  var fromClientListener = function fromClientListener() {
    var everLinkedMap$ = link$.pipe((0, _rxjs.buffer)(
    // when got first value, buffer 1s data to fetch all presence in once
    link$.pipe((0, _rxjs.throttleTime)(1000, undefined, {
      leading: false,
      trailing: true
    }))),
    // accumulate all linked presence
    (0, _rxjs.scan)(function (distinctMap, list) {
      // distinct the list by accountId and extensionId
      list.forEach(function (item) {
        var groupValue = item[groupKey];
        var itemValue = item[itemKey];
        if (validate ? validate(item) : true) {
          var _distinctMap$get;
          var set = (_distinctMap$get = distinctMap.get(groupValue)) !== null && _distinctMap$get !== void 0 ? _distinctMap$get : new Set();
          set.add(itemValue);
          distinctMap.set(groupValue, set);
        }
      });
      return distinctMap;
    }, new Map()));
    var unlinkBuffer$ = unlink$.pipe((0, _rxjs.buffer)(unlink$.pipe(
    // 5000ms throttle for more time is fine, can later remove subscribe
    (0, _rxjs.throttleTime)(5000, undefined, {
      leading: false,
      trailing: true
    }))), (0, _rxjs.startWith)(null));
    return (0, _rxjs.combineLatest)([everLinkedMap$, unlinkBuffer$.pipe((0, _rxjs.take)(2),
    // once emit, then restart the buffer, so will only use the buffer data once, then clear
    (0, _rxjs.repeat)())]).pipe((0, _rxjs.map)(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        everLinkedMap = _ref3[0],
        unlinkList = _ref3[1];
      if (unlinkList) {
        unlinkList.forEach(function (item) {
          var groupValue = item[groupKey];
          var itemValue = item[itemKey];
          var set = everLinkedMap.get(groupValue);
          if (set) {
            set["delete"](itemValue);
            if (set.size === 0) {
              everLinkedMap["delete"](groupValue);
            }
          }
        });
      }
      return everLinkedMap;
    }),
    // convert to serializable list
    (0, _rxjs.map)(function (distinctMap) {
      var list = Array.from(distinctMap).map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
          groupValue = _ref5[0],
          items = _ref5[1];
        var itemList = Array.from(items);
        return [groupValue, itemList];
      });
      return list;
    }),
    // only emit when the list is changed
    (0, _rxjs.distinctUntilChanged)(function (a, b) {
      return JSON.stringify(a) === JSON.stringify(b);
    }), (0, _rxjs.switchMap)(function (data) {
      return sendToServer(data);
    }));
  };
  var fromServerListener = function fromServerListener(sendRequest) {
    // the list from clients
    return clientsLinkedItemsMap$.pipe(
    // distinct the list by first key
    (0, _rxjs.map)(function (linkedItems) {
      var distinctMap = new Map();
      linkedItems.forEach(function (child) {
        child.forEach(function (val) {
          var _distinctMap$get2;
          var _val = _slicedToArray(val, 2),
            groupValue = _val[0],
            items = _val[1];
          var set = (_distinctMap$get2 = distinctMap.get(groupValue)) !== null && _distinctMap$get2 !== void 0 ? _distinctMap$get2 : new Set();
          items.forEach(function (id) {
            return set.add(id);
          });
          distinctMap.set(groupValue, set);
        });
      });
      return Array.from(distinctMap.entries());
    }),
    // if the list is not empty, emit the expired presence list every ttl
    (0, _rxjs.switchMap)(function (list) {
      return list.length > 0 ? (0, _rxjs.of)(null).pipe((0, _rxjs.map)(function () {
        return list.reduce(function (acc, _ref6) {
          var _ref7 = _slicedToArray(_ref6, 2),
            groupValue = _ref7[0],
            itemSet = _ref7[1];
          var validExtensionIds = Array.from(itemSet).filter(function (item) {
            var prevTimestamp = cacheMap.get(item);
            return isNever || !prevTimestamp || Date.now() - prevTimestamp >= ttl;
          });
          if (validExtensionIds.length > 0) {
            if (validExtensionIds.length > maxBatchRequestCount) {
              var splitItems = (0, _chunk["default"])(validExtensionIds, maxBatchRequestCount);
              splitItems.forEach(function (splitItem) {
                acc.push([groupValue, splitItem]);
              });
            } else {
              acc.push([groupValue, validExtensionIds]);
            }
          }
          return acc;
        }, []);
      }), (0, _rxjs.filter)(function (list) {
        return list.length > 0;
      }), (0, _rxjs.switchMap)(function (data) {
        return sendRequest(data);
      }), (0, _rxjs.tap)(function (cacheList) {
        if (isNever) return;
        // the minus 1ms to make sure the cache is expired in the next cycle
        var successTime = Date.now() - 1;
        cacheList.forEach(function (cacheItem) {
          cacheMap.set(cacheItem, successTime);
        });
      }), isNever ? _rxjs.identity : (0, _rxjs.repeat)({
        delay: ttl
      })) : _rxjs.EMPTY;
    }));
  };
  var clear = function clear() {
    clientsLinkedItemsMap$.next(new Map());
    cacheMap.clear();
  };
  return {
    link: function link(data) {
      link$.next(data);
    },
    unlink: function unlink(data) {
      unlink$.next(data);
    },
    setListenerDataFromClient: function setListenerDataFromClient(clientId, data) {
      var presenceMap = clientsLinkedItemsMap$.value;
      presenceMap.set(clientId, data);
      clientsLinkedItemsMap$.next(presenceMap);
    },
    fromClientListener: fromClientListener,
    fromServerListener: fromServerListener,
    clear: clear,
    get clientsLinkedItemsMap() {
      return clientsLinkedItemsMap$.value;
    }
  };
};
//# sourceMappingURL=createRepeatTrackingManager.js.map
