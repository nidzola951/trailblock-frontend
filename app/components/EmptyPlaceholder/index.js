import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faClouds } from '@fortawesome/pro-light-svg-icons';

const Container = styled.div`
  padding: 20px;
  text-align: center;
  opacity: 0.9;
  color: #7e9aa8;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 25px;
  margin-bottom: 10px;
`;

const Title = styled.p`
  font-size: 12px;
  font-weight: 600;
`;

const EmptyPlaceholder = props => (
  <Container>
    <Icon icon={faClouds} />
    <Title>{props.title}</Title>
  </Container>
);

EmptyPlaceholder.propTypes = {
  title: PropTypes.string.isRequired
};

export default EmptyPlaceholder;
