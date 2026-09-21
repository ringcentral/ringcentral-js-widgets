import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { CaretRightMd, CheckMd } from '@ringcentral/spring-icon';
import {
  Icon,
  MenuDivider,
  MenuItem,
  MenuItemText,
  MenuList,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React from 'react';

import conversationsI18n from '../../../ConversationsViewSpring/ConversationsPage/i18n';
import type {
  SharedFilterType,
  SharedSearchForm,
} from '../../MessageThreads.view.interface';
import type { AssignmentOptionValue } from '../../utils/constants';
import i18n from '../i18n';

export type FilterPopperMainViewProps = {
  isActive: boolean;
  filter: SharedFilterType;
  tempStatusFilter: ('Open' | 'Resolved')[];
  onSharedSearchFormUpdate?: (updates: Partial<SharedSearchForm>) => void;
  onClose: () => void;
  onStatusFilterChange: (statusFilter: ('Open' | 'Resolved')[]) => void;
  getAssignmentText: string;
  getSharedWithMeText: string;
  onAssignmentClick: (e: React.MouseEvent<HTMLElement>) => void;
  onSharedWithMeClick: (e: React.MouseEvent<HTMLElement>) => void;
  mainFilterList: ReadonlyArray<{
    key: 'AssignedToMe' | 'Unread';
    label: string;
    dataSign: string;
    updates: Partial<SharedSearchForm> & {
      filter?: SharedFilterType;
      selectedAssignees?: AssignmentOptionValue[];
    };
  }>;
  statusFilterList: ReadonlyArray<{
    key: 'Open' | 'Resolved';
    label: string;
    dataSign: string;
  }>;
};

export const FilterPopperMainView: React.FC<FilterPopperMainViewProps> = ({
  isActive,
  filter,
  tempStatusFilter,
  onSharedSearchFormUpdate,
  onClose,
  onStatusFilterChange,
  getAssignmentText,
  getSharedWithMeText,
  onAssignmentClick,
  onSharedWithMeClick,
  mainFilterList,
  statusFilterList,
}) => {
  const { t } = useLocale(i18n, conversationsI18n);

  return (
    <div
      data-sign="mainFilterListContainer"
      data-active={isActive}
      className={clsx(
        'transition-all duration-300 ease-in-out',
        isActive
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

          const handleClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            if (isDisabled) return;

            const newStatusFilter = isSelected
              ? tempStatusFilter.filter((status) => status !== key)
              : [...tempStatusFilter, key];
            onStatusFilterChange(newStatusFilter);
            onSharedSearchFormUpdate?.({
              statusFilter: newStatusFilter,
            });
          };
          return (
            <MenuItem
              key={key}
              onClick={handleClick}
              autoClose={false}
              data-sign={dataSign}
            >
              <MenuItemText
                data-checked={isSelected}
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
                <input
                  type="checkbox"
                  aria-label={label}
                  className="hidden"
                  checked={isSelected}
                  onChange={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleClick(e as unknown as React.MouseEvent);
                  }}
                />
              </MenuItemText>
            </MenuItem>
          );
        })}
        <MenuDivider />
        <MenuItem
          onClick={onAssignmentClick}
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
          onClick={onSharedWithMeClick}
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
  );
};
