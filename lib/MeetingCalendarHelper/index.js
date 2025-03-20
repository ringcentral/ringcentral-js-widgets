"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.regexp.to-string");
require("core-js/modules/es.string.repeat");
require("core-js/modules/es.string.replace");
require("core-js/modules/es.string.split");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "formatMeetingId", {
  enumerable: true,
  get: function get() {
    return _formatMeetingId.formatMeetingId;
  }
});
exports.formatTextToHtml = formatTextToHtml;
exports.getBaseRcvTpl = getBaseRcvTpl;
exports.getMeetingId = getMeetingId;
exports.getRcmEventTpl = getRcmEventTpl;
exports.getRcmHtmlEventTpl = getRcmHtmlEventTpl;
exports.getRcvDialInInfo = getRcvDialInInfo;
exports.getRcvEventTpl = getRcvEventTpl;
exports.getRcvHtmlEventTpl = getRcvHtmlEventTpl;
exports.htmlTabIndentation = exports.htmlNewLine = exports.htmlIndentation = void 0;
exports.meetingLinkContains = meetingLinkContains;
exports.replaceTextLinksToAnchors = replaceTextLinksToAnchors;
exports.stripMeetingLinks = stripMeetingLinks;
var _utils = require("@ringcentral-integration/utils");
var _formatMeetingId = require("./formatMeetingId");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function formatSmartphones(dialInNumber, pinNumber, showMeetingPasswordPSTN, meetingPasswordPSTN) {
  if (!dialInNumber || dialInNumber.length === 0) {
    return '';
  }
  if (typeof dialInNumber === 'string') {
    return "".concat(dialInNumber, ",,").concat(pinNumber, "#").concat(showMeetingPasswordPSTN ? ",,".concat(meetingPasswordPSTN, "#") : '');
  }
  return dialInNumber.map(function (obj) {
    var _obj$country, _obj$country2;
    var passwordField = showMeetingPasswordPSTN ? ",,".concat(meetingPasswordPSTN, "#") : '';
    var locationField = (obj === null || obj === void 0 ? void 0 : (_obj$country = obj.country) === null || _obj$country === void 0 ? void 0 : _obj$country.name) && obj.location ? "".concat(obj.country.name, " (").concat(obj.location, ")") : (obj === null || obj === void 0 ? void 0 : (_obj$country2 = obj.country) === null || _obj$country2 === void 0 ? void 0 : _obj$country2.name) || '';
    return "".concat(obj.phoneNumber, ",,").concat(pinNumber, "#").concat(passwordField, " ").concat(locationField);
  }).join('\n\t');
}
function formatDialInNumber(dialInNumber) {
  if (!dialInNumber || dialInNumber.length === 0) {
    return '';
  }
  if (typeof dialInNumber === 'string') {
    return dialInNumber;
  }
  return dialInNumber.map(function (obj) {
    var _obj$country3, _obj$country4;
    var locationField = (obj === null || obj === void 0 ? void 0 : (_obj$country3 = obj.country) === null || _obj$country3 === void 0 ? void 0 : _obj$country3.name) && obj.location ? "".concat(obj.country.name, " (").concat(obj.location, ")") : (obj === null || obj === void 0 ? void 0 : (_obj$country4 = obj.country) === null || _obj$country4 === void 0 ? void 0 : _obj$country4.name) || '';
    return "".concat(obj.phoneNumber, " ").concat(locationField);
  }).join('\n\t');
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
    _options$uselessSente = options.uselessSentences,
    uselessSentences = _options$uselessSente === void 0 ? [] : _options$uselessSente,
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
    }); // replace leading white spaces with indentations
  }).join(newLine);
  uselessSentences.forEach(function (sentence) {
    if (sentence) {
      htmlContent = htmlContent.replace(sentence, '');
    }
  });
  links.forEach(function (link) {
    if (link) {
      var isPlantLink = typeof link === 'string';
      var uri = isPlantLink ? link : link.uri;
      var text = isPlantLink ? link : link.text;
      if (uri) {
        htmlContent = htmlContent.replace(uri, "<a target=\"_blank\" href=\"".concat(uri, "\">").concat(text || uri, "</a>"));
      }
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
  var _brand$brandConfig$te, _brand$brandConfig$te2;
  var meeting = _ref.meeting,
    serviceInfo = _ref.serviceInfo,
    extensionInfo = _ref.extensionInfo,
    invitationInfo = _ref.invitationInfo;
  var addNoModifyAlert = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var accountName = extensionInfo.name;
  var meetingId = meeting.id;
  var joinUri = meeting.links.joinUri;
  var password = meeting.password;
  var mobileDialingNumberTpl = serviceInfo.mobileDialingNumberTpl;
  var phoneDialingNumberTpl = serviceInfo.phoneDialingNumberTpl;
  var passwordTpl = getPasswordTpl(password, currentLocale);
  var teleconference = (_brand$brandConfig$te = (_brand$brandConfig$te2 = brand.brandConfig.teleconference) === null || _brand$brandConfig$te2 === void 0 ? void 0 : _brand$brandConfig$te2.toString()) !== null && _brand$brandConfig$te !== void 0 ? _brand$brandConfig$te : '';
  var prefix = addNoModifyAlert ? "".concat(_i18n["default"].getString('doNotModify', currentLocale), "\n") : '';
  var formattedMsg = invitationInfo === null || invitationInfo === void 0 ? void 0 : invitationInfo.invitation;
  if (!formattedMsg) {
    formattedMsg = (0, _utils.format)(_i18n["default"].getString('inviteMeetingContent', currentLocale), {
      accountName: accountName,
      brandName: brand.name,
      joinUri: joinUri,
      passwordTpl: passwordTpl,
      mobileDialingNumberTpl: mobileDialingNumberTpl,
      phoneDialingNumberTpl: phoneDialingNumberTpl,
      meetingId: (0, _formatMeetingId.formatMeetingId)(meetingId),
      teleconference: teleconference
    });
  }
  return {
    formattedMsg: "".concat(prefix).concat(formattedMsg),
    links: {
      joinUri: joinUri,
      teleconference: teleconference
    }
  };
}
function getRcmEventTpl(mainInfo, brand, currentLocale) {
  var addNoModifyAlert = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var tplResult = getBaseRcmTpl(mainInfo, brand, currentLocale, addNoModifyAlert);
  return tplResult.formattedMsg;
}
function getRcmHtmlEventTpl(mainInfo, brand, currentLocale) {
  var addNoModifyAlert = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var tplResult = getBaseRcmTpl(mainInfo, brand, currentLocale, addNoModifyAlert);
  return formatTextToHtml(tplResult.formattedMsg, {
    links: [tplResult.links.joinUri, tplResult.links.teleconference]
  });
}

/* Outcome example:
One tap to join audio only from a smartphone:
  +16504191505,,977988816#,,3893596796# United States (San Mateo, CA)

Or dial:
    +1 (650) 4191505 United States (San Mateo, CA)
    Access Code / Meeting ID: 977988816

Dial-in password: 3893596796
 */
function formatDialInSection(_ref2) {
  var dialInNumber = _ref2.dialInNumber,
    isMeetingSecret = _ref2.isMeetingSecret,
    meetingPasswordPSTN = _ref2.meetingPasswordPSTN,
    shortId = _ref2.shortId,
    currentLocale = _ref2.currentLocale;
  /* TODO: after get the translation, remove rcvInviteMeetingContentDial
   * rcvInviteMeetingContentCountryDial is the correct one
   */
  var dialingString = _i18n["default"].getString(typeof dialInNumber === 'string' ? 'rcvInviteMeetingContentDial' : 'rcvInviteMeetingContentCountryDial', currentLocale);
  var showMeetingPasswordPSTN = !!(isMeetingSecret && meetingPasswordPSTN);
  var dialingInfo = (0, _utils.format)(dialingString, {
    smartphones: formatSmartphones(dialInNumber, shortId, showMeetingPasswordPSTN, meetingPasswordPSTN),
    dialNumber: formatDialInNumber(dialInNumber),
    pinNumber: (0, _formatMeetingId.formatMeetingId)(shortId)
  });
  var pstnPasswordTpl = !showMeetingPasswordPSTN ? '' : getRcvPstnPasswordTpl(meetingPasswordPSTN, currentLocale);
  return "".concat(dialingInfo).concat(pstnPasswordTpl);
}

// RCINT-22191 hotfix
// The feature need us to extract just the dial-in and teleconference section
// Although the logic is OK for common usage, the requirement is specific
// There is no any evidence that the other projects will need this
// Therefore, this is reserved for the calendar-update-tool project
function getRcvDialInInfo(_ref3) {
  var _args$dialInNumber;
  var rcvTeleconference = _ref3.rcvTeleconference,
    args = _objectWithoutProperties(_ref3, ["rcvTeleconference"]);
  var hasDialInNumber = (args === null || args === void 0 ? void 0 : (_args$dialInNumber = args.dialInNumber) === null || _args$dialInNumber === void 0 ? void 0 : _args$dialInNumber.length) > 0;
  var dialInSection = hasDialInNumber ? formatDialInSection(args) : '';
  var teleconferenceInfo = (0, _utils.format)(_i18n["default"].getString('rcvTeleconference', args.currentLocale), {
    teleconference: rcvTeleconference
  });
  return "".concat(dialInSection).concat(teleconferenceInfo);
}
function getBaseRcvTpl(_ref4, brand, currentLocale) {
  var _brand$brandConfig$rc;
  var meeting = _ref4.meeting,
    extensionInfo = _ref4.extensionInfo,
    dialInNumber = _ref4.dialInNumber,
    invitationInfo = _ref4.invitationInfo;
  var enableRcvConnector = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var enableE2EE = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var addNoModifyAlert = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var prefix = addNoModifyAlert ? "".concat(_i18n["default"].getString('doNotModify', currentLocale), "\n") : '';
  var joinUri = meeting.joinUri;
  var teleconference = brand.rcvTeleconference;
  if (invitationInfo) {
    return {
      formattedMsg: "".concat(prefix).concat(invitationInfo),
      links: {
        joinUri: joinUri,
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        teleconference: teleconference
      }
    };
  }
  var accountName = extensionInfo.name;
  var meetingPassword = meeting.meetingPassword,
    meetingPasswordPSTN = meeting.meetingPasswordPSTN,
    isMeetingSecret = meeting.isMeetingSecret,
    e2ee = meeting.e2ee;
  var meetingContent = [];
  var showMeetingPasswordPSTN = !!(isMeetingSecret && meetingPasswordPSTN);
  if (enableE2EE && e2ee) {
    meetingContent.push(_i18n["default"].getString('rcvE2EEInviteMeetingContent', currentLocale));
    var _formattedMsg = (0, _utils.format)(meetingContent.join(''), {
      accountName: accountName,
      brandName: brand.name,
      rcvProductName: brand.brandConfig.rcvProductName,
      joinUri: joinUri,
      e2EESupportLinkText: (0, _utils.format)(_i18n["default"].getString('e2EESupportLinkText', currentLocale), {
        brandName: brand.name
      }),
      rcvE2EESupportUrl: brand.rcvE2EESupportUrl
    });
    return {
      formattedMsg: "".concat(prefix).concat(_formattedMsg),
      links: {
        joinUri: joinUri,
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        teleconference: teleconference
      }
    };
  }
  meetingContent.push(brand.brandConfig.rcvInviteMeetingContent);
  if (dialInNumber && dialInNumber.length > 0) {
    /* TODO: after get the translation, remove rcvInviteMeetingContentDial
     * rcvInviteMeetingContentCountryDial is the correct one
     */
    meetingContent.push(_i18n["default"].getString(typeof dialInNumber === 'string' ? 'rcvInviteMeetingContentDial' : 'rcvInviteMeetingContentCountryDial', currentLocale));
    if (showMeetingPasswordPSTN) {
      meetingContent.push(getRcvPstnPasswordTpl(meetingPasswordPSTN, currentLocale));
    }
  }
  meetingContent.push("".concat(_i18n["default"].getString('rcvTeleconference', currentLocale)));
  var passwordTpl = isMeetingSecret ? getPasswordTpl(meetingPassword, currentLocale) : '';
  if (enableRcvConnector) {
    meetingContent.push("".concat(_i18n["default"].getString('rcvSipHeader', currentLocale)));
    var rcvSipContent = isMeetingSecret ? 'rcvSipContentWithPwd' : 'rcvSipContentNoPwd';
    meetingContent.push("".concat(_i18n["default"].getString(rcvSipContent, currentLocale)));
  }
  var shortId = meeting.shortId;
  var formattedMsg = (0, _utils.format)(meetingContent.join(''), {
    accountName: accountName,
    brandName: (_brand$brandConfig$rc = brand.brandConfig.rcvBrandName) !== null && _brand$brandConfig$rc !== void 0 ? _brand$brandConfig$rc : brand.name,
    joinUri: joinUri,
    passwordTpl: passwordTpl,
    meetingPasswordPSTN: meetingPasswordPSTN,
    meetingId: shortId,
    pinNumber: (0, _formatMeetingId.formatMeetingId)(shortId),
    teleconference: teleconference,
    dialNumber: formatDialInNumber(dialInNumber),
    smartphones: formatSmartphones(dialInNumber, shortId, showMeetingPasswordPSTN, meetingPasswordPSTN),
    rcvProductName: brand.brandConfig.rcvProductName
  });
  return {
    formattedMsg: "".concat(prefix).concat(formattedMsg),
    links: {
      joinUri: joinUri,
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      teleconference: teleconference
    }
  };
}
function getRcvEventTpl(mainInfo, brand, currentLocale) {
  var enableRcvConnector = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var enableE2EE = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var addNoModifyAlert = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var tplResult = getBaseRcvTpl(mainInfo, brand, currentLocale, enableRcvConnector, enableE2EE, addNoModifyAlert);
  return tplResult.formattedMsg;
}
function getRcvHtmlEventTpl(mainInfo, brand, currentLocale) {
  var enableRcvConnector = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var enableE2EE = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var tplResult = getBaseRcvTpl(mainInfo, brand, currentLocale, enableRcvConnector, enableE2EE);
  var links = [tplResult.links.joinUri, tplResult.links.teleconference, {
    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
    uri: brand.rcvE2EESupportUrl,
    text: (0, _utils.format)(_i18n["default"].getString('e2EESupportLinkText', currentLocale), {
      brandName: brand.name
    })
  }];
  return formatTextToHtml(tplResult.formattedMsg, {
    uselessSentences: ["".concat((0, _utils.format)(_i18n["default"].getString('e2EESupportLinkText', currentLocale), {
      brandName: brand.name
    }), "<br>")],
    links: links
  });
}
function getMeetingId(meetingUri, rcvUriRegExp, rcmUriRegExp) {
  if (meetingUri) {
    var regs = [rcmUriRegExp, rcvUriRegExp];
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

  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
  return null;
}
function stripMeetingLinks(text, rcvUriRegExp, rcmUriRegExp) {
  var result = text;
  [rcmUriRegExp, rcvUriRegExp].forEach(function (reg) {
    while (reg.test(result)) {
      result = result.replace(reg, '');
    }
  });
  return result;
}
function meetingLinkContains(rcvUriRegExp, rcmUriRegExp, text) {
  return {
    hasRCM: rcmUriRegExp.test(text !== null && text !== void 0 ? text : ''),
    hasRCV: rcvUriRegExp.test(text !== null && text !== void 0 ? text : '')
  };
}
//# sourceMappingURL=index.js.map
