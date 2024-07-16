import { render, screen } from '@ringcentral-integration/test-utils';
import React from 'react';

import { ActiveCallsPanel } from '../../components/ActiveCallsPanel';

describe('ActiveCallsPanel', () => {
  const mockProps = {
    activeRingCalls: [],
    activeOnHoldCalls: [],
    activeCurrentCalls: [],
    otherDeviceCalls: [],
    currentLocale: 'en-US',
    areaCode: '123',
    countryCode: '1',
    showMergeCall: true,
    showCallDetail: true,
    allCalls: [],
    onCreateContact: jest.fn(),
    onClickToSms: jest.fn(),
    isLoggedContact: jest.fn(),
    onLogCall: jest.fn(),
    onViewContact: jest.fn(),
    webphoneAnswer: jest.fn(),
    onMergeCall: jest.fn(),
    webphoneReject: jest.fn(),
    webphoneHangup: jest.fn(),
    webphoneResume: jest.fn(),
    webphoneToVoicemail: jest.fn(),
    webphoneSwitchCall: jest.fn(),
    webphoneIgnore: jest.fn(),
    modalConfirm: jest.fn(),
    modalClose: jest.fn(),
    enableContactFallback: true,
    onCallsEmpty: jest.fn(),
    sourceIcons: {},
    phoneTypeRenderer: jest.fn(),
    phoneSourceNameRenderer: jest.fn(),
    isWebRTC: true,
    getAvatarUrl: jest.fn(),
    // currentLog: { call: { telephonyStatus: '', result: {} } },
    renderEditLogSection: jest.fn(),
    renderSaveLogButton: jest.fn(),
    renderExtraButton: jest.fn(),
    onSaveCallLog: jest.fn(),
    onUpdateCallLog: jest.fn(),
    onCloseLogSection: jest.fn(),
    logNotification: {},
    onCloseNotification: jest.fn(),
    onDiscardNotification: jest.fn(),
    onSaveNotification: jest.fn(),
    onExpandNotification: jest.fn(),
    notificationContainerStyles: 'container',
    renderContactName: jest.fn(),
    renderSubContactName: jest.fn(),
    ringoutHangup: jest.fn(),
    ringoutTransfer: jest.fn(),
    ringoutReject: jest.fn(),
    isOnHold: jest.fn(),
    formatPhone: jest.fn(),
  };

  it('renders ActiveCallsPanel component', () => {
    render(<ActiveCallsPanel {...mockProps} />);
    expect(screen.getByTestId('activeCalls')).toBeInTheDocument();
    expect(screen.queryByTestId('spinnerOverlay')).not.toBeInTheDocument();
  });

  it('renders ActiveCallsPanel component Spinner', () => {
    render(<ActiveCallsPanel {...mockProps} showSpinner />);
    expect(screen.getByTestId('activeCalls')).toBeInTheDocument();
    expect(screen.getByTestId('spinnerOverlay')).toBeInTheDocument();
  });
});
