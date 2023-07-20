import { fileToBase64 } from './base64Handler';

type MultiPartDataType = {
  key: string;
  source: string;
  filename?: string;
  type?: string;
};

export type MultiPartUTF8FormDataOptions = {
  fields?: Record<string, any>;
  files?: Record<string, File | Blob | File[] | Blob[]>;
};

/**
 * make you can send custom form data with `filename*=`
 */
export class MultiPartUTF8FormData {
  private _boundary = `----Boundary${Math.random().toString(35).substring(2)}`;

  constructor(private dataList: MultiPartUTF8FormDataOptions) {}

  async getData(contentType = 'multipart/form-data') {
    const formDataStringList = await this.getFormStringList();
    const wrappedBoundary = `--${this._boundary}`;
    const outputRowData = `${formDataStringList
      .map((body) => `${wrappedBoundary}\r\n${body}`)
      .join('\r\n')}`;

    return {
      contentType: `${contentType}; boundary=${this._boundary}`,
      formData: `${outputRowData}\r\n${wrappedBoundary}--`,
    };
  }

  private async getFormStringList() {
    const result = await Promise.all([
      ...Object.entries(this.dataList.fields || {}).map(
        async ([key, value]) => {
          if (typeof value === 'object') {
            return this.getJsonFormString({
              key,
              source: JSON.stringify(value),
            });
          }

          return this.getJsonFormString({
            key,
            source: value,
          });
        },
      ),
      ...Object.entries(this.dataList.files || {}).map(async ([key, value]) => {
        if (Array.isArray(value)) {
          return Promise.all(value.map((file) => this.processFile(key, file)));
        }

        return this.processFile(key, value);
      }),
    ]);

    return result.flat();
  }

  private async processFile(key: string, file: File | Blob) {
    const base64 = await fileToBase64(file);

    return this.getBase64FormString({
      key,
      source: base64,
      filename: file instanceof File ? file.name : 'blob',
      type: file.type,
    });
  }

  private getJsonFormString({
    key,
    source,
    type = 'application/json',
  }: MultiPartDataType) {
    return [
      `Content-Disposition: form-data; name="${key}"`,
      `Content-type: ${type}`,
      '',
      `${source}`,
    ].join('\r\n');
  }

  private getBase64FormString({
    key,
    source,
    filename = 'blob',
    type = 'application/octet-stream',
  }: MultiPartDataType) {
    const encodedFileName = encodeURI(filename);
    const contentType = type;
    const dataUrl = source.split('base64,')[1];

    return [
      `Content-Disposition: form-data; name="${key}"; filename*="UTF-8''${encodedFileName}"; filename="${encodedFileName}"`,
      `Content-Type: ${contentType}`,
      'Content-Transfer-Encoding: base64',
      '',
      dataUrl,
    ].join('\r\n');
  }
}
