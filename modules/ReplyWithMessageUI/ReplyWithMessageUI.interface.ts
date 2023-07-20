import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { ActiveCallControl } from '@ringcentral-integration/commons/modules/ActiveCallControl';
import type { Webphone } from '@ringcentral-integration/commons/modules/Webphone';
import type { RouterInteraction } from '../RouterInteraction';

export enum ReplyWithPattern {
  willCallYouBack = 'WillCallYouBack',
  callMeBack = 'CallMeBack',
  onMyWay = 'OnMyWay',
  onTheOtherLine = 'OnTheOtherLine',
  willCallYouBackLater = 'WillCallYouBackLater',
  callMeBackLater = 'CallMeBackLater',
  inAMeeting = 'InAMeeting',
  onTheOtherLineNoCall = 'OnTheOtherLineNoCall',
}

export interface ReplyWithPatternParams {
  pattern: ReplyWithPattern;
  time?: number;
  timeUnit?: 'Minute' | 'Hour' | 'Day';
}

export interface ReplyWithTextParams {
  replyWithText?: string;
  replyWithPattern?: ReplyWithPatternParams;
}

export interface SessionReplyOptions {
  replyType: number;
  replyText: string;
  timeValue: string;
  timeUnits: string;
  callbackDirection: string;
}

export interface Deps {
  locale: Locale;
  routerInteraction: RouterInteraction;
  webphone: Webphone;
  activeCallControl: ActiveCallControl;
}

export interface ReplyWithMessageUIPanelProps {
  currentLocale: string;
  options: any[];
  onBackClick: () => void;
  reply: (params: ReplyWithTextParams, sessionId: string) => void;
  displayCustomMessage: boolean;
}

export interface ReplyWithMessageUIContainerProps {
  params: { sessionId: string; type?: string };
}
