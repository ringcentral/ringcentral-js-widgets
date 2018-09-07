'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getupdatePageReducer = getupdatePageReducer;
exports.default = getQuickAccessrReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getupdatePageReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref = arguments[1];
    var type = _ref.type,
        _ref$entered = _ref.entered,
        entered = _ref$entered === undefined ? state : _ref$entered;

    if (type === types.updatePage) {
      return entered;
    }
    return state;
  };
}

function getQuickAccessrReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    entered: getupdatePageReducer(types)
  });
}
//# sourceMappingURL=getQuickAccessReducer.js.map
