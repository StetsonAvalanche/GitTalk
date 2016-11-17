import React from 'react';
import S3Uploader from 'react-s3-uploader';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import UploadFileIcon from 'material-ui/svg-icons/file/file-upload';
import IconButton from 'material-ui/IconButton';

class AddImage extends React.Component {
  constructor(props) {
    super(props);
  }

  onUploadFinish(data) {
    this.props.sendMessage(null, data.publicUrl);
    this.node.clear();
  }

  render() {
    return (
      <div style={ styles.container }>
        <DropzoneS3Uploader
          style={ styles.uploader }
          ref={node => (this.node = node)}
          signingUrl='/s3/sign'
          accept="image/*"
          onFinish={ this.onUploadFinish.bind(this) }
        >
          <IconButton 
            iconStyle={ styles.mediumIcon }
            style={ styles.medium }
          >
            <UploadFileIcon />
          </IconButton>
        </DropzoneS3Uploader>
      </div>
    );
  }
};

const styles = {
  container: {
    marginTop: '-58px',
    marginLeft: '10px'
  },
  uploader: {
    width: '135px',
    height: '36px'
  },
  mediumIcon: {
    width: '30px',
    height: '30px'
  },
  medium: {
    width: '60px',
    height: '60px',
    padding: '10px',
  }
}

export default AddImage;
