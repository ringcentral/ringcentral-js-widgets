import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import marked from 'marked';
import hl from 'highlight.js';

import styles from './styles.scss';

class Markdown extends Component {
  componentWillMount() {
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
    });
  }

  render() {
    /* eslint-disable react/no-danger */
    return (
      <div className={classnames(styles.root, this.props.className)}>
        <div
          className={styles['markdown-body']}
          dangerouslySetInnerHTML={{ __html: marked(this.props.text) }}
        />
      </div>

    );
    /* eslint-enable */
  }
}

Markdown.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Markdown.defaultProps = {
  className: undefined,
};

export default Markdown;
