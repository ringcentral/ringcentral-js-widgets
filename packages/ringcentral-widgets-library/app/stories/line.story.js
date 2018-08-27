/**
 * @file line
 */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import Line from '../components/Line';

storiesOf('Line', module)
  .add('basic', () => <Line />);

