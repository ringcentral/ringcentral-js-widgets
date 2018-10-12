import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import List from '../../components/List';


storiesOf('List', module)
  .add('basic', () => <div style={{ width: '300px' }}><List /></div>);
