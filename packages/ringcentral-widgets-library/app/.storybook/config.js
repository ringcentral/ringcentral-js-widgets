/**
 * @file storybook config
 */

import { configure, addDecorator, getStorybook } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered'
import { withKnobs } from '@storybook/addon-knobs'


function loadComponentsStories() {
  const req = require.context('../stories/components', true, /index.js$/);
  addDecorator((story, context) => withInfo()(story)(context));
  addDecorator(centered);
  addDecorator(withKnobs);
  req.keys().forEach((filename) => req(filename));
}

function loadDSstories() {
  const req = require.context('../stories/design', true, /.index.js$/);
  req.keys().forEach((filename) => req(filename));
}

function loadPagesStories() {
  const req = require.context('../stories/pages', true, /.index.js$/);
  addDecorator(centered);
  req.keys().forEach(filename => req(filename));
}

function loadStories() {
  loadDSstories();
  loadComponentsStories();
  loadPagesStories();
}

configure(loadStories, module)

export { getStorybook }
