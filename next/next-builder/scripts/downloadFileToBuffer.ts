import * as https from 'https';

export const downloadFileToBuffer = (url: string) =>
  new Promise<Buffer | null>((resolve, reject) => {
    https
      .get(url, (res) => {
        const data: any[] = [];

        res
          .on('data', (chunk) => {
            data.push(chunk);
          })
          .on('end', () => {
            const buffer = Buffer.concat(data);
            // Do something with the buffer
            resolve(buffer);
          })
          .on('error', (err) => {
            console.log('download error:', err);
            resolve(null);
          });
      })
      .on('error', (err) => {
        console.log('download error:', err);

        resolve(null);
      });
  });
