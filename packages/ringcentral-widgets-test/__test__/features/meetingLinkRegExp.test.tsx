import {
  autorun,
  title,
  Scenario,
  When,
  Then,
  Step,
  examples,
} from '@ringcentral-integration/test-utils';
import ConfigData from '@ringcentral-integration/commons/modules/DynamicConfig/ConfigData.json';
import {
  getRcmUriRegExp,
  getRcvUriRegExp,
} from '@ringcentral-integration/commons/modules/DynamicConfig/DynamicConfig';
import { getMeetingId } from '@ringcentral-integration/widgets/lib/MeetingCalendarHelper';

/** Domain of RCV
 *  Rainbow：xmnup-rxe-1-v-rainbow.lab.nordigy.ru (test env); video.rainbowoffice.com (prod env)
 *  Avaya: xmnup-rxe-1-v-avaya.lab.nordigy.ru (test env); video.cloudoffice.avaya.com (prod env)
 *  RC: xmnup-rxe-1-v.lab.nordigy.ru	(test env); v.ringcentral.com (prod env)
 *  RND-VI3-AMS + RND-VI11-AMS: 	"vi11-1-v.lab.nordigy.ru | vi11-2-v.lab.nordigy.ru" (test env has two domain)
 *  AT&T:	vi11-1-v-att.lab.nordigy.ru (test env);	meetings.officeathand.att.com (prod env)
 *  Atos:	xmnup-rxe-1-v-atos.lab.nordigy.ru/itlcixmn-rxe-1-v.lab.nordigy.ru (test env); video-atos.ringcentral.com/video.unifyoffice.com (prod env)
 *  vodafone: video.vodafonebusiness.ringcentral.com (prod env)
 */

@autorun(test)
@title('check RCV and RCM Link RegExp')
export class MeetingLinkRegExp extends Step {
  run() {
    let rcvUriRegExp: RegExp;
    let rcmUriRegExp: RegExp;
    return (
      <Scenario desc="">
        <When
          desc="get meeting link RegExp"
          action={() => {
            rcvUriRegExp = getRcvUriRegExp(ConfigData.meetingUriReg.rcv);
            rcmUriRegExp = getRcmUriRegExp(ConfigData.meetingUriReg.rcm);
          }}
        />
        <Then
          desc="check meeting link RegExp"
          action={() => {
            [
              'xmnup-rxe-1-v-att.lab.nordigy.ru',
              'xmnup-rxe-1-v-rainbow.lab.nordigy.ru',
              'video.rainbowoffice.com',
              'xmnup-rxe-1-v-avaya.lab.nordigy.ru',
              'video.cloudoffice.avaya.com',
              'xmnup-rxe-1-v.lab.nordigy.ru',
              'v.ringcentral.com',
              'vi11-1-v.lab.nordigy.ru',
              'vi11-2-v.lab.nordigy.ru',
              'vi11-1-v-att.lab.nordigy.ru',
              'meetings.officeathand.att.com',
              'xmnup-rxe-1-v-atos.lab.nordigy.ru',
              'itlcixmn-rxe-1-v.lab.nordigy.ru',
              'video-atos.ringcentral.com',
              'video.unifyoffice.com', // atos
              'video.vodafonebusiness.ringcentral.com', // vodafone
            ].forEach((domain) => {
              const linkWithPassword = `https://${domain}/join/725738698?pw=05d8b5217f25e035b311852ba0af6699`;
              expect(rcvUriRegExp.test(linkWithPassword)).toBeTruthy();
              expect(
                getMeetingId(linkWithPassword, rcvUriRegExp, rcmUriRegExp),
              ).toBe('725738698');
              const link = `http://${domain}/join/725738698`;
              expect(rcvUriRegExp.test(link)).toBeTruthy();
              expect(getMeetingId(link, rcvUriRegExp, rcmUriRegExp)).toBe(
                '725738698',
              );
            });

            [
              'meetings.ringcentral.com',
              'rcm.rcdev.ringcentral.com',
              'rcm.ops.ringcentral.com',
              'rcm.stage.ringcentral.com',
              'rcm-uat.businessconnect.telus.com',
              'meetings.businessconnect.telus.com',
              'meetings.btcloudphone.bt.com',
              'meetings-officeathand.att.com',
              'rcdev.dev.meetzoom.us',
              'rcdev.dev.zoom.us',
            ].forEach((domain) => {
              const linkWithPassword = `https://${domain}/j/1492797696?pwd=SHlVdWZ5SzN2TVZXVDAvaGNNR0FaUT09`;
              expect(rcmUriRegExp.test(linkWithPassword)).toBeTruthy();
              expect(
                getMeetingId(linkWithPassword, rcvUriRegExp, rcmUriRegExp),
              ).toBe('1492797696');
              const link = `http://${domain}/j/1492797696`;
              expect(rcmUriRegExp.test(link)).toBeTruthy();
              expect(getMeetingId(link, rcvUriRegExp, rcmUriRegExp)).toBe(
                '1492797696',
              );
            });
          }}
        />
      </Scenario>
    );
  }
}
