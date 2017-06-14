import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default class Panel extends Component {
  constructor(...args) {
    super(...args);
    this.stuff = '';
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (<div>Versions panel</div>);
  }
}

Panel.propTypes = {
  channel: PropTypes.object.isRequired,
  storybook: PropTypes.object.isRequired,
};
