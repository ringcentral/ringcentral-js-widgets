import { act } from '@testing-library/react';

/**
 * use for ait react renderer task ready,
 * when you need event bind with re-render
 *
 *
 * always use like below
 *
 * @example
 *
 * ```ts
 * jest.useFakeTimers();
 *
 * // some action you want to trigger
 *
 * await waitForRenderReady();
 * jest.runOnlyPendingTimers();
 * jest.useRealTimers();
 * ```
 */
export const waitForRenderReady = () => act(() => Promise.resolve());
