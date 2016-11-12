// import react
import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// import test utils
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';

chai.use(chaiEnzyme());

// components
import App from '../../../client/components/app';
import Chatroom from '../../../client/components/chatroom';

// expect app to have chatroom component
// expect chatroom to have nav bar
// expect chatroom to have usercomponent in nav bar
// expect there to be a messages component
// expect there to be an input box