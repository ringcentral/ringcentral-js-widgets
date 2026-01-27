import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import type { CallQueueInfo } from '@ringcentral-integration/micro-phone/src/app/services/CallQueues/CallQueues.interface';
import {
  CaretLeftMd,
  CaretRightMd,
  CheckMd,
  SearchMd,
} from '@ringcentral/spring-icon';
import {
  Button,
  Checkbox,
  Icon,
  IconButton,
  Menu,
  MenuDivider,
  MenuHeader,
  MenuItem,
  MenuItemText,
  MenuList,
  TextField,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';

import conversationsI18n from '../../ConversationsViewSpring/ConversationsPage/i18n';
import type {
  SharedFilterType,
  SharedSearchForm,
} from '../MessageThreads.view.interface';
import { assignmentOptionMap, type AssignmentOptionValue } from '../utils';

import i18n from './i18n';

const assignmentOptions = [
  assignmentOptionMap.currentUser,
  assignmentOptionMap.assignedToOthers,
  assignmentOptionMap.unassigned,
];

export type FilterPopperProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  selectedAssignees: AssignmentOptionValue[];
  statusFilter: ('Open' | 'Resolved')[];
  callQueues?: CallQueueInfo[];
  selectedCallQueues: string[];
  filter: SharedFilterType;
  onSharedSearchFormUpdate?: (updates: Partial<SharedSearchForm>) => void;
};

const footerClassName =
  'px-3 pt-2 border-t border-neutral-b4 flex items-center justify-end gap-3';

export const FilterPopper: React.FC<FilterPopperProps> = ({
  anchorEl,
  open,
  onClose,
  selectedAssignees,
  statusFilter,
  callQueues = [],
  selectedCallQueues,
  filter,
  onSharedSearchFormUpdate,
}) => {
  const { t } = useLocale(i18n, conversationsI18n);
  const [view, setView] = useState<'main' | 'assignment' | 'sharedWithMe'>(
    'main',
  );
  const [tempSelectedAssignees, setTempSelectedAssignees] =
    useState<AssignmentOptionValue[]>(selectedAssignees);
  const [tempSelectedCallQueues, setTempSelectedCallQueues] =
    useState<string[]>(selectedCallQueues);
  const [tempStatusFilter, setTempStatusFilter] =
    useState<('Open' | 'Resolved')[]>(statusFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (open) {
      setView('main');
      setTempSelectedAssignees(selectedAssignees);
      setTempSelectedCallQueues(selectedCallQueues);
      setSearchQuery('');
    } else {
      setView('main');
    }
  }, [open, selectedAssignees, selectedCallQueues]);

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
    setTempSelectedCallQueues(selectedCallQueues);
    setSearchQuery('');
    setView('main');
  };

  const handleShowAllChange = (checked: boolean) => {
    const allOptions = assignmentOptions.map((option) => option.value);
    setTempSelectedAssignees(checked ? allOptions : []);
  };

  const handleDone = () => {
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
    setTempSelectedCallQueues(selectedCallQueues);
    setSearchQuery('');
    setView('main');
  };

  const handleSharedWithMeDone = () => {
    onSharedSearchFormUpdate?.({
      selectedCallQueues: tempSelectedCallQueues,
    });
    setView('main');
    onClose?.();
  };

  const handleShowAllCallQueuesChange = (checked: boolean) => {
    if (checked) {
      const allQueueIds = callQueues.map((queue) => queue.id);
      setTempSelectedCallQueues(allQueueIds);
    } else {
      setTempSelectedCallQueues([]);
    }
  };

  const filteredCallQueues = useMemo(() => {
    if (!searchQuery.trim()) {
      return callQueues;
    }
    const lowerQuery = searchQuery.toLowerCase();
    return callQueues.filter(
      (queue) =>
        queue.name.toLowerCase().includes(lowerQuery) ||
        queue.extensionNumber.toLowerCase().includes(lowerQuery) ||
        queue.site?.name.toLowerCase().includes(lowerQuery),
    );
  }, [callQueues, searchQuery]);

  const isShowAllCallQueuesSelected = useMemo(() => {
    if (callQueues.length === 0) return false;
    return (
      tempSelectedCallQueues.length === callQueues.length &&
      callQueues.every((queue) => tempSelectedCallQueues.includes(queue.id))
    );
  }, [tempSelectedCallQueues, callQueues]);

  const isShowAllCallQueuesIndeterminate = useMemo(() => {
    if (callQueues.length === 0) return false;
    const selectedCount = tempSelectedCallQueues.length;
    return selectedCount > 0 && selectedCount < callQueues.length;
  }, [tempSelectedCallQueues, callQueues]);

  const getSharedWithMeText = useMemo(() => {
    if (
      tempSelectedCallQueues.length === 0 ||
      // If all call queues are selected, show "show all"
      (callQueues.length > 0 &&
        tempSelectedCallQueues.length === callQueues.length)
    ) {
      return t('all');
    }

    if (tempSelectedCallQueues.length === 1) {
      const queue = callQueues.find((q) => q.id === tempSelectedCallQueues[0]);
      const displayName = queue
        ? queue.site
          ? `${queue.name} | ${queue.site.name}`
          : queue.name
        : '';
      return displayName;
    }

    const firstQueue = callQueues.find(
      (q) => q.id === tempSelectedCallQueues[0],
    );
    const firstDisplayName = firstQueue
      ? firstQueue.site
        ? `${firstQueue.name} | ${firstQueue.site.name}`
        : firstQueue.name
      : '';

    return `${firstDisplayName} + ${tempSelectedCallQueues.length - 1} ${t(
      'more',
    )}`;
  }, [tempSelectedCallQueues, callQueues, t]);

  // Get assignment filter text
  const getAssignmentText = useMemo(() => {
    if (
      tempSelectedAssignees.length === 0 ||
      // If all assignees are selected, show "show all"
      assignmentOptions.every((option) =>
        tempSelectedAssignees.includes(option.value),
      )
    ) {
      return t('all');
    }

    // Collect labels and sort by priority order (using assignmentOptions order)
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

  return (
    <Menu
      open={open}
      variant="pointed"
      anchorEl={anchorEl}
      onClose={() => {
        // when close always reset value
        setView('main');
        setTempSelectedAssignees(selectedAssignees);
        setTempSelectedCallQueues(selectedCallQueues);
        setTempStatusFilter(statusFilter);
        setSearchQuery('');
        onClose?.();
      }}
      placement="bottom-end"
      onClick={(e) => {
        e.stopPropagation();
      }}
      data-sign="statusFilterMenu"
      className="overflow-hidden"
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={false}
    >
      <div className="relative w-[268px]">
        {/* Main View */}
        <div
          className={clsx(
            'transition-all duration-300 ease-in-out',
            view === 'main'
              ? 'translate-x-0 opacity-100 relative z-10 pointer-events-auto'
              : '-translate-x-full opacity-0 absolute inset-0 pointer-events-none z-0 invisible',
          )}
        >
          <MenuList>
            {mainFilterList.map(({ key, label, dataSign, updates }) => (
              <MenuItem
                key={key}
                highlighted={filter === key}
                onClick={(e) => {
                  e.stopPropagation();
                  onSharedSearchFormUpdate?.(updates);
                  onClose?.();
                }}
                data-sign={dataSign}
              >
                <MenuItemText>{label}</MenuItemText>
              </MenuItem>
            ))}
            <MenuDivider />
            <MenuItem disabled>
              <MenuItemText className="typography-descriptor text-neutral-b2">
                {t('status')}
              </MenuItemText>
            </MenuItem>
            {statusFilterList.map(({ key, label, dataSign }) => {
              const isSelected = tempStatusFilter.includes(key);
              const isDisabled = tempStatusFilter.length === 1 && isSelected;

              return (
                <MenuItem
                  key={key}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Prevent unchecking if it's the only selected option
                    if (isDisabled) return;

                    const newStatusFilter = isSelected
                      ? tempStatusFilter.filter((status) => status !== key)
                      : [...tempStatusFilter, key];
                    setTempStatusFilter(newStatusFilter);
                    onSharedSearchFormUpdate?.({
                      statusFilter: newStatusFilter,
                    });
                  }}
                  autoClose={false}
                  data-sign={dataSign}
                >
                  <MenuItemText
                    info={
                      isSelected ? (
                        <Icon
                          symbol={CheckMd}
                          className="text-neutral-b0"
                          size="small"
                        />
                      ) : undefined
                    }
                  >
                    {label}
                  </MenuItemText>
                </MenuItem>
              );
            })}
            <MenuDivider />
            <MenuItem
              onClick={handleAssignmentClick}
              data-sign="assignmentMenuItem"
              autoClose={false}
            >
              <MenuItemText
                info={
                  <Icon
                    symbol={CaretRightMd}
                    className="text-neutral-b0"
                    size="small"
                  />
                }
              >
                <div className="typography-descriptor text-neutral-b2">
                  {t('assignment')}
                </div>
                <span>{getAssignmentText}</span>
              </MenuItemText>
            </MenuItem>
            <MenuItem
              onClick={handleSharedWithMeClick}
              data-sign="sharedWithMeMenuItem"
              autoClose={false}
            >
              <MenuItemText
                info={
                  <Icon
                    symbol={CaretRightMd}
                    className="text-neutral-b0"
                    size="small"
                  />
                }
              >
                <div className="typography-descriptor text-neutral-b2">
                  {t('sharedWithMe')}
                </div>
                <span>{getSharedWithMeText}</span>
              </MenuItemText>
            </MenuItem>
          </MenuList>
        </div>

        {/* Assignment View */}
        <div
          className={clsx(
            'transition-all duration-300 ease-in-out',
            view === 'assignment'
              ? 'translate-x-0 opacity-100 relative z-10 pointer-events-auto'
              : '-translate-x-full opacity-0 absolute inset-0 pointer-events-none z-0 invisible',
          )}
        >
          <MenuHeader
            start={
              <IconButton
                color="secondary"
                variant="icon"
                size="small"
                symbol={CaretLeftMd}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBackToMainAssignment();
                }}
                data-sign="assignmentMenuBack"
              />
            }
          >
            {t('assignment')}
          </MenuHeader>
          <MenuList>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleShowAllChange(!isShowAllSelected);
              }}
              autoClose={false}
              data-sign="assignmentMenuShowAll"
            >
              <MenuItemText className="flex-1">{t('selectAll')}</MenuItemText>
              <Checkbox
                inputProps={{ tabIndex: -1 }}
                checked={isShowAllSelected}
                indeterminate={isShowAllIndeterminate}
                onChange={(e) => {
                  e.stopPropagation();
                  handleShowAllChange(e.target.checked);
                }}
              />
            </MenuItem>
            <MenuDivider />
            {assignmentOptions.map((option) => {
              const isSelected = tempSelectedAssignees.includes(option.value);
              return (
                <MenuItem
                  key={option.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    const newAssignees = isSelected
                      ? tempSelectedAssignees.filter(
                          (id) => id !== option.value,
                        )
                      : [...tempSelectedAssignees, option.value];
                    setTempSelectedAssignees(newAssignees);
                  }}
                  autoClose={false}
                  data-sign={option.dataSign}
                >
                  <MenuItemText className="flex-1">
                    {t(option.labelKey)}
                  </MenuItemText>
                  <Checkbox
                    inputProps={{ tabIndex: -1 }}
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      const newAssignees = e.target.checked
                        ? [...tempSelectedAssignees, option.value]
                        : tempSelectedAssignees.filter(
                            (id) => id !== option.value,
                          );
                      setTempSelectedAssignees(newAssignees);
                    }}
                  />
                </MenuItem>
              );
            })}
          </MenuList>

          <div className={footerClassName}>
            <Button
              variant="text"
              size="medium"
              fullWidth
              onClick={(e) => {
                e.stopPropagation();
                handleBackToMainAssignment();
              }}
              data-sign="assignmentMenuBackToMain"
            >
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              size="medium"
              disabled={tempSelectedAssignees.length === 0}
              onClick={(e) => {
                e.stopPropagation();
                handleDone();
              }}
              fullWidth
              data-sign="assignmentMenuDone"
            >
              {t('done')}
            </Button>
          </div>
        </div>

        {/* Shared with Me View */}
        <div
          className={clsx(
            'transition-all duration-300 ease-in-out',
            view === 'sharedWithMe'
              ? 'translate-x-0 opacity-100 relative z-10 pointer-events-auto'
              : '-translate-x-full opacity-0 absolute inset-0 pointer-events-none z-0 invisible',
          )}
        >
          <MenuHeader
            start={
              <IconButton
                color="secondary"
                variant="icon"
                size="small"
                symbol={CaretLeftMd}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBackToMainFromShared();
                }}
              />
            }
          >
            {t('sharedWithMe')}
          </MenuHeader>
          <div className="px-4 py-2">
            <TextField
              placeholder={t('search')}
              startAdornment={<Icon symbol={SearchMd} size="small" />}
              fullWidth
              size="medium"
              value={searchQuery}
              onChange={(e) => {
                e.stopPropagation();
                setSearchQuery(e.target.value);
              }}
              inputProps={{
                'data-sign': 'sharedWithMeSearch',
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {searchQuery.trim().length === 0 ? (
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleShowAllCallQueuesChange(!isShowAllCallQueuesSelected);
              }}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={false}
              autoClose={false}
              data-sign="sharedWithMeShowAll"
            >
              <MenuItemText className="flex-1">{t('selectAll')}</MenuItemText>
              <Checkbox
                inputProps={{ tabIndex: -1 }}
                checked={isShowAllCallQueuesSelected}
                indeterminate={isShowAllCallQueuesIndeterminate}
                onChange={(e) => {
                  e.stopPropagation();
                  handleShowAllCallQueuesChange(e.target.checked);
                }}
              />
            </MenuItem>
          ) : null}
          <MenuDivider />
          {searchQuery.trim().length > 0 && filteredCallQueues.length === 0 ? (
            <MenuItem disabled>
              <MenuItemText className="typography-descriptor text-neutral-b2 text-center mb-2">
                {t('noSearchResults')}
              </MenuItemText>
            </MenuItem>
          ) : (
            filteredCallQueues.length > 0 && (
              <MenuList
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={false}
                className="max-h-[200px] overflow-y-auto"
              >
                {filteredCallQueues.map((queue) => {
                  const isSelected = tempSelectedCallQueues.includes(queue.id);
                  const displayName = queue.site
                    ? `${queue.name} | ${queue.site.name}`
                    : queue.name;

                  return (
                    <MenuItem
                      key={queue.id}
                      // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus={false}
                      onClick={(e) => {
                        e.stopPropagation();
                        const newSelected = isSelected
                          ? tempSelectedCallQueues.filter(
                              (id) => id !== queue.id,
                            )
                          : [...tempSelectedCallQueues, queue.id];
                        setTempSelectedCallQueues(newSelected);
                      }}
                      autoClose={false}
                      data-sign={`sharedWithMeQueue-${queue.id}`}
                    >
                      <MenuItemText className="flex-1">
                        {displayName}
                      </MenuItemText>
                      <Checkbox
                        inputProps={{ tabIndex: -1 }}
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          const newSelected = e.target.checked
                            ? [...tempSelectedCallQueues, queue.id]
                            : tempSelectedCallQueues.filter(
                                (id) => id !== queue.id,
                              );
                          setTempSelectedCallQueues(newSelected);
                        }}
                      />
                    </MenuItem>
                  );
                })}
              </MenuList>
            )
          )}

          <div className={footerClassName}>
            <Button
              variant="text"
              size="medium"
              fullWidth
              onClick={(e) => {
                e.stopPropagation();
                handleBackToMainFromShared();
              }}
              data-sign="sharedWithMeMenuBackToMain"
            >
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              size="medium"
              fullWidth
              disabled={tempSelectedCallQueues.length === 0}
              onClick={(e) => {
                e.stopPropagation();
                handleSharedWithMeDone();
              }}
              data-sign="sharedWithMeMenuDone"
            >
              {t('done')}
            </Button>
          </div>
        </div>
      </div>
    </Menu>
  );
};
