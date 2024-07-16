export default function createSimpleReducer(type: any, data: any) {
  return (state = null, action: any) => {
    if (action.type === type) return action[data];
    return state;
  };
}
