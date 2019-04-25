import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Ticker from 'react-flip-ticker';

import { Dots } from '@zendeskgarden/react-loaders';

const FirstLine = styled.p`
  opacity: 0.6;
  margin-top: 5px;
  color: #121d31;
  font-size: 11px;
  letter-spacing: 0.7px;
  font-family: 'Noto Sans', sans-serif;
`;

const SecondLine = styled.p`
  color: #121d31;
  font-weight: 600;
  margin-top: 5px;
`;

const InfoBlock = props => (
  <React.Fragment>
    <FirstLine>{props.firstLine}</FirstLine>
    {props.secondLine !== undefined && props.secondLine !== '' ? (
      <SecondLine>
        <Ticker text={props.secondLine} textClassName="text" />
      </SecondLine>
    ) : (
      <Dots style={{ marginTop: 6 }} />
    )}
  </React.Fragment>
);

InfoBlock.propTypes = {
  firstLine: PropTypes.string.isRequired,
  secondLine: PropTypes.string
};

InfoBlock.defaultProps = {
  secondLine: ''
};

export default InfoBlock;
