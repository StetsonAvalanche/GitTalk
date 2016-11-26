import React, {PropTypes} from 'react';
import {Link} from 'react-router';

/* Material-UI components */
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import ActionHome from 'material-ui/svg-icons/action/home';

/* Color Scheme */
import {
  githubLightGreen,
  githubGreen,
  githubBrown,
  githubBlue,
  fullWhite,
  grey200,
} from './../util/colorScheme.js';


class User extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const {username, photo, style} = this.props;
    const nameStyle = { color: 'inherit', textDecoration: 'none' };

    return (
      <div style={nameStyle}>
        <div style={style}>
          <Avatar src={photo} size={120}/>
          <p>{username}</p><Link to="/dashboard"><ActionHome /></Link>
        </div>
      </div>
    );
  }
}

export default User;