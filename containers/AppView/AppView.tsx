import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import Environment from 'ringcentral-widgets/components/Environment';
import withPhone from 'ringcentral-widgets/lib/withPhone';

import styles from './styles.scss';

interface AppViewProps {
  server: string;
  redirectUri: string;
  enabled: boolean;
  appKey?: string;
  appSecret?: string;
  onSetData: (options: any) => any;
}

const AppViewPanel: FunctionComponent<AppViewProps> = (props) => {
  const { children, server, enabled, onSetData, redirectUri } = props;
  return (
    <div className={styles.root}>
      {children}
      <Environment
        server={server}
        enabled={enabled}
        onSetData={onSetData}
        redirectUri={redirectUri}
        recordingHost=""
      />
    </div>
  );
};

AppViewPanel.defaultProps = {
  enabled: false,
};

function mapToFunctions(_, { phone: { oAuth, environment } }) {
  return {
    server: environment.server,
    enabled: environment.enabled,
    redirectUri: oAuth.redirectUri,
  };
}

function mapToProps(_, { phone: { environment } }) {
  return {
    onSetData: (options: any) => {
      environment.setData(options);
    },
  };
}

export const AppView = withPhone(
  connect(mapToFunctions, mapToProps)(AppViewPanel),
);
