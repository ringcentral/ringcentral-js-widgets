import React, { useEffect } from 'react';

import RingCentral from '@rc-ex/core';
import RcSdkExtension from '@rc-ex/rcsdk';
import WebSocketExtension from '@rc-ex/ws';
import { RcButton, RcThemeProvider } from '@ringcentral/juno';
import { SDK } from '@ringcentral/sdk';

const rcSdk = new SDK({
  clientId: '',
  clientSecret: '',
  server: 'https://api-xmnup.lab.nordigy.ru',
});

const main = async () => {
  await rcSdk.login({
    username: '',
    password: '',
  });

  // Setup WSG subscription
  const rc = new RingCentral();
  const rcSdkExtension = new RcSdkExtension({ rcSdk: rcSdk });
  await rc.installExtension(rcSdkExtension);
  const webSocketExtension = new WebSocketExtension({
    autoRecover: {
      enabled: false,
    },
  });
  await rc.installExtension(webSocketExtension);

  await webSocketExtension.subscribe(
    ['/restapi/v1.0/account/~/extension/~/presence'],
    (event) => {
      (global as any).SUBSCRIBE_CALLBACK.next(event);
    },
  );
};

export function App() {
  useEffect(() => {
    main();
  }, []);

  return (
    <RcThemeProvider>
      <RcButton>Example</RcButton>
    </RcThemeProvider>
  );
}
