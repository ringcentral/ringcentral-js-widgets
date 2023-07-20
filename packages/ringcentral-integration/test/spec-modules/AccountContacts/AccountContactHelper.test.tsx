import {
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
} from '@ringcentral-integration/test-utils';

import { phoneSources } from '../../../enums/phoneSources';
import { phoneTypes } from '../../../enums/phoneTypes';
import {
  getFindPhoneNumber,
  getMatchContactsByPhoneNumber,
  isAnExtension,
} from '../../../lib/contactHelper';

const mockContact = [
  {
    firstName: 'Lincoln',
    id: '3929064003',
    lastName: 'Collins',
    phoneNumbers: [
      {
        phoneNumber: '22701',
        phoneType: phoneTypes.extension,
      },
    ],
    site: { name: 'US', code: '22' },
    type: 'User',
  },
  {
    firstName: 'Stephen',
    id: '3929064004',
    lastName: 'Wood',
    phoneNumbers: [
      {
        phoneNumber: '22702',
        phoneType: phoneTypes.extension,
      },
    ],
    site: { name: 'US', code: '22' },
    type: 'User',
  },
  {
    firstName: 'Hector',
    id: '3929064005',
    lastName: 'French',
    phoneNumbers: [
      {
        phoneNumber: '37712',
        phoneType: phoneTypes.extension,
      },
    ],
    site: { name: 'Canada', code: '37' },
    type: 'User',
  },
  {
    firstName: 'Hector',
    id: '3929064006',
    lastName: 'French',
    phoneNumbers: [
      {
        phoneNumber: '+12052032688',
        phoneType: phoneTypes.direct,
        type: 'VoiceFax',
        usageType: 'DirectNumber',
      },
    ],
    site: { name: 'Canada', code: '37' },
    type: 'User',
  },
];

@autorun(test)
@title('multiple site - contact match')
export class getContact extends Step {
  @examples(`
  |matchString    | expected      |
  |'701'          | '22701'       |
  |'702'          | '22702'       |
  |'22702'        | '22702'       |
  |'712'          | 'none'        |
  |'37712'        | '37712'       |
  |'799'          | 'none'        |
  |'+12052032688' | '+12052032688'|
`)
  run() {
    return (
      <Scenario desc="multi site code - Contact Match">
        <Given
          desc="phone number info"
          action={(_: any, context: any) => {
            const contacts = mockContact;
            const currentSite = { name: 'US', code: '22' };
            const phoneNumber = context.example.matchString;
            const shouldMatchExtension = isAnExtension(phoneNumber);
            context.actual = getMatchContactsByPhoneNumber({
              contacts,
              phoneNumber,
              entityType: phoneSources.rcContact,
              findPhoneNumber: getFindPhoneNumber({
                phoneNumber,
                shouldMatchExtension,
                options: {
                  isMultipleSiteEnabled: true,
                  siteCode: currentSite.code,
                },
              }),
            });
          }}
        />
        <Then
          desc="it should match contact"
          action={(_: any, context: any) => {
            const expected = context.example.expected;
            if (expected === 'none') {
              return expect(context.actual).toHaveLength(0);
            }
            expect(
              context.actual[0]?.phoneNumbers[0]?.phoneNumber ?? '',
            ).toEqual(expected);
          }}
        />
      </Scenario>
    );
  }
}
