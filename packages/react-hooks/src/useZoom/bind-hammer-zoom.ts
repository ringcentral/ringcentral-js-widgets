type BindHammerZoomOptions = {
  hammer: HammerManager;
  /**
   * min rate of zoom
   *
   * @default 1
   */
  min?: number;
  /**
   * max rate of zoom
   *
   * @default 10
   */
  max?: number;
  getTarget: () => HTMLElement;
  getContainer: () => HTMLElement;
  onScale?: (scale: number) => void;
  onDragChange?: (state: boolean) => void;
};

export const bindHammerZoom = ({
  hammer,
  min = 1,
  max = 10,
  getTarget,
  getContainer,
  onScale,
  onDragChange,
}: BindHammerZoomOptions) => {
  let scale = 1;
  let initScale = scale;
  let position = { x: 0, y: 0 };
  let draggable = false;

  const setDraggable = (state: boolean) => {
    if (draggable !== state) {
      onDragChange?.(state);
    }

    draggable = state;
  };

  const centerMove = { ...position };
  let initPosition = position;
  let target = getTarget();
  let container = getContainer();
  const defaultWidth = () => target.clientWidth;
  const defaultHeight = () => target.clientHeight;

  const reGetTargetElement = () => {
    target = getTarget();
    container = getContainer();
  };

  const getIsBiggerThanContainer = () => {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const xBeBigger = defaultWidth() * scale > containerWidth;
    const yBeBigger = defaultHeight() * scale > containerHeight;
    return {
      x: xBeBigger,
      y: yBeBigger,
      bigger: xBeBigger || yBeBigger,
    };
  };

  const validatePositionBoundary = (newPosition: HammerPoint) => {
    const containerHeight = container.clientHeight;
    const containerWidth = container.clientWidth;
    const width = target.clientWidth;
    const height = target.clientHeight;

    const currentWidth = scale * width;
    const outOfBoxWidth = Math.abs(currentWidth - containerWidth) / 2;
    const currentHeight = scale * height;
    const outOfBoxHeight = Math.abs(currentHeight - containerHeight) / 2;

    return {
      x: Math.min(Math.max(newPosition.x, -outOfBoxWidth), outOfBoxWidth),
      y: Math.min(Math.max(newPosition.y, -outOfBoxHeight), outOfBoxHeight),
    };
  };

  const validateZoomBoundary = (scale: number) => {
    const toScale = Math.min(Math.max(scale, min), max);

    return toScale;
  };

  const zoomStart = (center: HammerPoint) => {
    const rect = target.getBoundingClientRect();
    initScale = scale;
    const { x, y } = center;
    centerMove.x = (x - (rect.x + rect.width / 2)) / scale;
    centerMove.y = (y - (rect.y + rect.height / 2)) / scale;

    initPosition = { ...position };
  };

  const zoom = (sourceScale: number) => {
    const toScale = validateZoomBoundary(sourceScale);

    scale = toScale;
    setScale();
    onScale?.(scale);

    const biggerThanContainer = getIsBiggerThanContainer();

    if (biggerThanContainer.bigger) {
      setDraggable(true);

      const result = validatePositionBoundary({
        x: initPosition.x - centerMove.x * (scale - initScale),
        y: initPosition.y - centerMove.y * (scale - initScale),
      });

      position.x = result.x;
      position.y = result.y;
    } else {
      setDraggable(false);

      position.x = 0;
      position.y = 0;
    }
    setPosition();
  };

  const zooming = (rate: number) => {
    zoom(initScale * rate);
  };

  hammer.on('doubletap', (e) => {
    reGetTargetElement();

    toggle();

    // in test env, some event will be wrong event instance, skip that
    if (process.env.NODE_ENV === 'test') {
      return;
    }
    e.preventDefault();
  });

  hammer.on('pinchstart', (e) => {
    reGetTargetElement();

    zoomStart(e.center);
  });

  hammer.on('pinchmove', (e) => {
    zooming(e.scale);
  });

  hammer.on('panstart', (e) => {
    initPosition = {
      x: position.x,
      y: position.y,
    };
  });

  hammer.on('panmove', (e) => {
    const biggerThanContainer = getIsBiggerThanContainer();

    if (!biggerThanContainer.bigger) return;

    const result = validatePositionBoundary({
      x: initPosition.x + e.deltaX,
      y: initPosition.y + e.deltaY,
    });

    if (biggerThanContainer.x) {
      position.x = result.x;
    }
    if (biggerThanContainer.y) {
      position.y = result.y;
    }
    setPosition();
  });

  const toggleAnimation = (state: boolean) => {
    if (state) {
      target.style.transition =
        target.style.transition || '195ms ease-in-out all';
      return;
    }
    target.style.transition = '';
  };

  const setPosition = () => {
    toggleAnimation(false);
    target?.style.setProperty('--x', `${position.x}px`);
    target?.style.setProperty('--y', `${position.y}px`);
  };

  const setScale = () => {
    toggleAnimation(false);
    target?.style.setProperty('--scale', `${scale.toFixed(1)}`);
  };

  const reset = () => {
    reGetTargetElement();

    scale = 1;
    initScale = scale;
    position = { x: 0, y: 0 };
    target?.style.removeProperty('--scale');
    target?.style.removeProperty('--x');
    target?.style.removeProperty('--y');
    toggleAnimation(true);
    setDraggable(false);
    onScale?.(scale);
  };

  const zoomCenter = () => {
    reGetTargetElement();

    if (!target) return;

    scale = 1.5;
    initScale = scale;
    position = { x: 0, y: 0 };
    initPosition = { ...position };
    setScale();
    setPosition();
    toggleAnimation(true);
    onScale?.(scale);

    const biggerThanContainer = getIsBiggerThanContainer();

    if (biggerThanContainer.bigger) {
      setDraggable(true);
    } else {
      setDraggable(false);
    }
  };

  const toggle = () => {
    reGetTargetElement();

    if (scale !== 1) {
      reset();
      return;
    }

    zoomCenter();
  };

  return {
    scale,
    reset,
    zoomCenter,
    toggle,
    zoomStart,
    zooming,
    zoom,
  };
};
