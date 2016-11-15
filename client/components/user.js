import React, {PropTypes} from 'react';

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

    return (
      <div style={style}>
        <Avatar src={photo} size={120}/>
        <p>{username}</p>
      </div>
    );
  }
}

export default User;