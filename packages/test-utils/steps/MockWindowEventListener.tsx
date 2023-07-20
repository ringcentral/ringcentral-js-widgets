import { createMockAction, StepFunction } from '../lib';

interface MockWindowEventListenerProps {}
export const windowListenerSpy = createMockAction();

export const MockWindowEventListener: StepFunction<
  MockWindowEventListenerProps
> = async (props, context) => {
  jest
    .spyOn(global.window, 'addEventListener')
    .mockImplementation(windowListenerSpy.addListener);

  jest
    .spyOn(global.window, 'removeEventListener')
    .mockImplementation(windowListenerSpy.removeListener);
};
