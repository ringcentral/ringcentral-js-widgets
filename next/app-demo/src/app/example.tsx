/* eslint-disable jsx-a11y/label-has-associated-control */
import { PendoAnalytics } from '@ringcentral-integration/micro-auth/src/app/services';
import type { CallLogFormViewProps } from '@ringcentral-integration/micro-phone/src/app/views/CallLogFormView';
import { useContainer } from '@ringcentral-integration/next-core';
import { Button, TextField } from '@ringcentral/spring-ui';
import type { FunctionComponent } from 'react';
import React from 'react';

export const CallLogExample: FunctionComponent<CallLogFormViewProps> = ({
  info,
  variant,
  ...rest
}) => {
  const pendoAnalytics = useContainer<PendoAnalytics>('PendoAnalytics');
  return (
    <>
      <div
        className="p-4 flex-auto flex flex-col"
        data-sign="call-log-panel"
        data-value={JSON.stringify(info)}
      >
        <div className="mb-4">Example Call Log</div>
        <Button
          onClick={() => {
            pendoAnalytics.track('Int_CRM_logCall');
          }}
        >
          Try track pendo event, that will send `Int_CRM_logCall` event to pendo
          server
        </Button>
        <TextField fullWidth label="label 1" />
        <div className="h-16" />
        <div className="h-16" />
        <div className="h-16" />
        <div className="h-16" />
        <div className="h-16" />
        <TextField fullWidth label="label 2" />

        <div className="h-16" />
        <div className="h-16" />
        <div className="h-16" />
        <div className="h-16" />
        <div className="h-16" />
        <TextField fullWidth label="label 3" />
      </div>
    </>
  );
};
