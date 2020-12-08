"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatMeetingId = formatMeetingId;
exports.replaceTextLinksToAnchors = replaceTextLinksToAnchors;
exports.formatTextToHtml = formatTextToHtml;
exports.getRcmEventTpl = getRcmEventTpl;
exports.getRcmHtmlEventTpl = getRcmHtmlEventTpl;
exports.getRcvEventTpl = getRcvEventTpl;
exports.getRcvHtmlEventTpl = getRcvHtmlEventTpl;
exports.getMeetingId = getMeetingId;
exports.htmlTabIndentation = exports.htmlIndentation = exports.htmlNewLine = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.string.repeat");

require("core-js/modules/es6.regexp.replace");

var _formatMessage = _interopRequireDefault(require("format-message"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function f1(str) {
  if (str.length > 8 || str.length % 3 !== 2) {
    return [str.slice(0, 3), str.slice(3)];
  }

  return [str.slice(0, 4), str.slice(4)];
}

function formatMeetingId(str) {
  var delimeter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';

  if (!str) {
    return '';
  }

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

  return "".concat(current).concat(delimeter).concat(formatMeetingId(nextSlices, delimeter));
}

function getPasswordTpl(meetingPassword, currentLocale) {
  var passwordLiteral = _i18n["default"].getString('password', currentLocale);

  return meetingPassword ? "".concat(passwordLiteral, ": ").concat(meetingPassword) : '';
}
/**
 * replace all text link into anchor link
 * Should match: http://www.example.com
 * Should not match: <a href="http://www.example.com">http://www.example.com </a>
 * Then replace it into <a href="http://www.example.com">http://www.example.com </a>
 * @param input
 */


function replaceTextLinksToAnchors(input) {
  /**
   * [^<>\]]+ means should match any characters except < or > or ]
   * (?!\s*<\/a>) means url should not be followed by either "</a>" or "     </a>"
   * (?!"[^>]*>) means url should not followed by ">
   * further explanation: origin string: <a href="http://www.example.com">http://www.example.com </a> should not match
   * (?=[\s!,?\]]|$) means url can be followed by punctuations or whitespace or nothing
   */
  // https://stackoverflow.com/questions/19060460/url-replace-with-anchor-not-replacing-existing-anchors
  var pattern = /(?:(?:ht|f)tps?:\/\/|www)[^<>\]]+(?!\s*<\/a>)(?!"[^>]*>)(?=[\s!,?\]<]|$)/gim;
  return input.replace(pattern, function ($0) {
    return "<a target=\"_blank\" href=\"".concat($0, "\">").concat($0, "</a>");
  });
}

var htmlNewLine = '<br>';
exports.htmlNewLine = htmlNewLine;
var htmlIndentation = '&nbsp;';
exports.htmlIndentation = htmlIndentation;
var htmlTabIndentation = htmlIndentation.repeat(4);
exports.htmlTabIndentation = htmlTabIndentation;

function formatTextToHtml(plantText) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$links = options.links,
      links = _options$links === void 0 ? [] : _options$links,
      _options$searchLinks = options.searchLinks,
      searchLinks = _options$searchLinks === void 0 ? false : _options$searchLinks,
      _options$newLine = options.newLine,
      newLine = _options$newLine === void 0 ? htmlNewLine : _options$newLine,
      _options$indentation = options.indentation,
      indentation = _options$indentation === void 0 ? htmlIndentation : _options$indentation,
      _options$tabIndentati = options.tabIndentation,
      tabIndentation = _options$tabIndentati === void 0 ? htmlTabIndentation : _options$tabIndentati;
  var htmlContent = plantText.replace(/\r\n|\n|\r/g, '\n') // formalize newline
  .split('\n') // split with formalized newline
  .map(function (line) {
    return line.replace(/\t/g, tabIndentation) // replace all Tab with 4 indentations
    .replace(/^\s*/, function ($0) {
      return indentation.repeat($0.length);
    }); // replace leading whtespaces with indentations
  }).join(newLine);
  links.forEach(function (uri) {
    if (uri) {
      htmlContent = htmlContent.replace(uri, "<a target=\"_blank\" href=\"".concat(uri, "\">").concat(uri, "</a>"));
    }
  });

  if (searchLinks) {
    htmlContent = replaceTextLinksToAnchors(htmlContent);
  }

  return htmlContent;
}
/**
 * Dial-in password: ${passwordPstn}
 */


function getRcvPstnPasswordTpl(meetingPasswordPSTN, currentLocale) {
  var passwordPstnLiteral = _i18n["default"].getString('passwordPstn', currentLocale);

  return "".concat(passwordPstnLiteral, " ").concat(meetingPasswordPSTN);
}

function getBaseRcmTpl(_ref, brand, currentLocale) {
  var meeting = _ref.meeting,
      serviceInfo = _ref.serviceInfo,
      extensionInfo = _ref.extensionInfo,
      invitationInfo = _ref.invitationInfo;
  var accountName = extensionInfo.name;
  var meetingId = meeting.id;
  var joinUri = meeting.links.joinUri;
  var password = meeting.password;
  var mobileDialingNumberTpl = serviceInfo.mobileDialingNumberTpl;
  var phoneDialingNumberTpl = serviceInfo.phoneDialingNumberTpl;
  var passwordTpl = getPasswordTpl(password, currentLocale);
  var teleconference = brand.brandConfig.teleconference;
  var formattedMsg = invitationInfo === null || invitationInfo === void 0 ? void 0 : invitationInfo.invitation;

  if (!formattedMsg) {
    formattedMsg = (0, _formatMessage["default"])(_i18n["default"].getString('inviteMeetingContent', currentLocale), {
      accountName: accountName,
      brandName: brand.name,
      joinUri: joinUri,
      passwordTpl: passwordTpl,
      mobileDialingNumberTpl: mobileDialingNumberTpl,
      phoneDialingNumberTpl: phoneDialingNumberTpl,
      meetingId: formatMeetingId(meetingId),
      teleconference: teleconference
    });
  }

  return {
    formattedMsg: formattedMsg,
    links: {
      joinUri: joinUri,
      teleconference: teleconference
    }
  };
}

function getRcmEventTpl(mainInfo, brand, currentLocale) {
  var tplResult = getBaseRcmTpl(mainInfo, brand, currentLocale);
  return tplResult.formattedMsg;
}

function getRcmHtmlEventTpl(mainInfo, brand, currentLocale) {
  var tplResult = getBaseRcmTpl(mainInfo, brand, currentLocale);
  return formatTextToHtml(tplResult.formattedMsg, {
    links: [tplResult.links.joinUri, tplResult.links.teleconference]
  });
}

function getBaseRcvTpl(_ref2, brand, currentLocale) {
  var meeting = _ref2.meeting,
      extensionInfo = _ref2.extensionInfo,
      dialInNumber = _ref2.dialInNumber;
  var accountName = extensionInfo.name;
  var meetingPassword = meeting.meetingPassword,
      meetingPasswordPSTN = meeting.meetingPasswordPSTN,
      isMeetingSecret = meeting.isMeetingSecret;
  var joinUri = meeting.joinUri;
  var pinNumber = meeting.shortId;
  var productName;
  var meetingContent = [];
  var showMeetingPasswordPSTN = isMeetingSecret && meetingPasswordPSTN;

  if (brand.name === 'RingCentral') {
    productName = 'RingCentral Video';
    meetingContent.push(_i18n["default"].getString('rcvRCBrandInviteMeetingContent', currentLocale));
  } else {
    productName = brand.name;
    meetingContent.push(_i18n["default"].getString('rcvInviteMeetingContent', currentLocale));
  }

  if (dialInNumber) {
    meetingContent.push(_i18n["default"].getString('rcvInviteMeetingContentDial', currentLocale));

    if (showMeetingPasswordPSTN) {
      meetingContent.push(getRcvPstnPasswordTpl(meetingPasswordPSTN, currentLocale));
    }
  }

  meetingContent.push("".concat(_i18n["default"].getString('rcvTeleconference', currentLocale)));
  var passwordTpl = isMeetingSecret ? getPasswordTpl(meetingPassword, currentLocale) : '';
  var isATT = brand.code === 'att';
  var teleconference = isATT ? _config.rcvAttTeleconference : _config.rcvTeleconference;
  var brandName = isATT ? "AT&T ".concat(brand.name) : brand.name;
  var formattedMsg = (0, _formatMessage["default"])(meetingContent.join(''), {
    accountName: accountName,
    brandName: brandName,
    joinUri: joinUri,
    passwordTpl: passwordTpl,
    smartphones: "".concat(dialInNumber, ",,").concat(pinNumber, "#").concat(showMeetingPasswordPSTN ? ",,".concat(meetingPasswordPSTN, "#") : ''),
    dialNumber: dialInNumber,
    pinNumber: formatMeetingId(pinNumber),
    teleconference: teleconference,
    productName: productName
  });
  return {
    formattedMsg: formattedMsg,
    links: {
      joinUri: joinUri,
      teleconference: teleconference
    }
  };
}

function getRcvEventTpl(mainInfo, brand, currentLocale) {
  var tplResult = getBaseRcvTpl(mainInfo, brand, currentLocale);
  return tplResult.formattedMsg;
}

function getRcvHtmlEventTpl(mainInfo, brand, currentLocale) {
  var tplResult = getBaseRcvTpl(mainInfo, brand, currentLocale);
  return formatTextToHtml(tplResult.formattedMsg, {
    links: [tplResult.links.joinUri, tplResult.links.teleconference]
  });
}

function getMeetingId(meetingUri) {
  if (meetingUri) {
    var regs = [_config.MEETING_URI_REGEXP.RCM, _config.MEETING_URI_REGEXP.RCV];

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
