import classNames from 'classnames';
import React, { ComponentType, FunctionComponent, memo } from 'react';
import { RcCircularProgress, styled } from '@ringcentral/juno';
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

export const SpinnerOverlay: FunctionComponent<SpinnerOverlayProps> = memo<
  SpinnerOverlayProps
>(({ className, custom: SpinnerComponent, classes, top = '40%' }) => {
  return (
    <div
      data-sign="spinnerOverlay"
      className={classNames(styles.root, className, classes.root)}
    >
      <div className={classNames(styles.mask, classes.mask)} />
      <StyledContainer className={classes.container} top={top}>
        <SpinnerComponent />
      </StyledContainer>
    </div>
  );
});

export default SpinnerOverlay;

SpinnerOverlay.defaultProps = {
  className: undefined,
  custom: JunoSpinnerWrapper,
  classes: {},
  top: '40%',
};
