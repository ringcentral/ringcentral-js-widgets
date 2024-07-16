import { useChange, useRefState } from '@ringcentral/juno';
import clsx from 'clsx';
import type { ChangeEventHandler, FC } from 'react';
import React, { useEffect, useState } from 'react';

import {
  PageHeader,
  PageHeaderBack,
  PageHeaderRemain,
  PageHeaderTitle,
} from '../BackHeader/PageHeader';
import { Button } from '../Button';
import IconLine from '../IconLine';
import Line from '../Line';
import Panel from '../Panel';
import Switch from '../Switch';
import TextInput from '../TextInput';
import { SettingGroup } from '../VideoPanel/SettingGroup';

import styles from './styles.scss';

export type EnvironmentData = {
  server: string;
  recordingHost: string;
  enabled: boolean;
  allowDataTracking: boolean;
};

export type EnvironmentPanelProps = {
  useDataTrackingSetting?: boolean;
  onSetData: (data: EnvironmentData) => void;
  defaultHidden?: boolean;
} & EnvironmentData;

export const EnvironmentPanel: FC<EnvironmentPanelProps> = (props) => {
  const {
    recordingHost,
    defaultHidden = true,
    useDataTrackingSetting = false,
    onSetData,
    enabled,
    allowDataTracking,
    server,
  } = props;

  const [serverValueRef, setServerValue] = useRefState(server);
  const [recordingHostValueRef, setRecordingHostValue] =
    useRefState(recordingHost);
  const [enabledDataTrackingRef, setEnabledDataTracking] =
    useRefState(allowDataTracking);
  const [enabledValueRef, setEnabledValue] = useRefState(enabled);
  const [hidden, setHidden] = useState(defaultHidden);

  useChange(
    () => {
      // when open panel, reset value again
      if (!hidden) {
        setServerValue(server, false);
        setRecordingHostValue(recordingHost, false);
        setEnabledValue(enabled, false);
        setEnabledDataTracking(allowDataTracking, false);
      }
    },
    () => hidden,
  );

  const onServerChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setServerValue(e.currentTarget.value);
  };

  const onRecordingHostChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setRecordingHostValue(e.currentTarget.value);
  };

  const onToggleEnabled = () => {
    setEnabledValue(!enabledValueRef.current);
  };

  const onToggleDataTracking = () => {
    setEnabledDataTracking(!enabledDataTrackingRef.current);
  };

  const toggleEnv = () => {
    setHidden(!hidden);
  };

  const onOk = () => {
    onSetData({
      server: serverValueRef.current,
      recordingHost: recordingHostValueRef.current,
      enabled: enabledValueRef.current,
      allowDataTracking: enabledDataTrackingRef.current,
    });

    toggleEnv();
  };

  const onCancel = () => {
    setServerValue(server);
    setRecordingHostValue(recordingHost);
    setEnabledValue(enabled);
    setEnabledDataTracking(allowDataTracking);
    toggleEnv();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).toggleEnv = toggleEnv;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const serverValue = serverValueRef.current;
  const enabledValue = enabledValueRef.current;
  const enabledDataTrackingValue = enabledDataTrackingRef.current;
  const recordingHostValue = recordingHostValueRef.current;

  if (hidden) {
    return null;
  }

  const hasChanges = !(
    serverValue === server &&
    enabledValue === enabled &&
    recordingHostValue === recordingHost &&
    enabledDataTrackingValue === allowDataTracking
  );

  return (
    <div className={styles.root}>
      <PageHeader>
        <PageHeaderBack onClick={onCancel} />
        <PageHeaderTitle>Environment</PageHeaderTitle>
        <PageHeaderRemain />
      </PageHeader>
      <Panel className={styles.main}>
        <SettingGroup
          dataSign="server"
          expandable={false}
          summary="Server setting"
        >
          <Line>
            Server
            <TextInput
              dataSign="envServerUrl"
              value={serverValue}
              onChange={onServerChange}
            />
          </Line>
          <Line>
            Recording Host
            <TextInput
              dataSign="envRecordingHost"
              value={recordingHostValue}
              onChange={onRecordingHostChange}
            />
          </Line>
          <IconLine
            icon={
              <Switch
                dataSign="envToggle"
                checked={enabledValue}
                onChange={onToggleEnabled}
              />
            }
          >
            Enable
          </IconLine>
        </SettingGroup>
        {useDataTrackingSetting && (
          <SettingGroup
            dataSign="analytics"
            expandable={false}
            summary="Analytics setting"
          >
            <IconLine
              icon={
                <Switch
                  dataSign="dataTrackingToggle"
                  checked={enabledDataTrackingValue}
                  onChange={onToggleDataTracking}
                />
              }
            >
              Enable Data Tracking
            </IconLine>
            <span className={styles.comment}>
              After clicking save, remember to <b>refresh to take effect</b>(all
              tabs need to be closed) when you enable that manually, the enable
              will take <b>two hours</b> enable, will auto close after{' '}
              <b>two hours</b>
            </span>
          </SettingGroup>
        )}
      </Panel>
      <Line className={styles.saveButtonLine}>
        <Button
          dataSign="envSave"
          className={clsx(
            styles.saveButton,
            !hasChanges ? styles.disabled : null,
          )}
          onClick={onOk}
          disabled={!hasChanges}
        >
          Save
        </Button>
      </Line>
    </div>
  );
};
