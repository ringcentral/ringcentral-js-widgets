/**
 * RCI-4071: Limit inputing only more than three spaces in dial pad
 * https://test_it_domain/test-cases/RCI-4071
 * Preconditions:
 * 1. It have already installed CTI.
 * 2. CTI has been logged in.
 * Entry point(/s):
 * > Go to dial pad tab
 */
import type { StepFunction } from '../../lib/step';
import {
  autorun,
  Given,
  p3,
  Scenario,
  Step,
  Then,
  title,
  When,
  it,
} from '../../lib/step';
import {
  InputToField,
  CheckInputToRecipientsNoExist,
} from '../../steps/dialer';

export const CheckHitEnterInputMoreThanThreeSpaces = ({
  Login,
}: {
  Login: StepFunction;
}) => {
  @autorun(test)
  @p3
  @it
  @title('Limit inputting only more than three spaces in dial pad')
  class HitEnterInputMoreThanThreeSpaces extends Step {
    run() {
      return (
        <Scenario desc="Limit inputting only more than three spaces in dial pad">
          <Given desc="Logged in Third-part APP and CTI" action={Login} />
          <When
            desc="Input more than three spaces in 'To' field and hit enter"
            action={<InputToField input="    " needEnter />}
          />
          <Then
            desc="There is nothing input in dial pad"
            action={CheckInputToRecipientsNoExist}
          />
        </Scenario>
      );
    }
  }
};
