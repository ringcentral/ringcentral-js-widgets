export default function sleep(ms = 0) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}
