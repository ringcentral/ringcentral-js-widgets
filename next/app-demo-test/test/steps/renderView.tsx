import { ThemePlugin } from '@ringcentral-integration/micro-core/src/app/plugins';
import { Locale } from '@ringcentral-integration/micro-core/src/app/services';
import {
  App,
  createMemoryHistory,
  Initiator,
  injectable,
  IRouterOptions,
  RcViewModule,
  RouterOptions,
  SharedAppOptions,
  StoragePlugin,
  testBed,
} from '@ringcentral-integration/next-core';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { render } from '@testing-library/react';
import React, { ComponentType } from 'react';

export const renderViewPanel = async (node: React.ReactNode) => {
  @injectable({
    name: 'MockView',
  })
  class MockView extends RcViewModule {
    constructor(_local: Locale) {
      super();
    }

    component() {
      return node as any;
    }
  }

  const app = testBed({
    modules: [
      Initiator,
      {
        provide: RouterOptions,
        useValue: {
          createHistory: () => createMemoryHistory(),
        } as IRouterOptions,
      },
      {
        provide: SharedAppOptions,
        useValue: {
          name: 'internal-test',
          type: 'Base',
        },
      },
      ThemePlugin,
      StoragePlugin,
      {
        provide: 'BrandConfig',
        useValue: {
          id: '1210',
          code: 'rc',
          name: 'RingCentral',
          appName: 'RingCentral Widgets',
          application: 'RingCentral Widgets',
          defaultLocale: 'en-US',
          supportedLocales: ['en-US', 'fr-FR'],
          allowRegionSettings: true,
          callWithJupiter: {
            link: 'https://app.ringcentral.com/',
            protocol: 'rcapp://',
            name: 'RingCentral App',
          },
          callWithSoftphone: {
            protocol: 'rcmobile://',
            name: 'RingCentral Phone',
          },
          rcvTeleconference: 'https://v.ringcentral.com/teleconference',
          meetingUriReg: {
            rcm: undefined,
            rcv: undefined,
          },
          allowJupiterUniversalLink: true,
          conference: {
            dialInNumbersLink: 'https://ringcentr.al/2L14jqL',
            inviteText:
              'Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLink} \n\nThis conference call is brought to you by {brandName} Conferencing.',
          },
          rcvMeetingTopic: "{extensionName}'s {brandName} Video meeting",
        },
      },
    ],
    main: MockView,
    render: render,
  });

  const result = app.bootstrap();

  await waitForRenderReady();

  global.instance = {
    app: {
      unmount: app.destroy,
    },
  } as any;

  return [
    app as App<any, any, any>,
    result as ReturnType<typeof render>,
  ] as const;
};
