import React from 'react';
import PropTypes from 'prop-types';
import '@zendeskgarden/react-grid/dist/styles.css';

export default class Auth extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.actions.init();
  }
  render() {
    return null;
  }
}
