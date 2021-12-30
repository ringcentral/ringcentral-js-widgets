import FlipPanel from '../../components/FlipPanel';
import { connectModule } from '../../lib/phoneContext';

export default connectModule((phone) => phone.flipUI)(FlipPanel);
