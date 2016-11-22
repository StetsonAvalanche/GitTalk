import React from 'react';

import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';

import MyAppsItem from './myAppsItem';

const paperStyle = {
  width: '60%',
};

const headerStyle = {
  marginLeft: 15,
  fontWeight: 'bold',
};

const MyApps = (props) => <Paper style={paperStyle}>
                            <List>
                              <h8 style={headerStyle}>My Apps</h8>
                              {props.apps.map((app) =>
                                <MyAppsItem key={app.name} app={app} />
                              )}
                            </List>
                          </Paper>;

export default MyApps;