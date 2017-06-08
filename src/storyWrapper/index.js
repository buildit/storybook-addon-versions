import React from 'react';
import PropTypes from 'prop-types';
import Versions from '../versions';

class StoryWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentCount: 0,
      availableVersions: null,
      currentVersion: ''
    };
  }

  componentWillMount() {
    if (window && window.parent) {
      const url = window.parent.location;
      const location = `${url.protocol}//${url.hostname}:${url.port}/storybook-versions.json`;
      const currentVersion = '0.0.0';

      this.setState({
        currentVersion,
      });

      fetch(location).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            this.setState({
              availableVersions: data,
            });
          });
        }
      }).catch(() => {
        // Ignore. Maybe we want to remove the div?
      });
    }
  }

  render() {
    const {availableVersions, currentVersion} = this.state;
    return (
      <div id="versions-storyWrapper">
        <Versions availableVersions={availableVersions} currentVersion={currentVersion} />
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
