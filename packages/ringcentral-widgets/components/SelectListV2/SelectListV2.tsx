import React, { FunctionComponent, useRef } from 'react';

import classNames from 'classnames';

import { emptyFn } from '@ringcentral-integration/utils';

import { SelectListContext } from '../../contexts';
import BackHeader, { BackHeaderProps } from '../BackHeaderV2';
import { SearchPanel, SearchPanelProps } from '../SearchPanel';
import styles from './styles.scss';

export type SelectListV2Props = {
  classes?: {
    root?: string;
    search?: SearchPanelProps['classes'];
    backHeader?: BackHeaderProps['className'];
  };
} & Pick<
  SearchPanelProps,
  | 'currentLocale'
  | 'options'
  | 'searchOption'
  | 'renderListItem'
  | 'placeholder'
> &
  Pick<BackHeaderProps, 'onBackClick' | 'title' | 'rightIcon'>;

export const SelectListV2: FunctionComponent<SelectListV2Props> = ({
  onBackClick = emptyFn,
  classes = {},
  searchOption,
  currentLocale,
  rightIcon,
  title,
  renderListItem,
  options,
  children,
  placeholder,
}) => {
  const scrollElmRef = useRef();

  return (
    <SelectListContext.Provider value={{ scrollElmRef }}>
      <div className={classNames(styles.root, classes.root)}>
        <BackHeader
          currentLocale={currentLocale}
          title={title}
          onBackClick={onBackClick}
          className={classes.backHeader}
          rightIcon={rightIcon}
        />
        <SearchPanel
          options={options}
          searchOption={searchOption}
          currentLocale={currentLocale}
          renderListItem={renderListItem}
          classes={classes.search}
          placeholder={placeholder}
        />
        {children}
      </div>
    </SelectListContext.Provider>
  );
};
