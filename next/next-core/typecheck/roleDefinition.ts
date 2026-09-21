import type { RoleDefinition } from '../src/lib/roleDelegation';

// @ts-expect-error auto-election requires singleton cardinality.
const invalidRoleDefinition: RoleDefinition = {
  role: 'test.invalid',
  allowMultiple: true,
  autoElect: true,
};

void invalidRoleDefinition;
