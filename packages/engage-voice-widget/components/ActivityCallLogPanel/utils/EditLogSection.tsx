import React, {
  FunctionComponent,
  MutableRefObject,
  useEffect,
  useRef,
} from 'react';
import CallLogFields, {
  CallLogFieldsProps,
} from 'ringcentral-widgets/components/CallLogFields';
import { CallLogPanelProps } from 'ringcentral-widgets/components/CallLogPanel';
import styles from './styles.scss';

type EditLogSectionProps = {
  scrollTo: string;
  rootRef: MutableRefObject<HTMLElement>;
  referenceFieldOptions?: CallLogFieldsProps['referenceFieldOptions'];
} & Parameters<CallLogPanelProps['renderEditLogSection']>[0];

export const EditLogSection: FunctionComponent<EditLogSectionProps> = ({
  onUpdateCallLog,
  currentLog,
  currentLocale,
  onSaveCallLog,
  subjectDropdownsTracker,
  editSectionScrollBy,
  startAdornmentRender,
  scrollTo,
  isWide,
  rootRef,
  referenceFieldOptions,
}) => {
  const dispositionIdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef?.current && dispositionIdRef.current) {
      switch (scrollTo) {
        case 'dispositionId':
          rootRef.current.scrollBy({
            top: dispositionIdRef.current.offsetTop,
            behavior: 'smooth',
          });
          break;

        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTo]);

  return (
    <CallLogFields
      fieldSize={isWide ? 'medium' : 'small'}
      referenceFieldOptions={referenceFieldOptions}
      subjectDropdownsTracker={subjectDropdownsTracker}
      onUpdateCallLog={onUpdateCallLog}
      onSaveCallLog={onSaveCallLog}
      currentLog={currentLog}
      currentLocale={currentLocale}
      startAdornmentRender={startAdornmentRender}
      editSectionScrollBy={editSectionScrollBy}
      classes={{
        root: styles.root,
      }}
      refs={{
        dispositionId: dispositionIdRef,
      }}
    />
  );
};

EditLogSection.defaultProps = {
  referenceFieldOptions: {},
};
