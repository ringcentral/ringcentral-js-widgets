"use strict";

require("core-js/modules/es.array.find");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckDialerDisplayItem = void 0;
require("regenerator-runtime/runtime");
var _Dialer = require("../Dialer");
var _createDialerPanel = require("./createDialerPanel");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var CheckDialerDisplayItem = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref, context) {
    var allowManualCalls, displayItems, wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            allowManualCalls = _ref.allowManualCalls, displayItems = _ref.displayItems;
            wrapper = (0, _createDialerPanel.createDialerPanel)({
              hasDialer: allowManualCalls
            });
            if (displayItems.length > 0) {
              expect(wrapper.find(_Dialer.Dialer)).toBeDefined();
              expect(wrapper.find('[data-sign="callButton"]')).toBeDefined();
            } else {
              expect(wrapper.text()).toBe('');
            }
            wrapper.unmount();
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function CheckDialerDisplayItem(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
exports.CheckDialerDisplayItem = CheckDialerDisplayItem;
//# sourceMappingURL=DialerPanel.ut.js.map
