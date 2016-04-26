import Enum from '../lib/enum';

const definition = {
  notLoggedIn: 0,
  hasPublicToken: 1,
  userLoggedIn: 2,
};

class LoginStatus extends Enum {
  constructor() {
    super(definition);
  }
}

export default new LoginStatus();
