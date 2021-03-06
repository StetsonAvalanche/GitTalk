import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import { getIndex } from './../api/search/searchRequest';
import SearchResult from './searchResult';

/* Color Scheme */
import {
  githubLightGreen,
  githubGreen,
  githubBrown,
  githubBlue,
  fullWhite,
  grey200,
} from './../util/colorScheme';

import AutoComplete from 'material-ui/AutoComplete';

class Search extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      index: {
        'gittalk': [ { type: 'message', chatroom: 'tankwan/CtCI-6th-Edition-JavaScript', image: '', text: 'Welcome to GitTalk, chat away!', userAvatarUrl: '/assets/GitTalkLogo.png', user: 'GitTalk' } ]
      },
      results: [],
      searchTerm: '',
      suggestions: [],
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
    const { username } = this.props.authUser;
    
    getIndex(username)
    .then(indexData => {
      const index = JSON.parse(indexData);
      this.setState({
        index: index,
        suggestions: Object.keys(index),
      });
    })
    .catch(err => console.log(err));

  }

  displayResults(searchTerm) {
    const { index } = this.state;
    this.setState({
      results: index[searchTerm] !== undefined ? index[searchTerm] : []
    });
  }

  handleChange(value) {
    this.setState({ searchTerm: value });
    this.displayResults(value);
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
      position: 'absolute',
      width: '100%',
      textAlign: 'center',
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

    const listStyle = {
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

    const autoCompleteFilter = (searchText, suggestions) => {
      return searchText !== '' && suggestions.indexOf(searchText.toLowerCase()) !== -1;
    };

    return (
      <div>
        <div style={searchBarStyle}>
          <AutoComplete 
            hintText={'Enter a search term :)'}
            dataSource={this.state.suggestions}
            filter={autoCompleteFilter}

            onUpdateInput={this.handleChange}

            fullWidth={true}
            style={textFieldStyle}
            hintStyle={hintTextStyle}
            inputStyle={inputStyle}
            underlineStyle={underlineStyle}
            underlineFocusStyle={underlineFocusStyle}

            listStyle={listStyle}
          />
        </div>
        <div style={messageRoomStyle} id='messageBox'>
          {this.state.results.map(message => 
            <SearchResult
              key={counter++}
              user={message.user}
              text={message.text}
              userAvatarUrl={message.userAvatarUrl}
              image={message.image}
              chatroom={message.chatroom}
            />)}
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
