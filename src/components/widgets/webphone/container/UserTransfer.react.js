import Transfer from '../presentation/Transfer/Transfer.react';
import { connect } from 'react-redux';

export default connect(state => ({
  ...state,
}))(Transfer);
