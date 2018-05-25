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
    this.state = {
      open: false
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
      open
    });
  }
  onClickFunc = () => {
    const open = !!document.querySelector('.rw-open');
    const openState = !open ? 'date' : false;
    if (!this.state.open) {
      window.addEventListener('click', this._handleDocumentClick, false);
    } else {
      window.removeEventListener('click', this._handleDocumentClick, false);
    }
    this.setState({
      open: openState
    });
  }
  collapseDatePicker = () => {
    this.setState({
      open: false
    });
  }
  render() {
    const {
      currentLocale,
    } = this.props;
    const dueDate = new Date().toISOString();
    const showDate = this.props.date ? Moment(this.props.date).format('MM/DD/YY') : null;
    return (
      <div
        className={classnames(styles.datePicker, this.props.datePickerClassName)}
        ref={(ref) => { this.date = ref; }}
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
              date.setFullYear(currentStartTime.getFullYear());
              date.setMonth(currentStartTime.getMonth());
              date.setDate(currentStartTime.getDate());
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
          className={classnames(styles.dateText, this.props.dateTextClassName)}>
          {`${this.props.label}: ${showDate}`}
        </div>
      </div>
    );
  }
}
DatePicker.propTypes = {
  currentLocale: PropTypes.string,
  label: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  datePickerClassName: PropTypes.string,
  dateTextClassName: PropTypes.string,
};
DatePicker.defaultProps = {
  currentLocale: 'en-US',
  label: '',
  date: null,
  onChange: undefined,
  datePickerClassName: '',
  dateTextClassName: ''
};
