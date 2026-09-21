import { render, screen } from '@testing-library/react';
import React from 'react';

import { TCRNumberModalView } from '../../src/app/views/ConversationsViewSpring/TCRNumberModalView';
import type { TCRNumberModalPayload } from '../../src/app/views/ConversationsViewSpring/TCRNumberModalView/TCRNumberModal.view.interface';
import { TCRNumberModalPanel } from '../../src/app/views/ConversationsViewSpring/TCRNumberModalView/TCRNumberModalPanel';

jest.mock('@ringcentral/spring-ui', () => {
  const React = require('react');
  const actual = jest.requireActual('@ringcentral/spring-ui');

  return {
    ...actual,
    Link: ({ children, variant, ...props }: any) =>
      React.createElement('a', props, children),
  };
});

jest.mock('@ringcentral-integration/micro-core/src/app/views', () => {
  const actual = jest.requireActual(
    '@ringcentral-integration/micro-core/src/app/views',
  );

  return {
    ...actual,
    useModalItemView: jest.fn(),
  };
});

const { useModalItemView } = jest.requireMock(
  '@ringcentral-integration/micro-core/src/app/views',
);

const createView = ({
  adminPermission = false,
}: {
  adminPermission?: boolean;
} = {}) => {
  const view = Object.create(TCRNumberModalView.prototype);

  Object.defineProperties(view, {
    shown: {
      value: false,
    },
    _accountInfo: {
      value: {
        isTCRSupported: true,
      },
    },
    _extensionInfo: {
      value: {
        isAdminUser: adminPermission,
      },
    },
    _messageSender: {
      value: {
        senderNumbersList: [],
        receiveOnlyNumbers: [{ phoneNumber: '+15550001111' }],
        registerableNumbers: [],
        smsPermissionReason: 'receiveOnlyNumber',
      },
    },
    _numberFormatter: {
      value: {
        formatNumber: (phoneNumber: string) => phoneNumber,
      },
    },
  });

  return view as any;
};

const renderPanel = (payload: TCRNumberModalPayload) => {
  (useModalItemView as jest.Mock).mockReturnValue({
    props: {
      payload,
    },
  });

  render(<TCRNumberModalPanel />);
};

describe('TCRNumberModalView', () => {
  it('adds the current extension admin permission to receive-only payload', () => {
    expect(createView({ adminPermission: true }).payload).toEqual({
      type: 'receiveOnlyNumber',
      isAdminUser: true,
    });

    expect(createView({ adminPermission: false }).payload).toEqual({
      type: 'receiveOnlyNumber',
      isAdminUser: false,
    });
  });
});

describe('TCRNumberModalPanel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders non-admin receive-only copy', () => {
    renderPanel({
      type: 'receiveOnlyNumber',
      isAdminUser: false,
    });

    expect(
      screen.getByText(
        'To comply with US industry anti-spam regulations, companies are required to register phone numbers for outbound texting. Your number(s) are set to receive incoming text messages only.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Ask your admin to set up outbound text messaging.'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Register now')).not.toBeInTheDocument();
  });

  it('renders admin receive-only copy with register link', () => {
    renderPanel({
      type: 'receiveOnlyNumber',
      isAdminUser: true,
    });

    expect(
      screen.getByText(
        'To comply with US industry anti-spam regulations, companies are required to register phone numbers for outbound texting. Your number(s) are set to receive incoming text messages only.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'You can register your company for outbound texting in the Admin Portal.',
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Ask your admin/)).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Register now' })).toHaveAttribute(
      'href',
      'https://login.ringcentral.com/',
    );
  });
});
