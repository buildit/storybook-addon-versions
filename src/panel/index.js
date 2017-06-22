import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getConfig from '../utils/config';
import generateLink from '../utils/generateLink';
import './styles.css';

export default class Panel extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      availableVersions: null,
      currentVersion: '',
      hostname: '',
      localhost: '',
      showLocalhost: (this.props.storybook.getQueryParam('versionsDevMode') === 'true'),
    };

    this.devModeChangeHandler = this.devModeChangeHandler.bind(this);
  }

  componentWillMount() {
    getConfig().then((data) => {
      const { availableVersions, regex, hostname, localhost } = data;
      if (availableVersions) {
        this.setState({
          availableVersions: availableVersions.reverse(),
        });
      }

      const url = window.parent.location;
      let currentVersion = '';
      const path = url.pathname;
      if (path && path !== '/' && regex) {
        const r = new RegExp(regex, 'i');
        const result = r.exec(path);
        if (result && result.length > 0) {
          currentVersion = r.exec(path)[1];
        }
      }

      this.setState({
        currentVersion,
        hostname,
        localhost,
      });
    }).catch(() => {
      // Ignore, we're not showing anything anyway.
    });
  }

  devModeChangeHandler(event) {
    this.setState({
      showLocalhost: event.target.checked,
    });
    this.props.storybook.setQueryParams({
      versionsDevMode: event.target.checked,
    });
  }

  render() {
    const { availableVersions, currentVersion, hostname, showLocalhost, localhost } = this.state;
    let versionsList = <p>No versions found</p>;
    let keyCounter = 0;
    const location = window.parent.location;

    if (availableVersions) {
      versionsList = availableVersions.map((version) => {
        if (currentVersion === version) {
          return (
            <span className="dark-bg with-border">{version}</span>
          );
        }
        return (
          <a
            key={keyCounter++}
            href={generateLink(location, currentVersion, version, hostname)}
            className="light-bg with-border"
          >{version}</a>
        );
      });

      if (showLocalhost) {
        versionsList.unshift(
          <a
            key={keyCounter++}
            href={generateLink(location, '', '', localhost)}
            className="light-bg with-border"
          >local dev</a>,
        );
      }
    }

    return (
      <div className="versions-panel-container">
        <label htmlFor="versionsAddonDevMode"><input
          type="checkbox"
          id="versionsAddonDevMode"
          checked={showLocalhost}
          onChange={this.devModeChangeHandler}
        /> Developer mode</label>
        <div className="versions-panel-list">{versionsList}</div>
      </div>
    );
  }
}

Panel.propTypes = {
  // channel: PropTypes.object.isRequired,
  storybook: PropTypes.object.isRequired,
};
