import type { FileItem } from '../AttachmentItem.interface';

export const isFilesOverSize = (files: FileItem[], maxSize: number) => {
  let totalSize = 0;
  for (const item of files) {
    totalSize += item.size;
  }
  return totalSize > maxSize;
};
