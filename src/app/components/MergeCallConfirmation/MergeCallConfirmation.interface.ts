export interface MergeCallConfirmationProps {
  isOpen: boolean;
  contactName: string;
  isConferenceCall: boolean;
  onClose?: () => void;
  onCancel: () => void;
  onMerge: (doNotAskAgain: boolean) => void;
}
