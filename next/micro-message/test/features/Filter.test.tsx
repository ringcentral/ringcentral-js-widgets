import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { Filter } from '../../src/app/views/MessageThreadsView/MessageThreadPage/Filter/Filter';
import { assignmentOptions } from '../../src/app/views/MessageThreadsView/utils/constants';

jest.mock('@ringcentral-integration/micro-core/src/app/hooks', () => ({
  useLocale: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@ringcentral-integration/react-hooks', () => ({
  useAsyncState: (
    initialValue: string,
    onChanged?: (value: string) => void,
  ) => {
    const ReactModule = require('react') as typeof React;
    const [value, setValue] = ReactModule.useState(initialValue);
    return [
      value,
      (nextValue: string) => {
        setValue(nextValue);
        onChanged?.(nextValue);
      },
    ] as const;
  },
}));

jest.mock('@ringcentral/spring-ui', () => {
  const ReactModule = require('react') as typeof React;
  return {
    Icon: () => <span data-sign="mock-icon">icon</span>,
    IconButton: ReactModule.forwardRef(
      (
        {
          children,
          onClick,
          'data-sign': dataSign,
          'data-highlighted': highlighted,
        }: {
          children: React.ReactNode;
          onClick?: () => void;
          'data-sign'?: string;
          'data-highlighted'?: boolean;
        },
        ref: React.Ref<HTMLButtonElement>,
      ) => (
        <button
          ref={ref}
          data-sign={dataSign}
          data-highlighted={highlighted ? 'true' : 'false'}
          onClick={onClick}
        >
          {children}
        </button>
      ),
    ),
    useDebounce: (fn: (...args: any[]) => any) => fn,
    usePrevious: (selector: () => any) => {
      const value = selector();
      const ref = ReactModule.useRef<any>();
      const prev = ref.current;
      ReactModule.useEffect(() => {
        ref.current = value;
      }, [value]);
      return prev;
    },
  };
});

jest.mock('../../src/app/components', () => ({
  SearchInputToggle: ({
    searchInput,
    onSearchInputChange,
    expanded,
    onExpandedChange,
    'data-sign': dataSign,
  }: {
    searchInput: string;
    onSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    expanded: boolean;
    onExpandedChange: (expanded: boolean) => void;
    'data-sign': string;
  }) => (
    <div data-sign={dataSign}>
      <input
        data-sign="filter-search-input"
        value={searchInput}
        onChange={onSearchInputChange}
      />
      <button
        data-sign="toggle-search-expanded"
        onClick={() => onExpandedChange(!expanded)}
      >
        toggle
      </button>
    </div>
  ),
}));

jest.mock(
  '../../src/app/views/MessageThreadsView/MessageThreadPage/Filter/FilterPopper',
  () => ({
    FilterPopper: ({
      open,
      selectedAssignees,
      selectedRecipientExtensionIds,
    }: {
      open: boolean;
      selectedAssignees: string[];
      selectedRecipientExtensionIds: string[];
    }) => (
      <div
        data-sign="filter-popper"
        data-open={open ? 'true' : 'false'}
        data-assignees={selectedAssignees.join(',')}
        data-call-queues={selectedRecipientExtensionIds.join(',')}
      />
    ),
  }),
);

describe('Filter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('toggles filter popper, updates filter buttons and debounced search', () => {
    const onSharedSearchFormUpdate = jest.fn();
    const callQueues = [
      { id: 'q1', name: 'Queue 1' },
      { id: 'q2', name: 'Queue 2' },
    ] as any;

    render(
      <Filter
        form={{
          searchInput: '',
          filter: 'All',
          statusFilter: ['Open', 'Resolved'],
          selectedAssignees: assignmentOptions.map((o) => o.value),
          selectedRecipientExtensionIds: ['q1', 'q2'],
        }}
        onSharedSearchFormUpdate={onSharedSearchFormUpdate}
        callQueues={callQueues}
        assignmentOptions={assignmentOptions}
      />,
    );

    fireEvent.change(
      document.querySelector(
        '[data-sign="filter-search-input"]',
      ) as HTMLInputElement,
      {
        target: { value: 'john' },
      },
    );
    expect(onSharedSearchFormUpdate).toHaveBeenCalledWith({
      searchInput: 'john',
    });

    fireEvent.click(
      document.querySelector(
        '[data-sign="filterToggleButton"]',
      ) as HTMLButtonElement,
    );
    expect(onSharedSearchFormUpdate).toHaveBeenCalledWith({
      filter: 'AssignedToMe',
      selectedAssignees: ['__CURRENT_USER__'],
    });

    fireEvent.click(
      document.querySelector(
        '[data-sign="filterAllButton"]',
      ) as HTMLButtonElement,
    );
    expect(onSharedSearchFormUpdate).toHaveBeenCalledWith('reset');

    fireEvent.click(
      document.querySelector(
        '[data-sign="messageThreadFilterIcon"]',
      ) as HTMLButtonElement,
    );
    expect(
      document.querySelector('[data-sign="filter-popper"]'),
    ).toHaveAttribute('data-open', 'true');
  });

  it('shows active filter count and only active filter button when search expanded', () => {
    render(
      <Filter
        form={{
          searchInput: '',
          filter: 'Unread',
          statusFilter: ['Open'],
          selectedAssignees: ['__CURRENT_USER__'],
          selectedRecipientExtensionIds: ['q1'],
        }}
        onSharedSearchFormUpdate={jest.fn()}
        callQueues={
          [
            { id: 'q1', name: 'Queue 1' },
            { id: 'q2', name: 'Queue 2' },
          ] as any
        }
        assignmentOptions={assignmentOptions}
      />,
    );

    expect(
      document.querySelector('[data-sign="messageThreadFilterIcon"]')
        ?.textContent,
    ).toContain('(3)');

    fireEvent.click(
      document.querySelector(
        '[data-sign="toggle-search-expanded"]',
      ) as HTMLButtonElement,
    );

    expect(
      document.querySelector('[data-sign="filterToggleButton"]'),
    ).toBeInTheDocument();
    expect(document.querySelector('[data-sign="filterAllButton"]')).toBeNull();
  });
});
