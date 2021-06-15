"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UTActivityCallLogPanel = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

var _ActivityCallLogPage = require("../../containers/ActivityCallLogPage");

var _utils = require("../../test/utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
