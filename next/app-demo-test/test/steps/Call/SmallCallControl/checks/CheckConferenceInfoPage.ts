import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import type { UserAgent } from '@ringcentral-integration/mock/src/webphone/Webphone';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckConferenceInfoPage: StepFunction = async (_, { app }) => {
  await whenStateChange(() => {
    expect(screen.getByText('Conference Call')).toBeInTheDocument();
  });

  const webphone = app.container.got(Webphone)!;
  const userAgent = webphone._webphone!.userAgent as unknown as UserAgent;
  userAgent.acceptConference(webphone.acceptOptions);

  await whenStateChange(() => {
    expect(screen.getByTestId('conferenceInfo')).toBeInTheDocument();
  });
};
