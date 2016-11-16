import React from 'react';

const Login = () => {

  const logoStyle = {
    height: 400,
    width: 'auto',
  };

  return (
    <div>
      <h1>You are in Login View</h1>
      <div>
        <img src='/assets/GitTalkLogo.png' style={logoStyle}/>
        <a href="/auth/github" className="login">Login with Github</a>
      </div>
    </div>
  )
}

const styles = {
};

export default Login;
