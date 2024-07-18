import { Module } from '@ringcentral-integration/commons/lib/di';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { RcUIModuleV2 } from '@ringcentral-integration/core';

import type {
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
    return {
      brandName: this._deps.brand.name,
      currentLocale: this._deps.locale.currentLocale,
      email: this._deps.feedback.email,
      topic: this._deps.feedback.topic,
      subject: this._deps.feedback.subject,
      description: this._deps.feedback.description,
    };
  }

  getUIFunctions({
    sendFeedback,
  }: FeedbackContainerProps): UIFunctions<FeedbackPanelProps> {
    return {
      onBackClick: () => {
        this._deps.routerInteraction.goBack();
      },
      onEmailChange: (value) => {
        this._deps.feedback.updateEmail(value);
      },
      onTopicChange: (value) => {
        this._deps.feedback.updateTopic(value);
      },
      onSubjectChange: (value) => {
        this._deps.feedback.updateSubject(value);
      },
      onDescriptionChange: (value) => {
        this._deps.feedback.updateDescription(value);
      },
      onRevertClick: () => {
        this._deps.feedback.clean();
      },
      sendFeedback: (mailToUrl) => {
        if (sendFeedback) {
          sendFeedback(mailToUrl);
          return;
        }
        this._deps.feedback.sendFeedback(mailToUrl);
      },
    };
  }
}
