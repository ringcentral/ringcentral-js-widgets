import { PopperProps, Popper } from '@ringcentral/spring-ui';
import React, { forwardRef, useCallback, useMemo } from 'react';

import {
  ReferenceWidgetProps,
  SelectedIdMap,
  ReferenceItemClickHandler,
  SimpleCrmObject,
} from '../ReferenceWidget.interface';

import { FilterAndSearchHint } from './FilterAndSearchHint';
import { ReferenceList } from './ReferenceList';
import { t } from './i18n';

interface ReferenceProps {
  filterTerm: string;
  formKey: string;
  allDisplayList: ReferenceWidgetProps['allDisplayList'];
  currentValue: ReferenceWidgetProps['currentValue'];
  onItemClick: ReferenceItemClickHandler;
  enableSearch?: boolean;
  errorHint?: string;
  searchFn: () => void;
  useMenuList?: boolean;
  getIcon?: (item: SimpleCrmObject) => React.ReactNode;
  /**
   * if you want to change the display of the popper width and anchor, use this prop
   */
  anchorEl?: PopperProps['anchorEl'];
}
interface ReferencePopperComponentProps extends PopperProps {
  referenceProps: ReferenceProps;
}

export const ReferenceMainContent = ({
  filterTerm,
  formKey,
  allDisplayList,
  currentValue,
  onItemClick,
  enableSearch,
  errorHint,
  searchFn,
  useMenuList,
  getIcon,
}: ReferenceProps) => {
  const selectedMap = useMemo(
    () =>
      (currentValue as SimpleCrmObject[]).reduce((acc, item) => {
        acc[item.id!] = true;
        return acc;
      }, {} as SelectedIdMap),
    [currentValue],
  );

  const allDisplayItemMap = useMemo(
    () =>
      allDisplayList.reduce((acc, item) => {
        item.values.forEach((record) => {
          acc[record.id!] = true;
        });
        return acc;
      }, {} as SelectedIdMap),
    [allDisplayList],
  );
  const fromAllList = currentValue.filter(
    (item) => !allDisplayItemMap[item.id!],
  );
  const finalList = useMemo(
    () =>
      fromAllList.length
        ? [
            {
              label: t('fromAllListLabel'),
              values: fromAllList,
            },
            ...allDisplayList,
          ]
        : allDisplayList,
    [fromAllList, allDisplayList],
  );

  const displayList = useMemo(
    () =>
      finalList
        .map((item) => {
          const records = item.values.filter((record) => {
            return record.name
              ?.toLowerCase()
              .includes(filterTerm.toLowerCase());
          });
          return {
            icon: item.icon,
            label: item.label,
            values: records,
            toolTipText: item.toolTipText,
            customCallBack: item.customCallBack,
          };
        })
        .filter((item) => !!item),
    [finalList, filterTerm],
  );

  return (
    <>
      <FilterAndSearchHint
        searchValue={filterTerm}
        onClickHandler={searchFn}
        enableSearch={enableSearch}
        errorHint={errorHint}
      />
      <div className="overflow-y-auto overflow-x-hidden max-h-80">
        {displayList.map((displayListItem) => {
          return (
            <ReferenceList
              onItemClick={onItemClick}
              selectedMap={selectedMap}
              key={displayListItem.label}
              list={displayListItem.values}
              showGroupLabel={true}
              label={displayListItem.label}
              groupIcon={displayListItem.icon}
              toolTipText={displayListItem.toolTipText}
              customCallBack={displayListItem.customCallBack}
              highLightText={filterTerm}
              useMenuList={useMenuList}
              getIcon={getIcon}
            />
          );
        })}
      </div>
    </>
  );
};

const ReferencePopperComponent = forwardRef(
  ({ referenceProps, ...rest }: ReferencePopperComponentProps, ref) => {
    return (
      <Popper
        {...rest}
        ref={ref as any}
        data-sign={'call-log-reference-popper'}
        padding={{
          bottom: 60,
        }}
      >
        <div
          className="bg-neutral-base rounded-sui-sm shadow-sui-md border border-neutral-b4 overflow-hidden"
          data-sign={`${referenceProps.formKey}-popper`}
        >
          <ReferenceMainContent {...referenceProps} />
        </div>
      </Popper>
    );
  },
);

export const useReferencePopper = ({
  filterTerm,
  allDisplayList,
  currentValue,
  formKey,
  onItemClick,
  enableSearch = true,
  searchFn,
  useMenuList,
  getIcon,
  anchorEl,
}: ReferenceProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const MemoizedReferencePopperComponent = useCallback(
    forwardRef((props: PopperProps, ref) => {
      return (
        <ReferencePopperComponent
          {...props}
          anchorEl={
            // use outer anchorEl if provided, otherwise use inner default anchorEl
            () => {
              if (anchorEl) {
                if (typeof anchorEl !== 'function') {
                  return anchorEl;
                }
                const elm = anchorEl();

                if (elm) return elm;
              }

              if (props.anchorEl) {
                if (typeof props.anchorEl !== 'function') {
                  return props.anchorEl;
                }

                const elm = props.anchorEl();

                if (elm) return elm;
              }

              return null;
            }
          }
          ref={ref}
          referenceProps={{
            searchFn,
            onItemClick,
            formKey,
            allDisplayList,
            filterTerm,
            currentValue,
            enableSearch,
            useMenuList,
            getIcon,
          }}
        />
      );
    }),
    [
      anchorEl,
      formKey,
      allDisplayList,
      onItemClick,
      currentValue,
      filterTerm,
      enableSearch,
      searchFn,
      useMenuList,
      getIcon,
    ],
  );

  return MemoizedReferencePopperComponent;
};
