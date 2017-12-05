import React from 'react';

const ConferenceCommands = () => (
  <div>
    * # 2
    <h3>Caller Count</h3>
    <p>Keep track of how many people are on the call</p>
    <hr />

    * # 3
    <h3>Leave Conference</h3>
    <p>Lets the host hang up and end the call</p>
    <hr />

    * # 4
    <h3>Menu</h3>
    <p>Listen to the list of touchtone commands</p>
    <hr />

    * # 5
    <h3>Set Listening Modes</h3>
    <p>
Press 1x: Mute callers - Callers can unmute with  *, #, 6
Press 2x: Mute callers - Listen only. No unmuting option
Press 3x: Unmute callers - Opens the line again
    </p>
    <hr />

    * # 6
    <h3>Mute Host Line</h3>
    <p>
Press once to MUTE
Press again to UNMUTE
    </p>
    <hr />

    * # 7
    <h3>Secure the Call</h3>
    <p>
Press once to BLOCK all callers
Press again to OPEN the call
    </p>
    <hr />

    * # 8
    <h3>Hear sound when people Enter or Exit call</h3>
    <p>
Press 1x: Turns OFF sound
Press 2x: Enter tone is ON Exit tone is OFF
Press 3x: Enter tone is OFF Exit tone is ON
Press 4x: Turns ON sound
    </p>
    <hr />

    * 9
    <h3>Record your conference</h3>
    <p>
Press once to START recording
Press again to STOP recording
    </p>
  </div>
);

export default ConferenceCommands;
