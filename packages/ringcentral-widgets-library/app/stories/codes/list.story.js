import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import backgrounds, { withBackgrounds } from '@storybook/addon-backgrounds';
import List from '../../components/List';

storiesOf('List', module)
  .addDecorator(withBackgrounds([
    { name: 'twitter', value: '#000', default: true }
  ]))
  .add('basic', () => <div style={{ width: '300px' }}><List /></div>);
