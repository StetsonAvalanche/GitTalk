import React from 'react';
import S3Uploader from 'react-s3-uploader';
import RaisedButton from 'material-ui/RaisedButton';

const onUploadFinish = function() {
  console.log('upload finish');
}

const AddImage = function(props) {
  return (
    <div style={ styles.container }>
      <S3Uploader
        signingUrl='/s3/sign'
        accept="image/*"
        onFinish={ onUploadFinish }
      />
    </div>
  );
};

const styles = {
  container: {
    marginLeft: '400px',
  }
}

export default AddImage;
