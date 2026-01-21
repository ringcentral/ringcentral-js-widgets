import {
  AppFooterNav,
  AppHeaderNav,
} from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { PageHeader } from '@ringcentral-integration/next-widgets/components';
import { useAsyncState } from '@ringcentral-integration/react-hooks';
import { RefreshMd } from '@ringcentral/spring-icon';
import {
  Button,
  IconButton,
  Option,
  Select,
  Textarea,
  TextField,
} from '@ringcentral/spring-ui';
import React, { useMemo } from 'react';

import i18n from './i18n';

type FeedbackPanelProps = {
  brandName: string;
  currentLocale: string;
  onBackClick: (...args: any[]) => any;
  onRevertClick: (...args: any[]) => any;
  email: string;
  topic: string;
  subject: string;
  description: string;
  onEmailChange: (...args: any[]) => any;
  onTopicChange: (...args: any[]) => any;
  onSubjectChange: (...args: any[]) => any;
  onDescriptionChange: (...args: any[]) => any;
  sendFeedback: (...args: any[]) => any;
};

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  brandName,
  onBackClick,
  onRevertClick,
  email: emailProp,
  topic: topicProp,
  subject: subjectProp,
  description: descriptionProp,
  onEmailChange: onEmailChangeProp,
  onTopicChange: onTopicChangeProp,
  onSubjectChange: onSubjectChangeProp,
  onDescriptionChange: onDescriptionChangeProp,
  sendFeedback,
}) => {
  const { t } = useLocale(i18n);
  const [email, setEmail] = useAsyncState(emailProp, onEmailChangeProp);
  const [topic, setTopic] = useAsyncState(topicProp, onTopicChangeProp);
  const [subject, setSubject] = useAsyncState(subjectProp, onSubjectChangeProp);
  const [description, setDescription] = useAsyncState(
    descriptionProp,
    onDescriptionChangeProp,
  );

  const topicOptions = useMemo(
    () => [t('bugReport'), t('featureRequest'), t('others')],
    [t],
  );

  const selectedTopicIndex = useMemo(
    () => topicOptions.findIndex((t) => t === topic),
    [topic, topicOptions],
  );

  const handleSendClick = () => {
    const SERVICE_MAIL = 'integration.service@ringcentral.com';
    const FEEDBACK_SUBJECT = 'Google User Feedback';
    const content =
      `Hi Integration Team,\n\n` +
      `You've got feedback from customer on ${brandName} for Google extension. This customer could be contacted via email ${email}\n\n` +
      `Customer Feedback Topic\n${topic}\n\n` +
      `Subject\n${subject}\n\n` +
      `Description\n${description}\n\n` +
      `Regards,\n${brandName} for Google Extension`;

    const mailToUrl = `mailto:${SERVICE_MAIL}?subject=${window.encodeURIComponent(
      FEEDBACK_SUBJECT,
    )}&body=${window.encodeURIComponent(content)}`;
    sendFeedback(mailToUrl);
  };

  return (
    <>
      <AppHeaderNav override>
        <PageHeader
          onBackClick={onBackClick}
          endAdornment={
            <IconButton
              symbol={RefreshMd}
              color="secondary"
              variant="icon"
              size="small"
              onClick={onRevertClick}
              TooltipProps={{
                title: t('revert'),
              }}
            />
          }
        >
          {t('feedbackHeader')}
        </PageHeader>
      </AppHeaderNav>
      <div className="flex-auto overflow-y-auto overflow-x-hidden px-4 py-2">
        <div className="py-2 typography-subtitle">
          <div>{t('instruction')}</div>
          <div>
            {t('fillForm')}
            <i>{t('send')}</i>
            {t('useMailBox')}
            <i>integration.service@ringcentral.com.</i>
          </div>
        </div>
        <TextField
          label={t('email')}
          helperText={t('reply')}
          fullWidth
          size="medium"
          variant="outlined"
          placeholder={t('emailPlaceHolder')}
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
          inputProps={{
            maxLength: 60,
          }}
        />
        <Select
          label={t('feedbackTopic')}
          value={selectedTopicIndex}
          placeholder={t('topicPlaceHolder')}
          renderValue={(idx) => topicOptions[idx]}
          size="medium"
          variant="outlined"
          onChange={(e) => {
            setTopic(e.target.value);
          }}
        >
          {topicOptions.map((option, index) => (
            <Option key={index} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        <TextField
          label={t('subject')}
          fullWidth
          size="medium"
          variant="outlined"
          placeholder={t('subjectPlaceHolder')}
          value={subject}
          inputProps={{
            maxLength: 60,
          }}
          onChange={(e) => {
            setSubject(e.currentTarget.value);
          }}
        />
        <Textarea
          label={t('description')}
          fullWidth
          variant="outlined"
          minRows={4}
          placeholder={t('descriptionPlaceHolder')}
          value={description}
          inputProps={{
            maxLength: 1200,
          }}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        />
      </div>
      <AppFooterNav
        // -16px for the bottom have padding 16px
        additionalHeight={-16}
      >
        <div className="p-4">
          <Button fullWidth onClick={handleSendClick} color="primary">
            {t('send')}
          </Button>
        </div>
      </AppFooterNav>
    </>
  );
};
