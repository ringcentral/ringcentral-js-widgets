export function DIError(message, ...args) {
  return new Error(`[DI] ${message}`, ...args);
}

export function CircularDependencyError(pending, dep) {
  const path = Array.from(pending.values()).join(' -> ');
  return DIError(`Circular dependency detected: ${path} -> ${dep}`);
}
