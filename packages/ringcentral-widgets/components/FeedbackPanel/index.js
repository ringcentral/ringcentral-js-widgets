import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RevertBtn from '../../assets/images/Revert.svg';
import BackHeader from '../BackHeader';
import Panel from '../Panel';
import InputField from '../InputField';
import TextInput from '../TextInput';
import Select from '../DropdownSelect';
import Button from '../Button';
import i18n from './i18n';
import styles from './styles.scss';

export default class FeedbackPanel extends Component {
  onRevertClick = () => {
    this.props.onRevertClick();
  }
  onEmailChange = (e) => {
    const { value } = e.currentTarget;
    this.props.onEmailChange(value);
  }
  onTopicChange = (option) => {
    this.props.onTopicChange(option);
  }
  onSubjectChange = (e) => {
    const { value } = e.currentTarget;
    this.props.onSubjectChange(value);
  }
  onDescriptionChange = (e) => {
    const { value } = e.currentTarget;
    this.props.onDescriptionChange(value);
  }
  onSendClick = () => {
    const SERVICE_MAIL = 'integration.service@ringcentral.com';
    const FEEDBACK_SUBJECT = 'Google User Feedback';

    const content = `${'Hi Integration Team,\n\n' +
      `You've got feedback from customer on ${this.props.brandName} for Google extension. This customer could be contacted via email `}${
      `${this.props.email}\n\nCustomer Feedback Topic\n${this.props.topic}\n\n`}Subject\n${this.props.subject}\n\n` +
      `Description\n${this.props.description}\n\n` +
      `Regards,\n${this.props.brandName} for Google Extension`;
    const mailToUrl = `mailto:${SERVICE_MAIL}?subject=${window.encodeURIComponent(FEEDBACK_SUBJECT)}&body=${window.encodeURIComponent(content)}`;
    this.props.sendFeedback(mailToUrl);
  }
  render() {
    const { currentLocale } = this.props;
    this.topicOptions = [
      i18n.getString('bugReport', currentLocale),
      i18n.getString('featureRequest', currentLocale),
      i18n.getString('others', currentLocale)
    ];
    const selectedTopicIndex =
      this.topicOptions.findIndex(topic => topic === this.props.topic) > -1 ?
        this.topicOptions.findIndex(topic => topic === this.props.topic) + 1 : -1;
    return (
      <div className={styles.root}>
        <BackHeader
          onBackClick={this.props.onBackClick}
          buttons={[{
            label: <RevertBtn className={styles.rightBtn} />,
            title: i18n.getString('revert', currentLocale),
            placement: 'right',
            onClick: this.onRevertClick
          }]}
        >
          {i18n.getString('feedbackHeader', currentLocale)}
        </BackHeader>
        <Panel className={styles.content}>
          <div className={styles.instruction}>
            <div>{i18n.getString('instruction', currentLocale)}</div>
            <div>{i18n.getString('fillForm', currentLocale)}
              <i>{i18n.getString('send', currentLocale)}</i>
              {i18n.getString('useMailBox', currentLocale)}
              <i>integration.service@ringcentral.com.</i>
            </div>
          </div>
          <InputField
            label={i18n.getString('email', currentLocale)}
            labelHint={i18n.getString('reply', currentLocale)} >
            <TextInput
              placeholder={i18n.getString('emailPlaceHolder', currentLocale)}
              value={this.props.email}
              onChange={this.onEmailChange}
              maxLength={60}
            />
          </InputField>
          <InputField
            label={i18n.getString('feedbackTopic', currentLocale)}>
            <Select
              className={styles.select}
              value={`${selectedTopicIndex}`}
              options={this.topicOptions}
              dropdownAlign="left"
              placeholder={i18n.getString('topicPlaceHolder', currentLocale)}
              onChange={this.onTopicChange}
              renderValue={idx => this.topicOptions[idx - 1]}
            />
          </InputField>
          <InputField
            label={i18n.getString('subject', currentLocale)}>
            <TextInput
              placeholder={i18n.getString('subjectPlaceHolder', currentLocale)}
              value={this.props.subject}
              maxLength={60}
              onChange={this.onSubjectChange}
            />
          </InputField>
          <div className={styles.textAreaField}>
            <div className={styles.label}>
              {i18n.getString('description', currentLocale)}
            </div>
            <div className={styles.textArea}>
              <textarea
                placeholder={i18n.getString('descriptionPlaceHolder', currentLocale)}
                value={this.props.description}
                maxLength={1200}
                onChange={this.onDescriptionChange}
              />
            </div>
          </div>
        </Panel>
        <div className={styles.bottom}>
          <Button
            onClick={this.onSendClick}
            className={styles.sendButton}
          >
            {i18n.getString('send', currentLocale)}
          </Button>
        </div>
      </div>
    );
  }
}
FeedbackPanel.propTypes = {
  brandName: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onRevertClick: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onTopicChange: PropTypes.func.isRequired,
  onSubjectChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  sendFeedback: PropTypes.func.isRequired,
};
