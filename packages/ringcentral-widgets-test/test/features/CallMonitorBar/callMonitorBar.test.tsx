import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  examples,
  Step,
  And,
} from '../../lib/step';

// https://jira.ringcentral.com/browse/RCINT-8190
// https://jira.ringcentral.com/browse/RCINT-9547
@autorun(test.skip)
@title('Call monitor status bar with no calls')
class CallMonitorBarWithNoCall extends Step {
  @examples(`
    | brand |
    |'rc'|
    |'bt'|
    |'telus'|
    |'att'|`)
  run() {
    return (
      <Scenario desc="Call monitor bar with no calls">
        <Given desc="Given there's no call online" />
        <Then desc="Then ${brand} logo is displayed on the bar" />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@title('Call monitor status bar with single call')
class CallMonitorBarWithSingleCall1 extends Step {
  run() {
    return (
      <Scenario desc="Call monitor bar show 'Call duration'">
        <Given desc="Given user has made a single call" />
        <When desc="When user navigates to call control page(or call log section at Salesforce)" />
        <Then desc="Then the bar would show the call duration" />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@title('Call monitor status bar show "Current Call" icon')
class CallMonitorBarWithSingleCall2 extends Step {
  run() {
    return (
      <Scenario desc="Call monitor bar with single call">
        <Given desc="Given user has made a single call" />
        <When desc="When user navigates to tabs other than call control page" />
        <Then desc="Then the bar would show the call duration with the 'Current Call' icon" />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@title('Call monitor status bar click current call')
class CallMonitorBarClickCurrentCall extends Step {
  run() {
    return (
      <Scenario desc="Call monitor bar with click current call">
        <Given desc="Given user has made a single call" />
        <And desc="And user navigates to tabs other than call control page(or call log section at Salesforce)" />
        <When desc="When user clicks the 'Current Call' icon and the duration" />
        <Then desc="Then user should be navigated to call control page(or call log section at Salesforce)" />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@title('Call monitor status bar with 5 seconds interval')
class CallMonitorBarInterval extends Step {
  run() {
    return (
      <Scenario desc="Call monitor bar with interval">
        <Given desc="Given user is on the Path: call_control_path/other path" />
        <And desc=" And user has 1 current call and 2 call on hold," />
        <Then desc="Then the scrolling interval should be 5 seconds" />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@title('Call monitor status bar with incoming calls')
class CallMonitorBarWithIncomingCall extends Step {
  @examples(`
  | incomingCallNumber | path                            | callMonitorBarContent                    |
  | '1'                | 'settings page'                 | '1 incoming call and view calls button'  |
  | '3'                | 'settings page'                 | '3 incoming calls and view calls button' |
  | '1'                | 'current ringing call log page' | 'empty'                                  |
  | '3'                | 'current ringing call log page' | '3 incoming calls and view calls button' |
  | '1'                | 'other ongoing call log page'   | '1 incoming call and view calls button'  |`)
  run() {
    return (
      <Scenario desc="Call monitor bar with incoming calls">
        <When desc="When user has ${incomingCallNumber} incoming calls" />
        <And desc="And user navigate to ${path}" />
        <Then desc="Then the callMonitor bar should show ${callMonitorBarContent}" />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@title('scroll on the call monitor bar')
class CallMonitorBarWithCalls extends Step {
  @examples(`
    | calls | callMonitorBar |
    | '0 incoming call, 0 current call, 2 call on hold, 0 calls on other devices' | '[On hold Current call duration, current call btn] and [2 calls on hold, view call btn]' |
    | '0 incoming call, 1 current call, 2 call on hold, 0 calls on other devices' | '[Current call duration, current call btn] and [2 Calls on hold, view call btn]' |
    | '1 incoming call, 0 current call, 2 call on hold, 0 calls on other devices' | '[On hold call duration, current call btn] and [1 incoming Call, view call btn] and [2 Calls on hold, view call btn]' |
    | '2 incoming call, 1 current call, 1 call on hold, 0 calls on other devices' | '[Current call duration, current call btn] and [2 incoming Calls, view call btn] and [1 Call on hold, view call btn]' |
    | '0 incoming call, 1 current call, 0 call on hold, 2 calls on other devices' | '[Current call duration, current call btn] and [2 Calls on other devices, view call btn]' | `)
  run() {
    return (
      <Scenario desc="Scroll on the call monitor bar">
        <Given desc="Given user is on the Path: message_path" />
        <And desc="And user has ${calls}" />
        <Then desc="Then the callMonitor bar should scroll with ${callMonitorBar}" />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@title('display Current call and View calls on the bar when hover the bar')
class CallMonitorBarWithHover extends Step {
  @examples(`
  | path | btn |
  | 'call_control_path' | "'View calls' btn" |
  | 'all_calls_page' | "'Current call' btn" |
  | 'message_page' | "'Current call' and 'View calls'" |
  | 'setting_page' | "'Current call' and 'View calls'" |`)
  run() {
    return (
      <Scenario desc="should display `Current call` and `View calls` on the bar when hover the bar">
        <Given desc="Given user is on the Path: ${path}" />
        <And desc="And user has 1 incoming call,0 current call, 2 call on hold" />
        <Then desc="Then the header view should scroll with [Current call duration][current call btn] 1 incoming Call, 2 Calls on hold, [view call btn]" />
        <When desc="When user hover on the bar" />
        <Then desc="Then show ${btn} in gray background" />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@title('will direct to current call control page when click "Current call" btn')
class CallMonitorBarWithBtnClick extends Step {
  @examples(`
  | btn | page |
  | "'Current call' btn" | 'call_control_page' |
  | "'View calls' btn" | 'all_calls_page' |`)
  run() {
    return (
      <Scenario desc="should display `Current call` and `View calls` on the bar when hover the bar">
        <Given desc="Given Path: setting_page" />
        <When desc="When user clicks ${btn} on the bar" />
        <Then desc="Then user should be directed to current ${page}" />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@title('Presence dropdown should be displayed')
class CallMonitorBarWithPresence extends Step {
  @examples(`
  | options |
  | 'Available' |
  | 'Busy' |
  | 'Do not Disturb' |
  | 'Invisible' |`)
  run() {
    return (
      <Scenario desc="Presence dropdown should be displayed">
        <Given desc="Given user has logged in CTI app" />
        <When desc="When user clicks on presence icon" />
        <Then desc="all presence ${options} are displayed as dropdown list" />
      </Scenario>
    );
  }
}

@autorun(test.skip)
@title('Dropdown list should be folded')
class HeaderViewPresenceDropdownFold extends Step {
  @examples(`
  | actions |
  | 'click any area other than this icon' |
  | 'select one status' |
  `)
  run() {
    return (
      <Scenario desc="Dropdown list should be folded">
        <Given desc="Given user has clicked the presence icon" />
        <When desc="When do some ${actions}" />
        <Then desc="Then the dropdown list should be folded" />
      </Scenario>
    );
  }
}

// only google & office
@autorun(test.skip)
@title('Presence dropdown should be displayed')
class HeaderViewPresenceShowAtAllPages extends Step {
  @examples(`
  | page |
  | 'incoming call page' |
  | 'quick access page' |
  | "What's New page" |`)
  run() {
    return (
      <Scenario desc="Presence dropdown should be displayed">
        <Given desc="Given user has logged in CTI app" />
        <When desc="When user clicks presence icon on ${page}" />
        <Then desc="Then all presence options are displayed as dropdown list" />
      </Scenario>
    );
  }
}

// only google & office
@autorun(test.skip)
@title('Dropdown should be popped up')
class HeaderViewPresencePopup extends Step {
  run() {
    return (
      <Scenario desc="Dropdown should be popped up">
        <Given desc="Given app is displayed as floating window" />
        <And desc="And app has been minimized on the web page" />
        <When desc="When user clicks presence icon" />
        <Then desc="Then app should pop up" />
        <And desc="And the dropdown list should be expanded" />
      </Scenario>
    );
  }
}
