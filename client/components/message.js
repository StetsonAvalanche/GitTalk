import React, {PropTypes} from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, text } = this.props;
    return (<li>{user}: {text}</li>);
  }
}

const styles = {
};

export default Message;