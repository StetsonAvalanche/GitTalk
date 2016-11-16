import React, {PropTypes} from 'react';
import User from './user';

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
  }

  render() {
    const {username, photo, channels} = this.props;

    const userStyle = { marginTop: '40px', fontWeight: 'bold' };
    const buttonStyle = { marginTop: '25px' };
    const drawerStyle = { textAlign: 'center' };
    const drawerContainerStyle = { backgroundColor: fullWhite };
    const listHeaderStyle = { color: githubBlue };
    const listItemStyle = { padding: '5px', fontStyle: 'italic', fontSize: '14px' };

    return (
      <div>
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
                return (<ListItem primaryText={channel} innerDivStyle={listItemStyle} />);
              })}
            </List>

            <RaisedButton label={'Logout'} backgroundColor={githubGreen} style={buttonStyle} />
          </div>
        </Drawer>

      </div>
    );
  }
}



export default NavBar;