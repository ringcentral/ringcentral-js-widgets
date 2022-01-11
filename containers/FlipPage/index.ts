import FlipPanel from '../../components/FlipPanel';
import { connectModule } from '../../lib/phoneContext';
import type { FlipUIContainerProps } from '../../modules/FlipUI';

export default connectModule<any, FlipUIContainerProps>(
  (phone) => phone.flipUI,
)(FlipPanel);
