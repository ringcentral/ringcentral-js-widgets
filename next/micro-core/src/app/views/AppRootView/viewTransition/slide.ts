import './view-transition.global.scss';

export const VIEW_TRANSITION_CONTAINER_IDENTIFY = 'view-transition-container';
export const VIEW_TRANSITION_DETAIL_IDENTIFY = 'view-transition-detail';

const isReducedMotion = () =>
  window?.matchMedia?.('(prefers-reduced-motion)').matches;

const getCondition = (reducedMotion = isReducedMotion()) => {
  if (reducedMotion) {
    return {};
  }

  const container = document.getElementById(VIEW_TRANSITION_CONTAINER_IDENTIFY);
  const detail = document.getElementById(VIEW_TRANSITION_DETAIL_IDENTIFY);

  return {
    container,
    detail,
  };
};

/**
 * slide in view transition
 *
 * respect the user's reduced motion preference by default
 *
 * if you want to force disable the reduced motion, you can set the `reducedMotion` to `false`
 */
export const slideInViewTransition = async (
  callback: () => Promise<void>,
  reducedMotion?: boolean,
) => {
  const { container, detail } = getCondition(reducedMotion);

  if (!container || !detail || !document.startViewTransition) {
    return callback();
  }

  container.classList.add(VIEW_TRANSITION_CONTAINER_IDENTIFY);

  const transition = document.startViewTransition(async () => {
    detail.classList.add(VIEW_TRANSITION_DETAIL_IDENTIFY);
    await callback();
  });

  try {
    await transition.finished;
  } finally {
    container.classList.remove(VIEW_TRANSITION_CONTAINER_IDENTIFY);
    detail.classList.remove(VIEW_TRANSITION_DETAIL_IDENTIFY);
  }
};

/**
 * slide out view transition
 *
 * respect the user's reduced motion preference by default
 *
 * if you want to force disable the reduced motion, you can set the `reducedMotion` to `false`
 */
export const slideOutViewTransition = async (
  callback: () => Promise<void>,
  reducedMotion?: boolean,
) => {
  const { container, detail } = getCondition(reducedMotion);

  if (!container || !detail || !document.startViewTransition) {
    return callback();
  }

  container.classList.add(VIEW_TRANSITION_CONTAINER_IDENTIFY);
  detail.classList.add(VIEW_TRANSITION_DETAIL_IDENTIFY);

  const transition = document.startViewTransition(async () => {
    detail.classList.remove(VIEW_TRANSITION_DETAIL_IDENTIFY);
    await callback();
  });

  try {
    await transition.finished;
  } finally {
    container.classList.remove(VIEW_TRANSITION_CONTAINER_IDENTIFY);
  }
};
