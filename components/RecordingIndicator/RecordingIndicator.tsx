import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';

import classnames from 'classnames';

import { RcIcon } from '@ringcentral/juno';

import RecordIconActive from '../../assets/images/RecordOn.svg';
import styles from './styles.scss';

type SyncRenderContextValue = {
  count: number;
  setCount: (number: number) => void;
};

type RecordingIndicatorProps = {
  customClass?: string;
  dataSign?: string;
};

const SyncRenderContext = createContext<SyncRenderContextValue>({
  count: 0,
  setCount: () => {},
});

export const RecordingIndicatorProvider: FunctionComponent = ({ children }) => {
  const [count, setCount] = useState(0);
  return (
    <SyncRenderContext.Provider
      value={{
        count,
        setCount,
      }}
    >
      {children}
    </SyncRenderContext.Provider>
  );
};

export const RecordingIndicator: FunctionComponent<RecordingIndicatorProps> = ({
  customClass = '',
  dataSign,
}) => {
  const { count, setCount } = useContext(SyncRenderContext);
  const [show, setShow] = useState(true);
  let timer: number;

  useEffect(() => {
    setCount(count + 1);
    return () => {
      !!timer && window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // force re-render
    setShow(false);
    timer = window.setTimeout(() => setShow(true), 0);
  }, [count]);

  return show ? (
    <RcIcon
      data-sign={dataSign}
      size="small"
      symbol={RecordIconActive}
      className={classnames(
        styles.recordingIndicator,
        !!customClass && customClass,
      )}
    />
  ) : null;
};
