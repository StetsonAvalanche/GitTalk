import React, {PropTypes} from 'react';

/* Color Scheme */
import {
  githubLightGreen,
  githubGreen,
  githubBrown,
  githubBlue,
  fullWhite,
  fullBlack,
  grey200,
  grey100
} from './../util/colorScheme.js';

/* Material-UI components */
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import FontIcon from 'material-ui/FontIcon';

const TopBar = (props) => {

  const { reponame } = props;

  const appBarStyle = {
    position: 'absolute',
    top: 0,
    left: 300,
    width: window.innerWidth - 300,
    backgroundColor: githubLightGreen,
  };

  const autocompleteStyle = {
  };

  const iconStyle = {
  };

  const titleStyle = {
    color: fullBlack,
    fontSize: 16,
  };

  return (<AppBar 
    iconElementLeft={<p></p>}
    title={`@${reponame}`}
    iconElementRight={
      <div>
        <FontIcon className="material-icons" style={iconStyle}>search</FontIcon>
        <AutoComplete hintText="search messages" dataSource={[]} />
      </div>
    }
    style={appBarStyle} titleStyle={titleStyle}
    zDepth={0}
  />);
};

export default TopBar;
