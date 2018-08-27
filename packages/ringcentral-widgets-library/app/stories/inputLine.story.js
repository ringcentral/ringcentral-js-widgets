/**
 * @file inputLine
 */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import InputLine from '../components/InputLine';

storiesOf('InputLine', module)
  .add('basic', () => <InputLine />);

