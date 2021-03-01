import React, { FC, useState, useRef, useEffect } from 'react';
import { RcTextField } from '@ringcentral/juno';
import i18n from './i18n';
import styles from './styles.scss';

export const InnerTopic: FC<{
  name: string;
  currentLocale: string;
  defaultTopic: string;
  setTopicRef: (ref: any) => void;
  updateMeetingTopic: (name: string) => void;
}> = ({
  name,
  currentLocale,
  defaultTopic,
  setTopicRef,
  updateMeetingTopic,
}) => {
  const [topic, setTopic] = useState(name);
  const [isTopicChange, setIsTopicChange] = useState(false);
  const topicRef = useRef();

  useEffect(() => {
    setTopic(name);
    setTopicRef(topicRef);
  }, [name, setTopicRef]);

  useEffect(() => {
    if (!isTopicChange) {
      setTopic(defaultTopic);
      setTopicRef(topicRef);
    }
  }, [defaultTopic, isTopicChange, setTopicRef]);

  return (
    <RcTextField
      ref={topicRef}
      label={i18n.getString('topic', currentLocale)}
      data-sign="topic"
      fullWidth
      clearBtn={false}
      value={topic}
      inputProps={{
        maxLength: 255,
      }}
      onChange={(e) => {
        setIsTopicChange(true);
        setTopic(e.target.value);
      }}
      onBlur={() => {
        updateMeetingTopic(topic);
      }}
      classes={{
        root: styles.input,
      }}
      gutterBottom
    />
  );
};

export const Topic = React.memo(
  InnerTopic,
  (prevProps, nextProps) =>
    prevProps.name === nextProps.name &&
    prevProps.currentLocale === nextProps.currentLocale,
);
