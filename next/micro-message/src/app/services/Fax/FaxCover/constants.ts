import CoverPageAncient from './images/cover-pages/CoverPageAncient.png';
import CoverPageBirthday from './images/cover-pages/CoverPageBirthday.png';
import CoverPageBlank from './images/cover-pages/CoverPageBlank.png';
import CoverPageChineseCN from './images/cover-pages/CoverPageChineseCN.png';
import CoverPageChineseHK from './images/cover-pages/CoverPageChineseHK.png';
import CoverPageChineseTW from './images/cover-pages/CoverPageChineseTW.png';
import CoverPageClasMod from './images/cover-pages/CoverPageClasMod.png';
import CoverPageClassic from './images/cover-pages/CoverPageClassic.png';
import CoverPageConfidential from './images/cover-pages/CoverPageConfidential.png';
import CoverPageContempo from './images/cover-pages/CoverPageContempo.png';
import CoverPageElegant from './images/cover-pages/CoverPageElegant.png';
import CoverPageEnglishAU from './images/cover-pages/CoverPageEnglishAU.png';
import CoverPageEnglishUK from './images/cover-pages/CoverPageEnglishUK.png';
import CoverPageEnglishUS from './images/cover-pages/CoverPageEnglishUS.png';
import CoverPageExpress from './images/cover-pages/CoverPageExpress.png';
import CoverPageFinnish from './images/cover-pages/CoverPageFinnish.png';
import CoverPageFormal from './images/cover-pages/CoverPageFormal.png';
import CoverPageFrench from './images/cover-pages/CoverPageFrench.png';
import CoverPageGerman from './images/cover-pages/CoverPageGermen.png';
import CoverPageItalian from './images/cover-pages/CoverPageItalian.png';
import CoverPageJapanese from './images/cover-pages/CoverPageJapanese.png';
import CoverPageJazzy from './images/cover-pages/CoverPageJazzy.png';
import CoverPageKR from './images/cover-pages/CoverPageKR.png';
import CoverPageModern from './images/cover-pages/CoverPageModern.png';
import CoverPageNL from './images/cover-pages/CoverPageNL.png';
import CoverPagePT from './images/cover-pages/CoverPagePT.png';
import CoverPagePortuguese from './images/cover-pages/CoverPagePortuguese.png';
import CoverPageSpanish from './images/cover-pages/CoverPageSpanish.png';
import CoverPageSpanishLATAM from './images/cover-pages/CoverPageSpanishLATAM.png';
import CoverPageUrgent from './images/cover-pages/CoverPageUrgent.png';
import type { CoverInfo } from './interfaces';

enum COVER_US_TYPE {
  NONE = 0,
  ANCIENT,
  BIRTHDAY,
  BLANK,
  CLASMOD,
  CLASSIC,
  CONFIDENTIAL,
  CONTEMPO,
  ELEGANT,
  EXPRESS,
  FORMAL,
  JAZZY,
  MODERN,
  URGENT,
}

enum COVER_US_NAME {
  NONE = 'None',
  ANCIENT = 'Ancient',
  BIRTHDAY = 'Birthday',
  BLANK = 'Blank',
  CLASMOD = 'ClasMod',
  CLASSIC = 'Classic',
  CONFIDENTIAL = 'Confidential',
  CONTEMPO = 'Contempo',
  ELEGANT = 'Elegant',
  EXPRESS = 'Express',
  FORMAL = 'Formal',
  JAZZY = 'Jazzy',
  MODERN = 'Modern',
  URGENT = 'Urgent',
}

enum COVER_NOT_US_TYPE {
  ENGLISH_US = 15,
  FRENCH_CA,
  ENGLISH_UK,
  FRENCH_FR,
  GERMAN,
  ITALIAN,
  SPANISH,
  SPANISH_LATIN_AMERICA,
  JAPANESE,
  PORTUGUESE_BRAZIL,
  ENGLISH_AU,
  CHINESE_CN,
  CHINESE_TW,
  CHINESE_HK,
  KOREAN,
  DUTCH,
  PORTUGUESE,
  FINNISH,
}

enum COVER_NOT_US_NAME {
  ENGLISH_US = 'English (U.S.)', // English (United States)
  FRENCH_CA = 'Français (CA)', // French (Canada)
  ENGLISH_UK = 'English (U.K.)', // English (United Kingdom)
  FRENCH_FR = 'Français (FR)', // French
  GERMAN = 'Deutsch (DE)', // German
  ITALIAN = 'Italiano (IT)', // Italian
  SPANISH = 'Español (ES)', // Spanish
  SPANISH_LATIN_AMERICA = 'Español (LATAM)', // Spanish (Latin America)
  JAPANESE = '日本語',
  PORTUGUESE_BRAZIL = 'Português (Brasil)', // Portuguese (Brazil)
  ENGLISH_AU = 'English (Australia)', // English (Australia)
  CHINESE_CN = '简体中文', // Chinese (Simplified)
  CHINESE_TW = '繁體中文', // Chinese (Traditional)
  CHINESE_HK = '繁體中文(香港)', // Chinese (HongKong)
  DUTCH = 'Nederlands (Nederland)', // Nederlands (Nederland)
  KOREAN = '한국어 (대한민국)', // 한국어 (대한민국)
  PORTUGUESE = 'Português (Portugal)', // Português (Portugal)
  FINNISH = 'Suomi (Suomi)', // Finnish
}

const COVER_NONE = {
  id: COVER_US_TYPE.NONE,
  name: COVER_US_NAME.NONE,
  url: '',
};
const COVER_ANCIENT = {
  id: COVER_US_TYPE.ANCIENT,
  name: COVER_US_NAME.ANCIENT,
  url: CoverPageAncient,
};
const COVER_BIRTHDAY = {
  id: COVER_US_TYPE.BIRTHDAY,
  name: COVER_US_NAME.BIRTHDAY,
  url: CoverPageBirthday,
};
const COVER_BLANK = {
  id: COVER_US_TYPE.BLANK,
  name: COVER_US_NAME.BLANK,
  url: CoverPageBlank,
};
const COVER_CLASMOD = {
  id: COVER_US_TYPE.CLASMOD,
  name: COVER_US_NAME.CLASMOD,
  url: CoverPageClasMod,
};
const COVER_CLASSIC = {
  id: COVER_US_TYPE.CLASSIC,
  name: COVER_US_NAME.CLASSIC,
  url: CoverPageClassic,
};
const COVER_CONFIDENTIAL = {
  id: COVER_US_TYPE.CONFIDENTIAL,
  name: COVER_US_NAME.CONFIDENTIAL,
  url: CoverPageConfidential,
};
const COVER_CONTEMPO = {
  id: COVER_US_TYPE.CONTEMPO,
  name: COVER_US_NAME.CONTEMPO,
  url: CoverPageContempo,
};
const COVER_ELEGANT = {
  id: COVER_US_TYPE.ELEGANT,
  name: COVER_US_NAME.ELEGANT,
  url: CoverPageElegant,
};
const COVER_EXPRESS = {
  id: COVER_US_TYPE.EXPRESS,
  name: COVER_US_NAME.EXPRESS,
  url: CoverPageExpress,
};
const COVER_FORMAL = {
  id: COVER_US_TYPE.FORMAL,
  name: COVER_US_NAME.FORMAL,
  url: CoverPageFormal,
};
const COVER_JAZZY = {
  id: COVER_US_TYPE.JAZZY,
  name: COVER_US_NAME.JAZZY,
  url: CoverPageJazzy,
};
const COVER_MODERN = {
  id: COVER_US_TYPE.MODERN,
  name: COVER_US_NAME.MODERN,
  url: CoverPageModern,
};
const COVER_URGENT = {
  id: COVER_US_TYPE.URGENT,
  name: COVER_US_NAME.URGENT,
  url: CoverPageUrgent,
};

const COVER_ENGLISH_US = {
  id: COVER_NOT_US_TYPE.ENGLISH_US,
  name: COVER_NOT_US_NAME.ENGLISH_US,
  url: CoverPageEnglishUS,
};
const COVER_FRENCH_CA = {
  id: COVER_NOT_US_TYPE.FRENCH_CA,
  name: COVER_NOT_US_NAME.FRENCH_CA,
  url: CoverPageFrench,
};
const COVER_ENGLISH_UK = {
  id: COVER_NOT_US_TYPE.ENGLISH_UK,
  name: COVER_NOT_US_NAME.ENGLISH_UK,
  url: CoverPageEnglishUK,
};
const COVER_FRENCH_FR = {
  id: COVER_NOT_US_TYPE.FRENCH_FR,
  name: COVER_NOT_US_NAME.FRENCH_FR,
  url: CoverPageEnglishUK,
};
const COVER_GERMAN = {
  id: COVER_NOT_US_TYPE.GERMAN,
  name: COVER_NOT_US_NAME.GERMAN,
  url: CoverPageGerman,
};
const COVER_ITALIAN = {
  id: COVER_NOT_US_TYPE.ITALIAN,
  name: COVER_NOT_US_NAME.ITALIAN,
  url: CoverPageItalian,
};
const COVER_SPANISH = {
  id: COVER_NOT_US_TYPE.SPANISH,
  name: COVER_NOT_US_NAME.SPANISH,
  url: CoverPageSpanish,
};
const COVER_SPANISH_LATIN_AMERICA = {
  id: COVER_NOT_US_TYPE.SPANISH_LATIN_AMERICA,
  name: COVER_NOT_US_NAME.SPANISH_LATIN_AMERICA,
  url: CoverPageSpanishLATAM,
};
const COVER_JAPANESE = {
  id: COVER_NOT_US_TYPE.JAPANESE,
  name: COVER_NOT_US_NAME.JAPANESE,
  url: CoverPageJapanese,
};
const COVER_PORTUGUESE_BRAZIL = {
  id: COVER_NOT_US_TYPE.PORTUGUESE_BRAZIL,
  name: COVER_NOT_US_NAME.PORTUGUESE_BRAZIL,
  url: CoverPagePortuguese,
};
const COVER_ENGLISH_AU = {
  id: COVER_NOT_US_TYPE.ENGLISH_AU,
  name: COVER_NOT_US_NAME.ENGLISH_AU,
  url: CoverPageEnglishAU,
};
const COVER_CHINESE_CN = {
  id: COVER_NOT_US_TYPE.CHINESE_CN,
  name: COVER_NOT_US_NAME.CHINESE_CN,
  url: CoverPageChineseCN,
};
const COVER_CHINESE_TW = {
  id: COVER_NOT_US_TYPE.CHINESE_TW,
  name: COVER_NOT_US_NAME.CHINESE_TW,
  url: CoverPageChineseTW,
};
const COVER_CHINESE_HK = {
  id: COVER_NOT_US_TYPE.CHINESE_HK,
  name: COVER_NOT_US_NAME.CHINESE_HK,
  url: CoverPageChineseHK,
};
const COVER_DUTCH = {
  id: COVER_NOT_US_TYPE.DUTCH,
  name: COVER_NOT_US_NAME.DUTCH,
  url: CoverPageNL,
};
const COVER_KOREAN = {
  id: COVER_NOT_US_TYPE.KOREAN,
  name: COVER_NOT_US_NAME.KOREAN,
  url: CoverPageKR,
};
const COVER_PORTUGUESE = {
  id: COVER_NOT_US_TYPE.PORTUGUESE,
  name: COVER_NOT_US_NAME.PORTUGUESE,
  url: CoverPagePT,
};
const COVER_FINNISH = {
  id: COVER_NOT_US_TYPE.FINNISH,
  name: COVER_NOT_US_NAME.FINNISH,
  url: CoverPageFinnish,
};

const COVER_US_LIST = [
  COVER_NONE,
  COVER_ANCIENT,
  COVER_BIRTHDAY,
  COVER_BLANK,
  COVER_CLASMOD,
  COVER_CLASSIC,
  COVER_CONFIDENTIAL,
  COVER_CONTEMPO,
  COVER_ELEGANT,
  COVER_EXPRESS,
  COVER_FORMAL,
  COVER_JAZZY,
  COVER_MODERN,
  COVER_URGENT,
];

const COVER_NOT_US_LIST = [
  COVER_NONE,
  COVER_ENGLISH_UK,
  COVER_ENGLISH_US,
  COVER_ENGLISH_AU,
  COVER_FRENCH_CA,
  COVER_FRENCH_FR,
  COVER_GERMAN,
  COVER_ITALIAN,
  COVER_SPANISH,
  COVER_SPANISH_LATIN_AMERICA,
  COVER_JAPANESE,
  COVER_PORTUGUESE_BRAZIL,
  COVER_CHINESE_CN,
  COVER_CHINESE_TW,
  COVER_CHINESE_HK,
  COVER_KOREAN,
  COVER_DUTCH,
  COVER_PORTUGUESE,
  COVER_FINNISH,
];

const ALL_COVER_INFOS = new Map<number, CoverInfo>(
  [...COVER_US_LIST, ...COVER_NOT_US_LIST].map(
    (v) => [v.id, v] as [number, CoverInfo],
  ),
);

export {
  ALL_COVER_INFOS,
  COVER_US_LIST,
  COVER_NOT_US_LIST,
  COVER_NOT_US_TYPE,
  COVER_NOT_US_NAME,
};
