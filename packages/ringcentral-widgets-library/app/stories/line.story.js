/**
 * @file line
 */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import Line from '../components/Line';
import IconLine from '../components/IconLine';
import LinkLine from '../components/LinkLine';
import dynamicsFont from '../assets/DynamicsFont/DynamicsFont.scss';

const iconLineProps = {
  icon: (<span className={dynamicsFont.arrow} />),
};
storiesOf('Line', module)
  .add('basic', () => <Line />)
  .add('IconLine', () => <IconLine {...iconLineProps}> <span>iconline</span></IconLine>)
  .add('LinkLine', () => <LinkLine onClick={() => null} to="test string"><span>linkline</span></LinkLine>);
