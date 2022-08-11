import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { ConnectivityMonitor } from '../../modules/ConnectivityMonitor';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    connectivity: true,
    networkLoss: false,
  });

@autorun(test)
@title('ConnectivityMonitor Module "setNetworkLoss" action')
export class SetNetworkLoss extends Step {
  run() {
    return (
      <Scenario desc="ConnectivityMonitor Module 'setNetworkLoss' action">
        <Given
          desc="Create an ConnectivityMonitor instance with default value"
          action={(_: any, context: any) => {
            const connectivityMonitor = new ConnectivityMonitor({} as any);
            expect(connectivityMonitor.connectivity).toBe(true);
            expect(connectivityMonitor.networkLoss).toBe(false);
            expect((connectivityMonitor as any)._timeToRetry).toBe(5 * 1000);
            expect((connectivityMonitor as any)._heartBeatInterval).toBe(
              60 * 1000,
            );
            context.instance = connectivityMonitor;
          }}
        />
        <When
          desc="Call ConnectivityMonitor 'setNetworkLoss' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance.setNetworkLoss.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.connectivity).toBe(false);
            expect(context.mockModule.networkLoss).toBe(true);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ConnectivityMonitor Module "setConnectSuccess" action')
export class SetConnectSuccess extends Step {
  run() {
    return (
      <Scenario desc="ConnectivityMonitor Module 'setConnectSuccess' action">
        <Given
          desc="Create an ConnectivityMonitor instance with default value"
          action={(_: any, context: any) => {
            const connectivityMonitor = new ConnectivityMonitor({} as any);
            expect(connectivityMonitor.connectivity).toBe(true);
            expect(connectivityMonitor.networkLoss).toBe(false);
            expect((connectivityMonitor as any)._timeToRetry).toBe(5 * 1000);
            expect((connectivityMonitor as any)._heartBeatInterval).toBe(
              60 * 1000,
            );
            context.instance = connectivityMonitor;
          }}
        />
        <When
          desc="Call ConnectivityMonitor 'setConnectSuccess' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance.setNetworkLoss.call(context.mockModule);
            expect(context.mockModule.connectivity).toBe(false);
            expect(context.mockModule.networkLoss).toBe(true);
            context.instance.setConnectSuccess.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.connectivity).toBe(true);
            expect(context.mockModule.networkLoss).toBe(false);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ConnectivityMonitor Module "setConnectFail" action')
export class SetConnectFail extends Step {
  run() {
    return (
      <Scenario desc="ConnectivityMonitor Module 'setConnectFail' action">
        <Given
          desc="Create an ConnectivityMonitor instance with default value"
          action={(_: any, context: any) => {
            const connectivityMonitor = new ConnectivityMonitor({} as any);
            expect(connectivityMonitor.connectivity).toBe(true);
            expect(connectivityMonitor.networkLoss).toBe(false);
            expect((connectivityMonitor as any)._timeToRetry).toBe(5 * 1000);
            expect((connectivityMonitor as any)._heartBeatInterval).toBe(
              60 * 1000,
            );
            context.instance = connectivityMonitor;
          }}
        />
        <When
          desc="Call ConnectivityMonitor 'setConnectFail' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance.setConnectSuccess.call(context.mockModule);
            expect(context.mockModule.connectivity).toBe(true);
            expect(context.mockModule.networkLoss).toBe(false);
            context.instance.setConnectFail.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.connectivity).toBe(false);
            expect(context.mockModule.networkLoss).toBe(false);
          }}
        />
      </Scenario>
    );
  }
}
