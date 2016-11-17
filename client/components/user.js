import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import FontIcon from 'material-ui/FontIcon';

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

class User extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const {username, photo, style} = this.props;
    const nameStyle = { color: 'inherit', textDecoration: 'none' };

    return (
      <Link style={nameStyle} to="/dashboard">
        <div style={style}>
          <Avatar src={photo} size={120}/>
          <p>{username}</p>
        </div>
      </Link>
    );
  }
}

export default User;