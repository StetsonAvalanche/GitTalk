import React, {PropTypes} from 'react';

class Chatroom extends React.Component {
  constructor(props){
    super(props);
  }

  render () {
    return (
      <div>
          <h1>Hello {this.props.params.username}!</h1>
          <h2>This is your {this.props.params.reponame} Chatroom</h2>

          <Link to="/dashboard" className="link-to-dashboard">Home</Link>
        </div>
      );
  }
}

const styles = {
};

export default Chatroom;