import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import moment from 'moment';

import { palette2, styled, typography } from '@ringcentral/juno';

import { CallHistoryItem } from './CallHistoryItem';
import { CallLog, CallLogMenu, CallsTree } from './CallHistoryPanel.interface';
import i18n from './i18n';
import { StickyVirtualizedList } from './StickyVirtualizedList';
import { RowRendererProps } from './StickyVirtualizedList/StickyVirtualizedList.interface';
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
  const now = moment();
  const today = now.clone().startOf('day');
  const yesterday = now.clone().subtract(1, 'days').startOf('day');

  const mTimestamp = moment(timestamp);
  if (mTimestamp.isSame(today, 'd')) {
    return 'today';
  }
  if (mTimestamp.isSame(yesterday, 'd')) {
    return 'yesterday';
  }
  return mTimestamp.format('MM/DD/YYYY');
}

function formatCallTime(timestamp: number) {
  return moment(timestamp).format('h:mm A');
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
  calls,
  currentLocale,
  getActionMenu,
  isWide = true,
  listScrollTop = 0,
  changeListScrollTop = () => {},
}) => {
  const listRef = useRef(null);

  useEffect(() => {
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

      const callDate = formatCallDate(startTime);
      const callTime = formatCallTime(startTime);
      const callWithFormattedDate = {
        ...call,
        callDate,
        callTime,
      };

      if (!_tree.root.children.includes(callDate)) {
        _tree.root.children.push(callDate);
      }

      if (!Object.keys(_tree).includes(callDate)) {
        _tree[callDate] = {
          name: callDate,
          children: [id],
          depth: 1,
        };
      } else {
        _tree[callDate].children.push(id);
      }

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
            {i18n.getString(node.name, currentLocale)}
          </DateText>
        );
      }
      return (
        <div data-sign="historyItem" style={style} key={node.call.id}>
          <CallHistoryItem
            call={node.call}
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
      {tree.root.children.length ? (
        <StickyVirtualizedList
          overscanRowCount={20}
          root={ROOT_NODE}
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

CallHistoryPanel.defaultProps = {
  calls: [],
  getActionMenu: () => [],
};
