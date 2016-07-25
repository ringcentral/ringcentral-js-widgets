import Enum from '../../lib/enum';

const definition = {
  pending: 'PENDING',
  subscribed: 'SUBSCRIBED',
  notSubscribed: 'NOT_SUBSCRIBED',
};

export default new Enum(definition);
