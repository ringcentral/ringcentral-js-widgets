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
    <div className={styles.root} onClick={() => { props.onSelect(props.currentIndex); }}>
      <span className={optionBtn} />
      <span>
        {props.value}
      </span>
    </div>
  );
}
RadioOption.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
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
      this.props.radioSelect(this.props.radioOptions[index]);
    };
  }
  render() {
    return (
      <div className={styles.root}>
        {
          this.props.radioOptions.map((value, idx) => (
            <RadioOption
              currentIndex={idx}
              selectedIndex={this.state.selectedIndex}
              value={value}
              onSelect={this.chooseOption}
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
};
