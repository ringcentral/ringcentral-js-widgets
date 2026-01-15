import { emptyFn } from '@ringcentral-integration/utils';
import { RcCheckbox, RcListItem, RcListItemText } from '@ringcentral/juno';
import type { FunctionComponent } from 'react';
import React, { useEffect, useRef } from 'react';

import { TextWithHighlight } from '../../../TextWithHighlight';

export type OptionData = {
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
  startAdornment?: (type?: string) => any;
  renderFunction: (option: OptionData) => string;
  secondaryRenderFunction?: (option: OptionData) => any;
  onSelect: (elm?: HTMLDivElement) => any;
  multiple?: boolean;
  disabled?: boolean;
}

export const ListViewItem: FunctionComponent<ListViewItemProps> = ({
  option = {},
  filter = null,
  onChange = emptyFn,
  startAdornment = emptyFn,
  secondaryRenderFunction = emptyFn,
  multiple = false,
  disabled = false,
  renderFunction,
  valueFunction,
  value,
  index,
  onSelect,
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

  return (
    // @ts-expect-error TS(2322): Type 'MutableRefObject<HTMLDivElement | undefined>... Remove this comment to see the full error message
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
        data-selected={isSelected}
        selected={isSelected}
        disabled={disabled}
      >
        {startAdornment?.(type)}
        {multiple && (
          <RcCheckbox
            checked={isSelected}
            data-sign={isSelected ? 'selected' : 'unselected'}
            disabled={disabled}
          />
        )}
        <RcListItemText
          primary={
            <TextWithHighlight
              // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
              highLightText={filter}
              text={renderFunction(option)}
            />
          }
          secondary={secondaryRenderFunction(option)}
          data-sign="matchedItemText"
        />
      </RcListItem>
    </div>
  );
};
