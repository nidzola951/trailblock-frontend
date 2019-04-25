import React from 'react';
import styled from 'styled-components';

import './style.scss';

const CenterContainer = styled.div`
  position: fixed;
  top: 45%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 30px;
  margin-bottom: 0px;
  text-align: center;
  font-size: 45px;
`;

const LoadingIndicator = () => (
  <CenterContainer>
    <div className="loading-indicator">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </CenterContainer>
);

export default LoadingIndicator;
