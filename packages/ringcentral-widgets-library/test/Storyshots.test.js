import path from 'path';
import addons from '@storybook/addons';
import Channel from '@storybook/channels';

import initStoryshots, { snapshotWithOptions } from '@storybook/addon-storyshots';

function createChannel() {
  const transport = {
    setHandler() {},
    send() {},
  };

  return new Channel({ transport });
}

const kindBlackList = [
];

const nameBlackList = [
];

function genReg(list = []) {
  if (!list.length) {
    return new RegExp('.*');
  }
  return new RegExp(`^((?!.*?(${list.join('|')})).)*$`);
}
addons.setChannel(createChannel());

initStoryshots({
  configPath: path.join(process.cwd(), 'app', '.storybook'),
  storyKindRegex: genReg(kindBlackList),
  storyNameRegex: genReg(nameBlackList)
});
