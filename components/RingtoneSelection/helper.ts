import { AudioInfo } from '@ringcentral-integration/commons/modules/RingtoneConfiguration';

export const isMp3 = (buf: Uint8Array | null): boolean => {
  if (!buf || buf.length < 3) {
    return false;
  }

  return (
    (buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) ||
    (buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0) ||
    (buf[0] === 0x54 && buf[1] === 0x41 && buf[2] === 0x47)
  );
};

export const isWav = (buf: Uint8Array | null): boolean => {
  if (!buf || buf.length < 12) {
    return false;
  }

  return (
    buf[0] === 82 &&
    buf[1] === 73 &&
    buf[2] === 70 &&
    buf[3] === 70 &&
    buf[8] === 87 &&
    buf[9] === 65 &&
    buf[10] === 86 &&
    buf[11] === 69
  );
};

export const fileToArrayBuffer = async (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result instanceof ArrayBuffer) {
        resolve(event.target.result);
      } else {
        reject(new Error('Failed to convert file to ArrayBuffer.'));
      }
    };

    reader.onerror = (event) => {
      reject(new Error('Error reading file: ' + event.target?.error));
    };

    reader.readAsArrayBuffer(file);
  });
};

export const isAudioFile = async (file: File): Promise<boolean> => {
  const arrayBuffer = await fileToArrayBuffer(file);
  const signature = new Uint8Array(arrayBuffer);

  return isMp3(signature) || isWav(signature);
};

export const readAudioFile = async (file: File): Promise<AudioInfo> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve({
        fileName: file.name,
        dataUrl: reader.result as string,
      });
    };
    reader.onerror = () => {
      reject('upload failed');
    };
    reader.readAsDataURL(file);
  });
};
