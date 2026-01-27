import type { ReplyWithMessagePanel } from '@ringcentral-integration/widgets/components/ReplyWithMessagePanel';

export interface ReplyWithMessageViewOptions {
  component?: typeof ReplyWithMessagePanel;
}

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

export interface ReplyWithMessageViewPanelProps {
  currentLocale: string;
  options: any[];
  onBackClick: () => void;
  reply: (params: ReplyWithTextParams, sessionId: string) => void;
  displayCustomMessage: boolean;
}

export type ReplyWithMessageViewParams = {
  sessionId?: string;
  type?: string;
};

export interface ReplyWithMessageViewContainerProps {}

export interface ReplyWithMessageViewProps {
  //
}
