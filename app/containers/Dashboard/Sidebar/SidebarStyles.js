import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import LogoImg from '../../../assets/images/logo-white.png';

export const Container = styled.div`
  width: 210px;
  height: 100%;
  position: fixed;
  top: 0;
  background: #082333;
  left: 0;
  transition: 0.2s all;
  z-index: 1000;
`;

export const InnerContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`;

export const Logo = styled.div`
  width: 110px;
  height: 41px;
  margin: 0 auto;
  margin-top: 15px;
  cursor: pointer;
  margin-bottom: 12px;
  background: url(${LogoImg});
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
`;

export const Beta = styled.div`
  background-color: #3cbc98;
  color: white;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0.7px;
  padding: 2px;
  padding-left: 7px;
  padding-right: 7px;
  border-radius: 3px;
  position: absolute;
  font-weight: 700;
  right: 0;
  bottom: 3px;
`;

export const Ul = styled.ul`
  margin-bottom: 16px;
`;

export const Li = styled.li`
  position: relative;
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
  padding: 17px 30px 14px 30px;
  transition: 0.2s all;
  width: 100%;
  display: block;
  font-size: 14px;
  margin-bottom: 3px;
  position: relative;
  &.${props => props.activeClassName} {
    border-right: none;
    background: #0c344b;
    color: white;
  }
  :hover {
    background: #0c344b;
  }
  > svg {
    display: inline-block;
    margin-top: -2px;
    margin-right: 15px;
  }
`;

export const StyledLinkButton = styled.button`
  color: white;
  font-weight: 600;
  text-decoration: none;
  padding: 17px 30px 14px 30px;
  transition: 0.2s all;
  width: 100%;
  display: block;
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
    background: #0c344b;
    color: white;
  }
  :hover {
    background: #0c344b;
  }
  > svg {
    display: inline-block;
    margin-top: -2px;
    margin-right: 15px;
  }
`;

export const SocialContainer = styled.div`
  height: 40px;
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
`;

export const SocialButton = styled.a`
  height: 35px;
  width: 40px;
  margin-left: 5px;
  margin-right: 5px;
  font-size: 20px;
  color: white;
  opacity: 0.6;
  cursor: pointer;
  display: inline-block;
  padding: 5px;
  transition: 0.2s all;
  svg {
    vertical-align: middle;
  }
  :hover {
    opacity: 1;
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
`;
