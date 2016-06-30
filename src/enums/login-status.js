import Enum from '../lib/enum';

const definition = {
  pending: 0, // after init, before status from platform is determined
  notLoggedIn: 1,
  clientAccessPending: 2,
  clientAccess: 3,
  userAccessPending: 4,
  userAccess: 5,
};

export default new Enum(definition);
