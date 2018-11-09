/**
 * @file story for ux
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Markdown from './tools/Markdown';
import markdownDemo from './source/guideline.mkd';

storiesOf('UX', module)
  .add('guide', () => {
    return <Markdown input={markdownDemo} />;
  });
