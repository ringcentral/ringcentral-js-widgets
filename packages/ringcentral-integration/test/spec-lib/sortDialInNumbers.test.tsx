import {
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { sortDialInNumbers } from '../../modules/RcVideo';

@autorun(test)
@title('RCI-4452:sortDialInNumbers')
export class SortDialInNumbersBasic extends Step {
  run() {
    return (
      <Scenario desc="Test function: sortDialInNumbers">
        <When desc="Sort rcv dial-in numbers" />
        <Then
          desc="Sorting should be:
          Default RCV dial-in number(s) based on the host location. Sorted alphabetically by location.
          Premium number(s) based on the host location (if any). Sorted alphabetically by location.
          Other premium numbers which is not in the same location as host. Sorted alphabetically by country > location.
          "
          action={() => {
            const numbers = [
              {
                country: {
                  uri: '/restapi/v1.0/dictionary/country/15',
                  id: '15',
                  name: 'Australia',
                  isoCode: 'AU',
                  callingCode: '61',
                },
                phoneNumber: '+61880331445',
                premium: true,
                location: 'Broken Hill, NSW',
              },
              {
                country: {
                  uri: '/restapi/v1.0/dictionary/country/143',
                  id: '143',
                  name: 'Mexico',
                  isoCode: 'MX',
                  callingCode: '52',
                },
                phoneNumber: '+528002271101',
                premium: true,
              },
              {
                country: {
                  uri: '/restapi/v1.0/dictionary/country/1',
                  id: '1',
                  name: 'United States',
                  isoCode: 'US',
                  callingCode: '1',
                },
                phoneNumber: '+12056051874',
                premium: true,
                location: 'Alabaster, AL',
              },
              {
                country: {
                  uri: '/restapi/v1.0/dictionary/country/1',
                  id: '1',
                  name: 'United States',
                  isoCode: 'US',
                  callingCode: '1',
                },
                phoneNumber: '+12052161634',
                premium: true,
                location: 'Alabaster, AL',
              },
              {
                country: {
                  uri: '/restapi/v1.0/dictionary/country/1',
                  id: '1',
                  name: 'United States',
                  isoCode: 'US',
                  callingCode: '1',
                },
                phoneNumber: '+18333243308',
                premium: true,
              },
              {
                country: {
                  uri: '/restapi/v1.0/dictionary/country/1',
                  id: '1',
                  name: 'United States',
                  isoCode: 'US',
                  callingCode: '1',
                },
                phoneNumber: '+12679304000',
                premium: false,
                location: 'Philadelphia, PA',
              },
            ];
            const sortedDialInNumbers = sortDialInNumbers(numbers, 'en-US');
            expect(sortedDialInNumbers).toHaveLength(6);
            expect(sortedDialInNumbers).toEqual([
              // default numbers
              {
                country: 'United States',
                location: 'Philadelphia, PA',
                number: '+12679304000',
                unformattedNumber: '+12679304000',
              },
              // premium numbers
              {
                country: 'Australia',
                location: 'Broken Hill, NSW',
                number: '+61880331445',
                unformattedNumber: '+61880331445',
              },
              {
                country: 'United States',
                location: 'Alabaster, AL',
                number: '+12056051874',
                unformattedNumber: '+12056051874',
              },
              {
                country: 'United States',
                location: 'Alabaster, AL',
                number: '+12052161634',
                unformattedNumber: '+12052161634',
              },
              // Toll-free numbers
              {
                country: 'Mexico',
                location: 'Toll-Free',
                number: '+528002271101',
                unformattedNumber: '+528002271101',
              },
              {
                country: 'United States',
                location: 'Toll-Free',
                number: '+18333243308',
                unformattedNumber: '+18333243308',
              },
            ]);
          }}
        />
      </Scenario>
    );
  }
}
