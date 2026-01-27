import type MessageAttachmentInfo from '@rc-ex/core/lib/definitions/MessageAttachmentInfo';
import { getTiffInfoWithCache } from '@ringcentral-integration/utils';
import React, { useEffect, useRef } from 'react';
import { usePromise } from 'react-use';

export interface ImageAttachmentRenderProps {
  attachment: MessageAttachmentInfo;
}

const TiffViewer = ({
  tiffUrl,
  onLoad,
}: {
  tiffUrl: string;
  onLoad?: () => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mounted = usePromise();

  useEffect(() => {
    (async () => {
      const result = await mounted(getTiffInfoWithCache(tiffUrl));

      if (result) {
        try {
          const { width, height, rgba } = result;

          const canvas = canvasRef.current!;
          const ctx = canvas.getContext('2d')!;

          // Get the width of the wrapper div
          const wrapperWidth = wrapperRef.current?.clientWidth ?? 0;

          // Calculate the scale to fit the image within the wrapper
          const scale = wrapperWidth / width;

          // Set canvas size based on the scale factor
          canvas.width = width * scale;
          canvas.height = height * scale;

          const offCanvas = document.createElement('canvas');
          offCanvas.width = width;
          offCanvas.height = height;
          const offCtx = offCanvas.getContext('2d')!;

          const imageData = offCtx?.createImageData(width, height)!;
          imageData.data.set(rgba);
          offCtx.putImageData(imageData, 0, 0);

          ctx.drawImage(
            offCanvas,
            0,
            0,
            width,
            height,
            0,
            0,
            canvas.width,
            canvas.height,
          );
          onLoad?.();
        } catch (error) {
          console.error('Draw canvas fail', error);
        }
      }
    })();
  }, [mounted, tiffUrl, onLoad]);

  return (
    <div ref={wrapperRef} style={{ width: '100%' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default TiffViewer;
