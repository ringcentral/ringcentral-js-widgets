import React from 'react';
// eslint-disable-next-line
import LogSection from 'ringcentral-widgets/components/LogSection';

/**
 * A example of `LogSection`
 */
const LogSectionDemo = () => (
  <LogSection
    currentLog={{
      currentLogCall: {
        isSaving: false
      }
    }}
    onSaveCallLog={() => null}
    currentLocale="en-US"
    renderEditLogSection={() => null}
    onUpdateCallLog={() => null}
  />
);
export default LogSectionDemo;
