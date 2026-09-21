import { referencePopperMiddlewares } from './ReferencePopper';

describe('referencePopperMiddlewares', () => {
  const getSizeApply = () => {
    const sizeMiddleware = referencePopperMiddlewares.find(
      (middleware) => middleware.name === 'size',
    ) as any;
    // floating-ui wraps the passed options as [options, derivation]
    const options = Array.isArray(sizeMiddleware.options)
      ? sizeMiddleware.options[0]
      : sizeMiddleware.options;
    return options.apply;
  };

  it('limits the popper size when space is available', () => {
    const floating = { style: {} as Record<string, string> };

    getSizeApply()({
      availableWidth: 320,
      availableHeight: 240,
      elements: { floating },
    });

    expect(floating.style.maxWidth).toBe('320px');
    expect(floating.style.maxHeight).toBe('240px');
  });

  it('keeps the popper uncollapsed when jsdom reports zero space', () => {
    const floating = { style: {} as Record<string, string> };

    getSizeApply()({
      availableWidth: 0,
      availableHeight: 0,
      elements: { floating },
    });

    expect(floating.style.maxWidth).toBeUndefined();
    expect(floating.style.maxHeight).toBeUndefined();
  });
});
