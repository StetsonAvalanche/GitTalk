import React from 'react';
import marked from 'marked';

class MarkdownElement extends React.Component {
	constructor(props) {
		super(props);

		marked.setOptions({
			gfm: true,
			tables: true,
			breaks: false,
			pedantic: false,
			sanitize: true,
			smartLists: true,
			smartypants: false
		});
	}

	render() {
		const { text } = this.props;
		const html = marked(text || '');

		return (
			<div>
			<div dangerouslySetInnerHTML={{__html: html}} />
			</div>
		);
	}
}

MarkdownElement.propTypes = {
	text: React.PropTypes.string.isRequired
};

MarkdownElement.defaultProps = {
	text: ''
};

export default MarkdownElement;