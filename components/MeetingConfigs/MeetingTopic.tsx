import 'react-widgets/dist/css/react-widgets.css';

import React, { FunctionComponent } from 'react';

import MeetingSection from '../MeetingSection';
import { MAX_TOPIC_LENGTH } from './constants';
import i18n from './i18n';
import styles from './styles.scss';

interface TopicProps {
  update: (...args: any[]) => any;
  currentLocale: string;
  meeting: any;
  that: any;
}

const MeetingTopic: FunctionComponent<TopicProps> = ({
  update,
  currentLocale,
  meeting,
  that,
}) => (
  <MeetingSection hideTopBorderLine>
    <div className={styles.inline}>
      <span className={styles.label}>
        {i18n.getString('topic', currentLocale)}
      </span>
      <input
        ref={(ref) => {
          that.topic = ref;
        }}
        onPaste={(event) => {
          const topic = event.target.value;
          event.preventDefault();
          event.clipboardData.items[0].getAsString((data) => {
            const isOverLength =
              topic.length >= 0 && topic.length <= MAX_TOPIC_LENGTH;
            const positionStart = that.topic.selectionStart;
            const positionEnd = that.topic.selectionEnd;
            const select = positionEnd - positionStart;
            const restLength = MAX_TOPIC_LENGTH - topic.length + select;
            const isOver = isOverLength && restLength > 0;
            if (isOver) {
              const isOverLength = restLength >= data.length;
              const insertText = isOverLength
                ? data
                : data.slice(0, !isOver ? select : restLength);
              const value = topic.split('');
              value.splice(positionStart, select, insertText);
              that.topic.value = value.join('');
              const newPosition = positionStart + insertText.length;
              that.topic.setSelectionRange(newPosition, newPosition);
            }
            update({
              ...meeting,
              topic: that.topic.value,
            });
          });
        }}
        type="text"
        className={styles.input}
        defaultValue={meeting.topic || ''}
        onChange={({ target }) => {
          const topic = target.value;
          if (topic.length >= 0 && topic.length <= MAX_TOPIC_LENGTH) {
            clearTimeout(that.topicSetTimeoutId);
            that.topicSetTimeoutId = setTimeout(() => {
              update({
                ...meeting,
                topic,
              });
            }, 10);
          } else {
            target.value = meeting.topic || '';
          }
        }}
        data-sign="scheduleMeetingTopic"
      />
    </div>
  </MeetingSection>
);
export { MeetingTopic as Topic };
