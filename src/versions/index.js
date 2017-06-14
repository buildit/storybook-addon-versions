import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const generateLink = (current, target, hostname) => {
  if (target && window && window.parent) {
    const url = window.parent.location;
    const path = url.pathname.replace(current, target);
    return `${url.protocol}//${hostname}${path}${url.search}${url.hash}`;
  }

  return '#';
};

const Versions = ({
  currentVersion,
  availableVersions,
  hostname,
}) => {
  if (!currentVersion ||
      !availableVersions ||
      (availableVersions && availableVersions.length === 0) ||
      !window || !window.parent) {
    return null;
  }

  let counter = 0;
  // We are reversing the versions array as the assumption is that
  // newer versions are appended to the bottom of the file
  return (
    <div id="addon-version-history">
      <div className="dropdown">
        <button className="dropbtn" >{currentVersion}</button>
        <div className="dropdown-content">
          {availableVersions.reverse().map(version => (
            <a
              href={generateLink(currentVersion, version, hostname)}
              target="_parent"
              key={`blabbrVersionLink${counter++}`}
            >
              {version}
            </a>))}
        </div>
      </div>
    </div>
  );
};

Versions.propTypes = {
  currentVersion: PropTypes.string,
  availableVersions: PropTypes.array,
  hostname: PropTypes.string,
};

Versions.defaultProps = {
  currentVersion: '',
  availableVersions: [],
  hostname: 'localhost',
};

export default Versions;
