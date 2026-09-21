import type { Observable } from 'rxjs';

export const roleInvocationMarker = '__rc_role_invocation__';
export const roleDeadline = 65_000;

export type RoleId = string;

export type RoleDefinition =
  | {
      readonly role: RoleId;
      readonly allowMultiple: true;
      readonly autoElect: false;
    }
  | {
      readonly role: RoleId;
      readonly allowMultiple: false;
      readonly autoElect: boolean;
    };

export const systemRoles = {
  server: {
    role: 'server',
    allowMultiple: false,
    autoElect: false,
  },
  connectedClients: {
    role: 'connectedClients',
    allowMultiple: true,
    autoElect: false,
  },
  electedClient: {
    role: 'electedClient',
    allowMultiple: false,
    autoElect: true,
  },
  all: {
    role: 'all',
    allowMultiple: true,
    autoElect: false,
  },
} as const satisfies Record<string, RoleDefinition>;

export interface RoleInvocation {
  readonly marker: typeof roleInvocationMarker;
  readonly role: RoleId;
  readonly revision: number;
}

export type RoleError = {
  readonly name: string;
  readonly message: string;
  readonly errors?: RoleError[];
  readonly results?: RoleErrorResult[];
};

export type RoleErrorResult = Omit<RoleInvocationResult, 'reason'> & {
  readonly reason?: RoleError;
};

export type RoleResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: RoleError };

export const isRoleInvocation = (value: unknown): value is RoleInvocation =>
  typeof value === 'object' &&
  value !== null &&
  (value as RoleInvocation).marker === roleInvocationMarker;

export interface RoleLifecycleContext {
  readonly deadline: number;
  readonly revision: number;
}

export interface RoleLifecycle {
  readonly onAcquire?: (context: RoleLifecycleContext) => Promise<void> | void;
  readonly onRelease?: (context: RoleLifecycleContext) => Promise<void> | void;
}

export type RoleOwner = { readonly clientId: string };

export type RoleState =
  | {
      readonly phase: 'unavailable';
      readonly role: RoleId;
      readonly revision: number;
      readonly owners: [];
    }
  | {
      readonly phase: 'owned';
      readonly role: RoleId;
      readonly revision: number;
      readonly owners: RoleOwner[];
    }
  | {
      readonly phase: 'acquiring';
      readonly role: RoleId;
      readonly revision: number;
      readonly owners: [];
      readonly pendingOwnerIds: string[];
    }
  | {
      readonly phase: 'draining';
      readonly role: RoleId;
      readonly revision: number;
      readonly owners: RoleOwner[];
      readonly pendingOwnerIds: string[];
    };

export interface RoleRegistrationResult {
  readonly role: RoleId;
  readonly revision: number;
  readonly owners: RoleOwner[];
}

export interface InvokeRoleOptions {
  readonly completion?: 'all' | 'local';
  readonly collectResults?: boolean;
  readonly firstFailure?: boolean;
}

export interface RoleInvocationResult {
  readonly clientId: string;
  readonly status: 'fulfilled' | 'rejected';
  readonly value?: unknown;
  readonly reason?: unknown;
}

export class RoleUnavailableError extends Error {
  constructor(role: RoleId) {
    super(`Role '${role}' has no available owner.`);
    this.name = 'RoleUnavailableError';
  }
}

export class RoleNotRegisteredError extends Error {
  constructor(role: RoleId) {
    super(`Role '${role}' is not registered locally.`);
    this.name = 'RoleNotRegisteredError';
  }
}

export class RoleDefinitionMismatchError extends Error {
  constructor(role: RoleId) {
    super(`Role '${role}' definition does not match the coordinator.`);
    this.name = 'RoleDefinitionMismatchError';
  }
}

export class RoleReleaseRejectedError extends Error {
  constructor(role: RoleId) {
    super(`Role '${role}' release was rejected by its current owner.`);
    this.name = 'RoleReleaseRejectedError';
  }
}

export class RoleInvocationTimeoutError extends Error {
  constructor(role: RoleId) {
    super(`Role '${role}' invocation exceeded the coordinator deadline.`);
    this.name = 'RoleInvocationTimeoutError';
  }
}

export class RoleFencedError extends Error {
  constructor(role: RoleId) {
    super(`Role '${role}' ownership is stale.`);
    this.name = 'RoleFencedError';
  }
}

export class RoleSourceNotOwnerError extends Error {
  constructor(role: RoleId) {
    super(`The invoking client does not own role '${role}'.`);
    this.name = 'RoleSourceNotOwnerError';
  }
}

export const createRoleError = (error: RoleError): Error => {
  const { name, message } = error;
  const role = /'([^']+)'/.exec(message)?.[1] ?? 'unknown';
  switch (name) {
    case 'RoleUnavailableError':
      return new RoleUnavailableError(role);
    case 'RoleNotRegisteredError':
      return new RoleNotRegisteredError(role);
    case 'RoleDefinitionMismatchError':
      return new RoleDefinitionMismatchError(role);
    case 'RoleReleaseRejectedError':
      return new RoleReleaseRejectedError(role);
    case 'RoleInvocationTimeoutError':
      return new RoleInvocationTimeoutError(role);
    case 'RoleFencedError':
      return new RoleFencedError(role);
    case 'RoleSourceNotOwnerError':
      return new RoleSourceNotOwnerError(role);
    case 'RoleAggregateError': {
      const { errors = [], results = [] } = error;
      return new RoleAggregateError(
        errors.map(createRoleError),
        results.map(({ reason, ...result }) =>
          reason ? { ...result, reason: createRoleError(reason) } : result,
        ),
      );
    }
    default:
      return Object.assign(new Error(message), { name });
  }
};

export const unwrapRoleResult = <T>(result: RoleResult<T> | undefined): T => {
  if (!result) throw new Error('Role transport returned no response.');
  if (result.ok) return result.value;
  throw createRoleError(result.error);
};

export class RoleAggregateError extends AggregateError {
  constructor(errors: unknown[], readonly results: RoleInvocationResult[]) {
    super(errors, 'One or more role invocations failed.');
    this.name = 'RoleAggregateError';
  }
}

export interface RoleStateStreams {
  readonly roleState$: Observable<RoleState>;
  readonly roleTransition$: Observable<RoleState>;
}
