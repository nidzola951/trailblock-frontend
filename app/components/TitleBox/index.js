import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { Box } from '../../assets/global-styles/GlobalComponents';

const Title = styled.div`
  padding: 20px 30px;
  background: transparent;
  border-bottom: 1px solid #e5e8eb;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #4b5f74;
  text-transform: uppercase;
`;

const insideBoxStyles = (isInsideBox, noBorder) => ({
  border: isInsideBox && !noBorder ? '1px solid #E5E8EB' : 'none',
  boxShadow: isInsideBox ? 'none' : '',
  marginTop: isInsideBox ? '0px' : '',
  marginBottom: isInsideBox ? '0px' : ''
});

const TitleBox = props => (
  <Box style={insideBoxStyles(props.insideBox, props.noBorder)}>
    <Title>
      <FontAwesomeIcon icon={props.icon} style={{ marginRight: 10 }} />
      {props.title}
    </Title>
    <div
      style={{
        paddingTop: props.paddingTop,
        paddingBottom: props.paddingBottom,
        paddingLeft: props.paddingLeft,
        paddingRight: props.paddingRight
      }}
    >
      {props.children}
    </div>
  </Box>
);

TitleBox.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  insideBox: PropTypes.bool,
  noBorder: PropTypes.bool,
  paddingTop: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingLeft: PropTypes.number
};

TitleBox.defaultProps = {
  title: '',
  icon: {},
  children: '',
  insideBox: false,
  noBorder: false,
  paddingTop: 30,
  paddingRight: 30,
  paddingBottom: 30,
  paddingLeft: 30
};

export default TitleBox;
