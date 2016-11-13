import React, {PropTypes} from 'react';

class EnterMessage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  sendMessage(message) {
    const newMessage = {
      user: this.props.username,
      text: this.state.value
    };
    console.log('message sent', newMessage);
    this.props.socket.emit('new message', newMessage);
    this.setState({ value: '' });
  }

  render() {
    return (
      <div>
        <input type="text" name="text" onChange={this.handleChange} value={this.state.value} />
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}

const styles = {
};

export default EnterMessage;