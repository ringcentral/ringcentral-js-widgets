/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { ComponentProps, FunctionComponent } from 'react';
import React, { useEffect, useState } from 'react';

import { SelectListBasic, type SelectListBasicProps } from '../SelectListBasic';

import { ListView, type ListViewProps } from './ListView';
import { WithScrollCheck } from './WithScrollCheck';
import styles from './styles.scss';

export const SelectListBasicWithScrollCheck: FunctionComponent<SelectListBasicProps> =
  WithScrollCheck(SelectListBasic);

export type SelectListProps = {
  title: string;
  otherOptions?: object[];
  associatedOptions?: object[];
  showOtherSection?: boolean;
  showAssociatedSection?: boolean;
  placeholder?: string;
  searchOption: (...args: any[]) => any;
  disabled?: boolean;
  field?: string;
  value?: any;
  rightIcon?: JSX.Element;
  onSelectViewVisible?: (...args: any[]) => any;
  currentLocale: string;
  matchedTitle?: string;
  otherTitle?: string;
  associatedTitle?: string;
  backHeaderClassName?: string;
  contactSearch?: (...args: any[]) => any;
  appName?: string;
  autoClose?: boolean;
  onBackClick: () => void;
  multiple?: boolean;
  isSearching?: boolean;
} & Pick<
  ListViewProps,
  | 'options'
  | 'valueFunction'
  | 'renderFunction'
  | 'startAdornment'
  | 'onChange'
  | 'secondaryRenderFunction'
> &
  Pick<
    SelectListBasicProps,
    | 'foundFromServerEntities'
    | 'foundFromServerTitle'
    | 'showFoundFromServer'
    | 'serverEntitiesClientFilter'
    | 'showRecentlySection'
    | 'recentlyEntities'
    | 'recentlyTitle'
  >;

export type RenderListView = ComponentProps<
  typeof SelectListBasicWithScrollCheck
>['renderListView'];

export const SelectList: FunctionComponent<SelectListProps> = (props) => {
  const {
    field,
    appName,
    children,
    disabled,
    onChange,
    autoClose,
    otherTitle,
    onBackClick,
    matchedTitle,
    currentLocale,
    valueFunction,
    renderFunction,
    startAdornment,
    associatedTitle,
    value: sourceValue,
    backHeaderClassName,
    onSelectViewVisible,
    foundFromServerTitle,
    secondaryRenderFunction,
    multiple,
  } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    onSelectViewVisible(open, field);
  }, [field, onSelectViewVisible, open]);

  const renderListView: RenderListView = (data, type, filter, scrollCheck) => (
    <ListView
      filter={filter}
      options={data}
      value={sourceValue}
      onChange={(value) => {
        if (document.activeElement) {
          (document.activeElement as HTMLInputElement).blur();
        }
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        onChange(value);
        // auto close select section after selected a value
        if (autoClose) {
          setOpen(false);
          onBackClick();
        }
      }}
      renderFunction={renderFunction}
      secondaryRenderFunction={secondaryRenderFunction}
      valueFunction={valueFunction}
      onSelect={(elm) => scrollCheck(elm, type)}
      startAdornment={startAdornment}
      multiple={multiple}
    />
  );

  return (
    <div
      // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
      className={disabled ? styles.disabled : null}
      data-sign="select-list-panel"
    >
      <div
        className={styles.field}
        data-sign="select-list-open"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (disabled) {
            return;
          }
          setOpen(true);
        }}
      >
        {children}
      </div>
      <SelectListBasicWithScrollCheck
        {...props}
        matchedTitle={matchedTitle}
        data-sign={`select-list-panel-${field}`}
        otherTitle={otherTitle}
        associatedTitle={associatedTitle}
        foundFromServerTitle={foundFromServerTitle}
        renderListView={renderListView}
        open={open}
        setOpen={setOpen}
        backHeaderClassName={backHeaderClassName}
      />
    </div>
  );
};

SelectList.defaultProps = {
  options: [],
  otherOptions: [],
  associatedOptions: [],
  showAssociatedSection: false,
  placeholder: '',
  disabled: false,
  matchedTitle: '',
  otherTitle: '',
  associatedTitle: '',
  field: '',
  value: {},
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Element | u... Remove this comment to see the full error message
  rightIcon: null,
  onChange() {},
  startAdornment() {},
  onSelectViewVisible() {},
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  backHeaderClassName: null,
  contactSearch: undefined,
  appName: undefined,
  showFoundFromServer: false,
  serverEntitiesClientFilter: undefined,
  foundFromServerTitle: undefined,
  foundFromServerEntities: [],
  autoClose: true,
  onBackClick() {},
};
