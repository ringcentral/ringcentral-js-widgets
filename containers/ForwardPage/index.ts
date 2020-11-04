import ForwardPanel from '../../components/ForwardPanel';
import { connectModule } from '../../lib/phoneContext';

export default connectModule((phone) => phone.forwardUI)(ForwardPanel);
