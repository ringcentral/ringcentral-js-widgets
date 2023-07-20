import type { ComponentProps, FunctionComponent } from 'react';
import React, { useEffect, useState } from 'react';

import type { SelectListBasicProps } from '../SelectListBasic';
import { SelectListBasic } from '../SelectListBasic';
import type { ListViewProps } from './ListView';
import { ListView } from './ListView';
import styles from './styles.scss';
import { WithScrollCheck } from './WithScrollCheck';

const SelectListBasicWithScrollCheck: FunctionComponent<SelectListBasicProps> =
  WithScrollCheck(SelectListBasic);

export { SelectListBasicWithScrollCheck };

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
    'foundFromServerEntities' | 'foundFromServerTitle' | 'showFoundFromServer'
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
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type '((...args: ... Remove this comment to see the full error message
  contactSearch: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  appName: null,
  showFoundFromServer: false,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  foundFromServerTitle: null,
  foundFromServerEntities: [],
  autoClose: true,
  onBackClick() {},
};
