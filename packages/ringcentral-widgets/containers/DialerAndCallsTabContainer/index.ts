import { TabContentView } from '../../components/TabContentView';
import { connectModule } from '../../lib/phoneContext';

const DialerAndCallsTabContainer = connectModule(
  (phone) => phone.dialerAndCallsTabUI,
)(TabContentView);

export { DialerAndCallsTabContainer };
