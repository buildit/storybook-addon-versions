import React from 'react';
import PropTypes from 'prop-types';
import getConfig from '../utils/config';
import Versions from '../versions';

class StoryWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentCount: 0,
      availableVersions: null,
      currentVersion: '',
      hostname: '',
    };
  }

  componentWillMount() {
    getConfig().then((data) => {
      const { availableVersions, regex, hostname } = data;
      if (availableVersions) {
        this.setState({
          availableVersions,
        });
      }

      const url = window.parent.location;
      let currentVersion = '-';
      const path = url.pathname;
      if (path && path !== '/' && regex) {
        const r = new RegExp(regex, 'i');
        currentVersion = r.exec(path)[1];
      }

      this.setState({
        currentVersion,
        hostname,
      });
    }).catch(() => {
      // Ignore, we're not showing anything anyway.
    });
  }

  render() {
    const { availableVersions, currentVersion, hostname } = this.state;
    return (
      <div id="versions-storyWrapper">
        <Versions
          availableVersions={availableVersions}
          currentVersion={currentVersion}
          hostname={hostname}
        />
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
