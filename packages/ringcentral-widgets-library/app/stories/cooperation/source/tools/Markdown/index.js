/**
 * @file markdown
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

// not as a pure component to expend it in the feature
export default class Markdown extends Component {
  static propTypes = {
    input: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'x'
    };
  }
  render() {
    const { input } = this.props;
    return (
      <ReactMarkdown source={input} />
    );
  }
}
