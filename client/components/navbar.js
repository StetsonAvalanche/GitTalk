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
    console.log(e.target);
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
              return (<ListItem primaryText={channel} innerDivStyle={listItemStyle} onClick={this.changeChannel}/>);
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