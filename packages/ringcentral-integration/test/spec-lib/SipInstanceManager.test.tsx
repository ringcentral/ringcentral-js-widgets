import {
  autorun,
  title,
  Scenario,
  When,
  Then,
  Step,
} from '@ringcentral-integration/test-utils';
import { SipInstanceManager } from '../../lib/SipInstanceManager';

@autorun(test)
@title('SipInstanceManager::getInstance::Basic')
export class SipInstanceManagerGetInstance extends Step {
  run() {
    return (
      <Scenario desc="">
        <When
          desc="SipInstanceManager getInstance setup"
          action={(_: any, context: any) => {
            context.sipInstanceManger = new SipInstanceManager('test-prefix');
          }}
        />
        <Then
          desc="should return instanceId successfully if there are not data in storage"
          action={(_: any, { sipInstanceManger }: any) => {
            expect(
              sipInstanceManger.getInstanceId('fake-endpointId').length,
            ).toBe(36);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('SipInstanceManager::setInstanceInactive')
export class SipInstanceManagerSetInstanceInactive extends Step {
  run() {
    return (
      <Scenario desc="">
        <When
          desc="SipInstanceManager setInstanceInactive setup"
          action={(_: any, context: any) => {
            context.prefix = 'test-prefix';
            context.endpointId = 'test-endpoint-id';
            context.sipInstanceManger = new SipInstanceManager(context.prefix);
            context.sipInstanceId = context.sipInstanceManger.getInstanceId(
              context.endpointId,
            );
          }}
        />
        <Then
          desc="should setInstanceInactive successfully"
          action={(
            _: any,
            { sipInstanceManger, sipInstanceId, endpointId, prefix }: any,
          ) => {
            sipInstanceManger.setInstanceInactive(sipInstanceId, endpointId);
            const rawData = localStorage.getItem(`${prefix}-${sipInstanceId}`);
            const data = JSON.parse(rawData);
            expect(data.id).toBe(sipInstanceId);
            expect(data.endpointId).toBe(endpointId);
            expect(data.inactiveAt > 0).toBe(true);
            localStorage.removeItem(`${prefix}-${sipInstanceId}`);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('SipInstanceManager::getInstance::CleanData')
export class SipInstanceManagerGetInstanceCleanData extends Step {
  run() {
    return (
      <Scenario desc="">
        <When
          desc="SipInstanceManager getInstance setup"
          action={(_: any, context: any) => {
            context.prefix = 'test-prefix';
            context.endpointId = 'test-endpoint-id';
            context.oldInstanceId = `ewewewew`;
            localStorage.setItem(
              `${context.prefix}-${context.oldInstanceId}`,
              JSON.stringify({
                id: context.oldInstanceId,
                endpointId: 'another-endpoint-id',
                inActiveAt: Date.now(),
              }),
            );
            context.sipInstanceManger = new SipInstanceManager(context.prefix);
          }}
        />
        <Then
          desc="should clean other endpoint id's data"
          action={(
            _: any,
            { sipInstanceManger, endpointId, oldInstanceId, prefix }: any,
          ) => {
            const sipInstanceId = sipInstanceManger.getInstanceId(endpointId);
            expect(sipInstanceId).not.toBe(oldInstanceId);
            expect(localStorage.getItem(`${prefix}-${oldInstanceId}`)).toBe(
              null,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('SipInstanceManager::getInstance::CleanExpiredData')
export class SipInstanceManagerGetInstanceCleanExpiredData extends Step {
  run() {
    return (
      <Scenario desc="">
        <When
          desc="SipInstanceManager getInstance setup"
          action={(_: any, context: any) => {
            context.prefix = 'test-prefix';
            context.endpointId = 'test-endpoint-id';
            context.oldInstanceId = `ewewewew000`;
            localStorage.setItem(
              `${context.prefix}-${context.oldInstanceId}`,
              JSON.stringify({
                id: context.oldInstanceId,
                endpointId: context.endpointId,
                inactiveAt: Date.now() - 5 * 60 * 1000,
              }),
            );
            context.sipInstanceManger = new SipInstanceManager(context.prefix);
          }}
        />
        <Then
          desc="should clean expired data"
          action={(
            _: any,
            { sipInstanceManger, endpointId, oldInstanceId, prefix }: any,
          ) => {
            const sipInstanceId = sipInstanceManger.getInstanceId(endpointId);
            expect(sipInstanceId).not.toBe(oldInstanceId);
            expect(localStorage.getItem(`${prefix}-${oldInstanceId}`)).toBe(
              null,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('SipInstanceManager::getInstance::ReuseInactiveId')
export class SipInstanceManagerGetInstanceReuseInactiveId extends Step {
  run() {
    return (
      <Scenario desc="">
        <When
          desc="SipInstanceManager getInstance setup"
          action={(_: any, context: any) => {
            context.prefix = 'test-prefix';
            context.endpointId = 'test-endpoint-id';
            context.oldInstanceId = `ewewewew12121`;
            localStorage.setItem(
              `${context.prefix}-${context.oldInstanceId}`,
              JSON.stringify({
                id: context.oldInstanceId,
                endpointId: context.endpointId,
                inactiveAt: Date.now(),
              }),
            );
            context.sipInstanceManger = new SipInstanceManager(context.prefix);
          }}
        />
        <Then
          desc="should reuse inactive data, and remove from storage"
          action={(
            _: any,
            { sipInstanceManger, endpointId, oldInstanceId, prefix }: any,
          ) => {
            const sipInstanceId = sipInstanceManger.getInstanceId(endpointId);
            expect(sipInstanceId).toBe(oldInstanceId);
            expect(localStorage.getItem(`${prefix}-${oldInstanceId}`)).toBe(
              null,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('SipInstanceManager::getInstance::ReuseLatestInactiveId')
export class SipInstanceManagerGetInstanceReuseLatestInactiveId extends Step {
  run() {
    return (
      <Scenario desc="">
        <When
          desc="SipInstanceManager getInstance setup"
          action={(_: any, context: any) => {
            context.prefix = 'test-prefix';
            context.endpointId = 'test-endpoint-id';
            context.latestInstanceId = `ewewewew12121444`;
            context.oldInstanceId = `ewewewew12121666`;
            localStorage.setItem(
              `${context.prefix}-${context.latestInstanceId}`,
              JSON.stringify({
                id: context.latestInstanceId,
                endpointId: context.endpointId,
                inactiveAt: Date.now(),
              }),
            );
            localStorage.setItem(
              `${context.prefix}-${context.oldInstanceId}`,
              JSON.stringify({
                id: context.oldInstanceId,
                endpointId: context.endpointId,
                inactiveAt: Date.now() - 60 * 1000,
              }),
            );
            context.sipInstanceManger = new SipInstanceManager(context.prefix);
          }}
        />
        <Then
          desc="should reuse latest inactive data"
          action={(
            _: any,
            {
              sipInstanceManger,
              endpointId,
              latestInstanceId,
              oldInstanceId,
              prefix,
            }: any,
          ) => {
            const sipInstanceId = sipInstanceManger.getInstanceId(endpointId);
            expect(sipInstanceId).toBe(latestInstanceId);
            expect(localStorage.getItem(`${prefix}-${latestInstanceId}`)).toBe(
              null,
            );
            expect(!!localStorage.getItem(`${prefix}-${oldInstanceId}`)).toBe(
              true,
            );
            localStorage.removeItem(`${prefix}-${oldInstanceId}`);
          }}
        />
      </Scenario>
    );
  }
}
