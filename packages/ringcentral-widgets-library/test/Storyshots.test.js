import path from 'path';
import addons, { mockChannel } from '@storybook/addons';
import initStoryshots from '@storybook/addon-storyshots';

const kindBackList = [
  'Elements/Avatar',
];

const nameBackList = [
  'callItem',
  'MediaItem.Media'
];

function genReg(list = []) {
  return new RegExp(`^((?!.*?(${list.join('|')})).)*$`);
}

addons.setChannel(mockChannel());
initStoryshots({
  configPath: path.join(process.cwd(), 'app', '.storybook'),
  storyKindRegex: genReg(kindBackList),
  storyNameRegex: genReg(nameBackList)
});
