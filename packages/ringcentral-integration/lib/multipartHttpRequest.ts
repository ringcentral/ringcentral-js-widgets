import {
  isASCII,
  MultiPartUTF8FormData,
  MultiPartUTF8FormDataOptions,
} from '@ringcentral-integration/utils';
import Platform from '@ringcentral/sdk/lib/platform/Platform';

const MULTIPART_MIXED = 'multipart/mixed';

type MultipartHttpRequestOptions = {
  method?: string;
  query?: Record<
    string,
    string | number | boolean | ReadonlyArray<string | number | boolean>
  >;
  headers?: Record<string, string>;
  userAgent?: string;
  skipAuthCheck?: boolean;
  skipDiscoveryCheck?: boolean;
  handleRateLimit?: boolean | number;
  retry?: boolean;
} & MultiPartUTF8FormDataOptions;

/**
 * create a http with multipart/form-data, let you can send multiple easily
 *
 * and handle `ASCII` encoding issue in multipart/form-data with `filename*=`
 */
export function multipartHttpRequest(platform: Platform) {
  function checkAllFilesNameNotHaveASCII(
    files: Record<string, File | Blob | File[] | Blob[]> | undefined,
  ) {
    return Object.values(files || {}).some((value) => {
      if (Array.isArray(value)) {
        return value.some(
          (file) => file instanceof File && !isASCII(file.name),
        );
      }
      return value instanceof File && !isASCII(value.name);
    });
  }

  function getFormData({ fields, files }: MultiPartUTF8FormDataOptions) {
    const formData = new FormData();

    Object.entries(fields || {}).forEach(([key, value]) => {
      formData.append(
        key,
        new Blob([JSON.stringify(value)], {
          type: 'application/json',
        }),
      );
    });

    Object.entries(files || {}).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, i) => {
          formData.append(
            key,
            item,
            item instanceof File ? item.name : `blob-${i}`,
          );
        });
      } else {
        formData.append(
          key,
          value,
          value instanceof File ? value.name : `blob`,
        );
      }
    });
    return formData;
  }

  const sendRequest = async (
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    {
      fields,
      files,
      query,
      headers = {},
      ...rest
    }: MultipartHttpRequestOptions,
  ) => {
    const { contentType } = headers;

    let result: Response;

    switch (method) {
      case 'get':
      case 'delete':
        {
          result = await platform[method](url, query, {
            ...rest,
            headers: {
              ...headers,
              'Content-Type': contentType || MULTIPART_MIXED,
            },
          });
        }
        break;
      default:
        {
          const hasNonASCII = checkAllFilesNameNotHaveASCII(files);

          if (hasNonASCII) {
            const uTF8FormData =
              (fields || files) &&
              (await new MultiPartUTF8FormData({ fields, files }).getData(
                contentType,
              ));

            result = await platform[method](
              url,
              uTF8FormData?.formData,
              query,
              {
                ...rest,
                headers: {
                  ...headers,
                  'Content-Type': uTF8FormData?.contentType || MULTIPART_MIXED,
                },
              },
            );
          } else {
            // when not be ASCII, use platform API directly
            const formData = getFormData({ fields, files });
            const response = await platform[method](url, formData, query, rest);

            return response.json();
          }
        }
        break;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const multipartResult = await (platform as any)._client.toMultipart(result);
    const responseData = await multipartResult?.[0]?.json();

    return responseData;
  };

  return {
    get: (url: string, options: Omit<MultipartHttpRequestOptions, 'body'>) =>
      sendRequest('get', url, options),
    post: (url: string, options: MultipartHttpRequestOptions) =>
      sendRequest('post', url, options),
    put: (url: string, options: MultipartHttpRequestOptions) =>
      sendRequest('put', url, options),
    patch: (url: string, options: MultipartHttpRequestOptions) =>
      sendRequest('patch', url, options),
    delete: (url: string, options: Omit<MultipartHttpRequestOptions, 'body'>) =>
      sendRequest('delete', url, options),
  };
}
