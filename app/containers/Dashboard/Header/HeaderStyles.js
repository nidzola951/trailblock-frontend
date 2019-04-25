import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import LogoImg from '../../../assets/images/logo-white.png';

export const Container = styled.div`
  width: 100%;
  height: 50px;
  padding-left: 50px;
  padding-right: 50px;
  position: fixed;
  top: 0;
  left: 0;
  display: table;
  background: #082333;
  transition: 0.2s all;
  z-index: 1000;
`;

export const LeftContainer = styled.div`
  width: 125px;
  height: 50px;
  padding-top: 9px;
  display: table-cell;
`;

export const SocialContainer = styled.div`
  width: 150px;
  padding-top: 3px;
  padding-left: 3px;
  display: table-cell;
  position: relative;
  vertical-align: middle;
  :before {
    content: '';
    display: block;
    width: 1px;
    height: 30px;
    background: #9da7ae;
    opacity: 0.2;
    position: absolute;
    left: 0;
    top: 11px;
  }
`;

export const SocialButton = styled.a`
  height: 30px;
  width: 30px;
  margin-left: 5px;
  margin-right: 2px;
  font-size: 18px;
  color: white;
  opacity: 0.6;
  cursor: pointer;
  display: inline-block;
  padding: 5px;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
  svg {
    vertical-align: middle;
  }
  :hover {
    opacity: 1;
  }
`;

export const CenterContainer = styled.div`
  width: 230px;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`;

export const RightContainer = styled.div`
  width: 157px;
  vertical-align: middle;
  height: 50px;
  display: table-cell;
`;

export const Logo = styled.div`
  width: 95px;
  height: 30px;
  cursor: pointer;
  background: url(${LogoImg});
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
`;

export const Beta = styled.div`
  background-color: #3cbc98;
  color: white;
  text-transform: uppercase;
  font-size: 9px;
  letter-spacing: 0.7px;
  padding: 2px;
  padding-left: 7px;
  padding-right: 7px;
  border-radius: 3px;
  position: absolute;
  font-weight: 700;
  right: 0;
  bottom: -4px;
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 18px;
  vertical-align: middle;
  margin-top: -5px;
  margin-right: 13px;
`;

export const StyledLink = styled(NavLink)`
  color: white;
  font-weight: 600;
  text-decoration: none;
  padding: 19px 14px 15px 12px;
  margin-left: 5px;
  margin-right: 5px;
  transition: 0.2s all;
  width: auto;
  display: inline-block;
  font-size: 13px;
  margin-bottom: 3px;
  position: relative;
  opacity: 0.7;
  &.${props => props.activeClassName} {
    border-right: none;
    background: transparent;
    opacity: 1;
    color: white;
  }
  :hover {
    background: transparent;
    opacity: 1;
  }
  > svg {
    display: inline-block;
    margin-top: -2px;
    margin-right: 15px;
    font-size: 16px;
  }
`;

export const SimpleStyledLink = styled(NavLink)`
  color: white;
  font-weight: 600;
  text-decoration: none;
  padding: 13px 9px;
  margin-left: 5px;
  margin-right: 5px;
  transition: 0.2s all;
  width: auto;
  display: inline-block;
  font-size: 13px;
  margin-bottom: 3px;
  position: relative;
  &.${props => props.activeClassName} {
    border-right: none;
    background: transparent;
    opacity: 1;
    color: white;
  }
  :hover {
    background: transparent;
    > svg {
      opacity: 1;
    }
  }
  > svg {
    display: inline-block;
    margin-top: 2px;
    margin-right: 0px;
    font-size: 16px;
    opacity: 0.7;
    transition: 0.2s all;
  }
`;

export const StyledLinkButton = styled.button`
  color: white;
  font-weight: 600;
  text-decoration: none;
  padding: 13px 9px;
  padding-right: 0px;
  transition: 0.2s all;
  width: auto;
  display: inline-block;
  font-size: 14px;
  margin-bottom: 3px;
  position: relative;
  background: #082233;
  border: none;
  font-family: 'IBM Plex Sans', sans-serif;
  text-align: left !important;
  cursor: pointer;
  outline: none;
  &.${props => props.activeClassName} {
    border-right: none;
    background: transparent;
    color: white;
    > svg {
      opacity: 1;
    }
  }
  :hover {
    background: transparent;
    > svg {
      opacity: 1;
    }
  }
  > svg {
    display: inline-block;
    margin-top: 3px;
    margin-right: 0px;
    opacity: 0.7;
    transition: 0.2s all;
  }
`;

export const NotificationBadge = styled.span`
  background: #ef5350;
  color: white;
  font-weight: 600;
  border-radius: 5px;
  padding: 2px 5px;
  font-size: 11px;
  margin-left: 9px;
  position: absolute;
  top: 7px;
  left: 8px;
`;
