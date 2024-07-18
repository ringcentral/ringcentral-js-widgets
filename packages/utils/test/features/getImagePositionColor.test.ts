import { getImagePositionColor } from '../../src/utils/getImagePositionColor';
import { loadImage } from '../../src/utils/loadImage';

jest.mock('../../src/utils/loadImage', () => ({
  loadImage: jest.fn().mockResolvedValue({ remove: jest.fn() }),
}));

describe('getImagePositionColor', () => {
  it('should return the color at the specified position', async () => {
    // Mock the necessary functions and objects
    const ctx = {
      getImageData: jest.fn().mockReturnValue({
        // red
        data: [255, 0, 0],
      }),
      drawImage: jest.fn(),
    };

    const canvas = {
      width: 300,
      height: 300,
      remove: jest.fn(),
      getContext: jest.fn().mockReturnValue(ctx),
    };

    jest.spyOn(document, 'createElement').mockReturnValue(canvas as any);

    // Call the function with a mock URL and position
    const color = await getImagePositionColor('mock-url', { x: 10, y: 20 });

    // Assert the expected color value
    expect(color).toBe('#ff0000');

    // Assert that the necessary functions and objects were called with the correct arguments
    expect(loadImage).toHaveBeenCalledWith('mock-url');
    expect(document.createElement).toHaveBeenCalledWith('canvas');
    expect(canvas.getContext).toHaveBeenCalledWith('2d');
    await Promise.resolve();
    expect(ctx.drawImage).toHaveBeenCalledWith(
      expect.anything(),
      0,
      0,
      300,
      300,
    );
    expect(ctx.getImageData).toHaveBeenCalledWith(10, 20, 1, 1);
    expect(canvas.remove).toHaveBeenCalled();
    expect((await loadImage('12')).remove).toHaveBeenCalled();
  });

  it('should return "#FFF" when an error occurs', async () => {
    jest.spyOn(document, 'createElement').mockImplementation(() => {
      throw new Error('mock error');
    });
    // Call the function with a mock URL and position
    const color = await getImagePositionColor('mock-url', { x: 10, y: 20 });

    // Assert the expected color value
    expect(color).toBe('#FFF');
  });
});
