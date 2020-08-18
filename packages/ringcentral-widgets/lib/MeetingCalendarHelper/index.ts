import formatMessage from 'format-message';
import i18n from './i18n';
import {
  RcmMainParams,
  RcvMainParams,
  CommonBrand,
  TplResult,
  FormatToHtmlOptions,
} from './index.interface';
import {
  MEETING_URI_REGEXP,
  rcvAttTeleconference,
  rcvTeleconference,
} from './config';

function f1(str: string): Array<string> {
  if (str.length > 8 || str.length % 3 !== 2) {
    return [str.slice(0, 3), str.slice(3)];
  }
  return [str.slice(0, 4), str.slice(4)];
}

export function formatMeetingId(str: string, delimeter = ' '): string {
  const [current, nextSlices] = f1(str);
  if (!nextSlices) {
    return current;
  }
  if (nextSlices.length === 1) {
    return `${current}${nextSlices}`;
  }
  return `${current}${delimeter}${formatMeetingId(nextSlices, delimeter)}`;
}

function getPasswordTpl(
  meetingPassword: string,
  currentLocale: string,
): string {
  const passwordLiteral = i18n.getString('password', currentLocale);
  return meetingPassword ? `${passwordLiteral}: ${meetingPassword}` : '';
}

export const htmlNewLine: string = '<br>';
export const htmlIndentation: string = '&nbsp;';
export const htmlTabIndentation: string = htmlIndentation.repeat(4);

export function formatTextToHtml(
  plantText: string,
  options: FormatToHtmlOptions = {},
): string {
  const {
    links = [],
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

  return `<section>${newLine}${htmlContent}${newLine}</section>`;
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

export function getRcmEventTpl(
  mainInfo: RcmMainParams,
  brand: CommonBrand,
  currentLocale: string,
): string {
  const tplResult = getBaseRcmTpl(mainInfo, brand, currentLocale);
  return tplResult.formattedMsg;
}

export function getRcmHtmlEventTpl(
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
  if (dialInNumber) {
    meetingContent.push(
      i18n.getString('rcvInviteMeetingContentDial', currentLocale),
    );
    if (isMeetingSecret && meetingPasswordPSTN) {
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
    smartphones: `${dialInNumber},,${pinNumber}#`,
    dialNumber: dialInNumber,
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

export function getRcvEventTpl(
  mainInfo: RcvMainParams,
  brand: CommonBrand,
  currentLocale: string,
): string {
  const tplResult = getBaseRcvTpl(mainInfo, brand, currentLocale);
  return tplResult.formattedMsg;
}

export function getRcvHtmlEventTpl(
  mainInfo: RcvMainParams,
  brand: CommonBrand,
  currentLocale: string,
): string {
  const tplResult = getBaseRcvTpl(mainInfo, brand, currentLocale);
  return formatTextToHtml(tplResult.formattedMsg, {
    links: [tplResult.links.joinUri, tplResult.links.teleconference],
  });
}

export function getMeetingId(meetingUri: string): string {
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
