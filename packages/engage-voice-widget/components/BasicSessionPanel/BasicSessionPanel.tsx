import { RcTextField } from '@ringcentral-integration/rcui';
import React, { FunctionComponent, useState, useEffect } from 'react';
import { CustomArrowButton } from 'ringcentral-widgets/components/Rcui/CustomArrowButton';
import { AnimationPanel } from 'ringcentral-widgets/components/AnimationPanel';

import { BasicSessionProps } from '../../interfaces/EvAgentSessionUI.interface';
import { PickList } from '../PickList';
import { Warning, WarningProps } from './Warning';

import {
  InboundQueuesPanel,
  InboundQueuesPanelProps,
} from '../InboundQueuesPanel';
import i18n from './i18n';
import styles from './styles.scss';

export type BasicSessionPanelProps = BasicSessionProps &
  Omit<InboundQueuesPanelProps, 'goBack'> & {
    classes?: {
      root?: string;
    };
    showWarning?: boolean;
  } & Pick<WarningProps, 'isWide'>;

export const BasicSessionPanel: FunctionComponent<BasicSessionPanelProps> = ({
  currentLocale,
  selectedSkillProfileId,
  skillProfileList,
  setSkillProfileId,
  loginTypeList,
  loginType,
  setLoginType,
  extensionNumber,
  setExtensionNumber,
  inboundQueuesFieldText,
  isExtensionNumber,
  searchOption,
  inboundQueues,
  submitInboundQueues,
  getAssignedInboundQueues,
  isAllAssign,
  isSeveralAssign,
  checkBoxOnChange,
  allCheckBoxOnChange,
  classes,
  resetFormGroup,
  showWarning,
  isWide,
}) => {
  const [inboundQueuesPageShow, setInboundQueuesPageShow] = useState(false);
  useEffect(() => resetFormGroup(), []);

  return (
    <>
      <AnimationPanel open={inboundQueuesPageShow}>
        <InboundQueuesPanel
          searchOption={searchOption}
          currentLocale={currentLocale}
          inboundQueues={inboundQueues}
          submitInboundQueues={submitInboundQueues}
          getAssignedInboundQueues={getAssignedInboundQueues}
          isAllAssign={isAllAssign}
          isSeveralAssign={isSeveralAssign}
          checkBoxOnChange={checkBoxOnChange}
          allCheckBoxOnChange={allCheckBoxOnChange}
          goBack={() => setInboundQueuesPageShow(false)}
        />
      </AnimationPanel>
      <div className={classes.root}>
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
          onClick={() => setInboundQueuesPageShow(true)}
        />
        {skillProfileList.length > 0 && (
          <PickList
            data-sign="skillProfile"
            options={skillProfileList}
            label={i18n.getString('skillProfile', currentLocale)}
            value={selectedSkillProfileId}
            optionValueKey="profileId"
            optionLabelKey="profileName"
            onChange={setSkillProfileId}
          />
        )}
        <PickList
          data-sign="loginType"
          options={loginTypeList}
          label={i18n.getString('voiceConnection', currentLocale)}
          value={loginType}
          onChange={setLoginType}
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
        {showWarning && (
          <Warning isWide={isWide}>
            {i18n.getString('warning', currentLocale)}
          </Warning>
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
      </div>
    </>
  );
};

BasicSessionPanel.defaultProps = {
  classes: {},
  showWarning: false,
};
