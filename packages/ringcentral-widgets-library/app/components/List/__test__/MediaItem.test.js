import React from 'react';
import { mount } from 'enzyme';

import MediaItem from '../MediaItem';

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
