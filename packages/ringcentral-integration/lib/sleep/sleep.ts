export default function sleep(ms = 0) {
  return new Promise<number>((resolve) => {
    setTimeout(resolve, ms);
  });
}
