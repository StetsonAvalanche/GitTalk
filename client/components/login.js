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
  }
};

const logoStyle = {
  height: 400,
  width: 'auto',
};

const Login = () => {

  return (
    <div>
      <h1>GitTalk</h1>
      <div>
        <img src='/assets/GitTalkLogo.png' style={logoStyle}/>
        <RaisedButton
		      href="/auth/github"
		      target="_blank"
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
