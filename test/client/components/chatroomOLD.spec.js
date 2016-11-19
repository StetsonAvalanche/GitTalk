import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Chatroom from '../../../client/components/chatroom';

describe('<Chatroom/>', function () {

  const {
    Simulate,
    createRenderer,
    getDOMNode,
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    scryRenderedDOMComponentsWithClass,
    scryRenderedDOMComponentsWithTag
  } = ReactTestUtils;
  
  
  // beforeEach(function() {
  // 	const routeParams = {username: 'myUserName', reponame: 'myRepoName'};
  //   const chatroom = renderIntoDocument(
  //     <Chatroom params={routeParams}/>
  //   );
  // });

  it('should have route parameters as props', function () {
    const routeParams = {username: 'myUserName', reponame: 'myRepoName'};
    // const wrapper = shallow(<Chatroom params={routeParams}/>);
    // expect(wrapper.props().params.username).to.be.defined;
    // expect(wrapper.props().params.userrepo).to.be.defined;


    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <Chatroom params={routeParams}/>
    );
    
    const chatroom = shallowRenderer.getRenderOutput();
    // console.log('CHATROOM PROPS', chatroom.props.children)
    // expect(chatroom.props.params.username).to.equal('myUserName');


  });

  // it('should have a link to home page', function () {
  //   // const routeParams = {username: 'myUserName', reponame: 'myRepoName'};
  //   // const wrapper = shallow(<Chatroom params={routeParams}/>);
  //   // expect(wrapper.find('Link')).to.have.length(1);
  //   // expect(wrapper.find('Link')[0].to).to.equal('/dashbpard');

  //   const routeParams = {username: 'myUserName', reponame: 'myRepoName'};
  //   const chatroom = renderIntoDocument(
  //     <Chatroom params={routeParams}/>
  //   );

  //   const links = scryRenderedDOMComponentsWithClass(chatroom, 'link-to-dashboard');
  //   expect(links).to.exist;
  //   links.forEach((link) => {
  //     console.log('linkkkkk', link[Object.keys(link)[0]]);
  //   });
  //   expect(links.getDOMNode()).toEqual('/dashboard');

  //   // expect(wrapper.find('Link').to).to.equal('/dashboard');
  // });

});
