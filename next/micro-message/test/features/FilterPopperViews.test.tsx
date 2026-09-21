import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { FilterPopperAssignmentView } from '../../src/app/views/MessageThreadsView/MessageThreadPage/Filter/FilterPopperAssignmentView';
import { FilterPopperMainView } from '../../src/app/views/MessageThreadsView/MessageThreadPage/Filter/FilterPopperMainView';
import { FilterPopperSharedWithMeView } from '../../src/app/views/MessageThreadsView/MessageThreadPage/Filter/FilterPopperSharedWithMeView';
import { assignmentOptions } from '../../src/app/views/MessageThreadsView/utils/constants';

jest.mock('@ringcentral-integration/micro-core/src/app/hooks', () => ({
  useLocale: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@ringcentral/spring-ui', () => ({
  Icon: () => <span data-sign="mock-icon">icon</span>,
  MenuDivider: () => <hr data-sign="menu-divider" />,
  MenuHeader: ({
    start,
    children,
  }: {
    start?: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <div data-sign="menu-header">
      {start}
      <span>{children}</span>
    </div>
  ),
  MenuList: ({ children }: { children: React.ReactNode }) => (
    <div data-sign="menu-list">{children}</div>
  ),
  MenuItem: ({
    children,
    onClick,
    disabled,
    'data-sign': dataSign,
  }: {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    disabled?: boolean;
    'data-sign'?: string;
  }) => (
    <button
      disabled={disabled}
      data-sign={dataSign}
      onClick={(e) => onClick?.(e as any)}
    >
      {children}
    </button>
  ),
  MenuItemText: ({
    children,
    info,
    ...rest
  }: {
    children: React.ReactNode;
    info?: React.ReactNode;
  }) => (
    <span {...rest}>
      {children}
      {info}
    </span>
  ),
  Checkbox: ({
    checked,
    indeterminate,
    onChange,
    inputProps,
  }: {
    checked?: boolean;
    indeterminate?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputProps?: Record<string, any>;
  }) => (
    <input
      type="checkbox"
      checked={checked}
      data-indeterminate={indeterminate ? 'true' : 'false'}
      onChange={(e) => onChange?.(e)}
      {...inputProps}
    />
  ),
  Button: ({
    children,
    onClick,
    disabled,
    'data-sign': dataSign,
  }: {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    disabled?: boolean;
    'data-sign'?: string;
  }) => (
    <button
      data-sign={dataSign}
      disabled={disabled}
      onClick={(e) => onClick?.(e as any)}
    >
      {children}
    </button>
  ),
  IconButton: ({
    onClick,
    'data-sign': dataSign,
  }: {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    'data-sign'?: string;
  }) => (
    <button data-sign={dataSign} onClick={(e) => onClick?.(e as any)}>
      icon
    </button>
  ),
  TextField: ({
    value,
    onChange,
    inputProps,
  }: {
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputProps?: Record<string, any>;
  }) => (
    <input
      value={value}
      onChange={(e) => onChange?.(e as any)}
      data-sign={inputProps?.['data-sign']}
    />
  ),
}));

const statusFilterList = [
  { key: 'Open' as const, label: 'open', dataSign: 'statusOpen' },
  { key: 'Resolved' as const, label: 'resolved', dataSign: 'statusResolved' },
];

const mainFilterList = [
  {
    key: 'AssignedToMe' as const,
    label: 'assignedToMe',
    dataSign: 'filterAssignedToMe',
    updates: {
      filter: 'AssignedToMe' as const,
      selectedAssignees: ['__CURRENT_USER__' as const],
    },
  },
  {
    key: 'Unread' as const,
    label: 'unread',
    dataSign: 'filterUnread',
    updates: {
      filter: 'Unread' as const,
    },
  },
];

describe('Filter popper sub views', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles main view filter/status/redirect actions', () => {
    const onSharedSearchFormUpdate = jest.fn();
    const onStatusFilterChange = jest.fn();
    const onClose = jest.fn();
    const onAssignmentClick = jest.fn();
    const onSharedWithMeClick = jest.fn();

    const { rerender } = render(
      <FilterPopperMainView
        isActive
        filter="All"
        tempStatusFilter={['Open', 'Resolved']}
        onSharedSearchFormUpdate={onSharedSearchFormUpdate}
        onClose={onClose}
        onStatusFilterChange={onStatusFilterChange}
        getAssignmentText="all"
        getSharedWithMeText="all"
        onAssignmentClick={onAssignmentClick}
        onSharedWithMeClick={onSharedWithMeClick}
        mainFilterList={mainFilterList}
        statusFilterList={statusFilterList}
      />,
    );

    fireEvent.click(
      document.querySelector('[data-sign="filterUnread"]') as HTMLButtonElement,
    );
    expect(onSharedSearchFormUpdate).toHaveBeenCalledWith({ filter: 'Unread' });
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(
      document.querySelector('[data-sign="statusOpen"]') as HTMLButtonElement,
    );
    expect(onStatusFilterChange).toHaveBeenCalledWith(['Resolved']);
    expect(onSharedSearchFormUpdate).toHaveBeenCalledWith({
      statusFilter: ['Resolved'],
    });

    rerender(
      <FilterPopperMainView
        isActive
        filter="All"
        tempStatusFilter={['Open']}
        onSharedSearchFormUpdate={onSharedSearchFormUpdate}
        onClose={onClose}
        onStatusFilterChange={onStatusFilterChange}
        getAssignmentText="all"
        getSharedWithMeText="all"
        onAssignmentClick={onAssignmentClick}
        onSharedWithMeClick={onSharedWithMeClick}
        mainFilterList={mainFilterList}
        statusFilterList={statusFilterList}
      />,
    );
    fireEvent.click(
      document.querySelector('[data-sign="statusOpen"]') as HTMLButtonElement,
    );
    expect(onStatusFilterChange).toHaveBeenCalledTimes(1);

    fireEvent.click(
      document.querySelector(
        '[data-sign="assignmentMenuItem"]',
      ) as HTMLButtonElement,
    );
    fireEvent.click(
      document.querySelector(
        '[data-sign="sharedWithMeMenuItem"]',
      ) as HTMLButtonElement,
    );
    expect(onAssignmentClick).toHaveBeenCalled();
    expect(onSharedWithMeClick).toHaveBeenCalled();
  });

  it('handles assignment view select all, options, done/back and disabled done', () => {
    const onShowAllChange = jest.fn();
    const onAssigneesChange = jest.fn();
    const onBack = jest.fn();
    const onDone = jest.fn();

    const { rerender } = render(
      <FilterPopperAssignmentView
        isActive
        tempSelectedAssignees={['__CURRENT_USER__']}
        assignmentOptions={assignmentOptions}
        isShowAllSelected={false}
        isShowAllIndeterminate
        onShowAllChange={onShowAllChange}
        onAssigneesChange={onAssigneesChange}
        onBack={onBack}
        onDone={onDone}
      />,
    );

    fireEvent.click(
      document.querySelector(
        '[data-sign="assignmentMenuShowAll"]',
      ) as HTMLButtonElement,
    );
    expect(onShowAllChange).toHaveBeenCalledWith(true);

    fireEvent.click(
      document.querySelector(
        '[data-sign="assignmentMenuAssignedToOthers"]',
      ) as HTMLButtonElement,
    );
    expect(onAssigneesChange).toHaveBeenCalledWith([
      '__CURRENT_USER__',
      '__ASSIGNED_TO_OTHERS__',
    ]);

    fireEvent.click(
      document.querySelector(
        '[data-sign="assignmentMenuBackToMain"]',
      ) as HTMLButtonElement,
    );
    fireEvent.click(
      document.querySelector(
        '[data-sign="assignmentMenuDone"]',
      ) as HTMLButtonElement,
    );
    expect(onBack).toHaveBeenCalled();
    expect(onDone).toHaveBeenCalled();

    rerender(
      <FilterPopperAssignmentView
        isActive
        tempSelectedAssignees={[]}
        assignmentOptions={assignmentOptions}
        isShowAllSelected={false}
        isShowAllIndeterminate={false}
        onShowAllChange={onShowAllChange}
        onAssigneesChange={onAssigneesChange}
        onBack={onBack}
        onDone={onDone}
      />,
    );
    expect(
      document.querySelector('[data-sign="assignmentMenuDone"]'),
    ).toBeDisabled();
  });

  it('handles shared-with-me view search, select all, queue selection and done/back', () => {
    const onSearchQueryChange = jest.fn();
    const onShowAllCallQueuesChange = jest.fn();
    const onCallQueuesChange = jest.fn();
    const onBack = jest.fn();
    const onDone = jest.fn();

    const callQueues = [
      {
        id: 'q1',
        name: 'Queue One',
        extensionNumber: '1001',
        site: { name: 'Site A' },
      },
      {
        id: 'q2',
        name: 'Queue Two',
        extensionNumber: '1002',
      },
    ] as any;

    const { rerender } = render(
      <FilterPopperSharedWithMeView
        isActive
        searchQuery=""
        onSearchQueryChange={onSearchQueryChange}
        filteredCallQueues={callQueues}
        tempSelectedRecipientExtensionIds={['q1']}
        isShowAllCallQueuesSelected={false}
        isShowAllCallQueuesIndeterminate
        onShowAllCallQueuesChange={onShowAllCallQueuesChange}
        onCallQueuesChange={onCallQueuesChange}
        onBack={onBack}
        onDone={onDone}
      />,
    );

    fireEvent.change(
      document.querySelector(
        '[data-sign="sharedWithMeSearch"]',
      ) as HTMLInputElement,
      {
        target: { value: 'Queue' },
      },
    );
    expect(onSearchQueryChange).toHaveBeenCalledWith('Queue');

    fireEvent.click(
      document.querySelector(
        '[data-sign="sharedWithMeShowAll"]',
      ) as HTMLButtonElement,
    );
    expect(onShowAllCallQueuesChange).toHaveBeenCalledWith(true);

    fireEvent.click(
      document.querySelectorAll(
        '[data-sign="sharedWithMeQueueItem"]',
      )[0] as HTMLButtonElement,
    );
    expect(onCallQueuesChange).toHaveBeenCalledWith([]);

    fireEvent.click(
      document.querySelector(
        '[data-sign="sharedWithMeMenuBackToMain"]',
      ) as HTMLButtonElement,
    );
    fireEvent.click(
      document.querySelector(
        '[data-sign="sharedWithMeMenuDone"]',
      ) as HTMLButtonElement,
    );
    expect(onBack).toHaveBeenCalled();
    expect(onDone).toHaveBeenCalled();

    rerender(
      <FilterPopperSharedWithMeView
        isActive
        searchQuery="no-result"
        onSearchQueryChange={onSearchQueryChange}
        filteredCallQueues={[]}
        tempSelectedRecipientExtensionIds={[]}
        isShowAllCallQueuesSelected={false}
        isShowAllCallQueuesIndeterminate={false}
        onShowAllCallQueuesChange={onShowAllCallQueuesChange}
        onCallQueuesChange={onCallQueuesChange}
        onBack={onBack}
        onDone={onDone}
      />,
    );

    expect(
      document.querySelector('[data-sign="sharedWithMeShowAll"]'),
    ).toBeNull();
    expect(document.body.textContent).toContain('noSearchResults');
    expect(
      document.querySelector('[data-sign="sharedWithMeMenuDone"]'),
    ).toBeDisabled();
  });
});
