/**
 * @file line
 */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import Line from '../../../elements/Line';
import IconLine from '../../../elements/IconLine';
import LinkLine from '../../../elements/LinkLine';
import dynamicsFont from '../../../assets/DynamicsFont/DynamicsFont.scss';
import Switch from '../../../elements/Switch';


storiesOf('Line', module)
  .add('basic', () => {
    const lineProps = {
      noBorder: boolean('NoBorder', false),
      onClick: action('onClick'),
      horizontal: boolean('Horizontal', false),
    };
    return <Line {...lineProps} />;
  })
  .add('IconLine', () => {
    const iconLineProps = {
      icon: (<Switch />),
      noBorder: boolean('NoBorder', false),
    };
    return <IconLine {...iconLineProps}><span>Iconline</span></IconLine>;
  })
  .add('LinkLine', () => {
    const linkLineProps = {
      onClick: action('onClick'),
      tooltip: text('Tooltip', 'Tooltip'),
      hrefClassName: null,
      iconClassName: null,
      noBorder: boolean('NoBorder', false),
    };
    return <LinkLine {...linkLineProps}><span>Linkline</span></LinkLine>;
  });
