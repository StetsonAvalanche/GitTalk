import React, {PropTypes} from 'react';

class User extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <h1>Hello {this.props.username}!</h1>
    );
  }
}

export default User;