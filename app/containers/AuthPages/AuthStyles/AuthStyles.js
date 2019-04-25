import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Box } from '../../../assets/global-styles/GlobalComponents';

export const CenterContainer = styled(Box)`
  position: fixed;
  top: 45%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 30px;
  margin-bottom: 0px;
  max-width: 420px;
`;

export const BoxTitle = styled.p`
  font-weight: 800;
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

export const ActionButton = styled(NavLink)`
  color: #3cbc98;
  border: none;
  padding: 0px;
  font-size: inherit;
  text-decoration: underline;
  cursor: pointer;
  background: transparent;
  text-align: center;
`;

export const ActionButtonSuccess = styled(NavLink)`
  color: #1f4938;
  border: none;
  padding: 0px;
  font-size: inherit;
  text-decoration: underline;
  cursor: pointer;
  background: transparent;
  :hover {
    color: #358866;
  }
`;

export const ActionButtonDanger = styled.button`
  color: #681319;
  border: none;
  padding: 0px;
  font-size: inherit;
  text-decoration: underline;
  cursor: pointer;
  background: transparent;
  :hover {
    color: #cc3340;
  }
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: #dcdbdb;
  margin-top: 20px;
  margin-bottom: 25px;
`;
