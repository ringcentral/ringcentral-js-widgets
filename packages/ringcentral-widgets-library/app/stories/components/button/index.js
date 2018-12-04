/**
 * @file button
 */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import { linkTo } from '@storybook/addon-links'

import Button from '../../../elements/Button';

storiesOf('Elements/Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>RC Button</Button>)
  .add('with dynamic', () => {
    const children = text('children', 'dynamic');
    const tooltip = text('tooltip', 'hello');
    return (
      <Button
        tooltip={tooltip}
        onClick={linkTo('Components/List', 'callItem')}
      >
        {children}
      </Button>
    );
  });
