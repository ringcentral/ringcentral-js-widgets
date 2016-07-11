import AuthPanel from '../presentation/AuthPanel.react';
import { connect } from 'react-redux';

export default connect(state => ({ ...state }))(AuthPanel);
