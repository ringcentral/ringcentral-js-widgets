/**
 * @file iconLine
 */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import IconLine from '../components/IconLine';

storiesOf('IconLine', module)
  .add('basic', () => <IconLine />);

