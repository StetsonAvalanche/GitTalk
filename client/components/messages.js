import React, {PropTypes} from 'react';

import Message from './message';
import EnterMessage from './entermessage';

class Messages extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [
        { user: 'Chase', text: 'Wazzup :)', id: 1},
        { user: 'Afsoon', text: 'I want ice cream', id: 2},
        { user: 'Felicia', text: 'Snack Reactor', id: 3},
        { user: 'Tony', text: 'I wanna nap', id: 4}
      ],
      messageid: 5
    };

    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(message){
    this.setState({
      messages: [...this.state.messages, { user: message.user, text: message.text, id: this.state.messageid }],
      messageid: this.state.messageid + 1
    });
  }

  render(){
    return (
      <div>
        <h1>Messages!</h1>
        <ul>
          {this.state.messages.map(message => <Message key={message.id} user={message.user} text={message.text} />)}
        </ul>
        <EnterMessage username={this.props.username} addMessage={this.addMessage}/>
      </div>
    );
  }
}

const styles = {
};

export default Messages;