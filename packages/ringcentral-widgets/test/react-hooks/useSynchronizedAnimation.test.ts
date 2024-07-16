import { renderHook } from '@testing-library/react-hooks';

import { useSynchronizedAnimation } from '../../react-hooks/useSynchronizedAnimation';

describe('useSynchronizedAnimation', () => {
  it('should synchronize the animation of all elements matching the selector', () => {
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    div1.style.animation = 'test-animation 1s linear infinite';
    div2.style.animation = 'test-animation 1s linear infinite';
    div3.style.animation = 'test-animation 1s linear infinite';
    document.body.appendChild(div1);
    document.body.appendChild(div2);
    document.body.appendChild(div3);
    const elm1Ani = div1.getAnimations();
    const elm2Ani = div2.getAnimations();
    const elm3Ani = div3.getAnimations();

    expect(elm1Ani[0].currentTime).not.toBe(elm2Ani[0].currentTime);
    expect(elm1Ani[0].currentTime).not.toBe(elm3Ani[0].currentTime);

    const tmp = Element.prototype.getAnimations;

    Element.prototype.getAnimations = jest.fn(() =>
      [elm1Ani, elm2Ani, elm3Ani].flat(),
    );

    renderHook(() => useSynchronizedAnimation('div'));

    expect(elm1Ani[0].currentTime).toBe(elm2Ani[0].currentTime);
    expect(elm1Ani[0].currentTime).toBe(elm3Ani[0].currentTime);

    document.body.removeChild(div1);
    document.body.removeChild(div2);
    document.body.removeChild(div3);

    Element.prototype.getAnimations = tmp;
  });

  it('should synchronize the animation of all elements matching the selector with the given animation name', () => {
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    div1.style.animation = 'test-animation 1s linear infinite';
    div2.style.animation = 'test-animation 2s linear infinite';
    div3.style.animation = 'test-animation 1s linear infinite';
    document.body.appendChild(div1);
    document.body.appendChild(div2);
    document.body.appendChild(div3);

    const elm1Ani = div1.getAnimations();
    const elm2Ani = div2.getAnimations();
    const elm3Ani = div3.getAnimations();

    expect(elm1Ani[0].currentTime).not.toBe(elm2Ani[0].currentTime);
    expect(elm1Ani[0].currentTime).not.toBe(elm3Ani[0].currentTime);
    const tmp = Element.prototype.getAnimations;

    Element.prototype.getAnimations = jest.fn(() =>
      [elm1Ani, elm2Ani, elm3Ani].flat(),
    );

    renderHook(() => useSynchronizedAnimation('div', 'test-animation'));

    expect(elm1Ani[0].currentTime).toBe(elm2Ani[0].currentTime);
    expect(elm1Ani[0].currentTime).toBe(elm3Ani[0].currentTime);

    document.body.removeChild(div1);
    document.body.removeChild(div2);
    document.body.removeChild(div3);

    Element.prototype.getAnimations = tmp;
  });

  it('should not synchronize the animation when animation name not match', () => {
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    div1.style.animation = 'test-animation 1s linear infinite';
    div2.style.animation = 'test-animation 2s linear infinite';
    div3.style.animation = 'test-animation 1s linear infinite';
    document.body.appendChild(div1);
    document.body.appendChild(div2);
    document.body.appendChild(div3);

    const elm1Ani = div1.getAnimations();
    const elm2Ani = div2.getAnimations();
    const elm3Ani = div3.getAnimations();

    expect(elm1Ani[0].currentTime).not.toBe(elm2Ani[0].currentTime);
    expect(elm1Ani[0].currentTime).not.toBe(elm3Ani[0].currentTime);

    const tmp = Element.prototype.getAnimations;
    Element.prototype.getAnimations = jest.fn(() =>
      [elm1Ani, elm2Ani, elm3Ani].flat(),
    );

    renderHook(() => useSynchronizedAnimation('div', 'test-animation2'));

    expect(elm1Ani[0].currentTime).not.toBe(elm2Ani[0].currentTime);
    expect(elm1Ani[0].currentTime).not.toBe(elm3Ani[0].currentTime);

    document.body.removeChild(div1);
    document.body.removeChild(div2);
    document.body.removeChild(div3);
    Element.prototype.getAnimations = tmp;
  });
});
