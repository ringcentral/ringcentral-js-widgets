import type dialInNumbersBody from '@ringcentral-integration/mock/src/platform/data/dialInNumbers.json';

import type { StepFunction } from '../../../lib/step';

export const CheckInvitation: StepFunction = async (_, { phone, rcMock }) => {
  const { phoneNumbers } = (await rcMock.fetchMock
    ?.lastResponse(new RegExp('.*/rcvideo/v1/dial-in-numbers'))
    ?.json()) as typeof dialInNumbersBody;
  const numbers = phoneNumbers.filter(
    (obj) => obj.country.isoCode === phone.extensionInfo.country.isoCode,
  );
  const rcvMeeting = await rcMock.fetchMock
    ?.lastResponse(new RegExp('.*/rcvideo/v1/bridges'), 'POST')
    ?.json();
  expect(phone.rcVideo.getMeetingInvitation).toHaveBeenCalledWith({
    brandId: phone.brand.id,
    brandName: phone.brand.name,
    currentLocale: phone.locale.currentLocale,
    dialInNumbers: numbers,
    hostName: phone.extensionInfo.data.name,
    isSIPAvailable: phone.appFeatures.hasRoomConnectorBeta,
    id: rcvMeeting.id,
    shortId: rcvMeeting.shortId,
    e2ee: rcvMeeting.e2ee,
    isMeetingSecret: rcvMeeting.isMeetingSecret,
    meetingPassword: rcvMeeting.meetingPassword,
    meetingPasswordPSTN: rcvMeeting.meetingPasswordPSTN,
    meetingPasswordMasked: rcvMeeting.meetingPasswordMasked,
    joinUri: rcvMeeting.joinUri,
  });
};
