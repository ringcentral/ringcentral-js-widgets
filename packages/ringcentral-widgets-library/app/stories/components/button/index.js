/**
 * @file button
 */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, number, select } from '@storybook/addon-knobs/react';
import { linkTo } from '@storybook/addon-links';

import Button from '../../../elements/Button';

import Ripple from './ripple';
import styles from './styles.scss';

storiesOf('Elements/Button', module)
  .add('with text', () => {
    return (
      <Ripple>
        <Button>RC Button</Button>
      </Ripple>
    );
  })
  .add('with dynamic', () => {
    const children = text('children', 'Button');
    const tooltip = text('tooltip', 'hello');
    const label1 = 'types';
    const options = [
      'outline',
      'warning',
      'primary',
      'default',
      'danger',
    ];
    const type = select(label1, options, 'primary');

    const label2 = 'shaps';
    const shapOptions = [
      'default',
      'circle'
    ];
    const shape = select(label2, shapOptions, 'default');

    return (
      <Button
        type={type}
        shape={shape}
        tooltip={tooltip}
        className={styles.ripple}
      >
        {children}
      </Button>
    );
  });
