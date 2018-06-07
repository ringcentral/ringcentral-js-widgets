import { connect } from 'react-redux';
import FeedbackPanel from '../../components/FeedbackPanel';
import { withPhone } from '../../lib/phoneContext';

function mapToProps(_, {
  phone: {
    locale,
    feedback,
    brand
  },
}) {
  return {
    brandName: brand.name,
    currentLocale: locale.currentLocale,
    email: feedback.email,
    topic: feedback.topic,
    subject: feedback.subject,
    description: feedback.description,
  };
}

function mapToFunctions(_, {
  phone: {
    feedback,
    routerInteraction,
  },
  sendFeedback,
}) {
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

const FeedbackPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(FeedbackPanel));

export {
  mapToFunctions,
  mapToProps,
  FeedbackPage as default,
};
