import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tick from './Tick';

const Label = styled.label`
  font-size: ${props => (props.small ? '12px' : '13px')};
  font-weight: 400;
  cursor: pointer;
  vertical-align: middle;
  color: #2f3941;
`;

export default class Checkbox extends React.PureComponent {
  handleChange = e => {
    this.props.onChange(e);
  };
  render() {
    return (
      <div style={{ display: this.props.inline ? 'inline' : 'block' }}>
        <Tick
          id={this.props.id}
          value={this.props.value}
          checked={this.props.checked}
          handleChange={this.handleChange}
          small={this.props.small}
          name={this.props.name}
          className={this.props.className}
          error={this.props.error}
        />
        <Label htmlFor={this.props.id} small={this.props.small}>
          {this.props.children}
        </Label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  id: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.string,
  className: PropTypes.string,
  small: PropTypes.bool,
  name: PropTypes.string,
  inline: PropTypes.bool
};

Checkbox.defaultProps = {
  id: '',
  value: '',
  error: '',
  className: '',
  small: false,
  name: '',
  inline: false,
  onChange: PropTypes.func
};
