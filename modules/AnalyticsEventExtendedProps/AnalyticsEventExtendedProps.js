"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalyticsEventExtendedProps = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var AnalyticsEventExtendedProps = /*#__PURE__*/function () {
  function AnalyticsEventExtendedProps() {
    _classCallCheck(this, AnalyticsEventExtendedProps);

    this._EventExtendedPropsMap = new Map();
  }

  _createClass(AnalyticsEventExtendedProps, [{
    key: "addEventsExtendedProps",
    value: function addEventsExtendedProps(_ref) {
      var _this = this;

      var events = _ref.events,
          extendedProps = _ref.extendedProps;

      if (!events || !extendedProps) {
        console.error('[events or extendedProps] is required');
        return;
      }

      events.forEach(function (event) {
        _this.addEventExtendedProps({
          event: event,
          extendedProps: extendedProps
        });
      });
    }
  }, {
    key: "addEventExtendedProps",
    value: function addEventExtendedProps(_ref2) {
      var event = _ref2.event,
          extendedProps = _ref2.extendedProps;

      if (!event || !extendedProps) {
        console.error('[event or extendedProps] is required');
        return;
      }

      var oldValue = this._EventExtendedPropsMap.get(event);

      this._EventExtendedPropsMap.set(event, _objectSpread(_objectSpread({}, oldValue), extendedProps));
    }
  }, {
    key: "extendedProps",
    get: function get() {
      return this._EventExtendedPropsMap;
    }
  }]);

  return AnalyticsEventExtendedProps;
}();

exports.AnalyticsEventExtendedProps = AnalyticsEventExtendedProps;
//# sourceMappingURL=AnalyticsEventExtendedProps.js.map
