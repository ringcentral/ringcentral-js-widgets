import type { UserAgent } from '@ringcentral-integration/mock/src/webphone/Webphone';
import { waitUntilTo } from '@ringcentral-integration/utils';
import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../../lib/step';

export const CheckConferenceInfoPage: StepFunction = async (_, { phone }) => {
  await waitUntilTo(() => {
    expect(screen.getByText('Conference Call')).toBeInTheDocument();
  });

  const userAgent = phone.webphone!._webphone!
    .userAgent as unknown as UserAgent;
  userAgent.acceptConference(phone.webphone.acceptOptions);

  await waitUntilTo(() => {
    expect(screen.getByTestId('conferenceInfo')).toBeInTheDocument();
  });
};
