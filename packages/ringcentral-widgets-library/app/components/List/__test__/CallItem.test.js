import React from 'react';
import { mount } from 'enzyme';

import CallItem from '../CallItem';

import Icon from '../../../elements/Icon';

describe('Call Item', () => {
  it('onEndCall should be called', () => {
    const endCallFn = jest.fn();
    const callItem = mount(<CallItem showEndCall onEndCall={endCallFn} />);
    const endBtn = callItem.find('.operationBar').find(Icon.End);
    expect(endBtn.length).toBe(1);
    endBtn.simulate('click');
    expect(endCallFn).toBeCalledTimes(1);
  });
  it('onAnswerCall should be called', () => {
    const onAnswerCallFn = jest.fn();
    const callItem = mount(<CallItem showAnswerCall onAnswerCall={onAnswerCallFn} />);
    const answerBtn = callItem.find('.operationBar').find(Icon.Answer);
    expect(answerBtn.length).toBe(1);
    answerBtn.simulate('click');
    expect(onAnswerCallFn).toBeCalledTimes(1);
  });

  it('onMergeCall should be called', () => {
    const onMergeCallFn = jest.fn();
    const callItem = mount(<CallItem showMergeCall onMergeCall={onMergeCallFn} />);
    const mergeBtn = callItem.find('.operationBar').find(Icon.Merge);
    expect(mergeBtn.length).toBe(1);
    mergeBtn.simulate('click');
    expect(onMergeCallFn).toBeCalledTimes(1);
  });

  it('if showExtraInfo is true, The operation icons will disappeared', () => {
    const props = {
      showExtraInfo: true,
      showAnswerCall: true
    };
    const callItem = mount(<CallItem {...props} />);
    const operationBar = callItem.find('.operationBar');
    expect(operationBar.length).toBe(0);
  });
});
