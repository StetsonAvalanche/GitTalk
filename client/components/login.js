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

import SmoothScroll from 'smooth-scroll';
import ScrollBehavior from 'scroll-behavior';

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
      currentTag: '#gittalk',
      scrolling: false,
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.moveToAnchor = this.moveToAnchor.bind(this);
    this.moveToGitTalk = this.moveToGitTalk.bind(this);
    this.moveToForDevs = this.moveToForDevs.bind(this);
    this.moveToFeatures = this.moveToFeatures.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.preventDefault = this.preventDefault.bind(this);
    this.controlBehaviorForScrollKeys = this.controlBehaviorForScrollKeys.bind(this);
    this.controlBehaviorForScroll = this.controlBehaviorForScroll.bind(this);
    this.enableScroll = this.enableScroll.bind(this);
    this.disableScroll = this.disableScroll.bind(this);
  }

  componentDidMount() {
    SmoothScroll.init({
      selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
      selectorHeader: null, // Selector for fixed headers (must be a valid CSS selector) [optional]
      speed: 500, // Integer. How fast to complete the scroll in milliseconds
      easing: 'easeInOutQuad', // Easing pattern to use
      offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
      callback: function ( anchor, toggle ) {} // Function to run after scrolling
    });    

    this.disableScroll();
  }

  componentWillUnmount() {
    this.enableScroll();
  }

  preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;  
  }

  controlBehaviorForScrollKeys(e) {
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    const keys = {37: 'left', 38: 'up', 39: 'right', 40: 'down', 
                  32: 'spacebar', 33: 'pageup', 34: 'pagedown', 35: 'end', 36: 'home'};
    if (keys[e.keyCode]) {
        this.preventDefault(e);
        if (keys[e.keyCode] === 'down' || keys[e.keyCode] === 'pagedown' || keys[e.keyCode] === 'spacebar') {
          this.moveDown();
        }
        if (keys[e.keyCode] === 'up' || keys[e.keyCode] === 'pageup') {
          this.moveUp();
        }
        if (keys[e.keyCode] === 'home') {
          this.moveToGitTalk();
        }
        if (keys[e.keyCode] === 'end') {
          this.moveToFeatures();
        }
        return false;
    }
  }

  controlBehaviorForScroll(e) {
    // moveUp: negative deltaY
    // moveDown: positive deltaY
    this.preventDefault(e);
    if (this.state.scrolling === false) {
      this.setState({ scrolling: true });
      if (e.deltaY < 0) {
        this.moveUp();
      } else if (e.deltaY > 0) {
        this.moveDown();
      }
      setTimeout(() => {
        this.setState({ scrolling: false });
      }, 1800);
    }
    return false;
  }

  disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', this.preventDefault, false);
    window.onwheel = this.preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = this.controlBehaviorForScroll; // older browsers, IE
    window.ontouchmove  = this.controlBehaviorForScroll; // mobile
    document.onkeydown  = this.controlBehaviorForScrollKeys;
  }

  enableScroll() {
      if (window.removeEventListener)
          window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
      window.onmousewheel = document.onmousewheel = null; 
      window.onwheel = null; 
      window.ontouchmove = null;  
      document.onkeydown = null;  
  }

  toggleDrawer() {
    this.setState({
      open: !this.state.open,
    });
  }

  moveToAnchor(id) {
    const anchor = document.querySelector(id);
    SmoothScroll.animateScroll(anchor);
  }

  moveUp() {
    if (this.state.currentTag === '#fordevs') {
      this.moveToGitTalk();
    } else if (this.state.currentTag === '#features') {
      this.moveToForDevs();
    }
  }

  moveDown() {
    if (this.state.currentTag === '#gittalk') {
      this.moveToForDevs();
    } else if (this.state.currentTag === '#fordevs') {
      this.moveToFeatures();
    }
  }

  moveToGitTalk() {
    this.moveToAnchor('#gittalk');
    this.setState({currentTag: '#gittalk'});
  }

  moveToForDevs() {
    this.moveToAnchor('#fordevs');
    this.setState({currentTag: '#fordevs'});
  }

  moveToFeatures() {
    this.moveToAnchor('#features');
    this.setState({currentTag: '#features'});
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
      width: 290,
      margin: '1%',
      textAlign: 'center',
      display: 'inline-block',
      top: 0,
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
      marginTop: 0,
      marginBottom: 0,
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

    const aTagStyle = {
      textDecoration: 'none',
      cursor: 'auto',
      color: grey700,
    };
    
    return (
      <div>
        <AppBar
          title={<span><img src='/assets/GitTalkLogo.png' style={miniLogo} />&nbsp;&nbsp;GitTalk</span>}
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
          <MenuItem onTouchTap={this.moveToGitTalk}>GitTalk</MenuItem>
          <MenuItem onTouchTap={this.moveToForDevs}>For Devs</MenuItem>
          <MenuItem onTouchTap={this.moveToFeatures}>Features</MenuItem>
        </Drawer>
        <div style={styles.box} id="gittalk">
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
        <div style={styles.box2} id="fordevs">
          <img src='/assets/GitTalkLaptop.png' style={styles.laptop}/>
          <div style={styles.titleBox2}>
            <h1 style={styles.title2}>Made by developers, for developers.</h1>
          </div>
          <div style={styles.subtitleBox2}>
            <h2 style={styles.subtitle2}>Built for rapid collaboration, GitTalk is a platform that goes beyond the conventional chat application to help you reach out to your fellow Github contributors.</h2>
          </div>
        </div>
        <div style={styles.box3} id="features">
          <div style={styles.titleBox3}>
            <h1 style={styles.title3}>Github-centric, Rapid, Flexible</h1>
          </div>
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
                <h1 style={paperTitleStyle}>Repo-based Chatrooms</h1>
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
          <div style={styles.subtitleBox4}>
            <h2 style={styles.subtitle4}>Built by <a style={aTagStyle} href='https://github.com/anicknam'>Afsoon Nicknam</a>, <a style={aTagStyle} href='https://github.com/chasestarr'>Chase Starr</a>, <a style={aTagStyle} href='https://github.com/f-fong'>Felicia Fong</a>, and <a style={aTagStyle} href='https://github.com/tankwan'>Tony Tan</a></h2>
          </div>
        </div>
        <FloatingActionButton 
          backgroundColor={githubGreen}
          style={roundButtonStyle}
          onTouchTap={this.moveDown}
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
    height: 105,
  },
  paperBox: {
    position: 'relative',
    top: 120,
    height: 290,
    width: '96%',
    marginLeft: '2%',
    marginRight: '2%',
    textAlign: 'center',
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
  titleBox3: {
    position: 'absolute',
    top: 100 + 540 + 390,
    width: '100%',
  },
  title3: {
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
  subtitleBox4: {
    position: 'absolute',
    top: 220 + 540 + 540 + 220,
    width: '100%',
  },
  subtitle4: {
    textAlign: 'center', 
    fontFamily: 'Roboto', 
    fontSize: 20,
    fontWeight: 'normal',
  },
};

export default Login;
