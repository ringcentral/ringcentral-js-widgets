import AnimationAlert from '../../components/AnimationAlert';
import { connectModule } from '../../lib/phoneContext';

export default connectModule(phone => phone.alertUI)(AnimationAlert);
