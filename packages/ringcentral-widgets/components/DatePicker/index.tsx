import 'react-widgets/dist/css/react-widgets.css';

import React, { Component } from 'react';

import classnames from 'classnames';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import styles from './styles.scss';

type DatePickerProps = {
  currentLocale?: string;
  label?: string;
  date?: any;
  onChange?: (...args: any[]) => any;
  datePickerClassName?: string;
  dateTextClassName?: string;
};
type DatePickerState = {
  open: boolean;
};
class DatePicker extends Component<DatePickerProps, DatePickerState> {
  constructor(props) {
    super(props);
    Moment.locale(this.props.currentLocale);
    momentLocalizer();
    this.state = {
      open: false,
    };
  }
  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener('click', this._handleDocumentClick, false);
  }
  _handleDocumentClick = (e) => {
    if (!this.mounted) {
      return;
    }
    if (this.date && this.date.contains(e.target)) {
      return;
    }
    const open = false;
    this.setState({
      open,
    });
  };
  onClickFunc = () => {
    const open = !!this.date.querySelector('.rw-open');
    const openState = !open ? 'date' : false;
    if (!this.state.open) {
      window.addEventListener('click', this._handleDocumentClick, false);
    } else {
      window.removeEventListener('click', this._handleDocumentClick, false);
    }
    this.setState({
      open: openState,
    });
  };
  collapseDatePicker = () => {
    this.setState({
      open: false,
    });
  };
  render() {
    const { currentLocale } = this.props;
    const dueDate = new Date().toISOString();
    const showDate = this.props.date
      ? Moment(this.props.date).format('MM/DD/YY')
      : '';
    return (
      <div
        className={classnames(
          styles.datePicker,
          this.props.datePickerClassName,
        )}
        ref={(ref) => {
          this.date = ref;
        }}
      >
        <DateTimePicker
          className="dateTimePicker"
          culture={currentLocale}
          time={false}
          open={this.state.open}
          value={this.props.date}
          onChange={(currentStartTime) => {
            if (currentStartTime) {
              const date = new Date(dueDate);
              date.setFullYear(
                currentStartTime.getFullYear(),
                currentStartTime.getMonth(),
                currentStartTime.getDate(),
              );
              this.props.onChange(date);
            }
            this.collapseDatePicker();
          }}
          format="MM/DD/YY"
          min={new Date()}
          onToggle={() => {}}
        />
        <div
          onClick={() => this.onClickFunc()}
          className={classnames(styles.dateText, this.props.dateTextClassName)}
        >
          {`${this.props.label}: ${showDate}`}
        </div>
      </div>
    );
  }
}
DatePicker.defaultProps = {
  currentLocale: 'en-US',
  label: '',
  date: null,
  onChange: undefined,
  datePickerClassName: '',
  dateTextClassName: '',
};
export default DatePicker;
