import {
  isMp3,
  isWav,
  fileToArrayBuffer,
  isAudioFile,
  readAudioFile,
} from '../../components/RingtoneSelection/helper';

describe('isMp3', () => {
  test('should return true for valid mp3 file', () => {
    const buf: Uint8Array = new Uint8Array([0x49, 0x44, 0x33]);
    expect(isMp3(buf)).toBe(true);
  });

  test('should return false for invalid mp3 file scenario1', () => {
    const buf: Uint8Array = new Uint8Array([0x00, 0x00, 0x00]);
    expect(isMp3(buf)).toBe(false);
  });
  test('should return false for invalid mp3 file scenario2', () => {
    const buf: Uint8Array = new Uint8Array([0x00, 0x00]);
    expect(isMp3(buf)).toBe(false);
  });
});

describe('isWav', () => {
  test('should return true for valid wav file', () => {
    const buf: Uint8Array = new Uint8Array([
      82, 73, 70, 70, 0, 0, 0, 0, 87, 65, 86, 69,
    ]);
    expect(isWav(buf)).toBe(true);
  });

  test('should return false for invalid wav file', () => {
    const buf: Uint8Array = new Uint8Array([0x00, 0x00, 0x00, 0x00]);
    expect(isWav(buf)).toBe(false);
  });
});

describe('fileToArrayBuffer', () => {
  test('should convert file to ArrayBuffer', async () => {
    const file: File = new File([], 'test.txt');
    const arrayBuffer: ArrayBuffer = await fileToArrayBuffer(file);
    expect(arrayBuffer).toBeInstanceOf(ArrayBuffer);
  });

  test('should reject with error when readAsArrayBuffer onerror', async () => {
    const file: File = new File([], '');
    // Mock FileReader
    FileReader.prototype.readAsArrayBuffer = jest.fn(function () {
      this.onerror({
        target: {
          error: 'invalid file',
        },
      });
    });
    await expect(fileToArrayBuffer(file)).rejects.toThrow(
      'Error reading file: invalid file',
    );
  });

  test('should reject with error when onload not return buffer', async () => {
    const file: File = new File([], '');
    // Mock FileReader
    FileReader.prototype.readAsArrayBuffer = jest.fn(function () {
      this.onload({});
    });
    await expect(fileToArrayBuffer(file)).rejects.toThrow(
      'Failed to convert file to ArrayBuffer.',
    );
  });
});

describe('readAudioFile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should read audio file and resolve with AudioInfo', async () => {
    const file: File = new File([], 'test.mp3');
    const audioInfo = await readAudioFile(file);
    expect(audioInfo.fileName).toBe('test.mp3');
    expect(audioInfo.dataUrl).toBe('data:application/octet-stream;base64,');
  });

  test('should reject with error for failed upload', async () => {
    const file: File = new File([], 'test.txt');
    // Mock FileReader
    FileReader.prototype.readAsDataURL = jest.fn(function () {
      this.onerror(new Error('upload failed'));
    });
    await expect(readAudioFile(file)).rejects.toMatch('upload failed');
  });
});
