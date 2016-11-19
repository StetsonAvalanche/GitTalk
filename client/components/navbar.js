import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import User from './user';
import Logout from './logout';


/* Color Scheme */
import {
  githubLightGreen,
  githubGreen,
  githubBrown,
  githubBlue,
  fullWhite,
  grey200,
} from './../util/colorScheme';

/* Material-UI components */
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
// import RaisedButton from 'material-ui/RaisedButton';


/* Websocket */
import io from 'socket.io-client';
const socket = io('', { path: '/api/chat'});

class NavBar extends React.Component {
  constructor(props){
    super(props);
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
              return (<ListItem key={channel}
                        children={
                          <Link 
                            key={channel} 
                            to={`/rooms/${channel}`}
                            style={linkStyle}
                          >
                            {channel}
                          </Link>}
                        innerDivStyle={listItemStyle}
                        onClick={this.props.changeChannel}
                      />);
            })}
          </List>

          <RaisedButton label='Send Invite' disabled={this.props.inviteSent} onClick={this.props.sendEmailInvite}/>
          <br /><br />
          <Logout />
        </div>
      </Drawer>
    );
  }
}

const userStyle = { marginTop: '40px', fontWeight: 'bold' };
const buttonStyle = { marginTop: '25px' };
const drawerStyle = { textAlign: 'center' };
const drawerContainerStyle = { backgroundColor: fullWhite };
const linkStyle = { color: 'inherit', textDecoration: 'none' };
const listHeaderStyle = { color: githubBlue };
const listItemStyle = { padding: '5px', fontStyle: 'italic', fontSize: '14px' };

export default NavBar;
