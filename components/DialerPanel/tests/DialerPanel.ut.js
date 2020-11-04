"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckDialerDisplayItem = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

var _Dialer = require("../Dialer");

var _createDialerPanel = require("./createDialerPanel");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
