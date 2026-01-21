import { ensureAudioSoundPermission } from '../../src/app/services/EnsureAudio/ensureAudioSoundPermission';

describe('ensureAudioSoundPermission', () => {
  let permission: ReturnType<typeof ensureAudioSoundPermission>;

  beforeEach(() => {
    permission = ensureAudioSoundPermission();
  });

  test('should return true if audio permission is granted', async () => {
    const result = await permission.ensure();
    expect(result).toBe(true);
  });

  test('should return true if audio permission is already checked', async () => {
    await permission.ensure();
    const result = await permission.ensure();
    expect(result).toBe(true);
  });

  test('should return false if audio permission is denied', async () => {
    const mockPlay = jest.fn().mockRejectedValue(new Error('Audio play error'));
    const mockAudio = jest.fn().mockImplementation(() => ({
      play: mockPlay,
      remove: jest.fn(),
    }));
    global.Audio = mockAudio;

    const result = await permission.ensure();
    expect(result).toBe(false);
    expect(mockPlay).toHaveBeenCalled();
  });
});
