import React, {PropTypes} from 'react';

export default class TestComponent extends React.Component {
  render() {
    return (
      <div>
        <p>
          <em>{this.props.email}</em>
        </p>
        <img src={this.props.src} className="img-rounded"/>
      </div>
    );
  }
}

TestComponent.propTypes = {
  email: PropTypes.string,
  src: PropTypes.string,
};