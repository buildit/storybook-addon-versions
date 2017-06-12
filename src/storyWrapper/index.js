import React from 'react';
import PropTypes from 'prop-types';
import Versions from '../versions';

class StoryWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentCount: 0,
      availableVersions: null,
      currentVersion: '',
    };
  }

  componentWillMount() {
    if (window && window.parent) {
      const url = window.parent.location;
      const location = `${url.protocol}//${url.hostname}:${url.port}/storybook-config.json`;

      fetch(location).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            if (data && data.storybook && data.storybook.versions) {
              const storybookConfig = data.storybook.versions;
              if (storybookConfig.availableVersions) {
                this.setState({
                  availableVersions: storybookConfig.availableVersions,
                });
              }

              let currentVersion = '-';
              const path = url.pathname;
              if (path && path !== '/') {
                if (storybookConfig.regex) {
                  const r = new RegExp(storybookConfig.regex, 'i');
                  currentVersion = r.exec(path)[1];
                }
              }

              this.setState({
                currentVersion,
              });
            }
          });
        }
      }).catch(() => {
        // Ignore, we're not showing anything anyway.
      });
    }
  }

  render() {
    const { availableVersions, currentVersion } = this.state;
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
