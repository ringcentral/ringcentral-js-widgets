import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  ArrowRightUpMd,
  CallMd,
  CheckBoldMd,
  ContactsMd,
  CopyMd,
  DispositionMd,
  DownloadMd,
  InviteMd,
  MarkUnreadFilledMd,
  MarkUnreadMd,
  MinusMd,
  PlusMd,
  ReassignMd,
  ShowMd,
  Smsmd,
  TextReplyMd,
  TrashMd,
} from '@ringcentral/spring-icon';
import {
  IconButtonProps,
  UnionOmit,
  useEventCallback,
} from '@ringcentral/spring-ui';
import { useMemo } from 'react';

import type { SubmenuAction } from '../ActionMenuList';

import i18n from './i18n';

export type HistoryActionType =
  | 'addEntity'
  | 'viewEntity'
  | 'delete'
  | 'call'
  | 'text'
  | 'viewFax'
  | 'downloadFax'
  | 'downloadVoicemail'
  | 'copyNumber'
  | 'mark'
  | 'unmark'
  | 'viewLog'
  | 'createLog'
  | 'selectRecordsForAutoLog'
  | 'addRecord'
  | 'resolveThread'
  | 'assignToMe'
  | 'assignThread'
  | 'reassignThread'
  | 'unassignThread'
  // action only
  | HistoryActionOnlyType;

type HistoryActionOnlyType = 'read' | 'viewDetail';

export type HistoryAction = {
  type: UnionOmit<HistoryActionType, HistoryActionOnlyType>;
  disabled?: boolean;
  /**
   * href for download or preview
   */
  href?: string;
  /**
   * for action display label
   */
  label?: string;
  /**
   * indicates this should render as a submenu
   */
  isSubmenu?: boolean;
  /**
   * array of submenu actions (only used when isSubmenu is true)
   */
  submenuActions?: SubmenuAction[];
};

type HistoryActionButtonProps = Pick<
  IconButtonProps,
  'symbol' | 'variant' | 'color' | 'iconSize' | 'className'
> & {
  label: string;
  isSubmenu?: boolean;
  submenuActions?: SubmenuAction[];
};

/**
 * hooks for history action buttons data source
 *
 * ```tsx
 * useHistoryActionButtons(
 *  [
 *   { type: 'addEntity' },
 *   { type: 'viewEntity' },
 *   { type: 'delete' },
 * ],
 * (actionType) => {
 *    console.log(actionType);
 * });
 * ```
 */
export const useHistoryActionButtons = (
  actions: HistoryAction[],
  onEffect: (key: HistoryActionType, e?: React.MouseEvent) => void,
) => {
  const { t } = useLocale(i18n);

  const actionMap = useMemo<
    Record<
      HistoryAction['type'],
      (action?: HistoryAction) => HistoryActionButtonProps
    >
  >(
    () => ({
      addEntity: () => ({
        label: t('addEntity'),
        symbol: InviteMd,
      }),
      addRecord: (action) => ({
        label: t('addRecord'),
        symbol: PlusMd,
        isSubmenu: action?.isSubmenu,
        submenuActions: action?.submenuActions,
      }),
      viewEntity: (action?: HistoryAction) => ({
        label: action?.label || t('viewDetails'),
        symbol: ContactsMd,
      }),
      delete: () => ({
        label: t('delete'),
        symbol: TrashMd,
      }),
      call: () => ({
        label: t('call'),
        symbol: CallMd,
      }),
      text: () => ({
        label: t('text'),
        symbol: Smsmd,
      }),
      viewFax: () => ({
        label: t('viewFax'),
        symbol: ShowMd,
      }),
      downloadFax: () =>
        ({
          component: 'a',
          label: t('downloadFax'),
          symbol: DownloadMd,
          target: '_blank',
          download: true,
          rel: 'noreferrer',
        } satisfies IconButtonProps<'a'>),
      downloadVoicemail: () =>
        ({
          component: 'a',
          label: t('downloadVoicemail'),
          symbol: DownloadMd,
          target: '_blank',
          download: true,
          rel: 'noreferrer',
        } satisfies IconButtonProps<'a'>),
      copyNumber: () => ({
        label: t('copyNumber'),
        symbol: CopyMd,
      }),
      mark: () => ({
        label: t('mark'),
        symbol: MarkUnreadMd,
      }),
      unmark: () => ({
        label: t('unmark'),
        symbol: MarkUnreadFilledMd,
      }),
      createLog: () => ({
        label: t('createLog'),
        symbol: DispositionMd,
      }),
      selectRecordsForAutoLog: () => ({
        label: t('selectRecordsForAutoLog'),
        symbol: DispositionMd,
      }),
      viewLog: (action) => ({
        label: action?.label!,
        symbol: ArrowRightUpMd,
      }),
      resolveThread: () => ({
        label: t('resolveThread'),
        symbol: CheckBoldMd,
      }),
      assignToMe: () => ({
        label: t('assignToMe'),
        symbol: TextReplyMd,
      }),
      reassignThread: () => ({
        label: t('reassignThread'),
        symbol: ReassignMd,
      }),
      assignThread: () => ({
        label: t('assignThread'),
        symbol: ReassignMd,
      }),
      unassignThread: () => ({
        label: t('unassignThread'),
        symbol: MinusMd,
      }),
    }),
    [t],
  );

  const effect = useEventCallback(onEffect);

  return useMemo(
    () =>
      actions.map((action) => {
        const actionType = action.type;
        const disabled = action.disabled;
        const href = action.href;
        const isSubmenu = action.isSubmenu;
        const submenuActions = action.submenuActions;

        const propsGetter = actionMap[actionType];

        if (process.env.NODE_ENV !== 'production' && !propsGetter) {
          throw new Error(`actionType "${actionType}" not exist`);
        }
        const actionButtonProps = propsGetter?.(action);

        const item: IconButtonProps & {
          actionType: HistoryActionType;
          isSubmenu?: boolean;
          submenuActions?: SubmenuAction[];
        } = {
          actionType,
          disabled,
          shape: 'squircle',
          variant: 'outlined',
          color: 'secondary',
          size: 'medium',
          ...actionButtonProps,
          onClick: (e) => {
            effect(actionType, e);
            e.stopPropagation();
          },
        };

        if ((actionButtonProps as IconButtonProps<'a'>)?.component === 'a') {
          (item as any).href = href;
        }

        if (isSubmenu && submenuActions) {
          item.isSubmenu = true;
          item.submenuActions = submenuActions.map((subAction) => ({
            ...subAction,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              const result = subAction.onClick?.(e);

              // when the action is prevented, don't call the effect
              if (!result) {
                effect(subAction.actionType as HistoryActionType, e);
              }

              e.stopPropagation();
            },
          }));
        }

        return item;
      }),
    [actionMap, actions, effect],
  );
};
