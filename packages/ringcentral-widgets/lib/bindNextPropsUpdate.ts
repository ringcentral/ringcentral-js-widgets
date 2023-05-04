export function bindNextPropsUpdate(instance: any) {
  return (nextProps: any, field = 'value', isFocus: any) => {
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
