import {
  Brand,
  Locale,
  type Theme,
} from '@ringcentral-integration/micro-core/src/app/services';
import { slideOutViewTransition } from '@ringcentral-integration/micro-core/src/app/views';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useConnector,
  dynamic,
} from '@ringcentral-integration/next-core';
import FeedbackPanel from '@ringcentral-integration/widgets/components/FeedbackPanel';
import React, { useRef } from 'react';

import { Feedback } from '../../services';

import type {
  FeedbackContainerProps,
  FeedbackPanelProps,
  FeedbackViewOptions,
  FeedbackViewProps,
} from './Feedback.view.interface';
import { FeedbackPanel as SpringRegionFeedbackPanel } from './FeedbackPanel';

@injectable({
  name: 'FeedbackView',
})
export class FeedbackView extends RcViewModule {
  @dynamic('Theme')
  private _theme?: Theme;

  constructor(
    protected _router: RouterPlugin,
    protected _feedback: Feedback,
    protected _locale: Locale,
    protected _brand: Brand,
    @optional('FeedbackViewOptions')
    protected _feedbackViewOptions?: FeedbackViewOptions,
  ) {
    super();
  }

  getUIProps(): UIProps<FeedbackPanelProps> {
    return {
      brandName: this._brand.name,
      currentLocale: this._locale.currentLocale,
      email: this._feedback.email,
      topic: this._feedback.topic,
      subject: this._feedback.subject,
      description: this._feedback.description,
    };
  }

  getUIFunctions({
    sendFeedback,
  }: FeedbackContainerProps): UIFunctions<FeedbackPanelProps> {
    return {
      onBackClick: () =>
        slideOutViewTransition(
          () => this._router.goBack(),
          this._theme?.reducedMotion,
        ),
      onEmailChange: (value) => {
        this._feedback.updateEmail(value);
      },
      onTopicChange: (value) => {
        this._feedback.updateTopic(value);
      },
      onSubjectChange: (value) => {
        this._feedback.updateSubject(value);
      },
      onDescriptionChange: (value) => {
        this._feedback.updateDescription(value);
      },
      onRevertClick: () => {
        this._feedback.clean();
      },
      sendFeedback: (mailToUrl) => {
        if (sendFeedback) {
          sendFeedback(mailToUrl);
          return;
        }
        this._feedback.sendFeedback(mailToUrl);
      },
    };
  }

  component(props: FeedbackViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps();

      return {
        ...props,
        ...uiProps,
      };
    });

    if (process.env.THEME_SYSTEM === 'spring-ui') {
      const Component =
        this._feedbackViewOptions?.component || SpringRegionFeedbackPanel;
      return <Component {..._props} {...uiFunctions} />;
    }

    const Component = this._feedbackViewOptions?.component || FeedbackPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
