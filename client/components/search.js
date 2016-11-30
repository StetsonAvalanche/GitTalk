import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import { getAllMessages } from './../api/search/searchRequest';
import Message from './message';

/* Color Scheme */
import {
  githubLightGreen,
  githubGreen,
  githubBrown,
  githubBlue,
  fullWhite,
  grey200,
} from './../util/colorScheme';

import TextField from 'material-ui/TextField';

class Search extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      index: {
        'gittalk': [ { type: 'message', chatroom: 'tankwan/CtCI-6th-Edition-JavaScript', image: '', text: 'Welcome to GitTalk, chat away!', userAvatarUrl: '/assets/GitTalkLogo.png', user: 'GitTalk' } ]
      },
      results: [],
      searchTerm: ''
    };

    /* this binding of methods */
    this.updateScroll = this.updateScroll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.buildIndex = this.buildIndex.bind(this);

    // this.props.dispatch(actions.addMessages(message));
  }

  componentWillMount() {
    this.buildIndex();
  }

  componentDidUpdate() {
    this.updateScroll();
  }

  // Ref: http://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up
  updateScroll() {
    let element = document.getElementById('messageBox');
    element.scrollTop = element.scrollHeight;
  }

  /* fetch all messages from DB */
  buildIndex() {
    const genIndex = (messages) => {
      let index = {};
      messages.forEach((message) => {
        if (typeof message.text === 'string') {
          let words = message.text.split(' ');
          words.forEach((word) => {
            if (index[word] === undefined) {
              index[word] = [message];
            } else {
              index[word] = index[word].concat([message]);
            }
          });
        }
      });
      return index;
    };

    const { username } = this.props.authUser;
    getAllMessages(username)
    .then(messagesData => {
      const messages = JSON.parse(messagesData);
      let index = genIndex(messages);
      this.setState({
        index: index
      });
      console.log('built index!', index);
    })
    .catch(err => console.log(err));
  }
  
  displayResults(searchTerm) {
    const { index } = this.state;
    if (index[searchTerm] !== undefined) {
      this.setState({
        results: index[searchTerm]
      });
    } else {
      this.setState({
        results: []
      });      
    }
  }
  
  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
    this.displayResults(event.target.value);
  }

  render() {    
    let counter = 0;

    const messageRoomStyle = {
      backgroundImage: 'url(/assets/chatroomBackgroundLight.png)',
      backgroundSize: 75,
      backgroundRepeat: 'repeat',
      position: 'absolute',
      left: 300,
      top: 64,
      width: this.props.windowWidth - 300,
      height: this.props.windowHeight - 64,
      overflow: 'auto',
    };

    const textFieldStyle = {
      position: 'absolute',
      top: 100,
      width: this.props.windowWidth - 450,
    };

    const underlineStyle = {
      borderColor: 'black', //fullWhite
    };

    const underlineFocusStyle = {
      borderColor: githubLightGreen,
    };

    return (
      <div style={messageRoomStyle} id='messageBox'>
        <TextField
          hintText='Enter a search term :)'
          style={textFieldStyle}
          underlineStyle={underlineStyle}
          underlineFocusStyle={underlineFocusStyle}

          onChange={this.handleChange}
          value={this.state.SearchTerm}
        />

        {this.state.results.map(message => 
          <Message 
            key={counter++}
            user={message.user} 
            text={message.text} 
            userAvatarUrl={message.userAvatarUrl}
            image={ message.image } />)}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        repos: state.repos,
        messages: state.messages,
        authUser: state.authUser
    };
}

export default connect(mapStateToProps)(Search);
