import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';
import {
  Deps,
  FeedbackContainerProps,
  FeedbackPanelProps,
} from './FeedbackUI.interface';

@Module({
  name: 'FeedbackUI',
  deps: ['RouterInteraction', 'Feedback', 'Locale', 'Brand'],
})
export class FeedbackUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({ deps });
  }

  getUIProps(): UIProps<FeedbackPanelProps> {
    const { locale, feedback, brand } = this._deps;
    return {
      brandName: brand.name,
      currentLocale: locale.currentLocale,
      email: feedback.email,
      topic: feedback.topic,
      subject: feedback.subject,
      description: feedback.description,
    };
  }

  getUIFunctions({
    sendFeedback,
  }: FeedbackContainerProps): UIFunctions<FeedbackPanelProps> {
    const { feedback, routerInteraction } = this._deps;
    return {
      onBackClick: () => {
        routerInteraction.goBack();
      },
      onEmailChange: (value) => {
        feedback.updateEmail(value);
      },
      onTopicChange: (value) => {
        feedback.updateTopic(value);
      },
      onSubjectChange: (value) => {
        feedback.updateSubject(value);
      },
      onDescriptionChange: (value) => {
        feedback.updateDescription(value);
      },
      onRevertClick: () => {
        feedback.clean();
      },
      sendFeedback: (mailToUrl) => {
        if (sendFeedback) {
          sendFeedback(mailToUrl);
          return;
        }
        feedback.sendFeedback(mailToUrl);
      },
    };
  }
}
