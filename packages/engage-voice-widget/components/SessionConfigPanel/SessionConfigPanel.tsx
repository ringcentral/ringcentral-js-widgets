/* eslint-disable react/jsx-no-duplicate-props */
import { RcButton, RcTextField } from '@ringcentral-integration/rcui';
import React, { FunctionComponent } from 'react';
import { CustomArrowButton } from 'ringcentral-widgets/components/Rcui/CustomArrowButton';

import {
  EvSessionConfigUIFunctions,
  EvSessionConfigUIProps,
} from '../../interfaces/EvSessionConfigUI.interface';
import { EvLoginHeader } from '../EvLoginHeader';
import { PickList } from '../PickList';
import { ToggleButton } from '../ToggleButton';
import i18n from './i18n';
import styles from './styles.scss';

export type SessionConfigPanelProps = EvSessionConfigUIProps &
  EvSessionConfigUIFunctions;

export const SessionConfigPanel: FunctionComponent<SessionConfigPanelProps> = ({
  currentLocale,
  selectedSkillProfileId,
  skillProfileList,
  setSkillProfileId,
  loginTypeList,
  loginType,
  setLoginType,
  extensionNumber,
  setExtensionNumber,
  takingCall,
  setTakingCall,
  autoAnswer,
  setAutoAnswer,
  setConfigure,
  children,
  inboundQueuesFieldText,
  isLoading,
  isExtensionNumber,
  navigateToInboundQueuesPage,
}) => {
  return (
    <main className={styles.container}>
      <EvLoginHeader
        wrapperStyle={styles.wrapperStyle}
        svgStyle={styles.svgStyle}
      />
      <RcTextField
        data-sign="inboundQueues"
        label={i18n.getString('inboundQueues', currentLocale)}
        title={inboundQueuesFieldText}
        value={inboundQueuesFieldText}
        fullWidth
        classes={{
          root: styles.customSelect,
        }}
        InputProps={{
          readOnly: true,
          endAdornment: <CustomArrowButton />,
        }}
        clearBtn={false}
        onClick={navigateToInboundQueuesPage}
      />
      {skillProfileList.length > 0 && (
        <PickList
          data-sign="skillProfile"
          options={skillProfileList}
          label={i18n.getString('skillProfile', currentLocale)}
          value={selectedSkillProfileId}
          optionValueKey="profileId"
          optionLabelKey="profileName"
          onChange={(e) => {
            setSkillProfileId(e);
          }}
        />
      )}
      <PickList
        data-sign="loginType"
        options={loginTypeList}
        label={i18n.getString('voiceConnection', currentLocale)}
        value={loginType}
        onChange={(e) => {
          setLoginType(e);
        }}
      />
      {isExtensionNumber && (
        <RcTextField
          data-sign="extensionNumber"
          label={i18n.getString('extensionNumber', currentLocale)}
          fullWidth
          value={extensionNumber}
          placeholder={i18n.getString('enterYourPhoneNumber', currentLocale)}
          inputProps={{
            maxLength: 255,
          }}
          clearBtn={false}
          classes={{
            root: styles.customSelect,
          }}
          onChange={({ target: { value } }) => {
            setExtensionNumber(value);
          }}
        />
      )}
      {/* <ToggleButton
        data-sign="takingCall"
        label={i18n.getString('takingCall', currentLocale)}
        onChange={() => {
          setTakingCall(!takingCall);
        }}
        classes={{
          root: styles.takingCall,
        }}
        checked={takingCall}
      />
      <ToggleButton
        data-sign="autoAnswer"
        label={i18n.getString('answerCalls', currentLocale)}
        onChange={() => {
          setAutoAnswer(!autoAnswer);
        }}
        checked={autoAnswer}
      /> */}
      <div className={styles.button}>
        <RcButton
          data-sign="setConfigure"
          fullWidth
          disabled={isLoading}
          loading={isLoading}
          size="medium"
          onClick={() => {
            setConfigure();
          }}
        >
          {i18n.getString('continue', currentLocale)}
        </RcButton>
      </div>
      {children}
    </main>
  );
};
