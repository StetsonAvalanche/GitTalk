import React, {PropTypes} from 'react';
import User from './user';
import Logout from './logout.js';

/* Color Scheme */
import {
  githubLightGreen,
  githubGreen,
  githubBrown,
  githubBlue,
  fullWhite,
  grey200,
} from './../util/colorScheme.js';

/* Material-UI components */
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

class NavBar extends React.Component {
  constructor(props){
    super(props);

    this.changeChannel = this.changeChannel.bind(this);
  }

  changeChannel(e) {
    let reponame;
    // hack to obtain repo name regardless of click position on ListItem
    if (e.target.innerHTML.slice(0, 5) === '<div>') {
      var length = e.target.innerHTML.length;
      reponame = e.target.innerHTML.slice(5, length - 6);
    } else {
      reponame = e.target.innerHTML;
    }
    
  }

  render() {
    const {username, photo, channels} = this.props;
    return (
      <Drawer
        docked={true}
        width={300}
        style={drawerStyle}
        containerStyle={drawerContainerStyle}
      >
        <div>
          <User username={username} photo={photo} style={userStyle} />

          <h8 style={listHeaderStyle}>Channels</h8>
          <List>
            {channels.map((channel) => {
              return (<ListItem children={<div>{channel}</div>} innerDivStyle={listItemStyle} onClick={this.changeChannel} />);
            })}
          </List>

          <RaisedButton label={'Logout'} backgroundColor={githubGreen} href='/auth/logout' style={buttonStyle} />
        </div>
      </Drawer>
    );
  }
}

const userStyle = { marginTop: '40px', fontWeight: 'bold' };
const buttonStyle = { marginTop: '25px' };
const drawerStyle = { textAlign: 'center' };
const drawerContainerStyle = { backgroundColor: fullWhite };
const listHeaderStyle = { color: githubBlue };
const listItemStyle = { padding: '5px', fontStyle: 'italic', fontSize: '14px' };


export default NavBar;
