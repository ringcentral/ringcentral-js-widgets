import {
  slideInViewTransition,
  slideOutViewTransition,
  VIEW_TRANSITION_CONTAINER_IDENTIFY,
  VIEW_TRANSITION_DETAIL_IDENTIFY,
} from '../../src/app/views/AppRootView/viewTransition/slide';

describe('slide view transition', () => {
  let container: HTMLElement;
  let detail: HTMLElement;
  let originalStartViewTransition: typeof document.startViewTransition;
  let callback: jest.Mock<Promise<void>, []>;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = VIEW_TRANSITION_CONTAINER_IDENTIFY;
    detail = document.createElement('div');
    detail.id = VIEW_TRANSITION_DETAIL_IDENTIFY;
    document.body.appendChild(container);
    document.body.appendChild(detail);
    callback = jest.fn().mockResolvedValue(undefined);
    originalStartViewTransition = (document as any).startViewTransition;
  });

  afterEach(() => {
    document.body.innerHTML = '';
    (document as any).startViewTransition = originalStartViewTransition;
    jest.restoreAllMocks();
  });

  function mockStartViewTransition(finishImmediately = true) {
    (document as any).startViewTransition = jest.fn(
      (fn: () => Promise<void>) => {
        const finished = fn().then(() => undefined);
        return { finished };
      },
    );
  }

  it('should call callback directly if reduced motion is true', async () => {
    const spy = jest
      .spyOn(window, 'matchMedia')
      .mockReturnValue({ matches: true } as any);
    await slideInViewTransition(callback);
    expect(callback).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should call callback directly if container or detail is missing', async () => {
    document.body.removeChild(container);
    await slideInViewTransition(callback, false);
    expect(callback).toHaveBeenCalled();
  });

  it('should call callback directly if startViewTransition is not available', async () => {
    (document as any).startViewTransition = undefined;
    await slideInViewTransition(callback, false);
    expect(callback).toHaveBeenCalled();
  });

  it('should perform slideInViewTransition with animation', async () => {
    mockStartViewTransition();
    await slideInViewTransition(callback, false);
    expect(callback).toHaveBeenCalled();
    expect(
      container.classList.contains(VIEW_TRANSITION_CONTAINER_IDENTIFY),
    ).toBe(false);
    expect(detail.classList.contains(VIEW_TRANSITION_DETAIL_IDENTIFY)).toBe(
      false,
    );
  });

  it('should perform slideOutViewTransition with animation', async () => {
    mockStartViewTransition();
    await slideOutViewTransition(callback, false);
    expect(callback).toHaveBeenCalled();
    expect(
      container.classList.contains(VIEW_TRANSITION_CONTAINER_IDENTIFY),
    ).toBe(false);
  });

  it('should call callback directly for slideOutViewTransition if reduced motion is true', async () => {
    const spy = jest
      .spyOn(window, 'matchMedia')
      .mockReturnValue({ matches: true } as any);
    await slideOutViewTransition(callback);
    expect(callback).toHaveBeenCalled();
    spy.mockRestore();
  });
});
