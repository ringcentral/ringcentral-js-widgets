import {
  RcListItem,
  RcListItemText,
  RcFormControlLabel,
  RcCheckbox,
} from '@ringcentral/juno';
import React, { FunctionComponent, useEffect, useRef } from 'react';

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
  secondaryRenderFunction?: (option: OptionData) => any;
  onSelect: (elm?: HTMLDivElement) => any;
  multiple?: boolean;
}

export const ListViewItem: FunctionComponent<ListViewItemProps> = ({
  renderFunction,
  secondaryRenderFunction,
  startAdornment,
  filter,
  valueFunction,
  value,
  option,
  onChange,
  index,
  onSelect,
  multiple,
}) => {
  const selectElm = useRef<HTMLDivElement>();
  const currentValue = valueFunction(value);
  const thisValue = valueFunction(option);
  const isSelected = multiple
    ? !!currentValue?.includes(thisValue)
    : thisValue === currentValue;
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
        size="medium"
        singleLine
        onClick={
          multiple
            ? () => onChange({ ...option, isSelected: !isSelected })
            : () => onChange(isSelected ? {} : option)
        }
        data-sign={`match${index}`}
        selected={isSelected}
      >
        {startAdornment && startAdornment(type)}
        {multiple && (
          <RcCheckbox
            checked={isSelected}
            data-sign={isSelected ? 'selected' : 'unselected'}
          />
        )}
        <RcListItemText
          primary={getFilterResult(option)}
          secondary={secondaryRenderFunction(option)}
          data-sign="matchedItemText"
        />
      </RcListItem>
    </div>
  );
};
ListViewItem.defaultProps = {
  option: {},
  filter: null,
  onChange() {},
  startAdornment() {},
  secondaryRenderFunction() {},
  multiple: false,
};
