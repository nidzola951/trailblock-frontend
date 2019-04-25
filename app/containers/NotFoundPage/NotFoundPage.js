import React from 'react';
import styled from 'styled-components';

const CenterContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function NotFound() {
  return (
    <CenterContainer>
      <h1>404 | Page not found.</h1>
    </CenterContainer>
  );
}
