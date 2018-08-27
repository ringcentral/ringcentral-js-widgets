/**
 * @file linkLine
 */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import LinkLine from '../components/LinkLine';

storiesOf('LinkLine', module)
  .add('basic', () => <LinkLine ><span>LinkLine</span></LinkLine>);

