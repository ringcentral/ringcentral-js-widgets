'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getDataReducer = getDataReducer;

var _removeUri = require('../../lib/removeUri');

var _removeUri2 = _interopRequireDefault(_removeUri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDataReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref = arguments[1];
    var type = _ref.type,
        data = _ref.data;

    switch (type) {
      case types.fetchSuccess:
        return data && data.map(function (item) {
          return (0, _extends3.default)({}, item, {
            extension: (0, _removeUri2.default)(item.extension)
          });
        });
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}
//# sourceMappingURL=getReducer.js.map
