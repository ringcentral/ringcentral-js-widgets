import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { FilterPopper } from '../../src/app/views/MessageThreadsView/MessageThreadPage/Filter/FilterPopper';
import { assignmentOptions } from '../../src/app/views/MessageThreadsView/utils/constants';

jest.mock('@ringcentral-integration/micro-core/src/app/hooks', () => ({
  useLocale: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@ringcentral/spring-ui', () => ({
  Menu: ({
    open,
    onClose,
    children,
  }: {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }) =>
    open ? (
      <div data-sign="filter-menu">
        <button data-sign="menu-close" onClick={onClose}>
          close
        </button>
        {children}
      </div>
    ) : null,
}));

jest.mock(
  '../../src/app/views/MessageThreadsView/MessageThreadPage/Filter/FilterPopperMainView',
  () => ({
    FilterPopperMainView: ({
      isActive,
      getAssignmentText,
      getSharedWithMeText,
      onAssignmentClick,
      onSharedWithMeClick,
    }: {
      isActive: boolean;
      getAssignmentText: string;
      getSharedWithMeText: string;
      onAssignmentClick: (e: React.MouseEvent<HTMLElement>) => void;
      onSharedWithMeClick: (e: React.MouseEvent<HTMLElement>) => void;
    }) => (
      <div data-sign="main-view" data-active={isActive ? 'true' : 'false'}>
        <span data-sign="assignment-text">{getAssignmentText}</span>
        <span data-sign="shared-with-me-text">{getSharedWithMeText}</span>
        <button
          data-sign="open-assignment-view"
          onClick={(e) => onAssignmentClick(e as any)}
        >
          assignment
        </button>
        <button
          data-sign="open-shared-view"
          onClick={(e) => onSharedWithMeClick(e as any)}
        >
          shared
        </button>
      </div>
    ),
  }),
);

jest.mock(
  '../../src/app/views/MessageThreadsView/MessageThreadPage/Filter/FilterPopperAssignmentView',
  () => ({
    FilterPopperAssignmentView: ({
      isActive,
      onAssigneesChange,
      onBack,
      onDone,
    }: {
      isActive: boolean;
      onAssigneesChange: (ids: string[]) => void;
      onBack: () => void;
      onDone: () => void;
    }) => (
      <div
        data-sign="assignment-view"
        data-active={isActive ? 'true' : 'false'}
      >
        <button
          data-sign="assignment-change"
          onClick={() => onAssigneesChange(['__CURRENT_USER__'])}
        >
          change
        </button>
        <button data-sign="assignment-back" onClick={onBack}>
          back
        </button>
        <button data-sign="assignment-done" onClick={onDone}>
          done
        </button>
      </div>
    ),
  }),
);

jest.mock(
  '../../src/app/views/MessageThreadsView/MessageThreadPage/Filter/FilterPopperSharedWithMeView',
  () => ({
    FilterPopperSharedWithMeView: ({
      isActive,
      onCallQueuesChange,
      onSearchQueryChange,
      onBack,
      onDone,
    }: {
      isActive: boolean;
      onCallQueuesChange: (ids: string[]) => void;
      onSearchQueryChange: (value: string) => void;
      onBack: () => void;
      onDone: () => void;
    }) => (
      <div data-sign="shared-view" data-active={isActive ? 'true' : 'false'}>
        <button
          data-sign="shared-search"
          onClick={() => onSearchQueryChange('sales')}
        >
          search
        </button>
        <button
          data-sign="shared-change"
          onClick={() => onCallQueuesChange(['q2'])}
        >
          change
        </button>
        <button data-sign="shared-back" onClick={onBack}>
          back
        </button>
        <button data-sign="shared-done" onClick={onDone}>
          done
        </button>
      </div>
    ),
  }),
);

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

describe('FilterPopper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('applies assignment selection and closes popper on done', () => {
    const onClose = jest.fn();
    const onSharedSearchFormUpdate = jest.fn();

    render(
      <FilterPopper
        anchorEl={document.createElement('button')}
        open
        onClose={onClose}
        selectedAssignees={assignmentOptions.map((o) => o.value)}
        statusFilter={['Open', 'Resolved']}
        callQueues={callQueues}
        selectedRecipientExtensionIds={['q1', 'q2']}
        filter="All"
        onSharedSearchFormUpdate={onSharedSearchFormUpdate}
      />,
    );

    expect(
      document.querySelector('[data-sign="assignment-text"]')?.textContent,
    ).toBe('all');
    expect(
      document.querySelector('[data-sign="shared-with-me-text"]')?.textContent,
    ).toBe('all');

    fireEvent.click(
      document.querySelector(
        '[data-sign="open-assignment-view"]',
      ) as HTMLButtonElement,
    );
    fireEvent.click(
      document.querySelector(
        '[data-sign="assignment-change"]',
      ) as HTMLButtonElement,
    );
    fireEvent.click(
      document.querySelector(
        '[data-sign="assignment-done"]',
      ) as HTMLButtonElement,
    );

    expect(onSharedSearchFormUpdate).toHaveBeenCalledWith({
      selectedAssignees: ['__CURRENT_USER__'],
    });
    expect(onClose).toHaveBeenCalled();
  });

  it('applies shared-with-me selection and handles menu close/reset', () => {
    const onClose = jest.fn();
    const onSharedSearchFormUpdate = jest.fn();
    const { rerender } = render(
      <FilterPopper
        anchorEl={document.createElement('button')}
        open
        onClose={onClose}
        selectedAssignees={['__CURRENT_USER__']}
        statusFilter={['Open', 'Resolved']}
        callQueues={callQueues}
        selectedRecipientExtensionIds={['q1']}
        filter="Unread"
        onSharedSearchFormUpdate={onSharedSearchFormUpdate}
      />,
    );

    expect(
      document.querySelector('[data-sign="shared-with-me-text"]')?.textContent,
    ).toContain('Queue One');

    fireEvent.click(
      document.querySelector(
        '[data-sign="open-shared-view"]',
      ) as HTMLButtonElement,
    );
    fireEvent.click(
      document.querySelector(
        '[data-sign="shared-search"]',
      ) as HTMLButtonElement,
    );
    fireEvent.click(
      document.querySelector(
        '[data-sign="shared-change"]',
      ) as HTMLButtonElement,
    );
    fireEvent.click(
      document.querySelector('[data-sign="shared-done"]') as HTMLButtonElement,
    );

    expect(onSharedSearchFormUpdate).toHaveBeenCalledWith({
      selectedRecipientExtensionIds: ['q2'],
    });
    expect(onClose).toHaveBeenCalled();

    rerender(
      <FilterPopper
        anchorEl={document.createElement('button')}
        open={false}
        onClose={onClose}
        selectedAssignees={['__CURRENT_USER__']}
        statusFilter={['Open', 'Resolved']}
        callQueues={callQueues}
        selectedRecipientExtensionIds={['q1']}
        filter="Unread"
        onSharedSearchFormUpdate={onSharedSearchFormUpdate}
      />,
    );
    rerender(
      <FilterPopper
        anchorEl={document.createElement('button')}
        open
        onClose={onClose}
        selectedAssignees={['__CURRENT_USER__']}
        statusFilter={['Open', 'Resolved']}
        callQueues={callQueues}
        selectedRecipientExtensionIds={['q1']}
        filter="Unread"
        onSharedSearchFormUpdate={onSharedSearchFormUpdate}
      />,
    );

    expect(
      document.querySelector('[data-sign="shared-with-me-text"]')?.textContent,
    ).toContain('Queue One');
  });
});
