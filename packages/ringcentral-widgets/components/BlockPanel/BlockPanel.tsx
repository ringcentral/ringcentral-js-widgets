import {
  combineProps,
  RcCircularProgress,
} from '@ringcentral/juno';
import React, { FunctionComponent } from 'react';

import { BlockItem } from '../../modules/Block';
import { SpinnerOverlay, SpinnerOverlayProps } from '../SpinnerOverlay';
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
