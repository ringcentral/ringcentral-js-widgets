import {
  opacity,
  palette2,
  RcCircularProgress,
  styled,
} from '@ringcentral/juno';
import clsx from 'clsx';
import type { ComponentType, FunctionComponent } from 'react';
import React, { memo } from 'react';

import { fullSizeStyle } from '../../lib/commonStyles';

import styles from './styles.scss';

export interface SpinnerOverlayProps {
  className?: string;
  custom?: ComponentType<any>;
  classes?: {
    root?: string;
    mask?: string;
    container?: string;
  };
  top?: string;
}

const JunoSpinnerWrapper = () => <RcCircularProgress size={43} />;

const StyledContainer = styled.div<{ top?: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: 50%;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);

  @media only screen and (max-width: 50px) {
    width: 30px;
    height: 30px;
  }
`;

const Mask = styled.div`
  background: ${palette2('neutral', 'b01')};
  opacity: ${opacity('48')};
  ${fullSizeStyle};
`;

export const SpinnerOverlay: FunctionComponent<SpinnerOverlayProps> =
  memo<SpinnerOverlayProps>(
    ({ className, custom: SpinnerComponent, classes, top = '40%' }) => {
      return (
        <div
          data-sign="spinnerOverlay"
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          className={clsx(styles.root, className, classes.root)}
        >
          {/* @ts-expect-error TS(2532): Object is possibly 'undefined'. */}
          <Mask className={classes.mask} />
          {/* @ts-expect-error TS(2532): Object is possibly 'undefined'. */}
          <StyledContainer className={classes.container} top={top}>
            {/* @ts-expect-error TS(2604): JSX element type 'SpinnerComponent' */}
            <SpinnerComponent />
          </StyledContainer>
        </div>
      );
    },
  );

export default SpinnerOverlay;

SpinnerOverlay.defaultProps = {
  className: undefined,
  custom: JunoSpinnerWrapper,
  classes: {},
  top: '40%',
};
