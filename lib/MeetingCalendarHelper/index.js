"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripMeetingLinks = stripMeetingLinks;
exports.meetingLinkContains = meetingLinkContains;
exports.replaceTextLinksToAnchors = replaceTextLinksToAnchors;
exports.formatTextToHtml = formatTextToHtml;
exports.getRcmEventTpl = getRcmEventTpl;
exports.getRcmHtmlEventTpl = getRcmHtmlEventTpl;
exports.getRcvEventTpl = getRcvEventTpl;
exports.getRcvHtmlEventTpl = getRcvHtmlEventTpl;
exports.getMeetingId = getMeetingId;
Object.defineProperty(exports, "formatMeetingId", {
  enumerable: true,
  get: function get() {
    return _formatMeetingId.formatMeetingId;
  }
});
exports.htmlTabIndentation = exports.htmlIndentation = exports.htmlNewLine = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.string.repeat");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

var _formatMessage = _interopRequireDefault(require("format-message"));

var _formatMeetingId = require("./formatMeetingId");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

      if (uri && text) {
        htmlContent = htmlContent.replace(uri, "<a target=\"_blank\" href=\"".concat(uri, "\">").concat(text, "</a>"));
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
      brandName: _i18n["default"].getString(brand.name),
      joinUri: joinUri,
      passwordTpl: passwordTpl,
      mobileDialingNumberTpl: mobileDialingNumberTpl,
      phoneDialingNumberTpl: phoneDialingNumberTpl,
      meetingId: (0, _formatMeetingId.formatMeetingId)(meetingId),
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
      dialInNumber = _ref2.dialInNumber,
      invitationInfo = _ref2.invitationInfo;
  var enableRcvConnector = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var enableE2EE = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var joinUri = meeting.joinUri;
  var isATT = brand.code === 'att';
  var teleconference = brand.rcvTeleconference;

  if (invitationInfo === null || invitationInfo === void 0 ? void 0 : invitationInfo.body) {
    return {
      formattedMsg: invitationInfo.body,
      links: {
        joinUri: joinUri,
        teleconference: teleconference
      }
    };
  }

  var accountName = extensionInfo.name;
  var meetingPassword = meeting.meetingPassword,
      meetingPasswordPSTN = meeting.meetingPasswordPSTN,
      isMeetingSecret = meeting.isMeetingSecret,
      e2ee = meeting.e2ee;
  var productName;
  var meetingContent = [];
  var showMeetingPasswordPSTN = !!(isMeetingSecret && meetingPasswordPSTN);

  if (enableE2EE && e2ee) {
    meetingContent.push(_i18n["default"].getString('rcvE2EEInviteMeetingContent', currentLocale));
    return {
      formattedMsg: (0, _formatMessage["default"])(meetingContent.join(''), {
        accountName: accountName,
        brandName: _i18n["default"].getString(brand.name),
        rcvProductName: _i18n["default"].getString(brand.rcvProductName),
        joinUri: joinUri,
        e2EESupportLinkText: (0, _formatMessage["default"])(_i18n["default"].getString('e2EESupportLinkText', currentLocale), {
          brandName: _i18n["default"].getString(brand.name)
        }),
        rcvE2EESupportUrl: brand.rcvE2EESupportUrl
      }),
      links: {
        joinUri: joinUri,
        teleconference: teleconference
      }
    };
  }

  if (brand.code === 'rc') {
    productName = 'RingCentral Video';
    meetingContent.push(_i18n["default"].getString('rcvRCBrandInviteMeetingContent', currentLocale));
  } else if (brand.code === 'telus') {
    meetingContent.push(_i18n["default"].getString('rcvTelusInviteMeetingContent', currentLocale));
  } else {
    productName = brand.name;
    meetingContent.push(_i18n["default"].getString('rcvInviteMeetingContent', currentLocale));
  }

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
  var formattedMsg = (0, _formatMessage["default"])(meetingContent.join(''), {
    accountName: accountName,
    brandName: isATT ? "AT&T ".concat(brand.name) : _i18n["default"].getString(brand.name),
    joinUri: joinUri,
    passwordTpl: passwordTpl,
    meetingPasswordPSTN: meetingPasswordPSTN,
    meetingId: shortId,
    pinNumber: (0, _formatMeetingId.formatMeetingId)(shortId),
    teleconference: teleconference,
    productName: productName,
    dialNumber: formatDialInNumber(dialInNumber),
    smartphones: formatSmartphones(dialInNumber, shortId, showMeetingPasswordPSTN, meetingPasswordPSTN)
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
  var enableRcvConnector = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var enableE2EE = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var tplResult = getBaseRcvTpl(mainInfo, brand, currentLocale, enableRcvConnector, enableE2EE);
  return tplResult.formattedMsg;
}

function getRcvHtmlEventTpl(mainInfo, brand, currentLocale) {
  var enableRcvConnector = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var enableE2EE = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var tplResult = getBaseRcvTpl(mainInfo, brand, currentLocale, enableRcvConnector, enableE2EE);
  var links = [tplResult.links.joinUri, tplResult.links.teleconference, {
    uri: brand.rcvE2EESupportUrl,
    text: (0, _formatMessage["default"])(_i18n["default"].getString('e2EESupportLinkText', currentLocale), {
      brandName: _i18n["default"].getString(brand.name)
    })
  }];
  return formatTextToHtml(tplResult.formattedMsg, {
    uselessSentences: ["".concat((0, _formatMessage["default"])(_i18n["default"].getString('e2EESupportLinkText', currentLocale), {
      brandName: _i18n["default"].getString(brand.name)
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
