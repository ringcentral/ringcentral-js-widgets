import React from 'react';

const AuthPanel = (props) => {
  console.log(props);
  return (
    <div className={'components_widgets_presentation_AuthPanel_auth'}>
      <button
        className={'loginButton'}
        onClick={() => {
          props.auth.login({
            username: '16508370092',
            extension: '',
            password: 'Test!123',
          });
          props.manuallyLogin();
        }}
      >
        Login
      </button>
    </div>
  );
};

AuthPanel.propTypes = {
  auth: React.PropTypes.object,
  manuallyLogin: React.PropTypes.func,
};

export default AuthPanel;
