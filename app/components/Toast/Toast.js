import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes, faTimesCircle } from '@fortawesome/pro-regular-svg-icons';

const Container = styled.div`
  width: 400px;
  background: #092232;
  padding: 25px 30px;
  color: white;
  border-radius: 4px;
  box-shadow: 0px 4px 18px 0px rgba(0, 0, 0, 0.36);
  font-size: 14px;
  vertical-align: middle;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  font-size: 18px;
  vertical-align: middle;
  display: inline-block;
`;

const DismissButton = styled.button`
  position: absolute;
  background: #092232;
  top: 2px;
  right: 0;
  border: none;
  font-size: 11px;
  cursor: pointer;
  opacity: 0.6;
  :focus {
    outline: none;
  }
  :hover {
    opacity: 1;
  }
`;

const Toast = props => (
  <Container>
    {props.success && <Icon icon={faCheckCircle} style={{ color: '#3CBC98' }} />}
    {props.error && <Icon icon={faTimesCircle} style={{ color: '#DE0909' }} />}
    <p style={{ verticalAlign: 'middle', display: 'inline-block' }}>{props.children}</p>
    <DismissButton onClick={props.dismiss}>
      <FontAwesomeIcon icon={faTimes} style={{ color: 'white' }} />
    </DismissButton>
  </Container>
);

Toast.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  dismiss: PropTypes.func.isRequired,
  success: PropTypes.bool,
  error: PropTypes.bool
};

Toast.defaultProps = {
  children: '',
  success: false,
  error: false
};

export default Toast;
