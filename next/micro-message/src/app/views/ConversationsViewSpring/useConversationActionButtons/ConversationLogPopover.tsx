import {
  type SimpleCrmObject,
  type ReferenceItemClickHandler,
  type SelectedIdMap,
  ReferenceMainContent,
  ReferenceSearchPanel,
} from '@ringcentral-integration/micro-phone/src/app/components/ReferenceWidgetSpring';
import type { IntegrationConfig } from '@ringcentral-integration/micro-setting/src/app/services';
import { useContainer } from '@ringcentral-integration/next-core';
import { useAsyncState } from '@ringcentral-integration/react-hooks';
import { PlusMd } from '@ringcentral/spring-icon';
import {
  Button,
  Popover,
  TextField,
  IconButton,
  PopoverProps,
} from '@ringcentral/spring-ui';
import type { FunctionComponent } from 'react';
import React, { useState, useMemo, useCallback } from 'react';
import { usePromise } from 'react-use';

import {
  ConversationMatch,
  type FilteredConversation,
} from '../../../services';

import { t } from './i18n';

export interface ConversationLogPopoverProps {
  anchorEl: PopoverProps['anchorEl'];
  opened: boolean;
  onClose: () => void;
  conversation: FilteredConversation;
  onCreateEntity?: () => void;
  createNewEntityTooltip?: string;
}

export interface ConversationLogPopoverOptions {
  maxLogRecordsCount?: number;
  searchThirdPartyRecord?: (
    searchString: string,
  ) => Promise<SimpleCrmObject[] | undefined>;
  onSelectContact?: (conversationLogId: string, item: SimpleCrmObject) => void;
  onSave: (
    conversationId: string,
    selectedEntities: SimpleCrmObject[],
  ) => Promise<void>;
  useMenuList?: boolean;
  getIcon?: (item: SimpleCrmObject) => React.ReactNode;
}

export const ConversationLogPopover: FunctionComponent<
  ConversationLogPopoverProps
> = ({
  anchorEl,
  onClose,
  opened,
  conversation,
  onCreateEntity,
  createNewEntityTooltip,
}) => {
  const conversationLogPopoverOptions = useContainer<
    ConversationLogPopoverOptions,
    true
  >('ConversationLogPopoverOptions');
  const mounted = usePromise();

  const integrationConfig =
    useContainer<IntegrationConfig>('IntegrationConfig');

  const handleCreateEntity = () => {
    (onCreateEntity || integrationConfig.onCreateEntity)?.();
  };

  const { maxLogRecordsCount } = conversationLogPopoverOptions || {};

  const {
    conversationMatches,
    correspondentMatches: matches,
    conversationId,
    conversationLogId,
  } = conversation;

  const thirdPartyMatches = useMemo(
    () => matches.filter(({ resourceType }) => resourceType),
    [matches],
  );

  const allDisplayList = [
    {
      label: t('suggested'),
      values: thirdPartyMatches,
    },
  ];

  const formKey = 'conversationDetailViewPopover';

  const [inputValue, setInputValue] = useState('');
  const [selectedEntities, setSelectedEntities] =
    useAsyncState(conversationMatches);
  const [saving, setSaving] = useState(false);
  const [searchOpened, setSearchOpened] = useState(false);
  const openSearchPage = useCallback(() => {
    setSearchOpened(true);
  }, []);
  const closeSearchPage = useCallback(() => {
    setSearchOpened(false);
  }, []);

  const selectedMap = useMemo(
    () =>
      (selectedEntities as SimpleCrmObject[]).reduce((acc, item) => {
        acc[item.id!] = true;
        return acc;
      }, {} as SelectedIdMap),
    [selectedEntities],
  );

  const onSelectContact = conversationLogPopoverOptions?.onSelectContact;

  const referenceItemClickHandler = useCallback<ReferenceItemClickHandler>(
    (item, isSelected) => {
      const newSelectedEntities = isSelected
        ? [...selectedEntities, item as ConversationMatch]
        : selectedEntities.filter((entity) => entity.id !== item.id);
      setSelectedEntities([...newSelectedEntities]);
      onSelectContact?.(conversationLogId, item);
    },
    [selectedEntities, setSelectedEntities, onSelectContact, conversationLogId],
  );

  const reachMaxSelectCount =
    maxLogRecordsCount && selectedEntities.length > maxLogRecordsCount;

  const onPressEnter = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (inputValue.length < 3 || searchOpened) return;
        openSearchPage();
      }
    },
    [inputValue, searchOpened, openSearchPage],
  );

  return (
    <>
      <Popover
        anchorEl={anchorEl}
        open={opened && !searchOpened}
        onClose={onClose}
        placement="bottom"
        shadow
        variant="standard"
        bordered
        data-sign="smsLogPopover"
        onClick={(e) => {
          // TODO: spring-ui issue, click event will trigger the host item click event
          e.stopPropagation();
        }}
      >
        <div>
          <div className="flex items-center gap-2 p-2 pl-3">
            <TextField
              fullWidth
              value={inputValue}
              size="medium"
              inputProps={{
                'data-sign': 'smsSearchInput',
              }}
              onKeyDown={onPressEnter}
              onChange={(e) => {
                e.stopPropagation();
                setInputValue(e.target.value);
              }}
              placeholder={t('search')}
            />
            <IconButton
              TooltipProps={{
                title: createNewEntityTooltip,
              }}
              data-sign="addEntity"
              symbol={PlusMd}
              color="secondary"
              variant="icon"
              onClick={handleCreateEntity}
            />
          </div>

          <ReferenceMainContent
            filterTerm={inputValue}
            formKey={formKey}
            allDisplayList={allDisplayList}
            currentValue={selectedEntities}
            onItemClick={referenceItemClickHandler}
            searchFn={openSearchPage}
            errorHint={
              reachMaxSelectCount
                ? t('logConversationMaxRecords', { count: maxLogRecordsCount })
                : ''
            }
            useMenuList={conversationLogPopoverOptions?.useMenuList}
            getIcon={conversationLogPopoverOptions?.getIcon}
          />
          <div className="flex justify-between px-3 py-4">
            <div className="w-[135px]">
              <Button
                variant="text"
                size="medium"
                fullWidth
                data-sign="cancel-button"
                onClick={onClose}
              >
                {t('cancel')}
              </Button>
            </div>
            <div className="w-[135px]">
              <Button
                size="medium"
                fullWidth
                data-sign="save-button"
                disabled={
                  reachMaxSelectCount || selectedEntities.length === 0 || saving
                }
                loading={saving}
                onClick={async () => {
                  try {
                    setSaving(true);

                    const promise = conversationLogPopoverOptions?.onSave(
                      conversationId!,
                      selectedEntities as SimpleCrmObject[],
                    );

                    if (promise) await mounted(promise);
                    onClose();
                  } catch (error) {
                    console.error('save error');
                  } finally {
                    setSaving(false);
                  }
                }}
              >
                {t('save')}
              </Button>
            </div>
          </div>
        </div>
      </Popover>
      {searchOpened && (
        <ReferenceSearchPanel
          closePageFn={closeSearchPage}
          onCreateEntity={handleCreateEntity}
          onBack={() => {
            setInputValue('');
          }}
          onItemClick={referenceItemClickHandler}
          selectedMap={selectedMap}
          searchFn={conversationLogPopoverOptions?.searchThirdPartyRecord}
          initValue={inputValue}
          useMenuList={conversationLogPopoverOptions?.useMenuList}
          getIcon={conversationLogPopoverOptions?.getIcon}
          addEntityTooltip={createNewEntityTooltip}
        />
      )}
    </>
  );
};
