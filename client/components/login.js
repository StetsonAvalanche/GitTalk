import React from 'react';

/* Material-UI components */
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import NavMenuIcon from 'material-ui/svg-icons/navigation/menu';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

import Paper from 'material-ui/Paper';

//import GithubIcon from 'material-ui/svg-icons/navigation/menu';
import ChatIcon from 'material-ui/svg-icons/communication/chat';
import ExtensionIcon from 'material-ui/svg-icons/action/extension';

/* Color Scheme */
import {
  githubLightGreen,
  githubGreen,
  githubBrown,
  githubBlue,
  fullWhite,
  grey100,
  grey200,
  grey700,
} from './../util/colorScheme.js';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {

    const miniLogo = {
      verticalAlign: 'middle',
      height: 25,
    };

    const drawerStyle = {
      top: 64,
      width: 200,
    };

    const roundButtonStyle = {
      position: 'fixed',
      bottom: 80,
      right: 80,
    };

    const expandMoreStyle = {
      width: 40,
    };

    const paperStyle = {
      height: '100%',
      width: '31%',
      margin: '1%',
      textAlign: 'center',
      display: 'inline-block',
    };

    const paperTitleStyle = {
      textAlign: 'center', 
      fontFamily: 'Roboto', 
      fontSize: 25,
      fontWeight: 'normal',
    };

    const paperSubtitleStyle = {
      textAlign: 'center', 
      fontFamily: 'Roboto', 
      fontSize: 18,
      fontWeight: 'normal',
      marginLeft: 10,
      marginRight: 10,
    };

    const paperIconStyle = {
      color: githubGreen,
      width: 120,
      height: 120,
      fontSize: 120,
      textAlign: 'center',
    };

    const iconButtonStyle = {
      width: 140,
      height: 140,
    };
    
    return (
      <div>
        <AppBar
          title={<span><img src='/assets/GitTalkLogo.png' style={miniLogo} />&nbsp;&nbsp;GitTalk</span>}
          iconClassNameRight="muidocs-icon-custom-github"
          zDepth={0}

          style={{backgroundColor: fullWhite, width: '100%', position: 'fixed', }}
          titleStyle={{color: grey700, fontSize: 16,}}

          iconElementLeft={
              <IconButton onTouchTap={this.toggleDrawer}>
                <NavMenuIcon color={grey700} />
              </IconButton>}

          iconElementRight={
              <IconButton
                iconClassName="muidocs-icon-custom-github"
                iconStyle={{color: grey700,}}
                href="https://github.com/stetsonAvalanche/GitTalk" />}
        />
        <Drawer 
          open={this.state.open}
          containerStyle={drawerStyle}
          zDepth={0}
        >
          <MenuItem>GitTalk</MenuItem>
          <MenuItem>Github API Integration</MenuItem>
          <MenuItem>Repo = Chatroom</MenuItem>
          <MenuItem>Bots</MenuItem>
          <MenuItem>Search</MenuItem>
        </Drawer>
        <div style={styles.box}>
          <img src='/assets/GitTalkLogo.png' style={styles.logo}/>
          <h1 style={styles.title}>GitTalk</h1>
          <h2 style={styles.subtitle}>Talk while you Git.</h2>
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
        <div style={styles.box2}>
          <img src='/assets/GitTalkLaptop.png' style={styles.laptop}/>
          <div style={styles.titleBox2}>
            <h1 style={styles.title2}>Made by developers, for developers.</h1>
          </div>
          <div style={styles.subtitleBox2}>
            <h2 style={styles.subtitle2}>Built for rapid collaboration, GitTalk is a platform that goes beyond the conventional chat application to help you reach out to your fellow Github contributors.</h2>
          </div>
        </div>
        <div style={styles.box3}>
          <div style={styles.paperBox}>
            <Paper style={paperStyle} zDepth={0}>
              <IconButton
                iconClassName="muidocs-icon-custom-github"
                iconStyle={paperIconStyle} 
                style={iconButtonStyle}
                disableTouchRipple={true}
              />
              <div>
                <h1 style={paperTitleStyle}>GitHub API Integration</h1>
              </div>
              <div>
                <h2 style={paperSubtitleStyle}>Log in with your Github account and get immediate access to your collaborators.</h2>
              </div>
            </Paper>
            <Paper style={paperStyle} zDepth={0}>
              <IconButton style={iconButtonStyle} iconStyle={paperIconStyle} disableTouchRipple={true}>
                <ChatIcon color={paperIconStyle.color}/>
              </IconButton>
              <div>
                <h1 style={paperTitleStyle}>Repo-centric Chatrooms</h1>
              </div>
              <div>
                <h2 style={paperSubtitleStyle}>Each public Github repository is one chatroom, where all discussions are consolidated.</h2>
              </div>
            </Paper>
            <Paper style={paperStyle} zDepth={0}>
              <IconButton style={iconButtonStyle} iconStyle={paperIconStyle} disableTouchRipple={true}>
                <ExtensionIcon color={paperIconStyle.color} style={paperIconStyle} />
              </IconButton>
              <div>
                <h1 style={paperTitleStyle}>Developer Extensions</h1>
              </div>
              <div>
                <h2 style={paperSubtitleStyle}>Choose from a range of developer-contributed apps to enhance your conversations.</h2>
              </div>
            </Paper>
          </div>
        </div>
        <div style={styles.box4}>
          <p>Created by Afsoon Nickname, Chase Starr, Felicia Fong, and Tony Tan</p>
        </div>
        <FloatingActionButton 
          backgroundColor={githubGreen}
          style={roundButtonStyle}
        >
          <ExpandMoreIcon style={expandMoreStyle}/>
        </FloatingActionButton>
      </div>
    );
  }
}

const styles = {
  button: {
    position: 'absolute',
    top: 385,
    left: '51%',
  },
  logo: {
    height: 300,
    position: 'absolute',
    top: 140,
    right: '55%',
  },
  laptop: {
    height: 700,
    position: 'absolute',
    top: 420,
    right: '28%',
  },
  title: {
    position: 'absolute',
    top: 105,
    left: '45%',
    textAlign: 'center', 
    fontFamily: 'Roboto', 
    fontSize: 120,
    fontWeight: 'normal',
  },
  subtitle: {
    position: 'absolute',
    top: 285,
    left: '47%',
    textAlign: 'center', 
    fontFamily: 'Roboto', 
    fontSize: 40,
    fontWeight: 'normal',
  },
  box: {
    backgroundColor: grey100,
    height: 540,
  },
  box2: {
    backgroundColor: githubLightGreen,
    height: 480,
  },
  box3: {
    backgroundColor: grey200,
    height: 480,
  },
  box4: {
    backgroundColor: fullWhite,
    height: 90,
  },
  paperBox: {
    position: 'relative',
    top: 130,
    height: '60%',
    width: '96%',
    marginLeft: '2%',
    marginRight: '2%',
  },
  titleBox2: {
    position: 'absolute',
    top: 100 + 540,
    left: '55%',
    width: 420,
  },
  title2: {
    textAlign: 'center', 
    fontFamily: 'Roboto', 
    fontSize: 40,
    fontWeight: 'normal',
  },
  subtitleBox2: {
    position: 'absolute',
    top: 220 + 540,
    left: '54%',
    width: 420,
  },
  subtitle2: {
    textAlign: 'center', 
    fontFamily: 'Roboto', 
    fontSize: 20,
    fontWeight: 'normal',
  },
};

export default Login;
