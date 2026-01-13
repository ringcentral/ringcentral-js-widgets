import {
  render,
  screen,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import React, { useRef } from 'react';

import { useImportantStyle } from '../../src/useImportantStyle';

const App = () => {
  const containerRef = useRef(null);

  useImportantStyle(containerRef, {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  });

  return <button ref={containerRef}>App</button>;
};

describe('useImportantStyle', () => {
  it('should initialize with default values', async () => {
    render(<App />);

    const container = screen.getByText('App');

    await waitForRenderReady();

    expect(container).toBeInTheDocument();

    expect(container.style.cssText).toMatchInlineSnapshot(
      `"position: absolute !important; top: 0px !important; left: 0px !important; width: 100% !important; height: 100% !important;"`,
    );
  });
});
