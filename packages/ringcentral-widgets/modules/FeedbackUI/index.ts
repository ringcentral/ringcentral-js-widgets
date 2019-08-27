import { Module } from 'ringcentral-integration/lib/di';
import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'FeedbackUI',
  deps: [
    'RouterInteraction',
    'Feedback',
    'Locale',
    'Brand',
  ]
})
export default class FeedbackUI extends RcUIModule {
  getUIProps({
    phone: {
      locale,
      feedback,
      brand
    }
  }){
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
    phone: {
      feedback,
      routerInteraction,
    },
    sendFeedback,
  }){
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
