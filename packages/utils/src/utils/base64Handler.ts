const REGEXP_BASE64_DATA_URL =
  /^(data:\w+\/[a-zA-Z+\-.]+;base64,)?(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/i;

export function isBase64DataUrl(value: string) {
  return REGEXP_BASE64_DATA_URL.test(value);
}

export function decodeBase64DataUrl(dataURL: string) {
  if (isBase64DataUrl(dataURL)) {
    return atob(dataURL.split('base64,')[1]);
  }

  return '';
}

export const fileToBase64 = (file: File | Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target!.result as string);
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsDataURL(file);
  });
};

export const fileToBinary = (file: File | Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target!.result as string);
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsBinaryString(file);
  });
};

export function base64ToBlob(base64Image: string) {
  const split = base64Image.split(',');
  const type = split[0].replace('data:', '').replace(';base64', '');
  const byteString = atob(split[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type });
}

export function base64ToFile(base64Image: string, filename: string) {
  const blob = base64ToBlob(base64Image);

  return new File([blob], filename);
}
