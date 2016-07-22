import CallerBar from '../presentation/CallerBar/CallerBar.react';
import { connect } from 'react-redux';

export default connect(state => ({
  numbers: state.user.phoneNumbers,
}))(CallerBar);
