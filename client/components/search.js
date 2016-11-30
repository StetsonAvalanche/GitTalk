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
    this.buildIndex = this.buildIndex.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateScroll = this.updateScroll.bind(this);

    // this.props.dispatch(actions.addMessages(message));
  }

  componentWillMount() {
    this.buildIndex();
  }

  componentDidUpdate() {
    this.updateScroll();
  }

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

  // Ref: http://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up
  updateScroll() {
    let element = document.getElementById('messageBox');
    element.scrollTop = element.scrollHeight;
  }

  render() {    
    let counter = 0;
    const searchBarHeight = 60;

    const searchBarStyle = {
      position: 'absolute',
      left: 300,
      top: 64,
      width: this.props.windowWidth - 300,
      height: searchBarHeight,
    };

    const hintTextStyle = {
      display: this.state.searchTerm === '' ? 'initial' : 'none',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
    };

    const textFieldStyle = {
      position: 'absolute',
      width: this.props.windowWidth - 400,
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
    };

    const inputStyle = {
      textAlign: 'center',
    };

    const underlineStyle = {
      borderColor: fullWhite,
      top: 40,
    };

    const underlineFocusStyle = {
      borderColor: githubLightGreen,
      top: 40,
    };

    const messageRoomStyle = {
      backgroundImage: 'url(/assets/chatroomBackgroundLight.png)',
      backgroundSize: 75,
      backgroundRepeat: 'repeat',
      position: 'absolute',
      left: 300,
      top: 64 + searchBarHeight,
      width: this.props.windowWidth - 300,
      height: this.props.windowHeight - 64 - searchBarHeight,
      overflow: 'auto',
    };

    return (
      <div>
        <div style={searchBarStyle}>
          <TextField
            hintText={'Enter a search term :)'}
            hintStyle={hintTextStyle}
            style={textFieldStyle}
            inputStyle={inputStyle}
            underlineStyle={underlineStyle}
            underlineFocusStyle={underlineFocusStyle}

            onChange={this.handleChange}
            value={this.state.SearchTerm}
          />
        </div>
        <div style={messageRoomStyle} id='messageBox'>
          {this.state.results.map(message => 
            <Message
              key={counter++}
              user={message.user} 
              text={message.text} 
              userAvatarUrl={message.userAvatarUrl}
              image={ message.image } />)}
        </div>
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
