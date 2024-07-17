import { waitUntil } from '@ringcentral-integration/commons/utils';
import { renderHook, act } from '@testing-library/react-hooks';

import { useHammerZoom } from '../../src/useZoom/useZoom';

describe('useHammerZoom', () => {
  let mockTarget: HTMLElement;
  let mockContainer: HTMLElement;
  let mockOnScale: jest.Mock;
  let mockOnDragChange: jest.Mock;

  beforeEach(() => {
    mockTarget = document.createElement('div');
    mockContainer = document.createElement('div');
    mockOnScale = jest.fn();
    mockOnDragChange = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', async () => {
    const { result } = renderHook(() =>
      useHammerZoom(mockTarget, {
        container: mockContainer,
        min: 0,
        max: 1,
        onScale: mockOnScale,
        onDragChange: mockOnDragChange,
      }),
    );

    await waitUntil(() => !!result.current);

    expect(result.current.zoom).toBeDefined();
    expect(result.current.reset).toBeDefined();
  });

  it('should call onScale when zooming', async () => {
    const { result } = renderHook(() =>
      useHammerZoom(mockTarget, {
        container: mockContainer,
        min: 0,
        max: 1,
        onScale: mockOnScale,
        onDragChange: mockOnDragChange,
      }),
    );

    await waitUntil(() => !!result.current);

    act(() => {
      result.current.zoom(1.5);
    });

    expect(mockOnScale).toHaveBeenCalledWith(1);
  });

  it('should call reset when resetting zoom', async () => {
    const { result } = renderHook(() =>
      useHammerZoom(mockTarget, {
        container: mockContainer,
        min: 0,
        max: 1,
        onScale: mockOnScale,
        onDragChange: mockOnDragChange,
      }),
    );

    await waitUntil(() => !!result.current);

    act(() => {
      result.current.reset();
    });

    expect(mockOnScale).toHaveBeenCalledWith(1);
  });
});
