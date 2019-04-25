import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Tooltip = styled.div`
  background: #092232;
  border-radius: 3px;
  color: white;
  padding: 7px 13px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  font-size: 13px;
  p {
    line-height: 16px;
  }
`;

const Title = styled.span`
  font-weight: 600;
`;

const CustomTooltip = props => {
  const { active } = props;

  if (active) {
    const { payload, label, title } = props;
    return (
      <Tooltip>
        <p>
          <Title>Date: </Title>
          {label}
        </p>
        <p>
          <Title>{title}: </Title>
          {payload ? payload[0].value : 'NaN'} {props.symbol}
        </p>
      </Tooltip>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
  title: PropTypes.string,
  symbol: PropTypes.string
};

CustomTooltip.defaultProps = {
  active: false,
  payload: [],
  label: '01/01/01',
  title: 'Title',
  symbol: 'BTC'
};

export default CustomTooltip;
