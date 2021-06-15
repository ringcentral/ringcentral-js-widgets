import { connectModule } from '../../lib/phoneContext';
import { TabContentView } from '../../components/TabContentView';

const DialerAndCallsTabContainer = connectModule(
  (phone) => phone.dialerAndCallsTabUI,
)(TabContentView);

export { DialerAndCallsTabContainer };
