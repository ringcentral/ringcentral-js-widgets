import React from 'react';

import CallLogPanel from '../../components/CallLogPanel';
import { connectModule } from '../../lib/phoneContext';

const CallLogPage = connectModule((phone) => phone.CallLogUI)(CallLogPanel);

export { CallLogPage as default, CallLogPanel };
