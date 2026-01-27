export interface InputSelectWidgetProps {
  referenceType?: string;
  formKey: string;
  placeholder?: string;
  onChange: (value: string) => void;
  options: string[];
  maxLength?: number;
}
