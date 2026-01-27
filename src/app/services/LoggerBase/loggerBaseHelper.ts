/**
 * Identity function returns a deterministic id value for each item.
 */
export function defaultIdentityFunction<T extends { id: string }>(item: T) {
  return item.id;
}

/**
 * Convert array of { name, id } objects into a map.
 */
export function convertListToMap(loggingList: string[]) {
  const mapping: Record<string, boolean> = {};
  loggingList.forEach((id) => {
    mapping[id] = true;
  });
  return mapping;
}
