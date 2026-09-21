import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { CaretLeftMd } from '@ringcentral/spring-icon';
import {
  Button,
  Checkbox,
  IconButton,
  MenuDivider,
  MenuHeader,
  MenuItem,
  MenuItemText,
  MenuList,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React from 'react';

import conversationsI18n from '../../../ConversationsViewSpring/ConversationsPage/i18n';
import type {
  AssignmentOption,
  AssignmentOptionValue,
} from '../../utils/constants';
import i18n from '../i18n';

const footerClassName =
  'px-3 pt-2 border-t border-neutral-b4 flex items-center justify-end gap-3';

export type FilterPopperAssignmentViewProps = {
  isActive: boolean;
  tempSelectedAssignees: AssignmentOptionValue[];
  assignmentOptions: readonly AssignmentOption[];
  isShowAllSelected: boolean;
  isShowAllIndeterminate: boolean;
  onShowAllChange: (checked: boolean) => void;
  onAssigneesChange: (assignees: AssignmentOptionValue[]) => void;
  onBack: () => void;
  onDone: () => void;
};

export const FilterPopperAssignmentView: React.FC<
  FilterPopperAssignmentViewProps
> = ({
  isActive,
  tempSelectedAssignees,
  assignmentOptions,
  isShowAllSelected,
  isShowAllIndeterminate,
  onShowAllChange,
  onAssigneesChange,
  onBack,
  onDone,
}) => {
  const { t } = useLocale(i18n, conversationsI18n);

  const handleShowAllClick = (e: any) => {
    e.stopPropagation();
    onShowAllChange(!isShowAllSelected);
  };

  const handleOptionClick = (option: AssignmentOption) => (e: any) => {
    e.stopPropagation();
    const isSelected = tempSelectedAssignees.includes(option.value);
    const newAssignees = !isSelected
      ? [...tempSelectedAssignees, option.value]
      : tempSelectedAssignees.filter((id) => id !== option.value);
    onAssigneesChange(newAssignees);
  };

  return (
    <div
      data-sign="assignmentFilterListContainer"
      data-active={isActive}
      className={clsx(
        'transition-all duration-300 ease-in-out',
        isActive
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
              onBack();
            }}
            data-sign="assignmentMenuBack"
          />
        }
      >
        {t('assignment')}
      </MenuHeader>
      <MenuList>
        <MenuItem
          onClick={handleShowAllClick}
          autoClose={false}
          data-sign="assignmentMenuShowAll"
        >
          <MenuItemText className="flex-1">{t('selectAll')}</MenuItemText>
          <Checkbox
            inputProps={{
              tabIndex: -1,
              'aria-label': t('selectAll'),
            }}
            checked={isShowAllSelected}
            indeterminate={isShowAllIndeterminate}
            onChange={handleShowAllClick}
          />
        </MenuItem>
        <MenuDivider />
        {assignmentOptions.map((option) => {
          const isSelected = tempSelectedAssignees.includes(option.value);
          return (
            <MenuItem
              key={option.value}
              onClick={handleOptionClick(option)}
              autoClose={false}
              data-sign={option.dataSign}
            >
              <MenuItemText className="flex-1">
                {t(option.labelKey)}
              </MenuItemText>
              <Checkbox
                inputProps={{
                  tabIndex: -1,
                  'aria-label': t(option.labelKey),
                }}
                checked={isSelected}
                onChange={handleOptionClick(option)}
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
            onBack();
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
            onDone();
          }}
          fullWidth
          data-sign="assignmentMenuDone"
        >
          {t('done')}
        </Button>
      </div>
    </div>
  );
};
