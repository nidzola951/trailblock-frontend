import styled from 'styled-components';
import { Row } from '@zendeskgarden/react-tables';

export const TableRowContainer = styled(Row)`
  :hover {
    background-color: #f7f9f9 !important;
  }
`;

export const TransparentTR = styled(Row)`
  border-top: none !important;
  :hover {
    background-color: transparent;
  }
`;

export const MoreInfoContainer = styled.div`
  width: 100%;
  background-color: transparent;
  display: ${props => (props.show ? 'block' : 'none')};
  opacity: ${props => (props.show ? 1 : 0)};
  padding: ${props => (props.show ? '10px 40px' : 0)};
`;

export const TableContainer = styled.div`
  border: 2px solid #dddfe2e8;
  border-radius: 3px;
  margin-bottom: 10px;
  padding: 5px;
`;

export const TableContainerTitle = styled.p`
  color: #3f566c;
  letter-spacing: 0.4px;
  font-size: 12px;
  text-transform: uppercase;
  text-align: left;
  font-weight: 600;
  padding: 10px;
  border-bottom: 2px solid #dddfe2e8;
`;

export const MoreInfoButton = styled.button`
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
`;

export const Title = styled.p`
  color: #3f566c;
  display: inline-block;
  width: 120px;
  letter-spacing: 0.4px;
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
  text-transform: uppercase;
  text-align: left;
  vertical-align: top;
`;

export const Description = styled.div`
  padding: 10px;
  padding-top: 12px;
`;

export const StatusTag = styled.span`
  background: ${props => props.background};
  color: white;
  padding: 2px 0px;
  border-radius: 2px;
  font-weight: 600;
`;

export const SimpleTag = styled(StatusTag)`
  background: transparent;
  color: #636262;
`;

export const SuccessStatusTag = styled(StatusTag)`
  color: #3cbb98;
`;

export const BadStatusTag = styled(StatusTag)`
  color: #ef5350;
`;
