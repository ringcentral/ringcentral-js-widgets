import { ReplyWithPattern } from './ReplyWithPattern';

export interface CallPartyReply {
  /**
   * Text to reply
   */
  replyWithText: string;
  /**
   */
  replyWithPattern: ReplyWithPattern;
}
