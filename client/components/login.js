import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const Login = () => {
  // Add Flat Button to test that MuiThemeProvider is working
  return (
    <div>
      <h1>You are in Login View</h1>
      <div>
        <a href="/auth/github" className="login">Login with Github</a>
        <FlatButton
          label="Login"
          primary={true}
        />
      </div>
    </div>
  )
}

const styles = {
};

export default Login;
