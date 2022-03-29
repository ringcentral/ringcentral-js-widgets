import { brandConfig } from '@ringcentral-integration/widgets-demo/dev-server/brandConfig';
import { Login } from '../../../../steps/Login';
import { CheckMicPermission } from './RCI-1872';

CheckMicPermission(Login, brandConfig.appName as string);
