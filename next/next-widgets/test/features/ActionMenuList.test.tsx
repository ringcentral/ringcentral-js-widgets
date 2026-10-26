import {
  userEvent,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';

import { HistoryAction, SubmenuAction } from '../../components/ActionMenuList';

import { renderComponent } from './renderComponent';

export const mockActions: HistoryAction[] = [
  {
    type: 'addEntity',
  },
  {
    type: 'viewEntity',
  },
  {
    type: 'call',
  },
];

describe('ActionMenuList', () => {
  it('should render visible actions and menu button, when set 2 and the all length more that that should render first item and moreMenu', async () => {
    await renderComponent({
      actions: mockActions,
      onAction: jest.fn(),
      displayCount: 2,
    });

    expect(screen.getByTestId('addEntity')).toBeInTheDocument();
    expect(screen.getByTestId('more')).toBeInTheDocument();
    expect(screen.queryByTestId('viewEntity')).not.toBeInTheDocument();
    expect(screen.queryByTestId('call')).not.toBeInTheDocument();
  });

  it('should open menu and display menu actions when more button is clicked', async () => {
    await renderComponent({
      actions: mockActions,
      onAction: jest.fn(),
      displayCount: 2,
    });
    expect(screen.queryByTestId('call')).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('more'));

    expect(screen.getByTestId('call')).toBeInTheDocument();
  });

  it('should call onClick when an action is clicked', async () => {
    const onActionFn = jest.fn();
    await renderComponent({
      actions: mockActions,
      onAction: onActionFn,
    });

    await userEvent.click(screen.getByTestId('addEntity'));

    expect(onActionFn.mock.calls[0][0]).toBe('addEntity');
  });

  it('should close menu when clicking menu item', async () => {
    const onActionFn = jest.fn();
    await renderComponent({
      actions: mockActions,
      onAction: onActionFn,
      displayCount: 2,
    });

    expect(screen.queryByTestId('moreActionList')).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId('more'));
    expect(screen.getByTestId('moreActionList')).toBeInTheDocument();
    expect(screen.getByTestId('call')).toBeInTheDocument();

    jest.useFakeTimers();
    fireEvent.click(screen.getByTestId('call'));
    await act(async () => {
      jest.advanceTimersByTime(200);
      await waitForRenderReady();
    });
    // here inside fake timer, so we able to use fake timer
    await waitFor(() => {
      expect(screen.queryByTestId('moreActionList')).not.toBeInTheDocument();
    });
    jest.useRealTimers();
  });

  it('by default should not have more button when only 3 items', async () => {
    const onActionFn = jest.fn();
    await renderComponent({
      actions: mockActions,
      onAction: onActionFn,
    });

    expect(screen.queryByTestId('more')).not.toBeInTheDocument();
  });

  it('should render all actions when in plain mode', async () => {
    const onActionFn = jest.fn();
    await renderComponent({
      actions: mockActions,
      onAction: onActionFn,
      variant: 'plain',
    });

    expect(screen.queryByTestId('more')).not.toBeInTheDocument();

    expect(screen.queryAllByRole('button')).toHaveLength(mockActions.length);
  });

  describe('isSubmenu functionality', () => {
    const mockSubmenuActions: SubmenuAction[] = [
      {
        actionType: 'submenuAction1',
        label: 'Submenu Action 1',
        onClick: jest.fn(),
      },
      {
        actionType: 'submenuAction2',
        label: 'Submenu Action 2',
        onClick: jest.fn(),
      },
    ];

    const mockActionsWithSubmenu: HistoryAction[] = [
      {
        type: 'addEntity',
      },
      {
        type: 'viewEntity',
        isSubmenu: true,
        submenuActions: mockSubmenuActions,
      },
      {
        type: 'call',
      },
    ];

    const openViewEntitySubmenu = async () => {
      const viewEntity = screen.getByTestId('viewEntity');
      viewEntity.focus();
      fireEvent.keyDown(viewEntity, { key: 'ArrowRight' });
      await waitFor(() => {
        expect(screen.getByText('Submenu Action 1')).toBeInTheDocument();
      });
    };

    it('should render submenu in visible actions when isSubmenu is true', async () => {
      await renderComponent({
        actions: mockActionsWithSubmenu,
        onAction: jest.fn(),
        displayCount: 3,
      });

      // Should render the submenu button
      expect(screen.getByTestId('viewEntity')).toBeInTheDocument();

      // Should not render submenu items initially
      expect(screen.queryByTestId('submenuAction1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('submenuAction2')).not.toBeInTheDocument();
    });

    it('should render submenu in menu actions when isSubmenu is true', async () => {
      await renderComponent({
        actions: mockActionsWithSubmenu,
        onAction: jest.fn(),
        displayCount: 2, // Show 1 visible action, rest in menu
      });

      // Should render the more button
      expect(screen.getByTestId('more')).toBeInTheDocument();

      // Click more button to open menu
      await userEvent.click(screen.getByTestId('more'));

      // Should render the submenu in the menu
      expect(screen.getByTestId('viewEntity')).toBeInTheDocument();

      // Should not render submenu items initially
      expect(screen.queryByTestId('submenuAction1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('submenuAction2')).not.toBeInTheDocument();
    });

    it('should open submenu and display submenu actions when submenu button is clicked', async () => {
      await renderComponent({
        actions: mockActionsWithSubmenu,
        onAction: jest.fn(),
        displayCount: 2, // Show 1 visible action, rest in menu
      });

      // Open the main menu
      await userEvent.click(screen.getByTestId('more'));

      await openViewEntitySubmenu();

      // Should render submenu items
      expect(screen.getByTestId('submenuAction1')).toBeInTheDocument();
      expect(screen.getByTestId('submenuAction2')).toBeInTheDocument();
    });

    it('should call onClick when a submenu action is clicked', async () => {
      const onActionFn = jest.fn();
      const submenuAction1Click = jest.fn();
      const submenuAction2Click = jest.fn();

      const actionsWithSubmenuClicks: HistoryAction[] = [
        {
          type: 'addEntity',
        },
        {
          type: 'viewEntity',
          isSubmenu: true,
          submenuActions: [
            {
              actionType: 'submenuAction1',
              label: 'Submenu Action 1',
              onClick: submenuAction1Click,
            },
            {
              actionType: 'submenuAction2',
              label: 'Submenu Action 2',
              onClick: submenuAction2Click,
            },
          ],
        },
        {
          type: 'call',
        },
      ];

      await renderComponent({
        actions: actionsWithSubmenuClicks,
        onAction: onActionFn,
        displayCount: 2, // Show 1 visible action, rest in menu
      });

      // Open the main menu
      await userEvent.click(screen.getByTestId('more'));

      await openViewEntitySubmenu();

      // Click on first submenu action
      await userEvent.click(screen.getByTestId('submenuAction1'));

      expect(submenuAction1Click).toHaveBeenCalledTimes(1);
      expect(submenuAction2Click).not.toHaveBeenCalled();
    });

    it('should render submenu with custom icon when provided', async () => {
      const actionsWithCustomIcon: HistoryAction[] = [
        {
          type: 'addEntity',
        },
        {
          type: 'viewEntity',
          isSubmenu: true,
          submenuActions: [
            {
              actionType: 'submenuAction1',
              label: 'Submenu Action 1',
              onClick: jest.fn(),
              customIcon: 'Custom Icon Text',
            },
          ],
        },
        {
          type: 'call',
        },
      ];

      await renderComponent({
        actions: actionsWithCustomIcon,
        onAction: jest.fn(),
        displayCount: 2, // Show 1 visible action, rest in menu
      });

      // Open the main menu
      await userEvent.click(screen.getByTestId('more'));

      await openViewEntitySubmenu();

      // Should render custom icon text
      expect(screen.getByText('Custom Icon Text')).toBeInTheDocument();
    });

    it('should call onClick when submenuAction1 is clicked', async () => {
      const submenuAction1Click = jest.fn((e) => {
        return true;
      });
      const submenuAction2Click = jest.fn();
      const actionsWithSubmenuAction: HistoryAction[] = [
        {
          type: 'addEntity',
        },
        {
          type: 'viewEntity',
          isSubmenu: true,
          submenuActions: [
            {
              actionType: 'submenuAction1',
              label: 'Submenu Action 1',
              onClick: submenuAction1Click,
            },
            {
              actionType: 'submenuAction2',
              label: 'Submenu Action 2',
              onClick: submenuAction2Click,
            },
          ],
        },
        {
          type: 'call',
        },
      ];

      const action = jest.fn();
      await renderComponent({
        actions: actionsWithSubmenuAction,
        onAction: action,
        displayCount: 2, // Show 1 visible action, rest in menu
      });

      // Open the main menu
      await userEvent.click(screen.getByTestId('more'));

      await openViewEntitySubmenu();
      // Click on the submenu action
      await userEvent.click(screen.getByText('Submenu Action 1'));

      // Should call the onClick handler
      expect(submenuAction1Click).toHaveBeenCalledTimes(1);
      expect(action).not.toHaveBeenCalled();

      await openViewEntitySubmenu();
      // Click on the submenu action
      await userEvent.click(screen.getByText('Submenu Action 2'));

      // Should call the onClick handler
      expect(submenuAction2Click).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalled();
    });

    it('should handle disabled submenu actions', async () => {
      const actionsWithDisabledSubmenu: HistoryAction[] = [
        {
          type: 'addEntity',
        },
        {
          type: 'viewEntity',
          isSubmenu: true,
          submenuActions: [
            {
              actionType: 'submenuAction1',
              label: 'Submenu Action 1',
              onClick: jest.fn(),
              disabled: true,
            },
            {
              actionType: 'submenuAction2',
              label: 'Submenu Action 2',
              onClick: jest.fn(),
              disabled: false,
            },
          ],
        },
        {
          type: 'call',
        },
      ];

      await renderComponent({
        actions: actionsWithDisabledSubmenu,
        onAction: jest.fn(),
        displayCount: 2, // Show 1 visible action, rest in menu
      });

      // Open the main menu
      await userEvent.click(screen.getByTestId('more'));

      await openViewEntitySubmenu();

      const disabledAction = screen.getByTestId('submenuAction1');
      expect(disabledAction).toHaveAttribute('aria-disabled', 'true');

      const enabledAction = screen.getByTestId('submenuAction2');
      expect(enabledAction).not.toHaveAttribute('aria-disabled');
    });

    it('should handle disabled visible submenu button', async () => {
      const actionsWithDisabledSubmenuButton: HistoryAction[] = [
        {
          type: 'addEntity',
        },
        {
          type: 'viewEntity',
          isSubmenu: true,
          disabled: true, // Disable the submenu button itself
          submenuActions: [
            {
              actionType: 'submenuAction1',
              label: 'Submenu Action 1',
              onClick: jest.fn(),
            },
            {
              actionType: 'submenuAction2',
              label: 'Submenu Action 2',
              onClick: jest.fn(),
            },
          ],
        },
        {
          type: 'call',
        },
      ];

      await renderComponent({
        actions: actionsWithDisabledSubmenuButton,
        onAction: jest.fn(),
        displayCount: 3, // Show all actions as visible
      });

      // Check that the submenu button itself is disabled
      const submenuButton = screen.getByTestId('viewEntity');
      expect(submenuButton).toBeDisabled();
    });
  });
});
