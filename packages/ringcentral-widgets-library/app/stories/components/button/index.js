/**
 * @file button
 */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, number, select } from '@storybook/addon-knobs/react';
import { linkTo } from '@storybook/addon-links'

import Button from '../../../elements/Button';

storiesOf('Elements/Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>RC Button</Button>)
  .add('with dynamic', () => {
    const children = text('children', 'dynamic');
    const tooltip = text('tooltip', 'hello');
    const label1 = 'types';
    const options = [
      'outline',
      'warning',
    ];
    const type = select(label1, options, 'outline');

    const label2 = 'shaps';
    const shapOptions = [
      'default',
      'circle'
    ];
    const shape = select(label2, shapOptions, 'circle');

    return (
      <Button
        type={type}
        shape={shape}
        tooltip={tooltip}
        onClick={linkTo('Components/List', 'callItem')}
      >
        {children}
      </Button>
    );
  });
