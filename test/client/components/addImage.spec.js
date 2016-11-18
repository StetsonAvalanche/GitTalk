import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import AddImage from '../../../client/components/addImage.js';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

const testData = {
  publicUrl: 'https://gittalk.s3.amazonaws.com/90a5dd51-6080-4e27-ae0e-297c71dff8de_Screenshot_2016-03-26_23.16.24.png?AWSAccessKeyId=AKIAJWAMCTVZRG5PUQAA&Expires=1479430281&Signature=EIdpYk7Ik9PxD%2FoniiM63Wleg9c%3D'
};

describe('<AddImage />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => {
    return shallow(node, {
      context: {muiTheme},
      childContextTypes: {muiTheme: React.PropTypes.object}
    });
  }

  const mountWithContext = (node) => {
    return mount(node, {
      context: {muiTheme},
      childContextTypes: {muiTheme: React.PropTypes.object}
    });
  }

  it('should render one <DropzoneS3Uploader /> Component', () => {
    const wrapper = shallowWithContext(<AddImage />);
    expect(wrapper.find(DropzoneS3Uploader)).to.have.length(1);
  });

  it('should call sendMessage on upload finish', () => {
    const sendMessage = sinon.spy();
    const wrapper = mountWithContext(<AddImage sendMessage={ sendMessage } />);
    wrapper.instance().onUploadFinish(testData);
    expect(sendMessage.calledOnce).to.equal(true);
  });

});
