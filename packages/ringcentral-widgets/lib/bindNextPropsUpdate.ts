export function bindNextPropsUpdate(instance) {
  return (nextProps, field = 'value', isFocus) => {
    if (
      typeof nextProps[field] !== 'undefined' &&
      nextProps[field] !== instance.props[field] &&
      nextProps[field] !== instance.state[field]
    ) {
      if (field === 'value' && isFocus) {
        return;
      }
      instance.setState({ [field]: nextProps[field] });
    }
  };
}
