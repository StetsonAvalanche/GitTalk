import React from 'react';

import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';

import MyAppsItem from './myAppsItem';

import { getUserApps } from './../api/app/appRequest.js';

class MyApps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      apps: [
        { name: 'Olegbot', apiKey: '4456789retyu' },
        { name: 'Fredbot', apiKey: '4rtyuioetyuf' },
      ]
    };
  }

  componentDidMount() {
    getUserApps()
    .then(userApps => this.setState({ apps: JSON.parse(userApps)}))
    .catch(err => console.log('err', err));
  }

  render() {

    const paperStyle = {
      width: '60%',
    };

    const headerStyle = {
      marginLeft: 15,
      fontWeight: 'bold',
    };

    return (<Paper style={paperStyle}>
              <List>
                <h8 style={headerStyle}>My Apps</h8>
                {this.state.apps.map((app) =>
                  <MyAppsItem key={app.name} app={app} />
                )}
              </List>
            </Paper>);
  }
}

export default MyApps;