import Flip from '../presentation/Flip/Flip.react';
import { connect } from 'react-redux';

export default connect(state => ({
  numbers: state.user.forwardingNumbers.filter(number => number.features.indexOf('CallFlip') > -1),
}))(Flip);
