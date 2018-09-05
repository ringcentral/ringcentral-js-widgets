'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToProps = exports.mapToFunctions = undefined;

var _reactRedux = require('react-redux');

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _QuickAccessPanel = require('../../components/QuickAccessPanel');

var _QuickAccessPanel2 = _interopRequireDefault(_QuickAccessPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      brand = _ref$phone.brand,
      quickAccess = _ref$phone.quickAccess,
      locale = _ref$phone.locale;

  var entered = quickAccess.entered;
  return {
    entered: entered,
    brandName: brand.fullName,
    brandCode: brand.code,
    currentLocale: locale.currentLocale
  };
}

function mapToFunctions(_, _ref2) {
  var quickAccess = _ref2.phone.quickAccess;

  return {
    onCancel: function onCancel() {
      quickAccess.exit();
    }
  };
}

var QuickAccessPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_QuickAccessPanel2.default));

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = QuickAccessPage;
//# sourceMappingURL=index.js.map
