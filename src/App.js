import React from 'react';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

const clientId = '1065639900600-ftnn34d159bagr2r933noljcts5115ft.apps.googleusercontent.com';

export const refreshTokenSetup = (res) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 100;
  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 100;
    setTimeout(refreshToken, refreshTiming);
  }
  setTimeout(refreshToken, refreshTiming);
}

function Login() {
  const onSuccess = (event) => {
    console.log('[Login Success] currentUser:', event.profileObj);
    refreshTokenSetup(event);
  }
  const onFailure = (event) => {
    console.log('[Login Failed] event:', event);
  }
  return (
      <div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          style={{ marginTop: '100px' }}
          isSignedIn={true}
          />
      </div>
    );
}

function Logout() {
  const onSuccess = (event) => {
    console.log('Logout made successfully');
  }
  return (
      <div>
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onSuccess}
        ></GoogleLogout>
      </div>
    );
}

function App() {
  return (
    <div className="App">
      <Login />
      <Logout />
    </div>
  );
}

export default App;
