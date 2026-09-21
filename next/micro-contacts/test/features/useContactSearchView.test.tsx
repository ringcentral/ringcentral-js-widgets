import type { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';
import { render, screen } from '@ringcentral-integration/test-utils';
import React from 'react';

import type { IContactSearchItem } from '../../src/app/views/ContactSearchView/ContactSearch.view.interface';
import { useContactSearchView } from '../../src/app/views/ContactSearchView/ContactSearchPanel/useContactSearchView';

const mockUsePresence = jest.fn();
const mockGetProfileImageSync = jest.fn();
const mockUseContainer = jest.fn((token: string) => {
  if (token === 'Auth') {
    return {
      accessToken: 'mock-access-token',
    };
  }

  if (token === 'Contacts') {
    return {
      allContactsMap: new Map(),
      getProfileImageSync: mockGetProfileImageSync,
      usePresence: mockUsePresence,
    };
  }

  return undefined;
});

jest.mock('@ringcentral-integration/next-core', () => ({
  useContainer: (token: string) => mockUseContainer(token),
}));

jest.mock('@ringcentral-integration/micro-auth/src/app/components', () => ({
  useFormattedPhoneNumberFn: () => (phoneNumber: string) => phoneNumber,
}));

jest.mock('@ringcentral-integration/micro-core/src/app/hooks', () => ({
  useLocale: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@ringcentral-integration/next-widgets/components', () => ({
  TextWithHighlight: ({
    highLightText,
    text,
    ...props
  }: {
    highLightText: string;
    text: string;
    [key: string]: unknown;
  }) => {
    void highLightText;

    return <span {...props}>{text}</span>;
  },
}));

jest.mock('@ringcentral/spring-icon', () => ({
  BlockMd: 'BlockMd',
  CallQueueMd: 'CallQueueMd',
  EnterMd: 'EnterMd',
  ProfileMd: 'ProfileMd',
}));

jest.mock('@ringcentral/spring-ui', () => {
  const React = require('react');

  const SimpleComponent =
    (tagName: keyof JSX.IntrinsicElements) =>
    ({ children }: { children?: React.ReactNode }) =>
      React.createElement(tagName, undefined, children);

  return {
    Avatar: React.forwardRef(
      (
        {
          children,
          IndicatorProps,
          rootProps,
          classes,
          imgProps,
          showStatusIndicator,
          symbol,
          size,
          variant,
          ...props
        }: {
          children?: React.ReactNode;
          IndicatorProps?: Record<string, unknown>;
          rootProps?: Record<string, unknown>;
          classes?: Record<string, unknown>;
          imgProps?: Record<string, unknown>;
          showStatusIndicator?: boolean;
          size?: string;
          symbol?: string;
          variant?: string;
          [key: string]: unknown;
        },
        ref: React.Ref<HTMLDivElement>,
      ) => (
        <div
          ref={ref}
          aria-label={props['aria-label'] as string | undefined}
          data-color-id={props['data-color-id'] as string | undefined}
          data-sign={props['data-sign'] as string | undefined}
        >
          {children}
          {symbol && <span data-symbol={symbol} />}
          {showStatusIndicator && IndicatorProps && (
            <span {...IndicatorProps} />
          )}
        </div>
      ),
    ),
    Divider: SimpleComponent('div'),
    Icon: SimpleComponent('span'),
    ListItem: SimpleComponent('div'),
    ListItemText: ({
      primary,
      secondary,
      ...props
    }: {
      primary?: React.ReactNode;
      secondary?: React.ReactNode;
      [key: string]: unknown;
    }) => (
      <div {...props}>
        <div>{primary}</div>
        <div>{secondary}</div>
      </div>
    ),
    SuggestionList: ({
      options,
      renderOption,
    }: {
      options: IContactSearchItem[];
      renderOption: (
        itemProps: IContactSearchItem,
        state: { highlighted: boolean; index: number },
      ) => React.ReactNode;
    }) => (
      <div>
        {options.map((option, index) => (
          <React.Fragment key={option.id}>
            {renderOption(option, {
              highlighted: false,
              index,
            })}
          </React.Fragment>
        ))}
      </div>
    ),
    Tab: SimpleComponent('div'),
    TabContext: SimpleComponent('div'),
    Tabs: SimpleComponent('div'),
    Tooltip: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    omit: (data: Record<string, unknown>, keys: string[]) =>
      Object.fromEntries(
        Object.entries(data).filter(([key]) => !keys.includes(key)),
      ),
    useAutocomplete: ({
      inputValue,
      options,
    }: {
      inputValue: string;
      options: IContactSearchItem[];
    }) => ({
      changeHighlightedIndexReason: undefined,
      closeMenu: jest.fn(),
      getInputAriaProps: () => ({}),
      getInputProps: () => ({}),
      getItemProps: jest.fn(),
      getSuggestionListProps: () => ({}),
      getTagListBoxProps: () => ({}),
      highlightedIndex: 0,
      inputValue,
      isKeepHighlightedIndex: false,
      isOpen: true,
      openMenu: jest.fn(),
      optionItems: options,
    }),
  };
});

const companyContact: IContact = {
  id: '102',
  name: 'John Doe',
  type: 'company',
  account: {
    id: 'account-1',
  },
} as IContact;

const companyContactItem: IContactSearchItem = {
  id: '102',
  isPrimary: true,
  type: 'company',
  name: 'John Doe',
  phoneNumber: '+16505550102',
  phoneType: 'direct',
  contact: companyContact,
};

const TestContactSearchView = () => {
  const { component } = useContactSearchView({
    value: 'John',
    source: 'message',
    changeTabTrack: jest.fn(),
    companyContacts: [companyContactItem],
    personalContacts: [],
    otherContacts: [],
    thirdPartyContacts: [],
    isThirdPartySearching: false,
    onChange: jest.fn(),
    onClose: jest.fn(),
    onContactSelected: jest.fn(),
    onOpen: jest.fn(),
  });

  return <>{component}</>;
};

describe('useContactSearchView', () => {
  beforeEach(() => {
    mockUsePresence.mockReturnValue('available');
    mockGetProfileImageSync.mockReturnValue(undefined);
    mockUseContainer.mockClear();
  });

  it('renders primary company avatar through ContactAvatar and reads presence', () => {
    render(<TestContactSearchView />);

    expect(screen.getByLabelText('contact avatar')).toHaveAttribute(
      'data-sign',
      'contactAvatarText',
    );
    expect(
      document.querySelector('[data-sign="presenceIndicator"]'),
    ).toBeInTheDocument();
    expect(mockUsePresence).toHaveBeenCalledWith(companyContact);
  });
});
