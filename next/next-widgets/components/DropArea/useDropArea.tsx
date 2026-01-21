import { RefOrElementOrCallback, useEventListener } from '@ringcentral/juno';
import { DragEventHandler, useRef, useState } from 'react';

/**
 * provide you a easy way to support drop files to area
 * that have bug in `react-use`, so we implement that by ourself
 *
 * ref: https://github.com/streamich/react-use/blob/master/src/useDropArea.ts
 * @see https://github.com/streamich/react-use/issues/2368
 */
export const useDropArea = (
  ref: RefOrElementOrCallback,
  onDrop: (files: FileList) => void,
  options: { disabled: boolean } = { disabled: false },
) => {
  const { disabled } = options;
  const [dragging, setDragging] = useState(false);
  const draggingCountRef = useRef(0);

  useEventListener(ref, 'dragenter', ((ev) => {
    if (disabled) return;

    ev.preventDefault();
    ev.stopPropagation();
    draggingCountRef.current++;
    if (ev.dataTransfer.items && ev.dataTransfer.items.length !== 0) {
      setDragging(true);
    }
  }) as DragEventHandler);

  useEventListener(ref, 'dragleave', ((ev) => {
    if (disabled) return;

    ev.preventDefault();
    ev.stopPropagation();
    draggingCountRef.current--;
    if (draggingCountRef.current > 0) return;
    setDragging(false);
  }) as DragEventHandler);

  useEventListener(ref, 'dragover', ((ev) => {
    if (disabled) return;

    ev.preventDefault();
    ev.stopPropagation();
  }) as DragEventHandler);

  useEventListener(ref, 'drop', ((ev) => {
    if (disabled) return;

    ev.preventDefault();
    ev.stopPropagation();
    setDragging(false);
    draggingCountRef.current = 0;

    const eventFiles = ev.dataTransfer.files;
    if (eventFiles && eventFiles.length > 0) {
      onDrop(eventFiles);
    }
  }) as DragEventHandler);

  return dragging;
};
