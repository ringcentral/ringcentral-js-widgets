import type { FunctionComponent } from 'react';
import React from 'react';

import { combineProps, RcCircularProgress } from '@ringcentral/juno';

import type { BlockItem } from '../../modules/Block';
import type { SpinnerOverlayProps } from '../SpinnerOverlay';
import { SpinnerOverlay } from '../SpinnerOverlay';
import styles from './styles.scss';

export type BlockPanelProps = {
  block: BlockItem;
} & SpinnerOverlayProps;

export const BlockPanel: FunctionComponent<BlockPanelProps> = ({
  block,
  ...rest
}) => {
  if (!block) return null;

  const { classes = {} } = block;

  return (
    block && (
      <SpinnerOverlay
        classes={combineProps(classes, { container: styles.spinner })}
        custom={() => <RcCircularProgress size={40} />}
        {...rest}
      />
    )
  );
};

BlockPanel.defaultProps = {};
