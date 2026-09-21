import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { QueueConversationsFilter } from '../../src/app/views/ConversationsViewSpring/QueueConversationsPage/QueueConversationsFilter';

jest.mock('@ringcentral-integration/micro-core/src/app/hooks', () => ({
  useLocale: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@ringcentral/spring-icon', () => ({
  FilterMd: 'filter',
}));

jest.mock('@ringcentral/spring-ui', () => {
  const ReactModule = require('react') as typeof React;

  return {
    Button: ({ children, disabled, onClick, 'data-sign': dataSign }: any) => (
      <button data-sign={dataSign} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    ),
    Checkbox: ({ checked, indeterminate, inputProps }: any) => (
      <input
        type="checkbox"
        checked={checked}
        readOnly
        data-indeterminate={indeterminate ? 'true' : 'false'}
        {...inputProps}
      />
    ),
    Icon: () => <span>icon</span>,
    IconButton: ReactModule.forwardRef(
      (
        { children, onClick, ...props }: any,
        ref: React.Ref<HTMLButtonElement>,
      ) => (
        <button ref={ref} onClick={onClick} {...props}>
          {children}
        </button>
      ),
    ),
    Menu: ({ children, open, onClose, ...props }: any) =>
      open ? (
        <div {...props}>
          <button data-sign="closeMenu" onClick={onClose}>
            close
          </button>
          {children}
        </div>
      ) : null,
    MenuDivider: () => <hr />,
    MenuItem: ({ children, disabled, onClick, ...props }: any) => (
      <button disabled={disabled} onClick={onClick} {...props}>
        {children}
      </button>
    ),
    MenuItemText: ({ children, ...props }: any) => (
      <span {...props}>{children}</span>
    ),
    MenuList: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    TextField: ({ inputProps, onChange, value, ...props }: any) => (
      <input {...props} {...inputProps} value={value} onChange={onChange} />
    ),
  };
});

jest.mock('../../src/app/components', () => ({
  SearchInputToggle: ({
    expanded,
    onExpandedChange,
    onSearchInputChange,
    searchInput,
    'data-sign': dataSign,
  }: any) => (
    <div data-sign={dataSign}>
      <input
        data-sign="queueSearchInput"
        value={searchInput}
        onChange={onSearchInputChange}
      />
      <button
        data-sign="toggleQueueSearch"
        onClick={() => onExpandedChange(!expanded)}
      >
        toggle
      </button>
    </div>
  ),
}));

const callQueues = [
  {
    id: 'q1',
    name: 'Sales',
    extensionNumber: '1001',
    site: { name: 'London' },
  },
  { id: 'q2', name: 'Support', extensionNumber: '1002' },
  { id: 'q3', name: 'Billing', extensionNumber: '1003' },
  { id: 'q4', name: 'Success', extensionNumber: '1004' },
  { id: 'q5', name: 'Renewals', extensionNumber: '1005' },
  { id: 'q6', name: 'Returns', extensionNumber: '1006' },
  { id: 'q7', name: 'Partners', extensionNumber: '1007' },
] as any;

const createProps = (overrides: Record<string, unknown> = {}) => ({
  searchInput: '',
  filter: 'All' as const,
  selectedCallQueueIds: ['q1'],
  callQueues,
  onSearchInputChange: jest.fn(),
  onFilterChange: jest.fn(),
  onCallQueuesChange: jest.fn(),
  onReset: jest.fn(),
  ...overrides,
});

describe('QueueConversationsFilter', () => {
  it('updates search and primary filters while reflecting active filters', () => {
    const props = createProps({ filter: 'Failed' });

    render(<QueueConversationsFilter {...props} />);

    expect(
      document.querySelector('[data-sign="callQueueFilterMore"]')?.textContent,
    ).toContain('(2)');

    fireEvent.change(
      document.querySelector(
        '[data-sign="queueSearchInput"]',
      ) as HTMLInputElement,
      { target: { value: 'customer' } },
    );
    fireEvent.click(
      document.querySelector(
        '[data-sign="queueFilterUnread"]',
      ) as HTMLButtonElement,
    );
    fireEvent.click(
      document.querySelector(
        '[data-sign="queueFilterAll"]',
      ) as HTMLButtonElement,
    );

    expect(props.onSearchInputChange).toHaveBeenCalledWith('customer');
    expect(props.onFilterChange).toHaveBeenCalledWith('Unread');
    expect(props.onReset).toHaveBeenCalledTimes(1);

    fireEvent.click(
      document.querySelector(
        '[data-sign="toggleQueueSearch"]',
      ) as HTMLButtonElement,
    );
    expect(
      document.querySelector('[data-sign="queueFilterAll"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-sign="queueFilterUnread"]'),
    ).toBeNull();
  });

  it('applies selected queues and converts selecting every queue to all', () => {
    const props = createProps();
    const { rerender } = render(<QueueConversationsFilter {...props} />);

    fireEvent.click(
      document.querySelector(
        '[data-sign="callQueueFilterMore"]',
      ) as HTMLButtonElement,
    );
    fireEvent.click(
      document.querySelector(
        '[data-sign="queueFilterCallQueue-q2"]',
      ) as HTMLButtonElement,
    );
    fireEvent.click(
      document.querySelector(
        '[data-sign="queueFilterDone"]',
      ) as HTMLButtonElement,
    );

    expect(props.onCallQueuesChange).toHaveBeenCalledWith(['q1', 'q2']);

    const allSelectedProps = createProps({ selectedCallQueueIds: [] });
    rerender(<QueueConversationsFilter {...allSelectedProps} />);
    fireEvent.click(
      document.querySelector(
        '[data-sign="callQueueFilterMore"]',
      ) as HTMLButtonElement,
    );
    fireEvent.click(
      document.querySelector(
        '[data-sign="queueFilterDone"]',
      ) as HTMLButtonElement,
    );

    expect(allSelectedProps.onCallQueuesChange).toHaveBeenCalledWith([]);
  });

  it('filters queues, shows an empty result, and restores selection on cancel', () => {
    const props = createProps();

    render(<QueueConversationsFilter {...props} />);
    fireEvent.click(
      document.querySelector(
        '[data-sign="callQueueFilterMore"]',
      ) as HTMLButtonElement,
    );

    const search = document.querySelector(
      '[data-sign="callQueueFilterSearch"]',
    ) as HTMLInputElement;
    fireEvent.change(search, { target: { value: 'london' } });
    expect(
      document.querySelector('[data-sign="queueFilterCallQueue-q1"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-sign="queueFilterCallQueue-q2"]'),
    ).toBeNull();

    // extensionNumber should NOT be searchable/filterable
    fireEvent.change(search, { target: { value: '1001' } });
    expect(
      document.querySelector('[data-sign="queueFilterCallQueue-q1"]'),
    ).toBeNull();
    expect(document.body.textContent).toContain('noSearchResults');

    // name should still be searchable
    fireEvent.change(search, { target: { value: 'sales' } });
    expect(
      document.querySelector('[data-sign="queueFilterCallQueue-q1"]'),
    ).toBeInTheDocument();

    fireEvent.change(search, { target: { value: 'missing' } });
    expect(document.body.textContent).toContain('noSearchResults');

    fireEvent.click(
      document.querySelector(
        '[data-sign="queueFilterCancel"]',
      ) as HTMLButtonElement,
    );
    expect(
      document.querySelector('[data-sign="callQueueFilterMenu"]'),
    ).toBeNull();
  });
});
