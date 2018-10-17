const picExtensions = ['jpg', 'jpeg', 'gif', 'svg', 'png'];

export default function isPicture(uri) {
  if (!uri) {
    return false;
  }
  let isPic = false;
  picExtensions.forEach((ext) => {
    if (uri.indexOf(`.${ext}?`) > 0) {
      isPic = true;
    }
  });
  return isPic;
}
