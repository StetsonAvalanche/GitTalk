import React, {PropTypes} from 'react';

/* Material-UI components */
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import FontIcon from 'material-ui/FontIcon';

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

const TopBar = (props) => {

  const { reponame } = props;

  const appBarStyle = {
    position: 'absolute',
    top: 0,
    left: 300,
    width: props.windowWidth - 300,
    backgroundColor: githubLightGreen,
  };

  const titleStyle = {
    color: fullBlack,
    fontSize: 16,
    textAlign: 'center',
  };

  return (<AppBar 
    iconElementLeft={<p></p>}
    style={appBarStyle} 
    title={`@${reponame}`}
    titleStyle={titleStyle}
    zDepth={0}
  />);
};

export default TopBar;
