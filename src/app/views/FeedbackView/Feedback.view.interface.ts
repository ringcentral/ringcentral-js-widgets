import type FeedbackPanel from '@ringcentral-integration/widgets/components/FeedbackPanel';

export interface FeedbackViewOptions {
  component?: typeof FeedbackPanel;
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

export interface FeedbackViewProps {
  //
}
