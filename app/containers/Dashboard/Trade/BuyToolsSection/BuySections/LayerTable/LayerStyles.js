import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export const Title = styled.p`
  font-weight: 600;
  font-size: 12px;
`;

export const Table = styled.table`
  display: table;
  border: none;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  line-height: 1.42857;
  color: #2f3941;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const Row = styled.tr`
  display: table-row;
  border-top: 1px solid #e9ebed;
  vertical-align: top;
  box-sizing: border-box;
  :last-child {
    border-bottom: 1px solid #e9ebed;
  }
`;

export const Cell = styled.td`
  display: table-cell;
  padding: 6px 10px;
  font-size: 12px;
  box-sizing: border-box;
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 11px;
  opacity: 0.6;
  cursor: pointer;
  transition: 0.2s all;
  :hover {
    opacity: 1;
  }
`;

export const DeleteButton = styled.button`
  background: white;
  width: 20px;
  padding: 0px;
  border: none;
  outline: none;
`;
