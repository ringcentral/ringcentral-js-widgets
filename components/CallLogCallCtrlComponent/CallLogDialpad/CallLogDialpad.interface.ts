export interface CallLogDialpadProps {
  onChange: (string: DtmfValue) => void;
  onClose: () => any;
  className: string;
  isWide?: boolean;
}

export type DtmfValue =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '#'
  | '*';
