"use strict";

require("core-js/modules/es.array.find");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UTActivityCallLogPanel = void 0;
require("regenerator-runtime/runtime");
var _ActivityCallLogPage = require("../../containers/ActivityCallLogPage");
var _utils = require("../../test/utils");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var UTActivityCallLogPanel = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(props, context) {
    var id, wrapper, index, getSelectList, openField, addMenuIcon, menuItems;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = (0, _utils.getCurrentRouteId)(context.phone.routerInteraction.currentPath);
            wrapper = (0, _utils.moduleUIPageMount)(_ActivityCallLogPage.ActivityCallLogPage, {
              id: id
            });
            index = 0;
            if (props.menuType === 'whatid') {
              index = 1;
            }
            getSelectList = function getSelectList() {
              return wrapper.find('EditLogSection').find('CallLogFields').find('FieldItem').find('SelectList').at(index);
            };
            openField = getSelectList().find('[data-sign="select-list-open"]').at(0);
            openField.simulate('click');
            addMenuIcon = getSelectList().find('RcIconButton[data-sign="addEntityMenu"]').find('button');
            addMenuIcon.simulate('click');
            menuItems = getSelectList().find('RcMenuItem');
            menuItems.find("[title=\"New ".concat(props.entityName, "\"]")).simulate('click');
            wrapper.unmount();
          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function UTActivityCallLogPanel(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.UTActivityCallLogPanel = UTActivityCallLogPanel;
//# sourceMappingURL=ActivityCallLogPanel.ut.js.map
