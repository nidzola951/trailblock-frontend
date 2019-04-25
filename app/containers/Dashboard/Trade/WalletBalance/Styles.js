import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export const Container = styled('div')`
  font-size: 12px;
  margin-bottom: 12px;
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 14px;
  vertical-align: middle;
  margin-top: -3px;
  margin-right: 9px;
`;

export const ButtonLink = styled('button')`
  color: #3cbc98;
  border: none;
  font-size: inherit;
  padding: 0px;
  cursor: pointer;
  line-height: 12px;
  margin-left: 7px;
  margin-right: 3px;
  background: white;
`;
