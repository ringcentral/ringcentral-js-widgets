"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COVER_US_LIST = exports.COVER_NOT_US_TYPE = exports.COVER_NOT_US_NAME = exports.COVER_NOT_US_LIST = exports.ALL_COVER_INFOS = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _CoverPageAncient = _interopRequireDefault(require("./images/cover-pages/CoverPageAncient.png"));
var _CoverPageBirthday = _interopRequireDefault(require("./images/cover-pages/CoverPageBirthday.png"));
var _CoverPageBlank = _interopRequireDefault(require("./images/cover-pages/CoverPageBlank.png"));
var _CoverPageChineseCN = _interopRequireDefault(require("./images/cover-pages/CoverPageChineseCN.png"));
var _CoverPageChineseHK = _interopRequireDefault(require("./images/cover-pages/CoverPageChineseHK.png"));
var _CoverPageChineseTW = _interopRequireDefault(require("./images/cover-pages/CoverPageChineseTW.png"));
var _CoverPageClasMod = _interopRequireDefault(require("./images/cover-pages/CoverPageClasMod.png"));
var _CoverPageClassic = _interopRequireDefault(require("./images/cover-pages/CoverPageClassic.png"));
var _CoverPageConfidential = _interopRequireDefault(require("./images/cover-pages/CoverPageConfidential.png"));
var _CoverPageContempo = _interopRequireDefault(require("./images/cover-pages/CoverPageContempo.png"));
var _CoverPageElegant = _interopRequireDefault(require("./images/cover-pages/CoverPageElegant.png"));
var _CoverPageEnglishAU = _interopRequireDefault(require("./images/cover-pages/CoverPageEnglishAU.png"));
var _CoverPageEnglishUK = _interopRequireDefault(require("./images/cover-pages/CoverPageEnglishUK.png"));
var _CoverPageEnglishUS = _interopRequireDefault(require("./images/cover-pages/CoverPageEnglishUS.png"));
var _CoverPageExpress = _interopRequireDefault(require("./images/cover-pages/CoverPageExpress.png"));
var _CoverPageFinnish = _interopRequireDefault(require("./images/cover-pages/CoverPageFinnish.png"));
var _CoverPageFormal = _interopRequireDefault(require("./images/cover-pages/CoverPageFormal.png"));
var _CoverPageFrench = _interopRequireDefault(require("./images/cover-pages/CoverPageFrench.png"));
var _CoverPageGermen = _interopRequireDefault(require("./images/cover-pages/CoverPageGermen.png"));
var _CoverPageItalian = _interopRequireDefault(require("./images/cover-pages/CoverPageItalian.png"));
var _CoverPageJapanese = _interopRequireDefault(require("./images/cover-pages/CoverPageJapanese.png"));
var _CoverPageJazzy = _interopRequireDefault(require("./images/cover-pages/CoverPageJazzy.png"));
var _CoverPageKR = _interopRequireDefault(require("./images/cover-pages/CoverPageKR.png"));
var _CoverPageModern = _interopRequireDefault(require("./images/cover-pages/CoverPageModern.png"));
var _CoverPageNL = _interopRequireDefault(require("./images/cover-pages/CoverPageNL.png"));
var _CoverPagePT = _interopRequireDefault(require("./images/cover-pages/CoverPagePT.png"));
var _CoverPagePortuguese = _interopRequireDefault(require("./images/cover-pages/CoverPagePortuguese.png"));
var _CoverPageSpanish = _interopRequireDefault(require("./images/cover-pages/CoverPageSpanish.png"));
var _CoverPageSpanishLATAM = _interopRequireDefault(require("./images/cover-pages/CoverPageSpanishLATAM.png"));
var _CoverPageUrgent = _interopRequireDefault(require("./images/cover-pages/CoverPageUrgent.png"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var COVER_US_TYPE = /*#__PURE__*/function (COVER_US_TYPE) {
  COVER_US_TYPE[COVER_US_TYPE["NONE"] = 0] = "NONE";
  COVER_US_TYPE[COVER_US_TYPE["ANCIENT"] = 1] = "ANCIENT";
  COVER_US_TYPE[COVER_US_TYPE["BIRTHDAY"] = 2] = "BIRTHDAY";
  COVER_US_TYPE[COVER_US_TYPE["BLANK"] = 3] = "BLANK";
  COVER_US_TYPE[COVER_US_TYPE["CLASMOD"] = 4] = "CLASMOD";
  COVER_US_TYPE[COVER_US_TYPE["CLASSIC"] = 5] = "CLASSIC";
  COVER_US_TYPE[COVER_US_TYPE["CONFIDENTIAL"] = 6] = "CONFIDENTIAL";
  COVER_US_TYPE[COVER_US_TYPE["CONTEMPO"] = 7] = "CONTEMPO";
  COVER_US_TYPE[COVER_US_TYPE["ELEGANT"] = 8] = "ELEGANT";
  COVER_US_TYPE[COVER_US_TYPE["EXPRESS"] = 9] = "EXPRESS";
  COVER_US_TYPE[COVER_US_TYPE["FORMAL"] = 10] = "FORMAL";
  COVER_US_TYPE[COVER_US_TYPE["JAZZY"] = 11] = "JAZZY";
  COVER_US_TYPE[COVER_US_TYPE["MODERN"] = 12] = "MODERN";
  COVER_US_TYPE[COVER_US_TYPE["URGENT"] = 13] = "URGENT";
  return COVER_US_TYPE;
}(COVER_US_TYPE || {});
var COVER_US_NAME = /*#__PURE__*/function (COVER_US_NAME) {
  COVER_US_NAME["NONE"] = "None";
  COVER_US_NAME["ANCIENT"] = "Ancient";
  COVER_US_NAME["BIRTHDAY"] = "Birthday";
  COVER_US_NAME["BLANK"] = "Blank";
  COVER_US_NAME["CLASMOD"] = "ClasMod";
  COVER_US_NAME["CLASSIC"] = "Classic";
  COVER_US_NAME["CONFIDENTIAL"] = "Confidential";
  COVER_US_NAME["CONTEMPO"] = "Contempo";
  COVER_US_NAME["ELEGANT"] = "Elegant";
  COVER_US_NAME["EXPRESS"] = "Express";
  COVER_US_NAME["FORMAL"] = "Formal";
  COVER_US_NAME["JAZZY"] = "Jazzy";
  COVER_US_NAME["MODERN"] = "Modern";
  COVER_US_NAME["URGENT"] = "Urgent";
  return COVER_US_NAME;
}(COVER_US_NAME || {});
var COVER_NOT_US_TYPE = exports.COVER_NOT_US_TYPE = /*#__PURE__*/function (COVER_NOT_US_TYPE) {
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["ENGLISH_US"] = 15] = "ENGLISH_US";
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["FRENCH_CA"] = 16] = "FRENCH_CA";
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["ENGLISH_UK"] = 17] = "ENGLISH_UK";
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["FRENCH_FR"] = 18] = "FRENCH_FR";
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["GERMAN"] = 19] = "GERMAN";
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["ITALIAN"] = 20] = "ITALIAN";
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["SPANISH"] = 21] = "SPANISH";
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["SPANISH_LATIN_AMERICA"] = 22] = "SPANISH_LATIN_AMERICA";
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["JAPANESE"] = 23] = "JAPANESE";
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["PORTUGUESE_BRAZIL"] = 24] = "PORTUGUESE_BRAZIL";
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["ENGLISH_AU"] = 25] = "ENGLISH_AU";
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["CHINESE_CN"] = 26] = "CHINESE_CN";
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["CHINESE_TW"] = 27] = "CHINESE_TW";
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["CHINESE_HK"] = 28] = "CHINESE_HK";
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["KOREAN"] = 29] = "KOREAN";
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["DUTCH"] = 30] = "DUTCH";
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["PORTUGUESE"] = 31] = "PORTUGUESE";
  COVER_NOT_US_TYPE[COVER_NOT_US_TYPE["FINNISH"] = 32] = "FINNISH";
  return COVER_NOT_US_TYPE;
}(COVER_NOT_US_TYPE || {});
var COVER_NOT_US_NAME = exports.COVER_NOT_US_NAME = /*#__PURE__*/function (COVER_NOT_US_NAME) {
  COVER_NOT_US_NAME["ENGLISH_US"] = "English (U.S.)";
  // English (United States)
  COVER_NOT_US_NAME["FRENCH_CA"] = "Fran\xE7ais (CA)";
  // French (Canada)
  COVER_NOT_US_NAME["ENGLISH_UK"] = "English (U.K.)";
  // English (United Kingdom)
  COVER_NOT_US_NAME["FRENCH_FR"] = "Fran\xE7ais (FR)";
  // French
  COVER_NOT_US_NAME["GERMAN"] = "Deutsch (DE)";
  // German
  COVER_NOT_US_NAME["ITALIAN"] = "Italiano (IT)";
  // Italian
  COVER_NOT_US_NAME["SPANISH"] = "Espa\xF1ol (ES)";
  // Spanish
  COVER_NOT_US_NAME["SPANISH_LATIN_AMERICA"] = "Espa\xF1ol (LATAM)";
  // Spanish (Latin America)
  COVER_NOT_US_NAME["JAPANESE"] = "\u65E5\u672C\u8A9E";
  COVER_NOT_US_NAME["PORTUGUESE_BRAZIL"] = "Portugu\xEAs (Brasil)";
  // Portuguese (Brazil)
  COVER_NOT_US_NAME["ENGLISH_AU"] = "English (Australia)";
  // English (Australia)
  COVER_NOT_US_NAME["CHINESE_CN"] = "\u7B80\u4F53\u4E2D\u6587";
  // Chinese (Simplified)
  COVER_NOT_US_NAME["CHINESE_TW"] = "\u7E41\u9AD4\u4E2D\u6587";
  // Chinese (Traditional)
  COVER_NOT_US_NAME["CHINESE_HK"] = "\u7E41\u9AD4\u4E2D\u6587(\u9999\u6E2F)";
  // Chinese (HongKong)
  COVER_NOT_US_NAME["DUTCH"] = "Nederlands (Nederland)";
  // Nederlands (Nederland)
  COVER_NOT_US_NAME["KOREAN"] = "\uD55C\uAD6D\uC5B4 (\uB300\uD55C\uBBFC\uAD6D)";
  // 한국어 (대한민국)
  COVER_NOT_US_NAME["PORTUGUESE"] = "Portugu\xEAs (Portugal)";
  // Português (Portugal)
  COVER_NOT_US_NAME["FINNISH"] = "Suomi (Suomi)"; // Finnish
  return COVER_NOT_US_NAME;
}(COVER_NOT_US_NAME || {});
var COVER_NONE = {
  id: COVER_US_TYPE.NONE,
  name: COVER_US_NAME.NONE,
  url: ''
};
var COVER_ANCIENT = {
  id: COVER_US_TYPE.ANCIENT,
  name: COVER_US_NAME.ANCIENT,
  url: _CoverPageAncient["default"]
};
var COVER_BIRTHDAY = {
  id: COVER_US_TYPE.BIRTHDAY,
  name: COVER_US_NAME.BIRTHDAY,
  url: _CoverPageBirthday["default"]
};
var COVER_BLANK = {
  id: COVER_US_TYPE.BLANK,
  name: COVER_US_NAME.BLANK,
  url: _CoverPageBlank["default"]
};
var COVER_CLASMOD = {
  id: COVER_US_TYPE.CLASMOD,
  name: COVER_US_NAME.CLASMOD,
  url: _CoverPageClasMod["default"]
};
var COVER_CLASSIC = {
  id: COVER_US_TYPE.CLASSIC,
  name: COVER_US_NAME.CLASSIC,
  url: _CoverPageClassic["default"]
};
var COVER_CONFIDENTIAL = {
  id: COVER_US_TYPE.CONFIDENTIAL,
  name: COVER_US_NAME.CONFIDENTIAL,
  url: _CoverPageConfidential["default"]
};
var COVER_CONTEMPO = {
  id: COVER_US_TYPE.CONTEMPO,
  name: COVER_US_NAME.CONTEMPO,
  url: _CoverPageContempo["default"]
};
var COVER_ELEGANT = {
  id: COVER_US_TYPE.ELEGANT,
  name: COVER_US_NAME.ELEGANT,
  url: _CoverPageElegant["default"]
};
var COVER_EXPRESS = {
  id: COVER_US_TYPE.EXPRESS,
  name: COVER_US_NAME.EXPRESS,
  url: _CoverPageExpress["default"]
};
var COVER_FORMAL = {
  id: COVER_US_TYPE.FORMAL,
  name: COVER_US_NAME.FORMAL,
  url: _CoverPageFormal["default"]
};
var COVER_JAZZY = {
  id: COVER_US_TYPE.JAZZY,
  name: COVER_US_NAME.JAZZY,
  url: _CoverPageJazzy["default"]
};
var COVER_MODERN = {
  id: COVER_US_TYPE.MODERN,
  name: COVER_US_NAME.MODERN,
  url: _CoverPageModern["default"]
};
var COVER_URGENT = {
  id: COVER_US_TYPE.URGENT,
  name: COVER_US_NAME.URGENT,
  url: _CoverPageUrgent["default"]
};
var COVER_ENGLISH_US = {
  id: COVER_NOT_US_TYPE.ENGLISH_US,
  name: COVER_NOT_US_NAME.ENGLISH_US,
  url: _CoverPageEnglishUS["default"]
};
var COVER_FRENCH_CA = {
  id: COVER_NOT_US_TYPE.FRENCH_CA,
  name: COVER_NOT_US_NAME.FRENCH_CA,
  url: _CoverPageFrench["default"]
};
var COVER_ENGLISH_UK = {
  id: COVER_NOT_US_TYPE.ENGLISH_UK,
  name: COVER_NOT_US_NAME.ENGLISH_UK,
  url: _CoverPageEnglishUK["default"]
};
var COVER_FRENCH_FR = {
  id: COVER_NOT_US_TYPE.FRENCH_FR,
  name: COVER_NOT_US_NAME.FRENCH_FR,
  url: _CoverPageEnglishUK["default"]
};
var COVER_GERMAN = {
  id: COVER_NOT_US_TYPE.GERMAN,
  name: COVER_NOT_US_NAME.GERMAN,
  url: _CoverPageGermen["default"]
};
var COVER_ITALIAN = {
  id: COVER_NOT_US_TYPE.ITALIAN,
  name: COVER_NOT_US_NAME.ITALIAN,
  url: _CoverPageItalian["default"]
};
var COVER_SPANISH = {
  id: COVER_NOT_US_TYPE.SPANISH,
  name: COVER_NOT_US_NAME.SPANISH,
  url: _CoverPageSpanish["default"]
};
var COVER_SPANISH_LATIN_AMERICA = {
  id: COVER_NOT_US_TYPE.SPANISH_LATIN_AMERICA,
  name: COVER_NOT_US_NAME.SPANISH_LATIN_AMERICA,
  url: _CoverPageSpanishLATAM["default"]
};
var COVER_JAPANESE = {
  id: COVER_NOT_US_TYPE.JAPANESE,
  name: COVER_NOT_US_NAME.JAPANESE,
  url: _CoverPageJapanese["default"]
};
var COVER_PORTUGUESE_BRAZIL = {
  id: COVER_NOT_US_TYPE.PORTUGUESE_BRAZIL,
  name: COVER_NOT_US_NAME.PORTUGUESE_BRAZIL,
  url: _CoverPagePortuguese["default"]
};
var COVER_ENGLISH_AU = {
  id: COVER_NOT_US_TYPE.ENGLISH_AU,
  name: COVER_NOT_US_NAME.ENGLISH_AU,
  url: _CoverPageEnglishAU["default"]
};
var COVER_CHINESE_CN = {
  id: COVER_NOT_US_TYPE.CHINESE_CN,
  name: COVER_NOT_US_NAME.CHINESE_CN,
  url: _CoverPageChineseCN["default"]
};
var COVER_CHINESE_TW = {
  id: COVER_NOT_US_TYPE.CHINESE_TW,
  name: COVER_NOT_US_NAME.CHINESE_TW,
  url: _CoverPageChineseTW["default"]
};
var COVER_CHINESE_HK = {
  id: COVER_NOT_US_TYPE.CHINESE_HK,
  name: COVER_NOT_US_NAME.CHINESE_HK,
  url: _CoverPageChineseHK["default"]
};
var COVER_DUTCH = {
  id: COVER_NOT_US_TYPE.DUTCH,
  name: COVER_NOT_US_NAME.DUTCH,
  url: _CoverPageNL["default"]
};
var COVER_KOREAN = {
  id: COVER_NOT_US_TYPE.KOREAN,
  name: COVER_NOT_US_NAME.KOREAN,
  url: _CoverPageKR["default"]
};
var COVER_PORTUGUESE = {
  id: COVER_NOT_US_TYPE.PORTUGUESE,
  name: COVER_NOT_US_NAME.PORTUGUESE,
  url: _CoverPagePT["default"]
};
var COVER_FINNISH = {
  id: COVER_NOT_US_TYPE.FINNISH,
  name: COVER_NOT_US_NAME.FINNISH,
  url: _CoverPageFinnish["default"]
};
var COVER_US_LIST = exports.COVER_US_LIST = [COVER_NONE, COVER_ANCIENT, COVER_BIRTHDAY, COVER_BLANK, COVER_CLASMOD, COVER_CLASSIC, COVER_CONFIDENTIAL, COVER_CONTEMPO, COVER_ELEGANT, COVER_EXPRESS, COVER_FORMAL, COVER_JAZZY, COVER_MODERN, COVER_URGENT];
var COVER_NOT_US_LIST = exports.COVER_NOT_US_LIST = [COVER_NONE, COVER_ENGLISH_UK, COVER_ENGLISH_US, COVER_ENGLISH_AU, COVER_FRENCH_CA, COVER_FRENCH_FR, COVER_GERMAN, COVER_ITALIAN, COVER_SPANISH, COVER_SPANISH_LATIN_AMERICA, COVER_JAPANESE, COVER_PORTUGUESE_BRAZIL, COVER_CHINESE_CN, COVER_CHINESE_TW, COVER_CHINESE_HK, COVER_KOREAN, COVER_DUTCH, COVER_PORTUGUESE, COVER_FINNISH];
var ALL_COVER_INFOS = exports.ALL_COVER_INFOS = new Map([].concat(COVER_US_LIST, COVER_NOT_US_LIST).map(function (v) {
  return [v.id, v];
}));
//# sourceMappingURL=constants.js.map
