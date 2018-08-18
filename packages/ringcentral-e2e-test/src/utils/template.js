export function compile({
  keys,
  values,
  template,
}) {
  const renderTemplate = new Function(...keys, `return \`${template}\``);
  return renderTemplate(...values);
}
