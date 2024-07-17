import { bindHammerZoom } from '../../src/useZoom/bind-hammer-zoom';

describe('bindHammerZoom', () => {
  let mockHammer: any;
  let mockGetTarget: jest.Mock;
  let mockGetContainer: jest.Mock;
  let mockOnScale: jest.Mock;
  let mockOnDragChange: jest.Mock;

  beforeEach(() => {
    mockHammer = {
      on: jest.fn(),
    };
    mockGetTarget = jest.fn(() => document.createElement('div'));
    mockGetContainer = jest.fn();
    mockOnScale = jest.fn();
    mockOnDragChange = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const bindZoom = bindHammerZoom({
      hammer: mockHammer,
      getTarget: mockGetTarget,
      getContainer: mockGetContainer,
      onScale: mockOnScale,
      onDragChange: mockOnDragChange,
    });

    expect(bindZoom.reset).toBeDefined();
    expect(bindZoom.zoomCenter).toBeDefined();
    expect(bindZoom.toggle).toBeDefined();
    expect(bindZoom.zoomStart).toBeDefined();
    expect(bindZoom.zooming).toBeDefined();
    expect(bindZoom.zoom).toBeDefined();
  });

  it('should reset the zoom to default values', () => {
    const bindZoom = bindHammerZoom({
      hammer: mockHammer,
      getTarget: mockGetTarget,
      getContainer: mockGetContainer,
      onScale: mockOnScale,
      onDragChange: mockOnDragChange,
    });

    bindZoom.reset();

    expect(mockOnDragChange).not.toHaveBeenCalled();
    expect(mockOnScale).toHaveBeenCalledWith(1);
  });

  it('should zoom to the center', () => {
    const bindZoom = bindHammerZoom({
      hammer: mockHammer,
      getTarget: mockGetTarget,
      getContainer: mockGetContainer,
      onScale: mockOnScale,
      onDragChange: mockOnDragChange,
    });

    bindZoom.zoomCenter();

    expect(mockOnScale).toHaveBeenCalledWith(1.5);
  });

  it('should toggle between reset and zoomCenter', () => {
    const bindZoom = bindHammerZoom({
      hammer: mockHammer,
      getTarget: mockGetTarget,
      getContainer: mockGetContainer,
      onScale: mockOnScale,
      onDragChange: mockOnDragChange,
    });

    bindZoom.toggle(); // Zoom to center
    bindZoom.toggle(); // Reset

    expect(mockOnDragChange).not.toHaveBeenCalled();
    expect(mockOnScale).toHaveBeenCalledWith(1);
  });
});
