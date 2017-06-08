import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Versions = ({
  currentVersion,
  availableVersions,
}) => {
  if (!currentVersion ||
      !availableVersions ||
      (availableVersions && availableVersions.length === 0) ||
      !window || !window.parent) {
    return null;
  }

  const url = window.parent.location;
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
              href={`${url.protocol}//${url.hostname}:${url.port}/${version}/${url.search}${url.hash}`}
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
};

Versions.defaultProps = {
  currentVersion: '',
  availableVersions: [],
};

export default Versions;
