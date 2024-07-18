import clsx from 'clsx';
import React from 'react';

import AnswerIcon from '../../assets/images/Answer.svg';
import EndIcon from '../../assets/images/End.svg';
import HoldIcon from '../../assets/images/Hold.svg';
import CircleButton from '../CircleButton';

import styles from './styles.scss';

type MultiCallAnswerButtonProps = {
  title: string;
  className?: string;
  onClick: (...args: any[]) => void;
  isEndOtherCall?: boolean;
  width?: string;
  height?: string;
  x?: number;
  y?: number;
};
const MultiCallAnswerButton: React.FC<MultiCallAnswerButtonProps> = (props) => {
  const Icon = props.isEndOtherCall ? EndIcon : HoldIcon;
  const iconClassName = clsx(
    styles.button,
    props.isEndOtherCall ? styles.endButton : '',
  );
  const text = props.title.split('\n').map((line, index) => (
    <tspan
      dy={index ? '1.1em' : 0}
      x="250"
      key={line}
      data-sign={line.replace(' ', '_')}
    >
      {line}
    </tspan>
  ));
  return (
    <svg
      className={props.className}
      viewBox="0 0 500 600"
      width={props.width}
      height={props.height}
      x={props.x}
      y={props.y}
    >
      <CircleButton
        width="200"
        height="200"
        x={60}
        y={50}
        className={iconClassName}
        onClick={props.onClick}
        icon={Icon}
      />
      <CircleButton
        width="250"
        height="250"
        x={200}
        y={110}
        className={clsx(styles.button, styles.answer)}
        showBorder={false}
        onClick={props.onClick}
        icon={AnswerIcon}
        // @ts-expect-error TS(2339): Property 'dataSign' does not exist on type 'PropsW... Remove this comment to see the full error message
        dataSign={props.dataSign}
      />
      <text className={styles.buttonTitle} x="250" y="500" textAnchor="middle">
        {text}
      </text>
    </svg>
  );
};
MultiCallAnswerButton.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  className: null,
  isEndOtherCall: true,
  width: '100%',
  height: '100%',
  x: 0,
  y: 0,
};
export default MultiCallAnswerButton;
