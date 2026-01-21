export function isCoordInViewport(x: number, y: number) {
  const fromLeftGap = 10;
  const fromRightGap = 60;
  const [viewportX, viewportY] = viewportBox();
  if (x < fromLeftGap || x >= viewportX - fromRightGap) {
    return false;
  }

  if (y < fromLeftGap || y >= viewportY - fromRightGap) {
    return false;
  }

  return true;
}

function viewportBox() {
  return [
    document.documentElement.clientWidth,
    document.documentElement.clientHeight,
  ];
}
