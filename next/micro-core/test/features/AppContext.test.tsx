import { fireEvent, render, screen } from '@ringcentral-integration/test-utils';
import React, { useContext } from 'react';

import {
  AppContext,
  AppProvider,
  AppRefsContext,
} from '../../src/app/components/AppContext/AppContext';

describe('AppContext', () => {
  test('does not rerender ref-only consumers when mutable layout state changes', () => {
    const renderRefConsumer = jest.fn();

    const RefConsumer = () => {
      renderRefConsumer();
      const { mainContentRef } = useContext(AppRefsContext);
      return <div ref={mainContentRef} data-sign="main-content" />;
    };

    const LayoutStateButton = () => {
      const { setFooterHeight } = useContext(AppContext);
      return (
        <button type="button" onClick={() => setFooterHeight(48)}>
          update footer
        </button>
      );
    };

    render(
      <AppProvider>
        <RefConsumer />
        <LayoutStateButton />
      </AppProvider>,
    );

    expect(renderRefConsumer).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button'));

    expect(renderRefConsumer).toHaveBeenCalledTimes(1);
  });
});
