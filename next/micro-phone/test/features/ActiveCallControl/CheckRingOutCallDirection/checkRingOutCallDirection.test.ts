import { checkRingOutCallDirection } from '../../../../src/app/services/ActiveCallControl';

import ringOutServerNotification from './ringOutServerNotification.json';

type MessageType = (typeof ringOutServerNotification)[1];

describe('checkRingOutCallDirection', () => {
  let message: MessageType;
  let from: any;
  let to: any;

  beforeEach(() => {
    const rawMessage = ringOutServerNotification[1];
    message = JSON.parse(JSON.stringify(rawMessage));
    from = message.body?.parties[0].from;
    to = message.body?.parties[0].to;
    expect(from).not.toEqual(to);
  });

  test('From/To needs revise', () => {
    const newMessage = checkRingOutCallDirection(message as any) as MessageType;
    expect(newMessage.body?.parties[0].from).toEqual(to);
    expect(newMessage.body?.parties[0].to).toEqual(from);
  });

  test('From/To kept', () => {
    message.body!.origin.type = 'Call';
    const newMessage = checkRingOutCallDirection(message as any) as MessageType;
    expect(newMessage.body?.parties[0].from).toEqual(from);
    expect(newMessage.body?.parties[0].to).toEqual(to);
  });
});
