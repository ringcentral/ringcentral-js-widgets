import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import CircleButton from '../CircleButton';

import styles from './styles.scss';

export default function MultiFeatureCallButton(props) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 500 400"
      width={'100%'}
      height={'100%'}
      x={0}
      y={0}
    >
      <CircleButton
        width={'140'}
        height={'140'}
        x={120}
        y={20}
        className={classnames(styles.button, props.isEnd ? styles.endButton : '')}
        onClick={props.onClick}
        icon={props.firstIcon}
      />
      <CircleButton
        width={'150'}
        height={'150'}
        x={220}
        y={80}
        className={classnames(styles.button, styles.answer)}
        showBorder={false}
        onClick={props.onClick}
        icon={props.secondIcon}
      />
      <text
        className={styles.buttonTitle}
        x="250"
        y="340"
        textAnchor="middle"
      >
        {props.title}
      </text>
    </svg>
  );
}
