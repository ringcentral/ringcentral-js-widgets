export const assignmentOptionMap = {
  currentUser: {
    value: '__CURRENT_USER__' as const,
    labelKey: 'assignedToMe' as const,
    dataSign: 'assignmentMenuAssignedToMe',
  },
  assignedToOthers: {
    value: '__ASSIGNED_TO_OTHERS__' as const,
    labelKey: 'assignedToOthers' as const,
    dataSign: 'assignmentMenuAssignedToOthers',
  },
  unassigned: {
    value: '__UNASSIGNED__' as const,
    labelKey: 'unassigned' as const,
    dataSign: 'assignmentMenuUnassigned',
  },
} as const;

export type AssignmentOption =
  (typeof assignmentOptionMap)[keyof typeof assignmentOptionMap];

export type AssignmentOptionValue = AssignmentOption['value'];

export const assignmentOptions: readonly AssignmentOption[] = [
  assignmentOptionMap.currentUser,
  assignmentOptionMap.assignedToOthers,
  assignmentOptionMap.unassigned,
];
