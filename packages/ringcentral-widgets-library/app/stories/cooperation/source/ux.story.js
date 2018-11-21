/**
 * @file story for ux
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Markdown from './tools/Markdown';
import markdownDemo from './source/guideline.mkd';

storiesOf('Cooperation/UX', module)
  .add('guide', () => <Markdown input={markdownDemo} />);
