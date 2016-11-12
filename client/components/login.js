import React from 'react';

class Login extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    return (
      <div>
        <h1>You are in Login View</h1>
        <div>
          <a href="/auth/github">Login with Github</a>
        </div>
      </div>
    )
  }
}

const styles = {
};

export default Login;
