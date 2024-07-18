import { palette2, styled, typography } from '@ringcentral/juno';
import dayjs from 'dayjs';
import type { FunctionComponent } from 'react';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import { CallHistoryItem } from './CallHistoryItem';
import type {
  CallLog,
  CallLogMenu,
  CallsTree,
} from './CallHistoryPanel.interface';
import { StickyVirtualizedList } from './StickyVirtualizedList';
import type { RowRendererProps } from './StickyVirtualizedList/StickyVirtualizedList.interface';
import i18n, { type I18nKey } from './i18n';
import styles from './styles.scss';

export type CallHistoryPanelProps = {
  calls: CallLog[];
  currentLocale: string;
  getActionMenu?: (call: CallLog) => CallLogMenu;
  isWide?: boolean;
  listScrollTop?: number;
  changeListScrollTop?: (scrollTop: number) => void;
};

const DATE_ITEM_HEIGHT = 32;
const CALL_ITEM_HEIGHT = 64; // ./CallHistoryItem/styles.scss .item

const ROOT_NODE = {
  id: 'root',
  height: DATE_ITEM_HEIGHT,
  isSticky: true,
};

function formatCallDate(timestamp: number) {
  const now = dayjs();
  const today = now.clone().startOf('day');
  const yesterday = now.clone().subtract(1, 'days').startOf('day');

  const mTimestamp = dayjs(timestamp);
  if (mTimestamp.isSame(today, 'd')) {
    return 'today';
  }
  if (mTimestamp.isSame(yesterday, 'd')) {
    return 'yesterday';
  }
  return mTimestamp.format('MM/DD/YYYY');
}

function formatCallTime(timestamp: number) {
  return dayjs(timestamp).format('h:mm A');
}

const DateText = styled.div`
  ${typography('caption1')};

  color: ${palette2('neutral', 'f06')};
  text-align: center;
  display: block;
  height: ${DATE_ITEM_HEIGHT}px;
  line-height: ${DATE_ITEM_HEIGHT}px;
  background: ${palette2('neutral', 'b01')};
  box-sizing: border-box;
  border-bottom: 1px solid ${palette2('neutral', 'l02')};
  position: sticky;
  top: 0;
  z-index: 2 !important;
`;

const StyledCallHistoryPanel = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${palette2('neutral', 'l02')};
  background-color: ${palette2('neutral', 'b01')};
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`;

export const CallHistoryPanel: FunctionComponent<CallHistoryPanelProps> = ({
  calls = [],
  currentLocale,
  getActionMenu = () => [],
  isWide = true,
  listScrollTop = 0,
  changeListScrollTop = () => {},
}) => {
  const listRef = useRef(null);

  useEffect(() => {
    // @ts-expect-error TS(2339): Property 'setScrollTop' does not exist on type 'ne... Remove this comment to see the full error message
    listRef.current?.setScrollTop(listScrollTop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tree = useMemo(() => {
    const _tree: CallsTree = {
      root: {
        name: 'root',
        depth: 0,
        children: [],
      },
    };
    calls.forEach((call: CallLog) => {
      const { id, startTime } = call;

      // @ts-expect-error TS(2345): Argument of type 'number | undefined' is not assig... Remove this comment to see the full error message
      const callDate = formatCallDate(startTime);
      // @ts-expect-error TS(2345): Argument of type 'number | undefined' is not assig... Remove this comment to see the full error message
      const callTime = formatCallTime(startTime);
      const callWithFormattedDate = {
        ...call,
        callDate,
        callTime,
      };

      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      if (!_tree.root.children.includes(callDate)) {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        _tree.root.children.push(callDate);
      }

      if (!Object.keys(_tree).includes(callDate)) {
        _tree[callDate] = {
          name: callDate,
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          children: [id],
          depth: 1,
        };
      } else {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        _tree[callDate].children.push(id);
      }

      // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
      _tree[id] = {
        name: id,
        depth: 2,
        call: callWithFormattedDate,
      };
    });

    return _tree;
  }, [calls]);

  const getChildren = useCallback(
    (id: string) => {
      const node = tree[id];

      if (node.children) {
        return node.children.map((childId: string) => {
          const childNode = tree[childId];

          let height = CALL_ITEM_HEIGHT;
          if (childNode.depth === 1) {
            height = DATE_ITEM_HEIGHT;
          }

          return {
            id: childId,
            height,
            isSticky: childNode.depth === 1,
          };
        });
      }
    },
    [tree],
  );

  const rowRenderer = useCallback(
    ({ id, style }: RowRendererProps) => {
      const node = tree[id];
      if (node.children) {
        return (
          <DateText data-sign="dateText" style={style} key={node.name}>
            {i18n.getString(node.name as I18nKey, currentLocale)}
          </DateText>
        );
      }
      return (
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        <div data-sign="historyItem" style={style} key={node.call.id}>
          <CallHistoryItem
            // @ts-expect-error TS(2322): Type 'CallLog | undefined' is not assignable to ty... Remove this comment to see the full error message
            call={node.call}
            // @ts-expect-error TS(2345): Argument of type 'CallLog | undefined' is not assi... Remove this comment to see the full error message
            actionMenu={getActionMenu(node.call)}
            isWide={isWide}
          />
        </div>
      );
    },
    [tree, getActionMenu, isWide, currentLocale],
  );

  return (
    <StyledCallHistoryPanel>
      {/* @ts-expect-error TS(2532): Object is possibly 'undefined'. */}
      {tree.root.children.length ? (
        <StickyVirtualizedList
          overscanRowCount={20}
          root={ROOT_NODE}
          // @ts-expect-error TS(2322): Type '(id: string) => { id: string; height: number... Remove this comment to see the full error message
          getChildren={getChildren}
          rowRenderer={rowRenderer}
          defaultRowHeight={64}
          width={window.innerWidth}
          height={window.innerHeight}
          onScroll={({ scrollTop }) => {
            changeListScrollTop(scrollTop);
          }}
          ref={listRef}
        />
      ) : (
        <div className={styles.empty}>
          {i18n.getString('empty', currentLocale)}
        </div>
      )}
    </StyledCallHistoryPanel>
  );
};
