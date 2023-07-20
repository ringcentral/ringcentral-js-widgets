function f1(str: string): Array<string> {
  if (str.length > 8 || str.length % 3 !== 2) {
    return [str.slice(0, 3), str.slice(3)];
  }
  return [str.slice(0, 4), str.slice(4)];
}

function formatMeetingId(str: string, delimiter = ' '): string {
  if (!str) {
    return '';
  }
  const [current, nextSlices] = f1(str);
  if (!nextSlices) {
    return current;
  }
  if (nextSlices.length === 1) {
    return `${current}${nextSlices}`;
  }
  return `${current}${delimiter}${formatMeetingId(nextSlices, delimiter)}`;
}

// gsuite is using export at bottom
export { formatMeetingId };
