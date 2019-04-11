export function actionTypeGenerator(
  action,
  {
    useSuccess = true,
    useError = true
  } = {}
) {
  const types = [action];
  if (useSuccess) {
    types.push(`${action}Success`);
  }
  if (useError) {
    types.push(`${action}Error`);
  }
  return types;
}
