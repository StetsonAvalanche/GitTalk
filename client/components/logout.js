import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Logout = () => {
  return (
    <a href='/auth/logout' className="logout"><RaisedButton label='Logout' /></a>
  );
}

export default Logout;
