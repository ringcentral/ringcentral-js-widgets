import React from 'react';
import { connectModule } from '../../lib/phoneContext';
import CallLogPanel from '../../components/CallLogPanel';

const CallLogPage = connectModule((phone) => phone.CallLogUI)(CallLogPanel);

export { CallLogPanel, CallLogPage as default };
