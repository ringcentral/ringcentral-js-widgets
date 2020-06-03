import formatMessage from 'format-message';
import i18n from './i18n';
import { REG_EXP } from './config';

function f1(str) {
  if (str.length > 8 || str.length % 3 !== 2) {
    return [str.slice(0, 3), str.slice(3)];
  }
  return [str.slice(0, 4), str.slice(4)];
}

export function formatMeetingId(str) {
  const [current, nextSlices] = f1(str);
  if (!nextSlices) {
    return current;
  }
  if (nextSlices.length === 1) {
    return `${current}${nextSlices}`;
  }
  return `${current} ${formatMeetingId(nextSlices)}`;
}

function getPasswordTpl(password: string, currentLocale: string): string {
  const passwordLiteral = i18n.getString('password', currentLocale);
  return password
    ? `
    ${passwordLiteral}: ${password}`
    : '';
}

function getRcvPasswordTpl(
  meetingPassword: string,
  currentLocale: string,
): string {
  const passwordLiteral = i18n.getString('password', currentLocale);
  return `${passwordLiteral}: ${meetingPassword}`;
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

interface rcmMeeting {
  id: string;
  password: string;
  links: { joinUri: string };
}

interface rcvMeeting {
  joinUri: string;
  shortId: string;
  links: { joinUri: string };
  isMeetingSecret: boolean;
  meetingPassword: string;
  meetingPasswordPSTN: string;
}

interface rcmServiceInfo {
  mobileDialingNumberTpl: string;
  phoneDialingNumberTpl: string;
}

interface commonExtensionInfo {
  name: string;
}

interface commonBrand {
  name: string;
  id: string;
  brandConfig: {
    teleconference: string;
  };
}

interface tplResult {
  formattedMsg: string;
  links: {
    joinUri: string;
    teleconference: string;
  };
}

interface rcmMainParams {
  meeting: rcmMeeting;
  serviceInfo: rcmServiceInfo;
  extensionInfo: commonExtensionInfo;
}

interface rcvMainParams {
  meeting: rcvMeeting;
  extensionInfo: commonExtensionInfo;
  dialInNumber: string;
}

function getBaseRcmTpl(
  { meeting, serviceInfo, extensionInfo }: rcmMainParams,
  brand: commonBrand,
  currentLocale: string,
): tplResult {
  const accountName = extensionInfo.name;
  const meetingId = meeting.id;
  const joinUri = meeting.links.joinUri;
  const password = meeting.password;

  const mobileDialingNumberTpl = serviceInfo.mobileDialingNumberTpl;
  const phoneDialingNumberTpl = serviceInfo.phoneDialingNumberTpl;
  const passwordTpl = getPasswordTpl(password, currentLocale);
  const teleconference = brand.brandConfig.teleconference;

  return {
    formattedMsg: formatMessage(
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
    ),
    links: {
      joinUri,
      teleconference,
    },
  };
}

function formatTextToHtml({
  formattedMsg,
  links: { joinUri, teleconference },
}: tplResult): string {
  const newLine: string = '<br>';
  const indentation: string = '&nbsp;';

  return `<section>${newLine}${formattedMsg
    .replace(/\r\n|\n|\r/g, newLine)
    .replace(joinUri, `<a target="_blank" href="${joinUri}">${joinUri}</a>`)
    .replace(
      teleconference,
      `<a target="_blank" href="${teleconference}">${teleconference}</a>`,
    )
    .replace(/\t/g, indentation.repeat(4))}${newLine}</section>`;
}

export function getRcmEventTpl(
  mainInfo: rcmMainParams,
  brand: commonBrand,
  currentLocale: string,
): string {
  return getBaseRcmTpl(mainInfo, brand, currentLocale).formattedMsg;
}

export function getRcmHtmlEventTpl(
  mainInfo: rcmMainParams,
  brand: commonBrand,
  currentLocale: string,
): string {
  return formatTextToHtml(getBaseRcmTpl(mainInfo, brand, currentLocale));
}

const rcvAttTeleconference: string =
  'https://meetings.officeathand.att.com/teleconference';
const rcvTeleconference: string = 'https://v.ringcentral.com/teleconference/';
const attBrandId = '3420';

function getBaseRcvTpl(
  { meeting, extensionInfo, dialInNumber }: rcvMainParams,
  brand: commonBrand,
  currentLocale: string,
): tplResult {
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
  }
  meetingContent.push(`${i18n.getString('rcvTeleconference', currentLocale)}`);
  const passwordPstnTpl = isMeetingSecret
    ? getRcvPstnPasswordTpl(meetingPasswordPSTN, currentLocale)
    : '';
  const passwordTpl = isMeetingSecret
    ? getRcvPasswordTpl(meetingPassword, currentLocale)
    : '';
  const teleconference =
    brand.id === attBrandId ? rcvAttTeleconference : rcvTeleconference;
  const brandName = brand.id === attBrandId ? `AT&T ${brand.name}` : brand.name;
  return {
    formattedMsg: formatMessage(meetingContent.join(''), {
      accountName,
      brandName,
      joinUri,
      passwordTpl,
      passwordPstnTpl,
      smartphones: `${dialInNumber},,${pinNumber}#`,
      dialNumber: dialInNumber,
      pinNumber: formatMeetingId(pinNumber),
      teleconference,
      productName,
    }),
    links: {
      joinUri,
      teleconference,
    },
  };
}

export function getRcvEventTpl(
  mainInfo: rcvMainParams,
  brand: commonBrand,
  currentLocale: string,
): string {
  return getBaseRcvTpl(mainInfo, brand, currentLocale).formattedMsg;
}

export function getRcvHtmlEventTpl(
  mainInfo: rcvMainParams,
  brand: commonBrand,
  currentLocale: string,
): string {
  return formatTextToHtml(getBaseRcvTpl(mainInfo, brand, currentLocale));
}

export function getMeetingId(meetingUri: string) {
  if (meetingUri) {
    const regs = [REG_EXP.MEETING, REG_EXP.RCV];
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
