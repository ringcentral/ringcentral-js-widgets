import React from 'react';

const styles = {
  width: '300px',
};

export default function Wrapper(storyFn) {
  return (
    <div style={styles}>
      {storyFn()}
    </div>
  );
}
