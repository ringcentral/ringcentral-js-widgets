export interface ICopyBtnProps {
  value: string;
  currentLocale: string;
  handleSuccess?: () => void;
  handleFailure?: () => void;
}

export type InnerBtnProps = Pick<ICopyBtnProps, 'currentLocale'> & {
  executeCopy: () => void;
};
