import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import Environment from 'ringcentral-widgets/components/Environment';
import withPhone from 'ringcentral-widgets/lib/withPhone';

import styles from './styles.scss';
import { EvPhone } from '../../interfaces';

interface AppViewProps {
  server: string;
  redirectUri: string;
  enabled: boolean;
  clientId?: string;
  clientSecret?: string;
  onSetData: (options: any) => any;
  phone: EvPhone;
}

const AppViewPanel: FunctionComponent<AppViewProps> = ({
  children,
  server,
  enabled,
  onSetData,
  redirectUri,
  phone,
}) => {
  let couldNotAccess;
  if (
    phone.auth.loggedIn &&
    phone.evAuth?.agent?.agentConfig?.agentPermissions
  ) {
    const currentPath = phone.routerInteraction.currentPath;
    switch (currentPath) {
      case '/sessionUpdate':
        couldNotAccess = phone.evAuth.agent.agentConfig.agentPermissions
          .allowLoginUpdates
          ? false
          : true;
    }
  }
  if (couldNotAccess) {
    phone.routerInteraction.goBack();
  }
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
