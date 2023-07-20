import type {
  ReplyWithPattern,
  ReplyWithTextParams,
} from '../../modules/ReplyWithMessageUI';

export interface OptionsItem {
  text: string;
  timeValue: number;
  timeUnits: string;
}
export interface ReplyOption {
  options: OptionsItem[];
  pattern: ReplyWithPattern;
  text: string;
}

export interface ReplyWithMessageProps {
  onBackClick: (...args: any[]) => any;
  reply: (params: ReplyWithTextParams) => void;
  currentLocale: string;
  children: any;
  options: ReplyOption[];
  displayCustomMessage: boolean;
}
