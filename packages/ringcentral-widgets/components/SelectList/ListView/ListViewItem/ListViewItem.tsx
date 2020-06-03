import { RcListItem, RcListItemText } from '@ringcentral-integration/rcui';
import classnames from 'classnames';
import React, { FunctionComponent, useEffect, useRef } from 'react';

import styles from './styles.scss';

type OptionData = {
  type?: string;
  [key: string]: any;
};

export interface ListViewItemProps {
  option?: OptionData;
  value: any;
  index: number;
  /** the filter string with select list */
  filter?: string;
  onChange?: (option: OptionData) => any;
  valueFunction: (value: any) => any;
  startAdornment?: (type: string) => any;
  renderFunction: (option: OptionData) => React.ReactNode;
  onSelect: (elm?: HTMLDivElement) => any;
}

export const ListViewItem: FunctionComponent<ListViewItemProps> = ({
  renderFunction,
  startAdornment,
  filter,
  valueFunction,
  value,
  option,
  onChange,
  index,
  onSelect,
}) => {
  const selectElm = useRef<HTMLDivElement>();
  const currentValue = valueFunction(value);
  const thisValue = valueFunction(option);
  const isSelected = thisValue === currentValue;
  const { type } = option;
  useEffect(() => {
    if (isSelected) {
      onSelect(selectElm.current);
    }
  }, [isSelected, onSelect]);
  const getFilterResult = (option) => {
    const text = renderFunction(option);
    if (filter && typeof text === 'string') {
      const i = text.toLowerCase().indexOf(filter.toLowerCase());
      return (
        <>
          <span>{text.substring(0, i)}</span>
          <span style={{ background: '#ffdfb1' }}>
            {text.substring(i, i + filter.length)}
          </span>
          <span>{text.substring(i + filter.length)}</span>
        </>
      );
    }
    return text;
  };
  return (
    <div ref={selectElm}>
      <RcListItem
        button
        size="small"
        singleLine
        onClick={() => onChange(isSelected ? {} : option)}
        data-sign={`match${index}`}
        className={classnames(styles.listItem)}
        selected={isSelected}
      >
        {startAdornment && startAdornment(type)}
        <RcListItemText primary={getFilterResult(option)} />
      </RcListItem>
    </div>
  );
};
ListViewItem.defaultProps = {
  option: {},
  filter: null,
  onChange() {},
  startAdornment() {},
};
