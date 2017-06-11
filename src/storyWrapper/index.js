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
      // First get the config
      const location = `${url.protocol}//${url.hostname}:${url.port}/storybook-config.json`;
      // TODO This is a bit horrible, I'll get round to refactoring in a bit
      fetch(location).then((response) => {
        if (response.ok) {
          response.json().then((responseConfig) => {
            try {
              const config = responseConfig.storybook.versions;
              const versionsLocation = `${url.protocol}//${url.hostname}:${url.port}/${config.versionsPath}`;
              const currentVersion = '0.0.1';

              this.setState({
                currentVersion,
              });

              fetch(versionsLocation).then((versionsResponse) => {
                if (versionsResponse.ok) {
                  versionsResponse.json().then((data) => {
                    this.setState({
                      availableVersions: data,
                    });
                  });
                }
              }).catch((e) => {
                // Maybe we want to remove the div?
                console.log(e);
              });
            } catch (e) {
              // Maybe we want to remove the div?
              console.log(e);
            }
          });
        }
      }).catch((e) => {
        // Maybe we want to remove the div?
        console.log(e);
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
