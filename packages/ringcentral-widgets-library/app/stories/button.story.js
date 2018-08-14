/**
 * @file button
 */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../components/Button';

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>RC Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}><span>😀 </span></Button>);
