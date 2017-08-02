import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

function RadioOption(props) {
  let optionBtn = '';
  if (props.currentIndex === props.selectedIndex) {
    optionBtn = classnames(styles.optionBtn, styles.active);
  } else {
    optionBtn = styles.optionBtn;
  }
  return (
    <div className={styles.radioOption} onClick={() => { props.onSelect(props.currentIndex); }}>
      <span className={optionBtn} />
      <span className={styles.optionNumber}>
        {props.number}
      </span>
      <span className={styles.optionLabel} title={props.label}>
        {props.label}
      </span>
    </div>
  );
}
RadioOption.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  number: PropTypes.string.isRequired,
  label: PropTypes.string,
  selectedIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};
RadioOption.defaultProps = {
  label: ''
};

export default class RadioButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    this.chooseOption = (index) => {
      this.setState({
        selectedIndex: index,
      });
      this.props.radioSelect(this.props.radioOptions[index].number);
    };
  }
  render() {
    return (
      <div className={classnames(styles.root, this.props.className)}>
        {
          this.props.radioOptions.map((value, idx) => (
            <RadioOption
              currentIndex={idx}
              selectedIndex={this.state.selectedIndex}
              number={value.number}
              label={value.label}
              onSelect={this.chooseOption}
              key={idx}
            />
         ))
        }
      </div>
    );
  }
}

RadioButtonGroup.propTypes = {
  radioOptions: PropTypes.array.isRequired,
  radioSelect: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
