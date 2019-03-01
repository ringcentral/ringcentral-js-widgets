"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getupdatePageReducer = getupdatePageReducer;
exports.default = getQuickAccessrReducer;

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getupdatePageReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        _ref$entered = _ref.entered,
        entered = _ref$entered === void 0 ? state : _ref$entered;

    if (type === types.updatePage) {
      return entered;
    }

    return state;
  };
}

function getQuickAccessrReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer.default)(types),
    entered: getupdatePageReducer(types)
  });
}
//# sourceMappingURL=getQuickAccessReducer.js.map
