import { IntegrationConfig } from '@ringcentral-integration/micro-setting/src/app/services';
import { useContainer } from '@ringcentral-integration/next-core';
import { TextWithHighlight } from '@ringcentral-integration/next-widgets/components';
import { ArrowRightUpMd, EditPenMd, InfoMd } from '@ringcentral/spring-icon';
import {
  Checkbox,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  MenuList,
  Tooltip,
} from '@ringcentral/spring-ui';
import React, { FunctionComponent } from 'react';

import {
  ReferenceItemClickHandler,
  SelectedIdMap,
  SimpleCrmObject,
} from '../ReferenceWidget.interface';

import { t } from './i18n';

interface ReferenceListProps {
  showGroupLabel?: boolean;
  label?: string;
  groupIcon?: any;
  toolTipText?: string;
  customCallBack?: (item: SimpleCrmObject) => void;
  highLightText?: string;
  list: SimpleCrmObject[];
  selectedMap: SelectedIdMap;
  onItemClick: ReferenceItemClickHandler;
  useMenuList?: boolean;
  getIcon?: (item: SimpleCrmObject) => React.ReactNode;
}

const labelStyle = 'typography-descriptor text-neutral-b2 truncate py-3.5 px-3';

export const ReferenceMenuList: FunctionComponent<
  Omit<ReferenceListProps, 'useMenuList'>
> = ({
  list,
  label,
  groupIcon,
  toolTipText,
  customCallBack,
  showGroupLabel = false,
  onItemClick,
  highLightText = '',
  selectedMap,
  getIcon,
}) => {
  const integrationConfig = useContainer<IntegrationConfig, true>(
    'IntegrationConfig',
  );
  const noItem = list.length === 0;
  const viewableCrmEntity = Boolean(integrationConfig?.viewExternalEntity);

  return (
    <MenuList className="overflow-auto pb-2" data-sign={label}>
      {showGroupLabel && (
        <MenuItem data-sign="referenceGroupLabel" disabled>
          <div className="flex items-center">
            {groupIcon && (
              <Icon
                symbol={groupIcon as any}
                size="xsmall"
                className="text-neutral-b2"
              />
            )}
            <ListItemText
              className="typography-subtitleMini text-neutral-b2 mr-1 ml-1 p-0"
              secondary={label}
            />
            {toolTipText && (
              <Tooltip title={toolTipText}>
                <Icon
                  data-sign="infoIcon"
                  symbol={InfoMd}
                  size="xsmall"
                  className="text-neutral-b2 pointer-events-auto"
                />
              </Tooltip>
            )}
          </div>
        </MenuItem>
      )}
      {noItem && (
        <MenuItem>
          <ListItemText secondary={t('noRecordMatch')} />
        </MenuItem>
      )}
      {!noItem &&
        list.map((item, index) => (
          <MenuItem
            data-sign={`match${index}`}
            key={index}
            selected={!!selectedMap[item.id!]}
            onClick={() => {
              if (!item.id) {
                customCallBack?.(item);
                return;
              }
              onItemClick(item, !selectedMap[item.id!]);
            }}
            classes={{
              selectIndicator: 'self-center',
              container: 'py-1',
            }}
            className="group"
          >
            {getIcon && (
              <span
                className="w-9 h-9 flex items-center justify-start ml-3 flex-shrink-0"
                data-sign="referenceListIcon"
              >
                {getIcon(item)}
              </span>
            )}
            <ListItemText
              className="m-0 min-w-0 flex-1"
              primary={
                <div className="flex items-center justify-between w-full relative">
                  <TextWithHighlight
                    data-sign="referenceListResultItem"
                    text={item.name ?? ''}
                    highLightText={highLightText}
                    className="truncate block flex-auto"
                  />

                  <span
                    className={`typography-descriptor text-neutral-b2 truncate ml-2 max-w-[50%] flex-none ${
                      viewableCrmEntity && item.id
                        ? 'group-hover:opacity-0 group-[.sui-focus-visible-within]:opacity-0'
                        : ''
                    }`}
                    title={(item as any).labelType || item.type}
                  >
                    {(item as any).labelType || item.type}
                  </span>

                  {viewableCrmEntity && item.id && (
                    <div
                      data-sign="hover-actions"
                      className="flex gap-1 absolute right-0 top-0 h-full items-center bg-inherit pl-4 pr-2 group-hover:translate-x-0 group-[.sui-focus-visible-within]:translate-x-0 translate-x-full"
                    >
                      <IconButton
                        symbol={ArrowRightUpMd}
                        TooltipProps={{
                          title: t('viewRecord'),
                        }}
                        data-sign="viewRecordButton"
                        variant="icon"
                        color="neutral"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          integrationConfig!.viewExternalEntity!(item);
                        }}
                      />
                    </div>
                  )}

                  {!item.id && (
                    <Icon
                      symbol={EditPenMd}
                      size="small"
                      className="ml-1"
                      data-sign="editPenIcon"
                    />
                  )}
                </div>
              }
            />
          </MenuItem>
        ))}
    </MenuList>
  );
};

const ReferenceListView: FunctionComponent<
  Omit<ReferenceListProps, 'useMenuList'>
> = ({
  list,
  label,
  showGroupLabel = false,
  onItemClick,
  highLightText = '',
  selectedMap,
}) => {
  const integrationConfig = useContainer<IntegrationConfig, true>(
    'IntegrationConfig',
  );

  const clickable = Boolean(integrationConfig?.onViewEntity);

  return (
    <div className="overflow-auto" data-sign={label}>
      {showGroupLabel && (
        <div data-sign="referenceGroupLabel" className={labelStyle}>
          {label}
        </div>
      )}
      {list.length === 0 ? (
        <div className={labelStyle}>{t('noRecordMatch')}</div>
      ) : (
        <List>
          {list.map((item, index) => (
            <ListItem
              data-sign={`match${index}`}
              key={index}
              divider={false}
              onClick={() => {
                onItemClick(item, !selectedMap[item.id!]);
              }}
            >
              <Checkbox checked={!!selectedMap[item.id!]} />
              <ListItemText
                primary={
                  <TextWithHighlight
                    data-sign="referenceListResultItem"
                    text={item.name ?? ''}
                    highLightText={highLightText}
                    className="truncate"
                  />
                }
              />
              {clickable && (
                <IconButton
                  symbol={ArrowRightUpMd}
                  TooltipProps={{
                    title: t('viewRecord'),
                  }}
                  data-sign="viewRecordButton"
                  shape="squircle"
                  variant="icon"
                  color="secondary"
                  size="small"
                  className="ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    integrationConfig?.onViewEntity?.(item);
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export const ReferenceList: FunctionComponent<ReferenceListProps> = (props) => {
  if (props.useMenuList) {
    return <ReferenceMenuList {...props} />;
  }
  return <ReferenceListView {...props} />;
};
