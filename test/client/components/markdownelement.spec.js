import React from 'react';
import { mount, shallow, render} from 'enzyme';
import { expect } from 'chai';

import MarkdownElement from '../../../client/components/markdownelement';

describe('<MarkDownElement />', () => {
	it('should render something', () => {
		const wrapper = render(<MarkdownElement text="it works" />);
    expect(wrapper.text()).to.contain("it works");
	}); 
});

