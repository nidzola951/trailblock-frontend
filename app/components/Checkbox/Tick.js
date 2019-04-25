import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { faCheck } from '@fortawesome/pro-solid-svg-icons';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export const Input = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-block;
  margin: 0;
  appearance: none;
  cursor: pointer;
  border-radius: 2px;
  outline: none;
  background: ${props => (props.checked ? '#3CBC98' : 'white')};
  border: ${props => (props.checked ? '1px solid #3CBC98' : '1px solid #D8DCDE')};
  transition: background-color 0.2s ease, border-color 0.2s ease;
`;

const Container = styled.div`
  position: relative;
  width: ${props => (props.small ? '13px' : '15px')};
  height: ${props => (props.small ? '13px' : '15px')};
  margin-right: 7px;
  display: inline-block;
  vertical-align: middle;
`;

export const Check = styled(FontAwesomeIcon)`
  position: absolute;
  top: ${props => (props.small ? '51%' : '50%')};
  transform: translateY(-50%);
  margin: 0 auto;
  left: 0;
  right: 0;
  width: 10px;
  height: 12px;
  display: ${props => (props.checked ? 'block' : 'none')};
  fill: none;
  color: #ffffff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  cursor: pointer;
  zoom: ${props => (props.small ? '0.7' : '0.8')};
`;

const Tick = props => (
  <Container small={props.small}>
    <Input
      type="checkbox"
      value={props.value}
      checked={props.checked}
      id={props.id}
      className={props.className}
      error={props.error}
      onChange={props.handleChange}
      name={props.name}
    />
    <label htmlFor={props.id} style={{ verticalAlign: 'middle' }}>
      <Check icon={faCheck} checked={props.checked} small={props.small ? 1 : 0} />
    </label>
  </Container>
);

Tick.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  small: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string
};

Tick.defaultProps = {
  className: '',
  error: '',
  name: ''
};

export default Tick;
