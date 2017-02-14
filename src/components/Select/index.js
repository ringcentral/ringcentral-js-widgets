import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <select
        className={classnames(
          styles.root,
          this.props.className)}
        value={this.props.value}
        onChange={this.props.onChange} >
        {
            this.props.options.map((option, idx) => (
              <option key={idx} value={this.props.valueFunction(option)}>
                { this.props.displayFunction(option) }
              </option>
            ))
          }
      </select>);
  }
}

Select.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  valueFunction: PropTypes.func,
  displayFunction: PropTypes.func,
};

Select.defaultProps = {
  valueFunction: option => option,
  displayFunction: option => option,
};
export default Select;
