import CallerBar from '../presentation/CallerBar.react';
import { connect } from 'react-redux';

export default connect(state => ({
  ...state,
  numbers: [
    {
      country: 'US',
      value: '+1 650-397-6085',
      type: 'Main',
    },
    {
      country: 'US',
      value: '+1 650-397-6085',
      type: 'Direct',
    },
  ],
}))(CallerBar);
