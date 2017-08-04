import { getWrapper } from '../shared';
import NavigationBar from '../../src/components/NavigationBar';
import ComposeTextPanel from '../../src/components/ComposeTextPanel';

let wrapper = null;
let panel = null;
let submitButton = null;
let textArea = null;
let toNumber = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 32000;
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/composeText');
  panel = wrapper.find(ComposeTextPanel).first();
  submitButton = panel.find('.submitButton').first();
  textArea = panel.find('.textField').first().find('textarea').first();
  toNumber = panel.find('.numberInput').first();
});

describe('compose text panel', () => {
  test('initial state', () => {
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();
    expect(submitButton.props()).toBeDefined();
    expect(textArea.props()).toBeDefined();
    expect(toNumber.props()).toBeDefined();
  });

  test('send button status', async () => {
    expect(submitButton.props().disabled).toBe(true);

    await textArea.props().onChange({ currentTarget: { value: 'Hello world' } });
    expect(textArea.props().value).toEqual('Hello world');

    await toNumber.props().onChange({ currentTarget: { value: 'Hello world' } });
    expect(toNumber.props().value).toEqual('Hello world');

    expect(submitButton.props().disabled).toBe(false);
  });
});
