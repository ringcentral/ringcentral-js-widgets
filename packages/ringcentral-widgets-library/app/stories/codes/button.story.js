/**
 * @file button
 */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';

import Button from '../../components/Button';

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>RC Button</Button>)
  .add('with dynamic', () => {
    const children = text('children', 'dynamic');
    const tooltip = text('tooltip', 'hello');
    return (<Button tooltip={tooltip}>{children}</Button>);
  });
