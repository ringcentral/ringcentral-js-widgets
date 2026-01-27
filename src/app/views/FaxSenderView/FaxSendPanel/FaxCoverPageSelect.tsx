import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { ShowMd } from '@ringcentral/spring-icon';
import { IconButton, Select, Option, Text } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { FC, useCallback, useState } from 'react';

import type { CoverInfo } from '../../../services/Fax/FaxCover/interfaces';
import { FAX_COVER_NONE_VALUE } from '../../../services/Fax/constant';

import i18n from './i18n';

interface FaxCoverPageSelectProps {
  className?: string;
  covers?: CoverInfo[];
  label?: string;
  selectedCoverId?: number;
  onSelectChange?: (index: number) => void;
}

const getCoverNameById = (covers: CoverInfo[], targetId: CoverInfo['id']) => {
  const cover = covers?.find(({ id }) => id === targetId);
  return cover ? cover.name : '';
};

export const FaxCoverPageSelect: FC<FaxCoverPageSelectProps> = ({
  covers,
  label = 'Cover page',
  selectedCoverId,
  className,
  onSelectChange,
}) => {
  const { t } = useLocale(i18n);
  const [focusVisibleIdx, setFocusVisibleIdx] = useState(-1);

  const renderValue = useCallback(
    (value: string) => {
      return <Text flexFull>{getCoverNameById(covers!, Number(value))}</Text>;
    },
    [covers],
  );

  return (
    <Select
      variant="outlined"
      className={clsx('w-full', className)}
      data-sign="fax-cover-page-select"
      onChange={({ target: { value } }: any) => {
        const id = Number(value);
        onSelectChange?.(id);
      }}
      label={label}
      value={String(selectedCoverId)}
      renderValue={renderValue}
      id="fax-coverPage"
      size="medium"
    >
      <div className="max-h-60 overflow-y-auto overflow-x-hidden">
        {covers?.map((cover, idx) => (
          <Option
            data-sign="fax-cover-page-select-item"
            value={cover.id}
            key={cover.id}
            onMouseEnter={() => setFocusVisibleIdx(idx)}
          >
            <div className="w-full flex justify-between align-middle">
              <Text className="leading-6">
                {cover.id === FAX_COVER_NONE_VALUE
                  ? t('coverNone')
                  : cover.name}
              </Text>
              {cover.url && (
                <IconButton
                  className={focusVisibleIdx === idx ? '' : 'hidden'}
                  TooltipProps={{
                    title: t('preview'),
                  }}
                  variant="icon"
                  data-sign="fax-cover-page-select-button"
                  data-value={cover.url}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    window.open(cover.url, '_blank');
                  }}
                  size="small"
                  symbol={ShowMd}
                />
              )}
            </div>
          </Option>
        ))}
      </div>
    </Select>
  );
};
