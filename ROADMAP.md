# Road map for JS widgets

Release a minor version every 2 weeks.

## v. 0.3.0

#### Login

1. support 3-rd party login

#### WebRTC phone

1. forward when receiving incoming call
2. send message back when receiving incoming call

#### Messages list

1. Different media type

#### Logout

1. We need to logout, therefore we can enable auto login
2. When logging out, should clear contacts cache

## v. 0.2.0

#### General

1. Widgets studio
   1. Interface to combine different widgets (drag and drop)
2. Embedded widget
   1. at arbitary position(click to dial)
3. minimize

#### WebRTC phone

1. Browser compatibility
2. flip, transfer, park
3. Address book

#### Messages list

1. display recent messages or activities (7 days)
2. send messages
3. have notification when receive new messages
4. Dynamicly load messages

## v. 0.1.0

#### General

1. Embedded widgets

   1. Widgets can be embedded into a specific fixed position.
   2. Widgets can be minified.

#### Login

1. support password flow
   1. When login successfully, RC phone will display the main panel.
   2. When login fail, will display error message.

2. support OAuth 2.0 code flow
   1. When login successfully, RC phone will display the main panel.
   2. When login fail, will display error message.
   3. When user close the OAuth window, will display error message (knowing bugs: For now, widgets will not notice that OAuth panel is closed abnormal.)

3. Simplified version
   1. Only display a 'login' button.


#### WebRTC phone

1. Callout
   1. When the phone number is correct, will make a phone call and display active call panel.
   2. When the phone number contains some invalid symbols, will not call out.

2. Outbound caller id
   1. Can choose outbound caller ID from a dropdown list.

3. Receive phone call
   1. When receiving incoming call, will pop up a notification.

4. Contacts auto-complete
   1. Get contacts from RC contacts list. The phone numbers will auto complete with right candidates.

5. Call information:
   1. Display call duration.
   2. Display current contact in the active phone call.
6. Mute
   1. Phone call can be muted and unmated.

7. Hold
   1. Can hold and unhold (knowing bugs: When user hold and unhold too frequently, actions will fail.)

8. Small size incoming call widget
   1. If widgets is minified and have an incoming call, widgets will pop up a notification which contain a small size incoming call panel.

