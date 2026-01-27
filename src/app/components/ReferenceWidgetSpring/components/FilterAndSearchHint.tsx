import { FormattedMessage } from '@ringcentral-integration/next-widgets/components';
import { SearchMd } from '@ringcentral/spring-icon';
import { Divider, Icon, Text } from '@ringcentral/spring-ui';
import React from 'react';

import { t } from './i18n';

interface FilterAndSearchHintProps {
  searchValue: string;
  onClickHandler: () => void;
  errorHint?: string;
  enableSearch?: boolean;
  searchLimitLength?: number;
}

const lineStyle = 'flex gap-3 items-center w-full py-3.5 px-4';

export const FilterAndSearchHint: React.FC<FilterAndSearchHintProps> = ({
  searchValue,
  onClickHandler,
  errorHint,
  enableSearch = true,
  searchLimitLength = 3,
}) => {
  if (!enableSearch) {
    return null;
  }

  const searchAble = searchValue && searchValue.length >= searchLimitLength;

  return (
    <>
      {searchAble ? (
        <button
          onClick={() => onClickHandler()}
          data-sign="reference-search-hint"
          className={lineStyle}
        >
          <Icon symbol={SearchMd} size="small" />
          <Text
            className="typography-descriptor text-neutral-b0 break-words "
            data-sign="title"
          >
            <FormattedMessage
              message={t('meetSearchTips')}
              values={{
                searchValue: <Text className="font-bold">{searchValue}</Text>,
              }}
            />
          </Text>
        </button>
      ) : (
        <div className={lineStyle} data-sign="reference-search-hint">
          <Text
            className="typography-descriptor text-neutral-b2"
            data-sign="title"
          >
            {t('unmeetSearchTips', { searchLimitLength })}
          </Text>
        </div>
      )}
      {errorHint ? (
        <div className="px-4 pb-2">
          <Text
            className="typography-descriptor text-danger break-words"
            data-sign="title"
          >
            {errorHint}
          </Text>
        </div>
      ) : null}
      <Divider />
    </>
  );
};
