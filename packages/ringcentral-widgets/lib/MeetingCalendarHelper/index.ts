import formatMessage from 'format-message';
import { RcVDialInNumberObj } from 'ringcentral-integration/interfaces/Rcv.model';

import {
  MEETING_URI_REGEXP,
  rcvAttTeleconference,
  rcvTeleconference,
} from './config';
import { formatMeetingId } from './formatMeetingId';
import i18n from './i18n';
import {
  CommonBrand,
  FormatToHtmlOptions,
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
        .replace(/^\s*/, ($0) => indentation.repeat($0.length)); // replace leading whtespaces with indentations
    })
    .join(newLine);

  links.forEach((uri) => {
    if (uri) {
      htmlContent = htmlContent.replace(
        uri,
        `<a target="_blank" href="${uri}">${uri}</a>`,
      );
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
        brandName: brand.name,
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
  { meeting, extensionInfo, dialInNumber }: RcvMainParams,
  brand: CommonBrand,
  currentLocale: string,
): TplResult {
  const accountName = extensionInfo.name;
  const { meetingPassword, meetingPasswordPSTN, isMeetingSecret } = meeting;
  const joinUri = meeting.joinUri;
  const pinNumber = meeting.shortId;
  let productName;
  const meetingContent: Array<string> = [];
  const showMeetingPasswordPSTN = !!(isMeetingSecret && meetingPasswordPSTN);

  if (brand.name === 'RingCentral') {
    productName = 'RingCentral Video';
    meetingContent.push(
      i18n.getString('rcvRCBrandInviteMeetingContent', currentLocale),
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

  const isATT = brand.code === 'att';
  const teleconference = isATT ? rcvAttTeleconference : rcvTeleconference;
  const brandName = isATT ? `AT&T ${brand.name}` : brand.name;

  const formattedMsg = formatMessage(meetingContent.join(''), {
    accountName,
    brandName,
    joinUri,
    passwordTpl,
    smartphones: formatSmartphones(
      dialInNumber,
      pinNumber,
      showMeetingPasswordPSTN,
      meetingPasswordPSTN,
    ),
    dialNumber: formatDialInNumber(dialInNumber),
    pinNumber: formatMeetingId(pinNumber),
    teleconference,
    productName,
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
): string {
  const tplResult = getBaseRcvTpl(mainInfo, brand, currentLocale);
  return tplResult.formattedMsg;
}

function getRcvHtmlEventTpl(
  mainInfo: RcvMainParams,
  brand: CommonBrand,
  currentLocale: string,
): string {
  const tplResult = getBaseRcvTpl(mainInfo, brand, currentLocale);
  return formatTextToHtml(tplResult.formattedMsg, {
    links: [tplResult.links.joinUri, tplResult.links.teleconference],
  });
}

function getMeetingId(meetingUri: string): string {
  if (meetingUri) {
    const regs = [MEETING_URI_REGEXP.RCM, MEETING_URI_REGEXP.RCV];
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

function stripMeetingLinks(text: string): string {
  let result = text;
  [MEETING_URI_REGEXP.RCM, MEETING_URI_REGEXP.RCV].forEach((reg) => {
    while (reg.test(result)) {
      result = result.replace(reg, '');
    }
  });
  return result;
}

function meetingLinkContains(
  text?: string,
): { hasRCM: boolean; hasRCV: boolean } {
  return {
    hasRCM: MEETING_URI_REGEXP.RCM.test(text ?? ''),
    hasRCV: MEETING_URI_REGEXP.RCV.test(text ?? ''),
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
