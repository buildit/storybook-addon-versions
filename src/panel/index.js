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
    this.handleVersionClick = this.handleVersionClick.bind(this);
  }

  componentWillMount() {
    getConfig().then((data) => {
      const { availableVersions, regex, hostname, localhost } = data;
      if (availableVersions) {
        this.setState({
          availableVersions: availableVersions.reverse(),
        });
      }

      const url = this.props.location;
      let currentVersion = '';
      const path = url.pathname;
      if (path && path !== '/' && regex) {
        const r = new RegExp(regex, 'i');
        const result = r.exec(path);
        if (result && result.length > 0) {
          currentVersion = result[1];
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

  devModeChangeHandler() {
    const newVal = !this.state.showLocalhost;

    this.setState({
      showLocalhost: newVal,
    });
    this.props.storybook.setQueryParams({
      versionsDevMode: newVal,
    });
  }

  handleVersionClick(e) {
    // We need to handle clicks dynamically so we get all the correct query strings
    const { currentVersion, hostname, localhost } = this.state;
    const location = this.props.location;
    const version = e.target.value;
    const targetHost = version ? (hostname || `${location.hostname}:${location.port}`) : localhost;
    const target = generateLink(location, currentVersion, version, targetHost);
    window.parent.location = target;
  }

  render() {
    const { availableVersions, currentVersion, showLocalhost } = this.state;
    let versionsList = <p>No versions found</p>;

    if (availableVersions) {
      let keyCounter = 0;

      versionsList = availableVersions.map((version) => {
        if (currentVersion === version) {
          return (
            <span className="dark-bg with-border" key={keyCounter++}>{version}</span>
          );
        }
        return (
          <button
            key={keyCounter++}
            onClick={this.handleVersionClick}
            className="light-bg with-border"
            value={version}
          >{version}</button>
        );
      });

      if (showLocalhost) {
        versionsList.unshift(
          <button
            key={keyCounter++}
            onClick={this.handleVersionClick}
            className="light-bg with-border"
          >local dev</button>,
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
  location: PropTypes.object.isRequired,
};
