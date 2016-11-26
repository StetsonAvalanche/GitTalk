import React from 'react';

/* Material-UI components */
import RaisedButton from 'material-ui/RaisedButton';

const Logout = () => (
    <a href='/auth/logout' className="logout"><RaisedButton label='Logout' /></a>
);

export default Logout;
