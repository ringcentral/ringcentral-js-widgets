import React from 'react';
// eslint-disable-next-line
import FeedbackPanel from 'ringcentral-widgets/components/FeedbackPanel';

const props = {};
props.brandName = 'test string';
props.currentLocale = 'en-US';
props.onBackClick = () => null;
props.onRevertClick = () => null;
props.email = 'test string';
props.topic = 'test string';
props.subject = 'test string';
props.description = 'test string';
props.onEmailChange = () => null;
props.onTopicChange = () => null;
props.onSubjectChange = () => null;
props.onDescriptionChange = () => null;
props.sendFeedback = () => null;

/**
 * A example of `FeedbackPanel`
 */
const FeedbackPanelDemo = () => (
  <FeedbackPanel
    {...props}
  />
);
export default FeedbackPanelDemo;
