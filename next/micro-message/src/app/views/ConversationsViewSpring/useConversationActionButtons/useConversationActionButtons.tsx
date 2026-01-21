import {
  ActionMenuList,
  type ActionMenuListProps,
  type HistoryAction,
  type HistoryActionType,
  useHistoryActionButtons,
} from '@ringcentral-integration/next-widgets/components';
import { Menu, MenuItem, MenuItemText, MenuList } from '@ringcentral/spring-ui';
import React, { useMemo, useRef, useState } from 'react';

import type { FormattedConversation } from '../../../services';

import { ConversationLogPopover } from './ConversationLogPopover';

export interface UseConversationActionButtonsProps
  extends Pick<
    ActionMenuListProps,
    'variant' | 'displayCount' | 'moreButtonProps'
  > {
  actions: HistoryAction[];
  conversation: FormattedConversation;
  showLogPopover?: boolean;
  createNewEntityTooltip?: string;
  onAction: <T extends HistoryActionType>(
    actionType: T,
    data?: any,
  ) => Promise<void>;
}

export const useConversationActionButtons = ({
  displayCount,
  actions,
  conversation,
  showLogPopover,
  onAction,
  createNewEntityTooltip,
  variant,
  moreButtonProps,
}: UseConversationActionButtonsProps) => {
  const { conversationMatches: loggedEntities } = conversation;
  const [logPopperOpened, setLogPopperOpened] = useState(false);
  const [keepActions, setKeepActions] = useState(false);
  const [anchor, setMenuAnchor] = useState<Element | null>(null);
  const logRef = useRef(null);

  const buttons = useHistoryActionButtons(actions, (actionType, event) => {
    if (
      (actionType === 'createLog' ||
        actionType === 'selectRecordsForAutoLog') &&
      showLogPopover
    ) {
      setLogPopperOpened(true);
      return;
    }

    if (actionType === 'viewLog') {
      if (loggedEntities?.length === 1) {
        onAction('viewLog', loggedEntities[0]);
        return;
      } else {
        setMenuAnchor(event?.currentTarget as Element);
        setKeepActions(true);
      }
      return;
    }
    onAction(actionType);
  });

  const viewCRMLogMenu = useMemo(() => {
    if (loggedEntities?.length <= 1) {
      return null;
    }
    const menuList = loggedEntities.map(({ id, name, url }) => (
      <MenuItem
        title={name}
        key={id}
        data-sign={id}
        onClick={(e) => {
          onAction('viewLog', { id, name, url });
          e.stopPropagation();
        }}
      >
        <MenuItemText className="truncate">{name}</MenuItemText>
      </MenuItem>
    ));
    return (
      <Menu
        open={!!anchor}
        anchorEl={anchor}
        onClose={() => {
          setMenuAnchor(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onExitComplete={() => {
          setKeepActions(false);
        }}
        data-sign="viewCRMLogMenu"
      >
        <MenuList>{menuList}</MenuList>
      </Menu>
    );
  }, [anchor, loggedEntities, onAction]);

  const renderButtons = useMemo(() => {
    return (
      <ActionMenuList
        displayCount={displayCount}
        buttons={buttons}
        variant={variant}
        propsMap={
          variant === 'plain'
            ? {
                all: {
                  variant: 'icon',
                },
              }
            : undefined
        }
        forceActionsOpen={logPopperOpened || keepActions}
        refMap={{
          createLog: logRef,
          viewLog: logRef,
          selectRecordsForAutoLog: logRef,
        }}
        moreButtonProps={moreButtonProps}
      />
    );
  }, [
    displayCount,
    buttons,
    variant,
    logPopperOpened,
    keepActions,
    moreButtonProps,
  ]);

  const logPopover = useMemo(() => {
    return (
      <ConversationLogPopover
        anchorEl={logRef.current}
        opened={logPopperOpened}
        onClose={() => {
          setLogPopperOpened(false);
        }}
        conversation={conversation}
        createNewEntityTooltip={createNewEntityTooltip}
      />
    );
  }, [conversation, createNewEntityTooltip, logPopperOpened]);

  return (
    <>
      {renderButtons}
      {logPopover}
      {viewCRMLogMenu}
    </>
  );
};
