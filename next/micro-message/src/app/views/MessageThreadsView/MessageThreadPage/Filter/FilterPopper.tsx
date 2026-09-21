import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import type { CallQueueInfo } from '@ringcentral-integration/micro-phone/src/app/services/CallQueues/CallQueues.interface';
import { Menu } from '@ringcentral/spring-ui';
import React, { useEffect, useMemo, useState } from 'react';

import conversationsI18n from '../../../ConversationsViewSpring/ConversationsPage/i18n';
import type {
  SharedFilterType,
  SharedSearchForm,
} from '../../MessageThreads.view.interface';
import {
  assignmentOptions,
  type AssignmentOptionValue,
} from '../../utils/constants';
import i18n from '../i18n';

import { FilterPopperAssignmentView } from './FilterPopperAssignmentView';
import { FilterPopperMainView } from './FilterPopperMainView';
import { FilterPopperSharedWithMeView } from './FilterPopperSharedWithMeView';

export type FilterPopperProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  selectedAssignees: AssignmentOptionValue[];
  statusFilter: ('Open' | 'Resolved')[];
  callQueues?: CallQueueInfo[];
  selectedRecipientExtensionIds: string[];
  filter: SharedFilterType;
  onSharedSearchFormUpdate?: (updates: Partial<SharedSearchForm>) => void;
};

export const FilterPopper: React.FC<FilterPopperProps> = ({
  anchorEl,
  open,
  onClose,
  selectedAssignees,
  statusFilter,
  callQueues = [],
  selectedRecipientExtensionIds,
  filter,
  onSharedSearchFormUpdate,
}) => {
  const { t } = useLocale(i18n, conversationsI18n);
  const [view, setView] = useState<'main' | 'assignment' | 'sharedWithMe'>(
    'main',
  );
  const [tempSelectedAssignees, setTempSelectedAssignees] =
    useState<AssignmentOptionValue[]>(selectedAssignees);
  const [
    tempSelectedRecipientExtensionIds,
    setTempSelectedRecipientExtensionIds,
  ] = useState<string[]>(selectedRecipientExtensionIds);
  const [tempStatusFilter, setTempStatusFilter] =
    useState<('Open' | 'Resolved')[]>(statusFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (open) {
      setView('main');
      setTempSelectedAssignees(selectedAssignees);
      setTempSelectedRecipientExtensionIds(selectedRecipientExtensionIds);
      setSearchQuery('');
    } else {
      setView('main');
    }
  }, [open, selectedAssignees, selectedRecipientExtensionIds]);

  const isShowAllSelected = useMemo(() => {
    return assignmentOptions.every((option) =>
      tempSelectedAssignees.includes(option.value),
    );
  }, [tempSelectedAssignees]);

  const isShowAllIndeterminate = useMemo(() => {
    const selectedCount = assignmentOptions.filter((option) =>
      tempSelectedAssignees.includes(option.value),
    ).length;
    return selectedCount > 0 && selectedCount < assignmentOptions.length;
  }, [tempSelectedAssignees]);

  const handleAssignmentClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setView('assignment');
  };

  const handleBackToMainAssignment = () => {
    setTempSelectedAssignees(selectedAssignees);
    setTempSelectedRecipientExtensionIds(selectedRecipientExtensionIds);
    setSearchQuery('');
    setView('main');
  };

  const handleShowAllChange = (checked: boolean) => {
    const allOptions = assignmentOptions.map((option) => option.value);
    setTempSelectedAssignees(checked ? allOptions : []);
  };

  const handleAssignmentDone = () => {
    onSharedSearchFormUpdate?.({
      selectedAssignees: tempSelectedAssignees,
    });
    setView('main');
    onClose?.();
  };

  const handleSharedWithMeClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setView('sharedWithMe');
  };

  const handleBackToMainFromShared = () => {
    setTempSelectedRecipientExtensionIds(selectedRecipientExtensionIds);
    setSearchQuery('');
    setView('main');
  };

  const handleSharedWithMeDone = () => {
    onSharedSearchFormUpdate?.({
      selectedRecipientExtensionIds: tempSelectedRecipientExtensionIds,
    });
    setView('main');
    onClose?.();
  };

  const handleShowAllCallQueuesChange = (checked: boolean) => {
    if (checked) {
      const allQueueIds = callQueues.map((queue) => queue.id);
      setTempSelectedRecipientExtensionIds(allQueueIds);
    } else {
      setTempSelectedRecipientExtensionIds([]);
    }
  };

  const filteredCallQueues = useMemo(() => {
    if (!searchQuery.trim()) {
      return callQueues;
    }
    const lowerQuery = searchQuery.toLowerCase();
    return callQueues.filter(
      (queue) =>
        queue.name?.toLowerCase().includes(lowerQuery) ||
        queue.extensionNumber?.toLowerCase().includes(lowerQuery) ||
        queue.site?.name?.toLowerCase().includes(lowerQuery),
    );
  }, [callQueues, searchQuery]);

  const isShowAllCallQueuesSelected = useMemo(() => {
    if (callQueues.length === 0) return false;
    return (
      tempSelectedRecipientExtensionIds.length === callQueues.length &&
      callQueues.every((queue) =>
        tempSelectedRecipientExtensionIds.includes(queue.id),
      )
    );
  }, [tempSelectedRecipientExtensionIds, callQueues]);

  const isShowAllCallQueuesIndeterminate = useMemo(() => {
    if (callQueues.length === 0) return false;
    const selectedCount = tempSelectedRecipientExtensionIds.length;
    return selectedCount > 0 && selectedCount < callQueues.length;
  }, [tempSelectedRecipientExtensionIds, callQueues]);

  const getSharedWithMeText = useMemo(() => {
    if (
      tempSelectedRecipientExtensionIds.length === 0 ||
      (callQueues.length > 0 &&
        tempSelectedRecipientExtensionIds.length === callQueues.length)
    ) {
      return t('all');
    }

    const formatQueueDisplayName = (q?: CallQueueInfo) => {
      if (!q) return '';
      return q.site ? `${q.name} | ${q.site.name}` : q.name;
    };

    if (tempSelectedRecipientExtensionIds.length === 1) {
      const queue = callQueues.find(
        (q) => q.id === tempSelectedRecipientExtensionIds[0],
      );
      return formatQueueDisplayName(queue);
    }

    const firstQueue = callQueues.find(
      (q) => q.id === tempSelectedRecipientExtensionIds[0],
    );
    const firstDisplayName = formatQueueDisplayName(firstQueue);

    return `${firstDisplayName} + ${
      tempSelectedRecipientExtensionIds.length - 1
    } ${t('more')}`;
  }, [tempSelectedRecipientExtensionIds, callQueues, t]);

  const getAssignmentText = useMemo(() => {
    if (
      tempSelectedAssignees.length === 0 ||
      assignmentOptions.every((option) =>
        tempSelectedAssignees.includes(option.value),
      )
    ) {
      return t('all');
    }

    const filterLabels: string[] = [];
    const selectedOptions = assignmentOptions.filter((option) =>
      tempSelectedAssignees.includes(option.value),
    );

    selectedOptions.forEach((option) => {
      filterLabels.push(t(option.labelKey));
    });

    if (filterLabels.length === 1) {
      return filterLabels[0];
    }

    return `${filterLabels[0]} + ${filterLabels.length - 1} ${t('more')}`;
  }, [tempSelectedAssignees, t]);

  const statusFilterList = useMemo(
    () =>
      [
        { key: 'Open', label: t('open'), dataSign: 'statusOpen' },
        {
          key: 'Resolved',
          label: t('resolved'),
          dataSign: 'statusResolved',
        },
      ] as const,
    [t],
  );

  const mainFilterList = useMemo(
    () => [
      {
        key: 'AssignedToMe' as const,
        label: t('assignedToMe'),
        dataSign: 'filterAssignedToMe',
        updates: {
          filter: 'AssignedToMe' as const,
          selectedAssignees: ['__CURRENT_USER__'] as AssignmentOptionValue[],
        },
      },
      {
        key: 'Unread' as const,
        label: t('unread'),
        dataSign: 'filterUnread',
        updates: { filter: 'Unread' as const },
      },
    ],
    [t],
  );

  const handleMenuClose = () => {
    setView('main');
    setTempSelectedAssignees(selectedAssignees);
    setTempSelectedRecipientExtensionIds(selectedRecipientExtensionIds);
    setTempStatusFilter(statusFilter);
    setSearchQuery('');
    onClose?.();
  };

  return (
    <Menu
      open={open}
      variant="pointed"
      anchorEl={anchorEl}
      onClose={() => {
        handleMenuClose();
      }}
      placement="bottom-end"
      onClick={(e) => {
        // TODO: spring-ui issue, when click the backdrop will trigger the onClick event also UXSYS-3892
        e.stopPropagation();
      }}
      data-sign="statusFilterMenu"
      className="overflow-hidden"
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={false}
    >
      <div className="relative w-[268px]">
        <FilterPopperMainView
          isActive={view === 'main'}
          filter={filter}
          tempStatusFilter={tempStatusFilter}
          onSharedSearchFormUpdate={onSharedSearchFormUpdate}
          onClose={onClose}
          onStatusFilterChange={setTempStatusFilter}
          getAssignmentText={getAssignmentText}
          getSharedWithMeText={getSharedWithMeText}
          onAssignmentClick={handleAssignmentClick}
          onSharedWithMeClick={handleSharedWithMeClick}
          mainFilterList={mainFilterList}
          statusFilterList={statusFilterList}
        />

        <FilterPopperAssignmentView
          isActive={view === 'assignment'}
          tempSelectedAssignees={tempSelectedAssignees}
          assignmentOptions={assignmentOptions}
          isShowAllSelected={isShowAllSelected}
          isShowAllIndeterminate={isShowAllIndeterminate}
          onShowAllChange={handleShowAllChange}
          onAssigneesChange={setTempSelectedAssignees}
          onBack={handleBackToMainAssignment}
          onDone={handleAssignmentDone}
        />

        <FilterPopperSharedWithMeView
          isActive={view === 'sharedWithMe'}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          filteredCallQueues={filteredCallQueues}
          tempSelectedRecipientExtensionIds={tempSelectedRecipientExtensionIds}
          isShowAllCallQueuesSelected={isShowAllCallQueuesSelected}
          isShowAllCallQueuesIndeterminate={isShowAllCallQueuesIndeterminate}
          onShowAllCallQueuesChange={handleShowAllCallQueuesChange}
          onCallQueuesChange={setTempSelectedRecipientExtensionIds}
          onBack={handleBackToMainFromShared}
          onDone={handleSharedWithMeDone}
        />
      </div>
    </Menu>
  );
};
