import KeyValueMap from 'data-types/key-value-map';

const definition = {
  pending: 'PENDING',
  subscribed: 'SUBSCRIBED',
  notSubscribed: 'NOT_SUBSCRIBED',
};

export default new KeyValueMap(definition);
