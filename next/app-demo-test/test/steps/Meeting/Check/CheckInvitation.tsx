import {
  AppFeatures,
  ExtensionInfo,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Brand,
  Locale,
} from '@ringcentral-integration/micro-core/src/app/services';
import { RcVideo } from '@ringcentral-integration/micro-meeting/src/app/services';
import type dialInNumbersBody from '@ringcentral-integration/mock/src/platform/data/dialInNumbers.json';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckInvitation: StepFunction = async (_, { app, rcMock }) => {
  const rcVideo = app.container.got(RcVideo)!;
  const brand = app.container.got(Brand)!;
  const locale = app.container.got(Locale)!;
  const extensionInfo = app.container.got(ExtensionInfo)!;
  const appFeatures = app.container.got(AppFeatures)!;
  const { phoneNumbers } = (await rcMock.fetchMock
    ?.lastResponse(new RegExp('.*/rcvideo/v1/dial-in-numbers'))
    ?.json()) as typeof dialInNumbersBody;
  const numbers = phoneNumbers.filter(
    (obj) => obj.country.isoCode === extensionInfo.country.isoCode,
  );
  const rcvMeeting = await rcMock.fetchMock
    ?.lastResponse(new RegExp('.*/rcvideo/v1/bridges'), 'POST')
    ?.json();
  expect(rcVideo.getMeetingInvitation).toHaveBeenCalledWith({
    brandId: brand.id,
    brandName: brand.name,
    currentLocale: locale.currentLocale,
    dialInNumbers: numbers,
    hostName: extensionInfo.data!.name,
    isSIPAvailable: appFeatures.hasRoomConnectorBeta,
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
