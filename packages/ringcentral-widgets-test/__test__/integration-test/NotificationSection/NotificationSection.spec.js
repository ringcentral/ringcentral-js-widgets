import React from 'react';
import { mount } from 'enzyme';
import NotificationSection from '@ringcentral-integration/widgets/components/NotificationSection';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';

const setup = (props) => {
  const { logNotification } = props;
  const sectionProps = {
    currentLocale: 'en',
    currentNotificationIdentify: '5415666006',
    disableLinks: false,
    showNotiLogButton: true,
    currentSession: {
      callStatus: 'Ringing',
      creationTime: 1567666086759,
      direction: 'Inbound',
      from: '103',
      fromNumber: '103',
      fromUserName: undefined,
      id: '5415666006',
      isForwarded: false,
      isOnFlip: false,
      isOnHold: false,
      isOnMute: false,
      isOnTransfer: false,
      isReject: false,
      isReplied: false,
      isToVoicemail: false,
      lastHoldingTime: 0,
      minimized: false,
      partyId: 'Y3MxNzI2MjI1NTU1MTYwNjQ4MjBAMTAuNzQuMi4yMTk-2',
      recordStatus: 'webphone-record-idle',
      removed: false,
      sessionId: '5415666006',
      startTime: 1567666086759,
      telephonySessionId: 'Y3MxNzI2MjI1NTU1MTYwNjQ4MjBAMTAuNzQuMi4yMTk',
      to: '101',
      toNumber: '101',
      toUserName: undefined,
    },
    formatPhone: (phoneNumber) =>
      formatNumber({
        phoneNumber,
        areaCode: '',
        countryCode: 'US',
      }) || 'Unknown',
    logNotification: {
      call: {
        activityMatches: [],
        direction: 'Inbound',
        from: { phoneNumber: '103' },
        fromMatches: [],
        fromName: 'FirstName 103 LastName',
        id: 'Y3MxNzI2MjI1NTU1MTYwNjQ4MjBAMTAuNzQuMi4yMTk',
        offset: 0,
        partyId: 'Y3MxNzI2MjI1NTU1MTYwNjQ4MjBAMTAuNzQuMi4yMTk-2',
        sessionId: '5415666006',
        sipData: {
          toTag: 'blf',
          fromTag: 'Y3MxNzI2MjI1NTU1MTYwNjQ4MjBAMTAuNzQuMi4yMTk-2',
          remoteUri: '-',
          localUri: '-',
        },
        startTime: 1567666086759,
        telephonySessionId: 'Y3MxNzI2MjI1NTU1MTYwNjQ4MjBAMTAuNzQuMi4yMTk',
        telephonyStatus: 'Ringing',
        to: { phoneNumber: '101' },
        toMatches: [],
        toName: 'Test 20190314',
        toNumberEntity: undefined,
        webphoneSession: undefined,
      },
      logName: '',
      notificationIsExpand: false,
      showNotification: true,
      ...logNotification,
    },
    onExpandNotification() {},
    onSaveNotification() {},
    onDiscardNotification() {},
    onCloseNotification() {},
    onReject() {},
    onHangup() {},
  };
  return mount(<NotificationSection {...sectionProps} />);
};

describe('<NotificationSection />', () => {
  it('Without expand the notificaiton', () => {
    const wrapper = setup({});
    expect(wrapper.find('.ringing').length).toBe(1);
    expect(wrapper.find('span[data-sign="callStatus"]').text()).toEqual(
      'Ringing',
    );
    expect(wrapper.find('svg[data-sign="reject"]').length).toBe(1);
    expect(wrapper.find('div.expandButtonWithEnd').text()).toEqual('Log');
    expect(wrapper.find('div.saveButton').length).toBe(0);
  });
  it('Expand the notification', () => {
    const logNotification = {
      notificationIsExpand: true,
    };
    const wrapper = setup({
      logNotification,
    });
    expect(wrapper.find('div.confirmationInfo').text()).toEqual(
      `Your unsaved edits on the previous call will be lost, are you sure you want to work on the new call?`,
    );
    expect(wrapper.find('div.saveButton').length).toBe(1);
    expect(wrapper.find('div.discardButton').length).toBe(1);
    expect(wrapper.find('div.stayButton').length).toBe(1);
  });
});
