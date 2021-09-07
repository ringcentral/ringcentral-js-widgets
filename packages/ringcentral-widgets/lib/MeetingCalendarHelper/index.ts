import formatMessage from 'format-message';
import { RcVDialInNumberObj } from '@ringcentral-integration/commons/interfaces/Rcv.model';

import { formatMeetingId } from './formatMeetingId';
import i18n from './i18n';
import {
  CommonBrand,
  FormatToHtmlOptions,
  ParcelledLink,
  RcmMainParams,
  RcvMainParams,
  TplResult,
} from './index.interface';

function formatSmartphones(
  dialInNumber: string | RcVDialInNumberObj[],
  pinNumber: string,
  showMeetingPasswordPSTN: boolean,
  meetingPasswordPSTN: string,
) {
  if (!dialInNumber || dialInNumber.length === 0) {
    return '';
  }

  if (typeof dialInNumber === 'string') {
    return `${dialInNumber},,${pinNumber}#${
      showMeetingPasswordPSTN ? `,,${meetingPasswordPSTN}#` : ''
    }`;
  }

  return dialInNumber
    .map((obj) => {
      const passwordField = showMeetingPasswordPSTN
        ? `,,${meetingPasswordPSTN}#`
        : '';

      const locationField =
        obj?.country?.name && obj.location
          ? `${obj.country.name} (${obj.location})`
          : obj?.country?.name || '';

      return `${obj.phoneNumber},,${pinNumber}#${passwordField} ${locationField}`;
    })
    .join('\n\t');
}

function formatDialInNumber(dialInNumber: string | RcVDialInNumberObj[]) {
  if (!dialInNumber || dialInNumber.length === 0) {
    return '';
  }

  if (typeof dialInNumber === 'string') {
    return dialInNumber;
  }

  return dialInNumber
    .map((obj) => {
      const locationField =
        obj?.country?.name && obj.location
          ? `${obj.country.name} (${obj.location})`
          : obj?.country?.name || '';

      return `${obj.phoneNumber} ${locationField}`;
    })
    .join('\n\t');
}

function getPasswordTpl(
  meetingPassword: string,
  currentLocale: string,
): string {
  const passwordLiteral = i18n.getString('password', currentLocale);
  return meetingPassword ? `${passwordLiteral}: ${meetingPassword}` : '';
}

/**
 * replace all text link into anchor link
 * Should match: http://www.example.com
 * Should not match: <a href="http://www.example.com">http://www.example.com </a>
 * Then replace it into <a href="http://www.example.com">http://www.example.com </a>
 * @param input
 */
function replaceTextLinksToAnchors(input: string): string {
  /**
   * [^<>\]]+ means should match any characters except < or > or ]
   * (?!\s*<\/a>) means url should not be followed by either "</a>" or "     </a>"
   * (?!"[^>]*>) means url should not followed by ">
   * further explanation: origin string: <a href="http://www.example.com">http://www.example.com </a> should not match
   * (?=[\s!,?\]]|$) means url can be followed by punctuations or whitespace or nothing
   */
  // https://stackoverflow.com/questions/19060460/url-replace-with-anchor-not-replacing-existing-anchors

  const pattern: RegExp = /(?:(?:ht|f)tps?:\/\/|www)[^<>\]]+(?!\s*<\/a>)(?!"[^>]*>)(?=[\s!,?\]<]|$)/gim;

  return input.replace(pattern, ($0: string): string => {
    return `<a target="_blank" href="${$0}">${$0}</a>`;
  });
}

const htmlNewLine: string = '<br>';
const htmlIndentation: string = '&nbsp;';
const htmlTabIndentation: string = htmlIndentation.repeat(4);

function formatTextToHtml(
  plantText: string,
  options: FormatToHtmlOptions = {},
): string {
  const {
    links = [],
    uselessSentences = [],
    searchLinks = false,
    newLine = htmlNewLine,
    indentation = htmlIndentation,
    tabIndentation = htmlTabIndentation,
  } = options;

  let htmlContent = plantText
    .replace(/\r\n|\n|\r/g, '\n') // formalize newline
    .split('\n') // split with formalized newline
    .map((line) => {
      return line
        .replace(/\t/g, tabIndentation) // replace all Tab with 4 indentations
        .replace(/^\s*/, ($0) => indentation.repeat($0.length)); // replace leading white spaces with indentations
    })
    .join(newLine);

  uselessSentences.forEach((sentence) => {
    if (sentence) {
      htmlContent = htmlContent.replace(sentence, '');
    }
  });

  links.forEach((link) => {
    if (link) {
      const isPlantLink = typeof link === 'string';
      const uri = isPlantLink ? (link as string) : (link as ParcelledLink).uri;
      const text = isPlantLink
        ? (link as string)
        : (link as ParcelledLink).text;

      if (uri && text) {
        htmlContent = htmlContent.replace(
          uri,
          `<a target="_blank" href="${uri}">${text}</a>`,
        );
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
function getRcvPstnPasswordTpl(
  meetingPasswordPSTN: string,
  currentLocale: string,
): string {
  const passwordPstnLiteral = i18n.getString('passwordPstn', currentLocale);
  return `${passwordPstnLiteral} ${meetingPasswordPSTN}`;
}

function getBaseRcmTpl(
  { meeting, serviceInfo, extensionInfo, invitationInfo }: RcmMainParams,
  brand: CommonBrand,
  currentLocale: string,
): TplResult {
  const accountName = extensionInfo.name;
  const meetingId = meeting.id;
  const joinUri = meeting.links.joinUri;
  const password = meeting.password;

  const mobileDialingNumberTpl = serviceInfo.mobileDialingNumberTpl;
  const phoneDialingNumberTpl = serviceInfo.phoneDialingNumberTpl;
  const passwordTpl = getPasswordTpl(password, currentLocale);
  const teleconference = brand.brandConfig.teleconference;

  let formattedMsg = invitationInfo?.invitation;
  if (!formattedMsg) {
    formattedMsg = formatMessage(
      i18n.getString('inviteMeetingContent', currentLocale),
      {
        accountName,
        brandName: i18n.getString(brand.name),
        joinUri,
        passwordTpl,
        mobileDialingNumberTpl,
        phoneDialingNumberTpl,
        meetingId: formatMeetingId(meetingId),
        teleconference,
      },
    );
  }

  return {
    formattedMsg,
    links: {
      joinUri,
      teleconference,
    },
  };
}

function getRcmEventTpl(
  mainInfo: RcmMainParams,
  brand: CommonBrand,
  currentLocale: string,
): string {
  const tplResult = getBaseRcmTpl(mainInfo, brand, currentLocale);
  return tplResult.formattedMsg;
}

function getRcmHtmlEventTpl(
  mainInfo: RcmMainParams,
  brand: CommonBrand,
  currentLocale: string,
): string {
  const tplResult = getBaseRcmTpl(mainInfo, brand, currentLocale);
  return formatTextToHtml(tplResult.formattedMsg, {
    links: [tplResult.links.joinUri, tplResult.links.teleconference],
  });
}

function getBaseRcvTpl(
  { meeting, extensionInfo, dialInNumber, invitationInfo }: RcvMainParams,
  brand: CommonBrand,
  currentLocale: string,
  enableRcvConnector = false,
  enableE2EE = false,
): TplResult {
  const joinUri = meeting.joinUri;
  const isATT = brand.code === 'att';
  const teleconference = brand.rcvTeleconference;

  if (invitationInfo?.body) {
    return {
      formattedMsg: invitationInfo.body,
      links: {
        joinUri,
        teleconference,
      },
    };
  }

  const accountName = extensionInfo.name;
  const {
    meetingPassword,
    meetingPasswordPSTN,
    isMeetingSecret,
    e2ee,
  } = meeting;
  let productName;
  const meetingContent: Array<string> = [];
  const showMeetingPasswordPSTN = !!(isMeetingSecret && meetingPasswordPSTN);

  if (enableE2EE && e2ee) {
    meetingContent.push(
      i18n.getString('rcvE2EEInviteMeetingContent', currentLocale),
    );
    return {
      formattedMsg: formatMessage(meetingContent.join(''), {
        accountName,
        brandName: i18n.getString(brand.name),
        rcvProductName: i18n.getString(brand.rcvProductName),
        joinUri,
        e2EESupportLinkText: formatMessage(
          i18n.getString('e2EESupportLinkText', currentLocale),
          {
            brandName: i18n.getString(brand.name),
          },
        ),
        rcvE2EESupportUrl: brand.rcvE2EESupportUrl,
      }),
      links: {
        joinUri,
        teleconference,
      },
    };
  }

  if (brand.code === 'rc') {
    productName = 'RingCentral Video';
    meetingContent.push(
      i18n.getString('rcvRCBrandInviteMeetingContent', currentLocale),
    );
  } else if (brand.code === 'telus') {
    meetingContent.push(
      i18n.getString('rcvTelusInviteMeetingContent', currentLocale),
    );
  } else {
    productName = brand.name;
    meetingContent.push(
      i18n.getString('rcvInviteMeetingContent', currentLocale),
    );
  }

  if (dialInNumber && dialInNumber.length > 0) {
    /* TODO: after get the translation, remove rcvInviteMeetingContentDial
     * rcvInviteMeetingContentCountryDial is the correct one
     */
    meetingContent.push(
      i18n.getString(
        typeof dialInNumber === 'string'
          ? 'rcvInviteMeetingContentDial'
          : 'rcvInviteMeetingContentCountryDial',
        currentLocale,
      ),
    );
    if (showMeetingPasswordPSTN) {
      meetingContent.push(
        getRcvPstnPasswordTpl(meetingPasswordPSTN, currentLocale),
      );
    }
  }
  meetingContent.push(`${i18n.getString('rcvTeleconference', currentLocale)}`);
  const passwordTpl = isMeetingSecret
    ? getPasswordTpl(meetingPassword, currentLocale)
    : '';

  if (enableRcvConnector) {
    meetingContent.push(`${i18n.getString('rcvSipHeader', currentLocale)}`);
    const rcvSipContent = isMeetingSecret
      ? 'rcvSipContentWithPwd'
      : 'rcvSipContentNoPwd';
    meetingContent.push(`${i18n.getString(rcvSipContent, currentLocale)}`);
  }

  const shortId = meeting.shortId;
  const meetingId = meeting.id;

  const formattedMsg = formatMessage(meetingContent.join(''), {
    accountName,
    brandName: isATT ? `AT&T ${brand.name}` : i18n.getString(brand.name),
    joinUri,
    passwordTpl,
    meetingPasswordPSTN,
    meetingId,
    pinNumber: formatMeetingId(meeting.shortId),
    teleconference,
    productName,
    dialNumber: formatDialInNumber(dialInNumber),
    smartphones: formatSmartphones(
      dialInNumber,
      shortId,
      showMeetingPasswordPSTN,
      meetingPasswordPSTN,
    ),
  });

  return {
    formattedMsg,
    links: {
      joinUri,
      teleconference,
    },
  };
}

function getRcvEventTpl(
  mainInfo: RcvMainParams,
  brand: CommonBrand,
  currentLocale: string,
  enableRcvConnector = false,
  enableE2EE = false,
): string {
  const tplResult = getBaseRcvTpl(
    mainInfo,
    brand,
    currentLocale,
    enableRcvConnector,
    enableE2EE,
  );
  return tplResult.formattedMsg;
}

function getRcvHtmlEventTpl(
  mainInfo: RcvMainParams,
  brand: CommonBrand,
  currentLocale: string,
  enableRcvConnector = false,
  enableE2EE = false,
): string {
  const tplResult = getBaseRcvTpl(
    mainInfo,
    brand,
    currentLocale,
    enableRcvConnector,
    enableE2EE,
  );

  const links: [string, string, ParcelledLink] = [
    tplResult.links.joinUri,
    tplResult.links.teleconference,
    {
      uri: brand.rcvE2EESupportUrl,
      text: formatMessage(
        i18n.getString('e2EESupportLinkText', currentLocale),
        {
          brandName: i18n.getString(brand.name),
        },
      ),
    },
  ];

  return formatTextToHtml(tplResult.formattedMsg, {
    uselessSentences: [
      `${formatMessage(i18n.getString('e2EESupportLinkText', currentLocale), {
        brandName: i18n.getString(brand.name),
      })}<br>`,
    ],
    links,
  });
}

function getMeetingId(
  meetingUri: string,
  rcvUriRegExp: RegExp,
  rcmUriRegExp: RegExp,
): string {
  if (meetingUri) {
    const regs = [rcmUriRegExp, rcvUriRegExp];
    for (let i = 0; i < regs.length; i += 1) {
      const matches = regs[i].exec(meetingUri);
      if (matches && matches.length > 0) {
        const match0 = matches[0];
        const link = (match0.indexOf('?') > -1
          ? matches[0].substring(0, matches[0].indexOf('?'))
          : match0
        ).split('/');

        const id = link[link.length - 1];
        return id;
      }
    }
  }

  return null;
}

function stripMeetingLinks(
  text: string,
  rcvUriRegExp: RegExp,
  rcmUriRegExp: RegExp,
): string {
  let result = text;
  [rcmUriRegExp, rcvUriRegExp].forEach((reg) => {
    while (reg.test(result)) {
      result = result.replace(reg, '');
    }
  });
  return result;
}

function meetingLinkContains(
  rcvUriRegExp: RegExp,
  rcmUriRegExp: RegExp,
  text?: string,
): { hasRCM: boolean; hasRCV: boolean } {
  return {
    hasRCM: rcmUriRegExp.test(text ?? ''),
    hasRCV: rcvUriRegExp.test(text ?? ''),
  };
}

export {
  formatMeetingId,
  stripMeetingLinks,
  meetingLinkContains,
  replaceTextLinksToAnchors,
  htmlNewLine,
  htmlIndentation,
  htmlTabIndentation,
  formatTextToHtml,
  getRcmEventTpl,
  getRcmHtmlEventTpl,
  getRcvEventTpl,
  getRcvHtmlEventTpl,
  getMeetingId,
};
