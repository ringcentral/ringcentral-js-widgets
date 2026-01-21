import * as fs from 'fs-extra';
import * as path from 'path';
import { firstValueFrom, map, race, timer } from 'rxjs';

import { downloadFileToBuffer } from './downloadFileToBuffer';

const DOWNLOAD_TIME_KEY = 'download time';

export const downloadFileToPath = async (fromUrl: string, toPath: string) => {
  console.time(DOWNLOAD_TIME_KEY);
  const buffer = await firstValueFrom(
    race(
      downloadFileToBuffer(fromUrl),
      // timeout for 10 min
      timer(10 * 1000 * 60).pipe(map(() => null)),
    ),
  );

  if (!buffer) {
    throw new Error('download fail');
  }
  console.timeEnd(DOWNLOAD_TIME_KEY);

  await fs.ensureDir(path.dirname(toPath));

  return new Promise((resolve, reject) => {
    fs.createWriteStream(toPath).write(buffer, (error) => {
      if (error) {
        reject(error);
      }

      resolve(toPath);
    });
  });
};
