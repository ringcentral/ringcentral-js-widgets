import { Theme } from '@ringcentral-integration/micro-core/src/app/services';
import { MFEAppRootView } from '@ringcentral-integration/micro-core/src/app/views';
import {
  autobind,
  delegate,
  injectable,
  Route,
  RouterPlugin,
  Switch,
} from '@ringcentral-integration/next-core';
import {
  globalTransport,
  type GlobalTransport,
  RcMicroAppView,
  useMicroApp,
} from '@ringcentral-integration/next-micro';
import { sleep } from '@ringcentral-integration/utils';
import React from 'react';

import { GlobalStyle } from '../styles';

import { ComposeText } from './services';
import { ComposeTextView, ConversationsView, ConversationView } from './views';

export interface IInteractions {
  emit: {
    logConversation: (data: any) => Promise<void>;
  };
  listen: {
    clickToSMS: (phoneNumber: string) => Promise<void>;
  };
}

@injectable({
  name: 'MessageAppView',
})
export class MessageAppView extends RcMicroAppView {
  constructor(
    private _theme: Theme,
    private _router: RouterPlugin,
    private _composeText: ComposeText,
    private _composeTextView: ComposeTextView,
    private _conversationView: ConversationView,
    private _conversationsView: ConversationsView,
    private _mfeAppRootView: MFEAppRootView,
  ) {
    super();
    this._mfeAppRootView.setRoutes(this, this.Routes);
    (globalTransport as GlobalTransport<IInteractions>).listen(
      'clickToSMS',
      async (phoneNumber: string) => {
        await this._router.push('/composeText');
        await this._composeText.addToNumber({ phoneNumber });
      },
    );
  }

  @delegate('server')
  async setThemeType(type: string) {
    this._theme.setThemeType(type);
  }

  @autobind
  Routes() {
    const sourceIcons = {
      brandIcon: null,
    };
    return (
      <Switch>
        <Route
          path="/messages"
          component={() => (
            <this._conversationsView.component
              showContactDisplayPlaceholder={false}
              onCreateContact={() => {
                //
              }}
              sourceIcons={sourceIcons}
              showGroupNumberName
            />
          )}
        />
        <Route
          path="/conversations/:conversationId"
          component={() => (
            <this._conversationView.component
              onLogConversation={async () => {
                sleep(1000);
              }}
              showContactDisplayPlaceholder={false}
              sourceIcons={sourceIcons}
              showGroupNumberName
              supportAttachment
            />
          )}
        />
        <Route
          path="/composeText"
          component={() => <this._composeTextView.component inputExpandable />}
        />
      </Switch>
    );
  }

  component() {
    const MicroContacts = useMicroApp(this, {
      name: '@ringcentral-integration/micro-contacts',
      loader: () =>
        import('@ringcentral-integration/micro-contacts/src/bootstrap'),
    });
    if (!this.isAppShell) return <MicroContacts />;
    return (
      <>
        <GlobalStyle />
        <MicroContacts />
        <this._mfeAppRootView.DefaultRoute />
        <this._mfeAppRootView.Routes appShell={this} />
      </>
    );
  }
}
