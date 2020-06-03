export const sfSearchTypes = {
  recordId: 'recordId',
  caseId: 'caseId',
  objectValue: 'objectValue',
} as const;

export type SfSearchType = keyof typeof sfSearchTypes;
