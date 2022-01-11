import UserGuide from '../../components/UserGuide';
import { connectModule } from '../../lib/phoneContext';

export const UserGuidePage = connectModule((phone) => phone.userGuideUI)(
  UserGuide,
);
