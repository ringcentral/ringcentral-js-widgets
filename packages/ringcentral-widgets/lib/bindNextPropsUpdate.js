export function bindNextPropsUpdate(instance) {
  return (nextProps, field = 'value') => {
    if (
      typeof nextProps[field] !== 'undefined' &&
      nextProps[field] !== instance.props[field] &&
      nextProps[field] !== instance.state[field]
    ) {
      instance.setState({ [field]: nextProps[field] });
    }
  };
}
