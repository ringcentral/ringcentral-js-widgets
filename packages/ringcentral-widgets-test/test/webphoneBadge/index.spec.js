import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';
import WebphoneBadge from 'ringcentral-widgets/components/WebphoneBadge';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import WebphoneAlert from 'ringcentral-widgets/components/WebphoneAlert';
import AudioSettingsAlert from 'ringcentral-widgets/components/AudioSettingsAlert';

import { getWrapper } from '../shared';

/* global jasmine */
let store = null;
let wrapper = null;
let phone = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  store = wrapper.props().phone.store;
  phone = wrapper.props().phone;
  phone.webphone._createWebphone();
  phone.webphone._removeWebphone = () => { };
  phone.webphone._connect = () => { };
});

describe('Webphone warning badge', () => {
  const errMsg = 'Internal error occurs. We are reconnecting to server. If the error persists, please report this error to RingCentral Support.';
  const getErrCodeMsg = errCode => `Internal error code: ${errCode}. We are reconnecting to server. If the error persists, please report this error to RingCentral Support.`;
  [
    // Case 1: check if webphone badge is shown
    {
      desc: 'Webphone Badge',
      assert: () => {
        wrapper.update();
        const badge = wrapper.find(WebphoneBadge);
        expect(badge.exists()).toBeTruthy();
      },
    },

    // Case 2: check if dial button is disabled
    {
      desc: 'Disabled Dial Button',
      assert: () => {
        wrapper.update();
        const button = wrapper.find(CircleButton);
        expect(button.at(0).prop('className').includes('disabled')).toBeTruthy();
      }
    },
    // Case 3: check if alert message is shown when clicks badge
    {
      desc: 'Alert Message',
      assert: ({ type, msg }) => {
        wrapper.update();
        const badge = wrapper.find(WebphoneBadge);

        badge.simulate('click');
        wrapper.update();

        if (type == 'audio') {
          const audioAlert = wrapper.find(AudioSettingsAlert);
          expect(audioAlert.text()).toEqual(msg);
          return;
        }
        const webphoneAlert = wrapper.find(WebphoneAlert);
        expect(webphoneAlert.text()).toEqual(msg);
      }
    },
  ].forEach(({ desc, assert }) => {
    [
      { err: 503, msg: 'A maximum of 5 web phones could be registered.' },
      { err: 603, msg: 'A maximum of 5 web phones could be registered.' },
      { err: 408, msg: getErrCodeMsg(408) },
      { err: 500, msg: getErrCodeMsg(500) },
      { err: 504, msg: getErrCodeMsg(504) },
      // generic error code
      { err: 502, msg: getErrCodeMsg(502) },
      { err: 404, msg: getErrCodeMsg(404) },
    ].forEach(({ err, msg }) => {
      test(`${desc} :: webphone error code ${err}`, () => {
        const regFailedFunc = phone.webphone._webphone.userAgent
          ._events.registrationFailed.bind(phone.webphone);
        regFailedFunc({
          status_code: err
        });
        assert({ msg });
      });
    });

    [
      webphoneErrors.sipProvisionError
    ].forEach((errCode) => {
      test(`${desc} :: sipProvision error ${errCode}`, () => {
        phone.store.dispatch({
          type: phone.webphone.actionTypes.connectError,
          errorCode: errCode,
        });
        assert({ msg: errMsg });
      });
    });

    test(`${desc} :: audio permission error`, async () => {
      await phone.audioSettings.onGetUserMediaError();
      wrapper.update();
      assert({
        type: 'audio',
        msg: `Please grant ${phone.brand.application} to access your audio.`
      });
    });
  });
});
