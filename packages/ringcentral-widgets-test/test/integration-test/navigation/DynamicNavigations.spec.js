import * as mock from 'ringcentral-integration/integration-test/mock';
import NavigationBar from 'ringcentral-widgets/components/NavigationBar';
import TabNavigationButton from 'ringcentral-widgets/components/TabNavigationButton';
import DropdownNavigationView from 'ringcentral-widgets/components/DropdownNavigationView';
import DropdownNavigationItem from 'ringcentral-widgets/components/DropdownNavigationItem';

import { getWrapper } from '../shared';

let originalPhone = null;
let wrapper = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  originalPhone = wrapper.props().phone;
});

afterEach(async () => {
  wrapper.setProps({ phone: originalPhone });
  wrapper.update();
});

describe('dynamic navigationb bar', () => {
  test('navigation bar should be normal when has permissions', async () => {
    const phone = wrapper.props().phone;
    Object.defineProperties(phone.rolesAndPermissions, {
      callingEnabled: { value: true },
      hasReadMessagesPermission: { value: true },
      hasComposeTextPermission: { value: true },
      permissions: {
        value: {
          ...phone.rolesAndPermissions.permissions,
          ReadCallLog: true,
          OrganizeConference: true,
          Meetings: true
        }
      },
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    const moreMenu = navigationBar.find(TabNavigationButton).find({ label: 'More Menu' });
    expect(navigationBar.find(TabNavigationButton)).toHaveLength(5);
    expect(moreMenu).toHaveLength(1);
    // TODO: test dropdown as well
  });

  test('navigation bar should be dynamically customizable by permissions', () => {
    const phone = wrapper.props().phone;
    Object.defineProperties(phone.rolesAndPermissions, {
      callingEnabled: { value: false },
      hasReadMessagesPermission: { value: false },
      hasComposeTextPermission: { value: false },
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    expect(navigationBar.find(TabNavigationButton)).toHaveLength(4);
    expect(navigationBar.find(TabNavigationButton).find({ label: 'History' })).toHaveLength(1);
    expect(navigationBar.find(TabNavigationButton).find({ label: 'Dial Pad' })).toHaveLength(0);
    expect(navigationBar.find(TabNavigationButton).find({ label: 'Messages' })).toHaveLength(0);
    expect(navigationBar.find(TabNavigationButton).find({ label: 'Compose Text' })).toHaveLength(0);
  });

  test('should hide breadcrumbs when the number of nav items are less than or equals to 5', () => {
    const phone = wrapper.props().phone;
    Object.defineProperty(phone.rolesAndPermissions, 'callingEnabled', {
      value: false,
    });
    Object.defineProperty(phone.rolesAndPermissions, 'hasReadMessagesPermission', {
      value: false,
    });
    Object.defineProperty(phone.rolesAndPermissions, 'hasComposeTextPermission', {
      value: false,
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    expect(navigationBar.find(TabNavigationButton).find({ label: 'More Menu' })).toHaveLength(0);
  });

  test('should hide dialpad when no calling permsision', () => {
    const phone = wrapper.props().phone;
    Object.defineProperty(phone.rolesAndPermissions, 'callingEnabled', {
      value: false,
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    expect(navigationBar.find(TabNavigationButton)).toHaveLength(5);
    expect(navigationBar.find(TabNavigationButton).find({ label: 'Dial Pad' })).toHaveLength(0);
  });

  test('should hide composeText when no composeText permsision', () => {
    const phone = wrapper.props().phone;
    Object.defineProperty(phone.rolesAndPermissions, 'hasComposeTextPermission', {
      value: false,
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    expect(navigationBar.find(TabNavigationButton).find({ label: 'Compose Text' })).toHaveLength(0);
  });

  test('should hide messages when no hasReadMessagesPermission', () => {
    const phone = wrapper.props().phone;
    Object.defineProperty(phone.rolesAndPermissions, 'hasReadMessagesPermission', {
      value: false,
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    expect(navigationBar.find(TabNavigationButton).find({ label: 'Messages' })).toHaveLength(0);
  });

  test('should hide meeting when no meeting permissions', () => {
    const phone = wrapper.props().phone;
    Object.defineProperties(phone.rolesAndPermissions, {
      callingEnabled: { value: false},
      hasReadMessagesPermission: { value: false },
      hasComposeTextPermission: { value: false },
      permissions: {
        value: {
          ...phone.rolesAndPermissions.permissions,
          ReadCallLog: false,
          OrganizeConference: true,
          Meetings: false
        }
      },
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    expect(navigationBar.find(TabNavigationButton).find({ label: 'Schedule Meeting' })).toHaveLength(0);
  });

  test('should hide conference when no conference permissions', () => {
    const phone = wrapper.props().phone;
    Object.defineProperties(phone.rolesAndPermissions, {
      callingEnabled: { value: false},
      hasReadMessagesPermission: { value: false },
      hasComposeTextPermission: { value: false },
      permissions: {
        value: {
          ...phone.rolesAndPermissions.permissions,
          ReadCallLog: false,
          OrganizeConference: false,
          Meetings: false
        }
      },
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    expect(navigationBar.find(TabNavigationButton).find({ label: 'Schedule Meeting' })).toHaveLength(0);
  });

  test('should hide history when no readCallLog permsision', () => {
    const phone = wrapper.props().phone;
    Object.defineProperty(phone.rolesAndPermissions.permissions, 'ReadCallLog', {
      value: false,
    });
    wrapper.setProps({ phone });
    wrapper.update();
    const navigationBar = wrapper.find(NavigationBar).first();
    expect(navigationBar.find(TabNavigationButton)).toHaveLength(5);
    expect(navigationBar.find(TabNavigationButton).find({ label: 'History' })).toHaveLength(0);
  });

  test('should hide contacts when no calling and read messages permsision', () => {
    const phone = wrapper.props().phone;
    Object.defineProperty(phone.rolesAndPermissions.permissions, 'ReadCallLog', {
      value: false,
    });
    Object.defineProperty(phone.rolesAndPermissions.permissions, 'hasReadMessagesPermission', {
      value: true,
    });
    wrapper.setProps({ phone });
    wrapper.update();
    let navigationBar = wrapper.find(NavigationBar).first();
    expect(navigationBar.find(TabNavigationButton).find({ label: 'Contacts' })).toHaveLength(1);
    Object.defineProperty(phone.rolesAndPermissions, 'hasReadMessagesPermission', {
      value: false,
    });
    Object.defineProperty(phone.rolesAndPermissions, 'callingEnabled', {
      value: false,
    });
    wrapper.setProps({ phone });
    wrapper.update();
    navigationBar = wrapper.find(NavigationBar).first();
    expect(navigationBar.find(TabNavigationButton).find({ label: 'Contacts' })).toHaveLength(0);
  });
});
