import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links'

import L101 from './L101';

storiesOf('Pages/List', module)
  .add('L101', () => {
    return <L101 />;
  });
