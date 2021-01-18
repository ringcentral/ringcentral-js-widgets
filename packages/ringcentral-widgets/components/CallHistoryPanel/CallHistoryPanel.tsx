import moment from 'moment';
import { AutoSizer } from 'react-virtualized';
import React, { FunctionComponent, useMemo, useCallback } from 'react';

import { CallHistoryItem } from './CallHistoryItem';
import { StickyVirtualizedList } from './StickyVirtualizedList';
import { RowRendererProps } from './StickyVirtualizedList/StickyVirtualizedList.interface';
import { Call, CallsTree } from './CallHistoryPanel.interface';
import styles from './styles.scss';
import i18n from './i18n';

export type CallHistoryPanelProps = {
  calls: Call[];
  currentLocale: string;
};

const DATE_ITEM_HEIGHT = 32; // ./styles.scss .date
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
  return moment(timestamp).format('h:mmA');
}

export const CallHistoryPanel: FunctionComponent<CallHistoryPanelProps> = ({
  calls,
  currentLocale,
}) => {
  const tree = useMemo(() => {
    const _tree: CallsTree = {
      root: {
        name: 'root',
        depth: 0,
        children: [],
      },
    };

    calls.forEach((call: Call) => {
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
          <div className={styles.date} style={style} key={node.name}>
            {i18n.getString(node.name, currentLocale)}
          </div>
        );
      }
      return (
        <div style={style} key={node.call.id}>
          <CallHistoryItem call={node.call} />
        </div>
      );
    },
    [tree, currentLocale],
  );

  return (
    <div className={styles.callHistoryPanel}>
      {tree.root.children.length ? (
        <AutoSizer>
          {({ width, height }) => (
            <StickyVirtualizedList
              root={ROOT_NODE}
              getChildren={getChildren}
              rowRenderer={rowRenderer}
              defaultRowHeight={64}
              width={width}
              height={height}
            />
          )}
        </AutoSizer>
      ) : (
        <div className={styles.empty}>
          {i18n.getString('empty', currentLocale)}
        </div>
      )}
    </div>
  );
};
