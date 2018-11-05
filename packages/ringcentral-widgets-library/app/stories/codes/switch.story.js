/**
 * @file Switch
 */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import Switch from '../../components/Switch';

storiesOf('Switch', module)
  .add('basic', () => {
    const onChange = action('onChange');
    const switchProps = {
      title: text('Title', 'Switch Title'),
      checked: boolean('Checked', false),
      onChange,
      disable: boolean('Disabled', false),
    };
    return <Switch {...switchProps} />;
  });
