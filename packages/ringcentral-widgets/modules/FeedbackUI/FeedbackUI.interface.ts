import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { Feedback } from '@ringcentral-integration/commons/modules/Feedback';
import type { Brand } from '@ringcentral-integration/commons/modules/Brand';
import type { RouterInteraction } from '../RouterInteraction';

export interface Deps {
  routerInteraction: RouterInteraction;
  feedback: Feedback;
  locale: Locale;
  brand: Brand;
}

export interface FeedbackPanelProps {
  brandName: string;
  currentLocale: string;
  email: string;
  topic: string;
  subject: string;
  description: string;
  onBackClick: () => void;
  onEmailChange: (email: string) => void;
  onTopicChange: (topic: string) => void;
  onSubjectChange: (subject: string) => void;
  onDescriptionChange: (description: string) => void;
  onRevertClick: () => void;
  sendFeedback: (url: string) => void;
}

export interface FeedbackContainerProps {
  sendFeedback?: (url: string) => void;
}
