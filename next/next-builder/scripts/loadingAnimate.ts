export const loadingAnimate = (message: string) => {
  const P = ['\\', '|', '/', '-'];
  let x = 0;
  const interval = setInterval(function () {
    process.stdout.write(`  ${message}\r` + P[x++]);
    x &= 3;
  }, 250);

  return () => {
    clearInterval(interval);
  };
};
