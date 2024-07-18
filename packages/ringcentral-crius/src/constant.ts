export const testTypes = ['ut', 'it', 'e2e', 'manual'] as const;

export type TestType = (typeof testTypes)[number];

export const priorities = ['p0', 'p1', 'p2', 'p3'] as const;

export type Priority = (typeof priorities)[number];
