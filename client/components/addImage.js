import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const AddImage = function(props) {
  return (
    <div style={ styles.container }>
      <input 
        type="file" 
        accept="image/*" 
        capture="camera" 
        name="userPhoto" 
        onChange={() => {}} 
      />
    </div>
  );
};

const styles = {
  container: {
    marginLeft: '400px',
    marginRight: '20px'
  }
}

export default AddImage;
