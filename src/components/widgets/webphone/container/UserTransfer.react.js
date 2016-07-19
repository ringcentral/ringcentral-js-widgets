import Transfer from '../presentation/Transfer/Transfer.react';
import { connect } from 'react-redux';

export default connect(state => ({
  ...state,
  numbers: [
    '1222112212',
    '42424242',
    '120',
    '101',
  ],
  handleClick(value) { console.log(value); },
}))(Transfer);
