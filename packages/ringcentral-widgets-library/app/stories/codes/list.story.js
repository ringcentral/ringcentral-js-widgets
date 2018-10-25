import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import withBackgrounds from '@storybook/addon-backgrounds';
import List from '../../components/List';

storiesOf('List', module)
  .addDecorator(withBackgrounds([
    { name: 'listBackground', value: '#f9f9f9', default: true }
  ]))
  .add('basic', () => <div style={{ width: '300px' }}><List type="L01" /><List type="L02" /></div>);
