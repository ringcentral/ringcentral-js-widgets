export default function createSimpleReducer(type, data) {
  return (state = null, action) => {
    if (action.type === type) return action[data];
    return state;
  };
}
