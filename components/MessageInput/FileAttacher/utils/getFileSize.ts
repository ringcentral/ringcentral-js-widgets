// refer from J: project/common/ui/common/src/helper/helper.ts

export const getFileSize = (bytes: number) => {
  if (typeof bytes !== 'number') {
    return '0 B';
  }
  if (bytes < 100) {
    return `${bytes && bytes.toFixed(1)} B`;
  }
  if (bytes / 1024 < 1000) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  if (bytes / 1024 / 1024 < 1000) {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }
  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
};
