import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {
  githubLightGreen,
  githubGreen,
  githubBrown,
  githubBlue,
  fullWhite,
  grey200,
} from './../util/colorScheme.js';

const styles = {
  button: {
    margin: 12,
  },
  logo: {
    height: 300,
    width: 'auto',
    display: 'block',
    margin: 'auto',
  },
  title: {
    textAlign: 'center', 
    fontFamily: 'Roboto', 
    fontSize: 48,
  },
  box: {
    backgroundColor: fullWhite,
  }
};


const Login = () => {

  return (
    <div style={styles.box}>
      <img src='/assets/GitTalkLogo.png' style={styles.logo}/>
      <h1 style={styles.title}>GitTalk</h1>
      <div style={{textAlign: 'center'}}>
        <RaisedButton 
          className="raised-button"
		      href="/auth/github"
		      label="Login with GitHub"
		      secondary={false}
		      style={styles.button}
		      icon={<FontIcon className="muidocs-icon-custom-github" />}
		      backgroundColor="#8cc665"
		      labelColor="white"
    		/>
      </div>
    </div>
  )

};

export default Login;
