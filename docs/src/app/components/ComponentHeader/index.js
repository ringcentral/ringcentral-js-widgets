import React from 'react';
import PropTypes from 'prop-types';

import Markdown from '../Markdown';

function ComponentHeader(props) {
  const name = props.name;
  const description = props.description && props.description.length ?
    props.description : 'none description';
  const text = `# ${name}\n\n${description}`;
  return (
    <Markdown text={text} />
  );
}

ComponentHeader.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
};

ComponentHeader.defaultProps = {
  description: undefined,
};

export default ComponentHeader;
