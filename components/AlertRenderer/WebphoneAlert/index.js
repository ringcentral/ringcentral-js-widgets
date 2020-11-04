"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = WebphoneAlert;

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _webphoneErrors = _interopRequireDefault(require("ringcentral-integration/modules/Webphone/webphoneErrors"));

var _webphoneMessages = _interopRequireDefault(require("ringcentral-integration/modules/Webphone/webphoneMessages"));

var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var webphoneMessageList = [_webphoneErrors["default"].connectFailed, _webphoneErrors["default"].toVoiceMailError, _webphoneErrors["default"].connected, _webphoneErrors["default"].muteError, _webphoneErrors["default"].holdError, _webphoneErrors["default"].flipError, _webphoneErrors["default"].recordError, _webphoneErrors["default"].recordDisabled, _webphoneErrors["default"].transferError, _webphoneErrors["default"].noOutboundCallWithoutDL, _webphoneErrors["default"].checkDLError, _webphoneErrors["default"].browserNotSupported, _webphoneErrors["default"].sipProvisionError, _webphoneErrors["default"].webphoneCountOverLimit, _webphoneErrors["default"].webphoneForbidden, _webphoneErrors["default"].requestTimeout, _webphoneErrors["default"].serverTimeout, _webphoneErrors["default"].internalServerError, _webphoneErrors["default"].unknownError, _webphoneErrors["default"].provisionUpdate, _webphoneErrors["default"].serverConnecting, _webphoneMessages["default"].parked];

function WebphoneAlert(props) {
  var message = props.message.message;

  var view = /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString(message, props.currentLocale)); // Handle call record error


  if (message === _webphoneErrors["default"].recordError) {
    var _props$message$payloa = props.message.payload;
    _props$message$payloa = _props$message$payloa === void 0 ? {} : _props$message$payloa;
    var errorCode = _props$message$payloa.errorCode;
    view = /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
      message: _i18n["default"].getString(message, props.currentLocale),
      values: {
        errorCode: errorCode
      }
    });
  } else if (message === _webphoneErrors["default"].sipProvisionError || message === _webphoneErrors["default"].webphoneForbidden || message === _webphoneErrors["default"].requestTimeout || message === _webphoneErrors["default"].serverTimeout || message === _webphoneErrors["default"].internalServerError || message === _webphoneErrors["default"].unknownError) {
    var _props$message$payloa2 = props.message.payload;
    _props$message$payloa2 = _props$message$payloa2 === void 0 ? {} : _props$message$payloa2;
    var statusCode = _props$message$payloa2.statusCode,
        _props$message$payloa3 = _props$message$payloa2.isConnecting,
        isConnecting = _props$message$payloa3 === void 0 ? false : _props$message$payloa3; // sipProvisionError does not have statusCode

    if (statusCode && isConnecting) {
      view = /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
        message: _i18n["default"].getString('registeringWithStatusCode', props.currentLocale),
        values: {
          errorCode: statusCode,
          brandName: props.brand.name
        }
      });
    } else if (statusCode) {
      view = /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
        message: _i18n["default"].getString('failWithStatusCode', props.currentLocale),
        values: {
          errorCode: statusCode,
          brandName: props.brand.name
        }
      });
    } else if (isConnecting) {
      view = /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
        message: _i18n["default"].getString('registeringWithoutStatusCode', props.currentLocale),
        values: {
          brandName: props.brand.name
        }
      });
    } else {
      view = /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
        message: _i18n["default"].getString('failWithoutStatusCode', props.currentLocale),
        values: {
          brandName: props.brand.name
        }
      });
    }
  } else if (message === _webphoneErrors["default"].checkDLError) {
    view = /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
      message: _i18n["default"].getString(message, props.currentLocale),
      values: {
        brandName: props.brand.name
      }
    });
  } else if (message === _webphoneMessages["default"].parked) {
    var _props$message$payloa4 = props.message.payload;
    _props$message$payloa4 = _props$message$payloa4 === void 0 ? {} : _props$message$payloa4;
    var parkedNumber = _props$message$payloa4.parkedNumber;
    view = /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
      message: _i18n["default"].getString(message, props.currentLocale),
      values: {
        parkedNumber: parkedNumber
      }
    });
  }

  return view;
}

WebphoneAlert.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  brand: _propTypes["default"].object.isRequired,
  message: _propTypes["default"].shape({
    message: _propTypes["default"].string.isRequired
  }).isRequired
};

WebphoneAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return webphoneMessageList.filter(function (err) {
    return err === message;
  }).length > 0;
};
//# sourceMappingURL=index.js.map
