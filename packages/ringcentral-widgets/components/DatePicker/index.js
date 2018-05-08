import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import 'react-widgets/dist/css/react-widgets.css';
import styles from './styles.scss';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    Moment.locale(this.props.currentLocale);
    momentLocalizer();
  }
  onClickFunc = () => {
    const open = !!document.querySelector('.rw-open');
    if (!open) {
      this.date.inner.toggle();
    } else {
      this.date.inner.close();
    }
  }
  render() {
    const {
      currentLocale,
    } = this.props;
    const dueDate = new Date().toISOString();
    return (
      <div className={styles.datePicker}>
        <DateTimePicker
          culture={currentLocale}
          time={false}
          value={new Date(this.props.date)}
          onChange={(currentStartTime) => {
            if (currentStartTime) {
              const date = new Date(dueDate);
              date.setFullYear(currentStartTime.getFullYear());
              date.setMonth(currentStartTime.getMonth());
              date.setDate(currentStartTime.getDate());
              let startTime = date.getTime();
              const now = (new Date()).getTime();
              if (startTime < now) {
                startTime = now;
              }
              this.props.onChange(startTime);
            }
          }}
          ref={(ref) => { this.date = ref; }}
          format="MM/DD/YY"
          min={new Date()}
        />
        <div
          onClick={() => this.onClickFunc()}
          className={classnames(styles.dateTimeText, styles.dateText)}>
          {this.props.label}:{Moment(this.props.date).format('MM/DD/YY')}
        </div>
      </div>
    );
  }
}
DatePicker.propTypes = {
  currentLocale: PropTypes.string,
  label: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  onChange: PropTypes.func
};
DatePicker.defaultProps = {
  currentLocale: 'en-US',
  label: '',
  date: new Date(),
  onChange: undefined
};
