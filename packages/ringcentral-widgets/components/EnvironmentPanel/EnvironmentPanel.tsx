import type { ChangeEventHandler, FC } from 'react';
import React, { useEffect, useState } from 'react';

import classnames from 'classnames';

import { useChange, useRefState } from '@ringcentral/juno';

import BackHeader from '../BackHeader';
import { Button } from '../Button';
import IconLine from '../IconLine';
import Line from '../Line';
import Panel from '../Panel';
import Switch from '../Switch';
import TextInput from '../TextInput';
import styles from './styles.scss';

type EnvironmentData = {
  server: string;
  recordingHost: string;
  enabled: boolean;
};

export type EnvironmentPanelProps = {
  onSetData: (data: EnvironmentData) => any;
  defaultHidden?: boolean;
} & EnvironmentData;

export const EnvironmentPanel: FC<EnvironmentPanelProps> = (props) => {
  const {
    recordingHost,
    defaultHidden = true,
    onSetData,
    enabled,
    server,
  } = props;

  const [serverValueRef, setServerValue] = useRefState(server);
  const [recordingHostValueRef, setRecordingHostValue] =
    useRefState(recordingHost);
  const [enabledValueRef, setEnabledValue] = useRefState(enabled);
  const [hidden, setHidden] = useState(defaultHidden);

  useChange(
    () => {
      // when open panel, reset value again
      if (!hidden) {
        setServerValue(server, false);
        setRecordingHostValue(recordingHost, false);
        setEnabledValue(enabled, false);
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

  const toggleEnv = () => {
    setHidden(!hidden);
  };

  const onOk = () => {
    onSetData({
      server: serverValueRef.current,
      recordingHost: recordingHostValueRef.current,
      enabled: enabledValueRef.current,
    });

    toggleEnv();
  };

  const onCancel = () => {
    setServerValue(server);
    setRecordingHostValue(recordingHost);
    setEnabledValue(enabled);
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
  const recordingHostValue = recordingHostValueRef.current;

  if (hidden) {
    return null;
  }

  const hasChanges = !(
    serverValue === server &&
    enabledValue === enabled &&
    recordingHostValue === recordingHost
  );

  return (
    <div className={styles.root}>
      <BackHeader onBackClick={onCancel} buttons={[]}>
        Environment
      </BackHeader>
      <Panel>
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
        <Line>
          <Button
            dataSign="envSave"
            className={classnames(
              styles.saveButton,
              !hasChanges ? styles.disabled : null,
            )}
            onClick={onOk}
            disabled={!hasChanges}
          >
            Save
          </Button>
        </Line>
      </Panel>
    </div>
  );
};
