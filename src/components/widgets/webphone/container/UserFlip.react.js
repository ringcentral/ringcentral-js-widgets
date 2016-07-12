import Flip from '../presentation/Flip/Flip.react';
import { connect } from 'react-redux';

export default connect(state => ({
  ...state,
  numbers: [
    {
      value: '+1 650-397-6085',
      type: 'Howard Zhang Existing Phone',
    },
    {
      value: '+1 650-397-6085',
      type: 'Personal',
    },
  ],
  handleClick(event) { console.log(event); },
}))(Flip);
