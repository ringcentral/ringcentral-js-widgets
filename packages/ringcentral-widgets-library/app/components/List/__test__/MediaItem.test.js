import React from 'react';
import { mount } from 'enzyme';

import MediaItem from '../MediaItem';
import FormatInfo from '../MediaItem/FormatInfo';

import Icon from '../../../elements/Icon';

describe('MediaItem.Call', () => {
  it('functions bind on icons should be executed', () => {
    const onLogFn = jest.fn();
    const onHangUpFn = jest.fn();
    const onTransferFn = jest.fn();
    const props = {
      onLog: onLogFn,
      onHangUp: onHangUpFn,
      onTransfer: onTransferFn,
      isLogged: true
    };
    const call = mount(<MediaItem.Call {...props} />);
    const operationBar = call.find('.operationBar');
    operationBar.find(Icon.End).simulate('click');
    expect(onHangUpFn).toHaveBeenCalled();
    operationBar.find(Icon.Transfer).simulate('click');
    expect(onTransferFn).toHaveBeenCalled();
    operationBar.find(Icon).simulate('click');
    expect(onLogFn).toHaveBeenCalled();
  });
});

describe('FormatInfo', () => {
  it('format time', () => {
    const props = {
      name: 'test',
      describe: 'test',
      timestamp: 0
    };
    const formatInfo = mount(<FormatInfo {...props} />);
    // timestamp is 0
    const timeZone = formatInfo.find('.timeFormat');
    expect(timeZone.length).toBe(0);

    // timestamp is today
    function modifyHours(h) {
      const date = new Date(Date.now());
      date.setHours(h);
      date.setMinutes(9);
      return date.getTime();
    }
    formatInfo.setProps({ timestamp: modifyHours(9) });
    expect(formatInfo.find('.timeFormat').text().slice(1)).toEqual('09:09 AM');
    formatInfo.setProps({ timestamp: modifyHours(13) });
    expect(formatInfo.find('.timeFormat').text().slice(1)).toEqual('13:09 PM');

    // timestamp is yestoday
    function getTodayBefore(n) {
      const date = new Date(Date.now());
      const d = date.getDate();
      date.setDate(d - n);
      return date.getTime();
    }
    formatInfo.setProps({ timestamp: getTodayBefore(1) });
    expect(formatInfo.find('.timeFormat').text().slice(1)).toEqual('Yestoday');

    // tiestamp is other
    formatInfo.setProps({ timestamp: getTodayBefore(2) });
    expect(formatInfo.find('.timeFormat').text().slice(1)).toEqual(
      expect.stringMatching(/.*\/.*/)
    );
  });
});
