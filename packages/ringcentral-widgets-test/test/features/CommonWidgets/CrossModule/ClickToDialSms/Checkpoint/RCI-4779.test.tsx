/**
 * RCI-4779: Check C2D for account permission
 * https://test_it_domain/test-cases/RCI-4779
 * Preconditions:
 * The user has logged into 3rd party.
 * The status of Click to Dial/SMS isON
 * The user has logged into RC CTI App with below accountAccountHasRingOutPermissionHasWebPhonePermissionCallingWithShowC2DATrueTrueBrowserTrueBTrueTrueJupiterTrueCTrueTrueSoftPhoneTrueDTrueTrueRingOutTrueETrueFalseJupiterTrueFTrueFalseSoftPhoneTrueGTrueFalseRingOutTrueHFalseTrueBrowserTrueIFalseTrueJupiterTrueJFalseTrueSoftPhoneTrueKFalseFalseFalse
 *
  | Account |HasRingOutPermission |HasWebPhonePermission |CallingWith |ShowC2D |
  | A |True |True |Browser |True |
	| B |True |True |Jupiter |True |
	| C |True |True |SoftPhone |True |
	| D |True |True |RingOut |True |
	| E |True |False |Jupiter |True |
	| F |True |False |SoftPhone |True |
	| G |True |False |RingOut |True |
	| H |False |True |Browser |True |
	| I |False |True |Jupiter |True |
	| J |False |True |SoftPhone |True |
	| K |False |False | |False |

 * Entry point(/s):
 * Login CTI with{Account} > Set calling setting as {CallingWith} > Go to any website (not in blocklists) with phone number(eg: +125048373812)
 */
import {
  p2,
  it,
  autorun,
  title,
  common,
} from '@ringcentral-integration/test-utils';

import { ClickToCallPermissionBasic } from '../../../../../../../ringcentral-integration/test/spec-lib/permissionsHelper.test';

@autorun(test)
@it
@p2
@common
@title('common Check C2D for account permission')
export class RCI4779 extends ClickToCallPermissionBasic {}
