import {
  autorun,
  examples,
  Given,
  Step,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { subscriptionStatus as subscriptionStatuses } from '../../modules/Subscription/subscriptionStatus';
import { Subscription } from '../../modules/SubscriptionV2';

class MockStorage {
  registerReducer() {}
}

function createMockSubscription({
  ready = true,
  cachedSubscription = null,
  message = null,
  filters = [],
  subscriptionStatus = subscriptionStatuses.notSubscribed,
}: Partial<Subscription> = {}) {
  const mockInstanceProps: Partial<Subscription> & any = {
    ready,
    cachedSubscription,
    message,
    filters,
    subscriptionStatus,
    _setStates(
      this: any,
      {
        filters = this.filters,
        message = this.message,
        cachedSubscription = this.cachedSubscription,
        status = this.subscriptionStatus,
      },
    ) {
      this.filters = filters;
      this.message = message;
      this.cachedSubscription = cachedSubscription;
      this.subscriptionStatus = status;
    },
  };
  const baseInstance = new Subscription({
    auth: {} as any,
    client: {} as any,
    sleepDetector: {} as any,
    storage: new MockStorage() as any,
    subscriptionOptions: {
      registerDelay: 10,
    },
  });

  return new Proxy(baseInstance, {
    get(target: Subscription, prop: keyof Subscription) {
      if (Object.prototype.hasOwnProperty.call(mockInstanceProps, prop)) {
        return mockInstanceProps[prop];
      }
      return Reflect.get(target, prop);
    },
    set(target: Subscription, prop: keyof Subscription, value: any) {
      if (Object.prototype.hasOwnProperty.call(mockInstanceProps, prop)) {
        mockInstanceProps[prop] = value;
        return true;
      }
      return Reflect.set(target, prop, value);
    },
  });
}

function GenericSubscriptionInstance({
  instanceData,
}: {
  instanceData?: Partial<Subscription> & any;
}) {
  return (
    <>
      <Given
        desc="subscription instance that is ready"
        action={async (_: any, context: any) => {
          context.instance = createMockSubscription(instanceData);
          await context.instance._createSubscription();
        }}
      />
    </>
  );
}

@autorun(test)
@title('Subscription::on notification event')
export class SubscriptionOnNotification extends Step {
  run() {
    return (
      <>
        <GenericSubscriptionInstance />
        <When
          desc="notification event occurs"
          action={async (_: any, context: any) => {
            context.message = {};
            context.instance._subscription.emit(
              context.instance._subscription.events.notification,
              context.message,
            );
            expect(context.instance.message).toBe(context.message);
          }}
        />
      </>
    );
  }
}

@autorun(test)
@title('Subscription::on removeSuccess event')
export class SubscriptionOnRemoveSuccess extends Step {
  run() {
    return (
      <>
        <GenericSubscriptionInstance
          instanceData={{
            subscriptionStatus: subscriptionStatuses.unsubscribing,
            cachedSubscription: {},
          }}
        />
        <When
          desc="removeSuccess event occurs"
          action={async (_: any, context: any) => {
            context.instance._subscription.emit(
              context.instance._subscription.events.removeSuccess,
            );
            expect(context.instance.subscriptionStatus).toBe(
              subscriptionStatuses.notSubscribed,
            );
            expect(context.instance.cachedSubscription).toBeNull();
          }}
        />
      </>
    );
  }
}

@autorun(test)
@title('Subscription::on removeError event')
export class SubscriptionOnRemoveError extends Step {
  run() {
    return (
      <>
        <GenericSubscriptionInstance
          instanceData={{
            subscriptionStatus: subscriptionStatuses.unsubscribing,
            cachedSubscription: {},
          }}
        />
        <When
          desc="removeError event occurs"
          action={async (_: any, context: any) => {
            context.instance._subscription.emit(
              context.instance._subscription.events.removeError,
              new Error('removeError'),
            );
            expect(context.instance.subscriptionStatus).toBe(
              subscriptionStatuses.notSubscribed,
            );
            expect(context.instance.cachedSubscription).toBeNull();
          }}
        />
      </>
    );
  }
}

@autorun(test)
@title('Subscription::on renewSuccess event')
export class SubscriptionOnRenewSuccess extends Step {
  run() {
    return (
      <>
        <GenericSubscriptionInstance
          instanceData={{
            subscriptionStatus: subscriptionStatuses.subscribing,
          }}
        />
        <When
          desc="renewSuccess event occurs"
          action={async (_: any, context: any) => {
            context.instance._subscription.emit(
              context.instance._subscription.events.renewSuccess,
            );
            expect(context.instance.subscriptionStatus).toBe(
              subscriptionStatuses.subscribed,
            );
            expect(context.instance.cachedSubscription).toEqual(
              context.instance._subscription.subscription(),
            );
          }}
        />
      </>
    );
  }
}

@autorun(test)
@title('Subscription::on renewError event when ready=${ready}')
export class SubscriptionOnRenewError extends Step {
  @examples(`
    | ready |
    | true  |
    | false |
  `)
  run() {
    return (
      <>
        <GenericSubscriptionInstance
          instanceData={{
            subscriptionStatus: subscriptionStatuses.subscribing,
          }}
        />
        <When
          desc="renewSuccess event occurs"
          action={async (_: any, context: any) => {
            context.instance.ready = context.example.ready;
            const oldSubscription = context.instance._subscription;
            context.instance._subscription.emit(
              context.instance._subscription.events.renewError,
              new Error('renewError'),
            );
            expect(context.instance.subscriptionStatus).toBe(
              subscriptionStatuses.notSubscribed,
            );
            expect(context.instance.cachedSubscription).toBeNull();
            if (context.example.ready) {
              expect(context.instance._subscription).not.toBeNull();
              // check if _createSubscription has been called
              expect(context.instance._subscription).not.toBe(oldSubscription);
            } else {
              expect(context.instance._subscription).toBeNull();
            }
          }}
        />
      </>
    );
  }
}

@autorun(test)
@title('Subscription::on subscribeSuccess event')
export class SubscriptionOnSubscribeSuccess extends Step {
  run() {
    return (
      <>
        <GenericSubscriptionInstance
          instanceData={{
            subscriptionStatus: subscriptionStatuses.subscribing,
          }}
        />
        <When
          desc="subscribeSuccess event occurs"
          action={async (_: any, context: any) => {
            context.instance._subscription.emit(
              context.instance._subscription.events.subscribeSuccess,
            );
            expect(context.instance.subscriptionStatus).toBe(
              subscriptionStatuses.subscribed,
            );
            expect(context.instance.cachedSubscription).toEqual(
              context.instance._subscription.subscription(),
            );
          }}
        />
      </>
    );
  }
}

@autorun(test)
@title('Subscription::on subscribeError event when ready=${ready}')
export class SubscriptionOnSubscribeError extends Step {
  @examples(`
    | ready |
    | true  |
    | false |
  `)
  run() {
    return (
      <>
        <GenericSubscriptionInstance
          instanceData={{
            subscriptionStatus: subscriptionStatuses.subscribing,
          }}
        />
        <When
          desc="renewSuccess event occurs"
          action={async (_: any, context: any) => {
            const oldSubscription = context.instance._subscription;
            context.instance.ready = context.example.ready;
            context.instance._subscription.emit(
              context.instance._subscription.events.subscribeError,
              new Error('subscribeError'),
            );
            expect(context.instance.subscriptionStatus).toBe(
              subscriptionStatuses.notSubscribed,
            );
            expect(context.instance.cachedSubscription).toBeNull();
            if (context.example.ready) {
              // check if _retry has been called
              // by purposely setting _subscription to null so new one can be created
              context.instance._subscription = null;
              context.instance._retry.flush();
              expect(context.instance._subscription).not.toBeNull();
              expect(context.instance._subscription).not.toBe(oldSubscription);
            } else {
              // check if _retry has been called
              // by purposely setting _subscription to null so new one can be created
              context.instance._subscription = null;
              context.instance._retry.flush();
              expect(context.instance._subscription).toBeNull();
            }
          }}
        />
      </>
    );
  }
}
