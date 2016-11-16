import React from 'react';
import S3Uploader from 'react-s3-uploader';
import RaisedButton from 'material-ui/RaisedButton';

class AddImage extends React.Component {
  constructor(props) {
    super(props);
  }

  onUploadFinish(data) {
    this.props.sendMessage(null, data.publicUrl);
  }

  render() {
    return (
      <div style={ styles.container }>
        <S3Uploader
          signingUrl='/s3/sign'
          accept="image/*"
          onFinish={ this.onUploadFinish.bind(this) }
        />
      </div>
    );
  }
};

const styles = {
  container: {
    marginLeft: '400px',
  }
}

export default AddImage;
