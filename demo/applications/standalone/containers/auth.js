import AuthPanel from '../../../../src/widgets/auth/AuthPanel';
import { connect } from '../../../../src/utils/integration/';

import authPanelSelector from '../../../../src/widgets/auth/AuthPanel/selector';

// TODO: import the cred info from other places?
import config from '../../../../config';

export default connect(
  (state, props, phone) => authPanelSelector(state, props, phone.auth)
)(AuthPanel);
