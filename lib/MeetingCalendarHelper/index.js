"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatMeetingId = formatMeetingId;
exports.getRcmEventTpl = getRcmEventTpl;
exports.getRcmHtmlEventTpl = getRcmHtmlEventTpl;
exports.getRcvEventTpl = getRcvEventTpl;
exports.getRcvHtmlEventTpl = getRcvHtmlEventTpl;
exports.getMeetingId = getMeetingId;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.string.repeat");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.function.name");

var _formatMessage = _interopRequireDefault(require("format-message"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function f1(str) {
  if (str.length > 8 || str.length % 3 !== 2) {
    return [str.slice(0, 3), str.slice(3)];
  }

  return [str.slice(0, 4), str.slice(4)];
}

function formatMeetingId(str) {
  var _f = f1(str),
      _f2 = _slicedToArray(_f, 2),
      current = _f2[0],
      nextSlices = _f2[1];

  if (!nextSlices) {
    return current;
  }

  if (nextSlices.length === 1) {
    return "".concat(current).concat(nextSlices);
  }

  return "".concat(current, " ").concat(formatMeetingId(nextSlices));
}

function getPasswordTpl(password, currentLocale) {
  var passwordLiteral = _i18n["default"].getString('password', currentLocale);

  return password ? "\n    ".concat(passwordLiteral, ": ").concat(password) : '';
}

function getBaseRcmTpl(_ref, brand, currentLocale) {
  var meeting = _ref.meeting,
      serviceInfo = _ref.serviceInfo,
      extensionInfo = _ref.extensionInfo;
  var accountName = extensionInfo.name;
  var meetingId = meeting.id;
  var joinUri = meeting.links.joinUri;
  var password = meeting.password;
  var mobileDialingNumberTpl = serviceInfo.mobileDialingNumberTpl;
  var phoneDialingNumberTpl = serviceInfo.phoneDialingNumberTpl;
  var passwordTpl = getPasswordTpl(password, currentLocale);
  var teleconference = brand.brandConfig.teleconference;
  return {
    formattedMsg: (0, _formatMessage["default"])(_i18n["default"].getString('inviteMeetingContent', currentLocale), {
      accountName: accountName,
      brandName: brand.name,
      joinUri: joinUri,
      passwordTpl: passwordTpl,
      mobileDialingNumberTpl: mobileDialingNumberTpl,
      phoneDialingNumberTpl: phoneDialingNumberTpl,
      meetingId: formatMeetingId(meetingId),
      teleconference: teleconference
    }),
    links: {
      joinUri: joinUri,
      teleconference: teleconference
    }
  };
}

function formatTextToHtml(_ref2) {
  var formattedMsg = _ref2.formattedMsg,
      _ref2$links = _ref2.links,
      joinUri = _ref2$links.joinUri,
      teleconference = _ref2$links.teleconference;
  var newLine = '<br>';
  var indentation = '&nbsp;';
  return "<section>".concat(newLine).concat(formattedMsg.replace(/\r\n|\n|\r/g, newLine).replace(joinUri, "<a target=\"_blank\" href=\"".concat(joinUri, "\">").concat(joinUri, "</a>")).replace(teleconference, "<a target=\"_blank\" href=\"".concat(teleconference, "\">").concat(teleconference, "</a>")).replace(/\t/g, indentation.repeat(4))).concat(newLine, "</section>");
}

function getRcmEventTpl(mainInfo, brand, currentLocale) {
  return getBaseRcmTpl(mainInfo, brand, currentLocale).formattedMsg;
}

function getRcmHtmlEventTpl(mainInfo, brand, currentLocale) {
  return formatTextToHtml(getBaseRcmTpl(mainInfo, brand, currentLocale));
}

var rcvAttTeleconference = 'https://meetings.officeathand.att.com/teleconference';
var rcvTeleconference = 'https://v.ringcentral.com/teleconference/';
var attBrandId = '3420';

function getBaseRcvTpl(_ref3, brand, currentLocale) {
  var meeting = _ref3.meeting,
      extensionInfo = _ref3.extensionInfo,
      dialInNumber = _ref3.dialInNumber;
  var accountName = extensionInfo.name;
  var joinUri = meeting.joinUri;
  var pinNumber = meeting.shortId;
  var productName;
  var meetingContent;

  if (brand.name === 'RingCentral') {
    productName = 'RingCentral Video';
    meetingContent = _i18n["default"].getString('rcvRCBrandInviteMeetingContent', currentLocale);
  } else {
    productName = brand.name;
    meetingContent = _i18n["default"].getString('rcvInviteMeetingContent', currentLocale);
  }

  if (dialInNumber) {
    meetingContent = "".concat(meetingContent).concat(_i18n["default"].getString('rcvInviteMeetingContentDial', currentLocale));
  }

  meetingContent = "".concat(meetingContent, "\n\n").concat(_i18n["default"].getString('rcvTeleconference', currentLocale));
  var teleconference = brand.id === attBrandId ? rcvAttTeleconference : rcvTeleconference;
  var brandName = brand.id === attBrandId ? "AT&T ".concat(brand.name) : brand.name;
  return {
    formattedMsg: (0, _formatMessage["default"])(meetingContent, {
      accountName: accountName,
      brandName: brandName,
      joinUri: joinUri,
      smartphones: "".concat(dialInNumber, ",,").concat(pinNumber, "#"),
      dialNumber: dialInNumber,
      pinNumber: formatMeetingId(pinNumber),
      teleconference: teleconference,
      productName: productName
    }),
    links: {
      joinUri: joinUri,
      teleconference: teleconference
    }
  };
}

function getRcvEventTpl(mainInfo, brand, currentLocale) {
  return getBaseRcvTpl(mainInfo, brand, currentLocale).formattedMsg;
}

function getRcvHtmlEventTpl(mainInfo, brand, currentLocale) {
  return formatTextToHtml(getBaseRcvTpl(mainInfo, brand, currentLocale));
}

function getMeetingId(meetingUri) {
  if (meetingUri) {
    var regs = [_config.REG_EXP.MEETING, _config.REG_EXP.RCV];

    for (var i = 0; i < regs.length; i += 1) {
      var matches = regs[i].exec(meetingUri);

      if (matches && matches.length > 0) {
        var match0 = matches[0];
        var link = (match0.indexOf('?') > -1 ? matches[0].substring(0, matches[0].indexOf('?')) : match0).split('/');
        var id = link[link.length - 1];
        return id;
      }
    }
  }

  return null;
}
//# sourceMappingURL=index.js.map
