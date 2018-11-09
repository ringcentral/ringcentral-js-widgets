/**
 * @file storybook config
 */

import { configure, addDecorator, getStorybook } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered'
import { withKnobs } from '@storybook/addon-knobs'


function loadCodeStories() {
  const req = require.context('../stories/codes', true, /.story.js$/);
  addDecorator((story, context) => withInfo()(story)(context));
  addDecorator(centered);
  addDecorator(withKnobs);
  req.keys().forEach((filename) => req(filename));
}

function loadUXstories() {
  const req = require.context('../stories/ux', true, /.story.js$/);
  req.keys().forEach((filename) => req(filename));
}

function loadStories() {
  loadUXstories();
  loadCodeStories();
}

configure(loadStories, module)

export { getStorybook }
