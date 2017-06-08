import React from 'react';
import PropTypes from 'prop-types';
import Versions from '../versions';

class StoryWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentCount: 0,
      versions: null,
    };
  }

  componentWillMount() {
    if (true && window && window.parent) {
      const url = window.parent.location;
      const location = `${url.protocol}//${url.hostname}:${url.port}/versions.json`;

      fetch(location).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            this.setState({
              versions: data,
            });
          });
        }
      }).catch(() => {
        // Ignore. Maybe we want to remove the div?
      });
    }
  }

  render() {
    return (
      <div id="versions-storyWrapper">
        <Versions availableVersions={this.state.versions} currentVersion="0.0.0" />
        <div id="versions-storyWrapper-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

StoryWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoryWrapper;
