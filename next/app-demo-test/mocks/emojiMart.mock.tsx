jest.mock('@emoji-mart/react', () => {
  const React = jest.requireActual('react');
  return {
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: React.forwardRef(({ onEmojiSelect }: any, ref) => {
      return (
        <div ref={ref} data-sign="emoji-popup">
          <button
            data-sign="emoji-grinning"
            onClick={() =>
              onEmojiSelect({
                id: ':grinning:',
                name: 'Grinning Face',
                native: '😀',
                unified: '1f600',
                keywords: ['smile', 'happy', 'joy', ':D', 'grin'],
                shortcodes: ':grinning:',
                emoticons: [':D'],
              })
            }
          ></button>
        </div>
      );
    }),
  };
});
