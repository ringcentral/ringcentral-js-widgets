import {
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { defaultBrandConfig } from '../../modules/Brand';
import { RcVideo } from '../../modules/RcVideo';

@autorun(test)
@title('Check RcVideo Module defaultTopic')
class RcVideoDefaultTopic extends Step {
  run() {
    let defaultTopic: string;
    return (
      <Scenario desc="RcVideo Module defaultTopic">
        <When
          desc="exec getter defaultTopic"
          action={() => {
            const { get } = Object.getOwnPropertyDescriptor(
              RcVideo.prototype,
              'defaultTopic',
            );
            defaultTopic = get.call({
              currentUser: {
                name: 'User',
              },
              extensionName: 'google',
              brandName: defaultBrandConfig.name,
              shortName: defaultBrandConfig.name,
              _brand: {
                brandConfig: {
                  rcvMeetingTopic:
                    "{extensionName}'s {brandName} Video Meeting",
                },
              },
            });
          }}
        />
        <Then
          desc="the 'defaultTopic' value should be expected"
          action={() => {
            expect(defaultTopic).toBe("User's RingCentral Video Meeting");
          }}
        />
      </Scenario>
    );
  }
}
