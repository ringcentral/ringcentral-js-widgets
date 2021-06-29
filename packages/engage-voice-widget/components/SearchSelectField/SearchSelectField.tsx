import { RcList } from '@ringcentral/juno';
import React, { FunctionComponent, ReactNode, useState } from 'react';
import {
  SelectListTextField,
  SelectListTextFieldProps,
} from '@ringcentral-integration/widgets/components/CallLogFields';
import { SelectListBasicWithScrollCheck } from '@ringcentral-integration/widgets/components/SelectList';
import { SelectListBasicProps } from '@ringcentral-integration/widgets/components/SelectListBasic';
import i18n from './i18n';
import styles from './styles.scss';

export type SearchSelectFieldProps = {
  input?: boolean;
  InputProps?: Omit<SelectListTextFieldProps, 'onClick' | 'label'>;
  listRenderer: (
    options: any[],
    scrollCheck: any,
    toggleOpen: () => void,
  ) => ReactNode;
} & Omit<
  SelectListBasicProps,
  | 'selectListBasicClassName'
  | 'backHeaderClassName'
  | 'listContainerClassName'
  | 'renderListView'
>;

export const SearchSelectField: FunctionComponent<SearchSelectFieldProps> = ({
  listRenderer,
  input,
  InputProps,
  title,
  open,
  onBackClick,
  currentLocale,
  ...rest
}) => {
  const [currentOpen, setCurrentOpen] = useState(open);
  const toggleOpen = () => setCurrentOpen(!currentOpen);

  return (
    <>
      {input && (
        <SelectListTextField
          {...InputProps}
          label={title}
          onClick={() => toggleOpen()}
        />
      )}
      <SelectListBasicWithScrollCheck
        {...rest}
        title={title}
        onBackClick={() => {
          toggleOpen();
          onBackClick();
        }}
        placeholder={i18n.getString('search', currentLocale)}
        currentLocale={currentLocale}
        open={currentOpen}
        selectListBasicClassName={styles.selectListBasic}
        classes={{
          searchInput: styles.searchInput,
          noResult: styles.noResult,
          placeholder: styles.placeholder,
        }}
        rightIcon={<div className={styles.fillRight} />}
        backHeaderClassName={styles.backHeader}
        renderListView={(options: any[], type, filter, scrollCheck) => {
          return (
            <RcList>{listRenderer(options, scrollCheck, toggleOpen)}</RcList>
          );
        }}
      />
    </>
  );
};

SearchSelectField.defaultProps = {
  input: false,
  InputProps: {},
  onBackClick: () => {},
};
