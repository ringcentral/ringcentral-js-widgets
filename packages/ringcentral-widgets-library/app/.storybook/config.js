/**
 * @file storybook config
 */

import { configure, addDecorator, getStorybook } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered'
import { withKnobs } from '@storybook/addon-knobs'

const req = require.context('../stories', true, /.story.js$/);
function loadStories() {
  addDecorator((story, context) => withInfo()(story)(context))
  addDecorator(centered)
  addDecorator(withKnobs)
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module)

export { getStorybook }
