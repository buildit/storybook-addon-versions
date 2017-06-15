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
      showLocalhost: false,
    };

    this.devModeChangeHandler = this.devModeChangeHandler.bind(this);
  }

  componentWillMount() {
    getConfig().then((data) => {
      const { availableVersions, regex, hostname, localhost } = data;
      if (availableVersions) {
        this.setState({
          availableVersions,
        });
      }

      const url = window.parent.location;
      let currentVersion = '';
      const path = url.pathname;
      if (path && path !== '/' && regex) {
        const r = new RegExp(regex, 'i');
        currentVersion = r.exec(path)[1];
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
  }

  render() {
    const { availableVersions, currentVersion, hostname, showLocalhost, localhost } = this.state;
    let versionsList = <p>No versions found</p>;
    let keyCounter = 0;
    if (availableVersions) {
      versionsList = availableVersions.map((version) => {
        if (currentVersion === version) {
          return (
            <span>{version}</span>
          );
        }
        return (
          <a key={keyCounter++} href={generateLink(currentVersion, version, hostname)}>{version}</a>
        );
      });

      if (showLocalhost) {
        versionsList.unshift(
          <a key={keyCounter++} href={generateLink(currentVersion, '', localhost)}>local dev</a>
        );
      }
    }

    return (
      <div className="versions-panel-container">
        <input
          type="checkbox"
          id="versionsAddonDevMode"
          onChange={this.devModeChangeHandler}
        />
        <label htmlFor="versionsAddonDevMode">Developer mode</label>
        <div className="versions-panel-list">{ versionsList }</div>
      </div>
    );
  }
}

Panel.propTypes = {
  channel: PropTypes.object.isRequired,
  storybook: PropTypes.object.isRequired,
};
