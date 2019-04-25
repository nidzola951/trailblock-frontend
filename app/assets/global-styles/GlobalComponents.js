import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export const Box = styled.div`
  width: 100%;
  background: white;
  margin-top: 15px;
  margin-bottom: 48px;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  box-shadow: rgba(12, 52, 75, 0.07) 0px 1px 1px;
`;

export const ChartBox = styled.div`
  width: 100%;
  background: white;
  margin-bottom: 15px;
  border-radius: 4px;
  height: 558px;
`;

export const Title = styled.h2`
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  margin: 0px 0px 0px 16px;
  color: #3e556b;
`;

export const InnerTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  margin-top: 10px;
  color: #121d31;
`;

export const TitleIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
  vertical-align: middle;
  margin-top: -3px;
  margin-right: 12px;
  color: rgb(126, 154, 168);
`;

export const TabButton = styled.button`
  width: 100%;
  border: none;
  background: none;
  font-size: 14px;
  color: ${props => (props.active ? '#092232' : '#839eab')};
  background: ${props => props.active && '#EFF3F5'};
  background: ${props => props.noBackground && 'none'};
  border-radius: 8px;
  outline: none;
  font-weight: bold;
  cursor: pointer;
  padding-top: 10px;
  padding-bottom: 10px;
  font-family: inherit;
  margin-bottom: 5px;
  transition: 0.2s all;
  :hover {
    color: #092232;
  }
  .icon {
    vertical-align: middle;
    font-size: 16px;
    margin-right: 10px;
    margin-top: -2px;
  }
`;

export const DisabledTabButton = styled.button`
  width: 100%;
  border: none;
  background: none;
  font-size: 14px;
  color: #d8dcde;
  outline: none;
  font-weight: bold;
  cursor: not-allowed;
  padding-top: 10px;
  padding-bottom: 10px;
  font-family: inherit;
  :after {
    content: 'Soon';
    background: #3cbc98;
    padding: 1px 5px;
    border-radius: 2px;
    font-size: 10px;
    color: white;
    position: relative;
    left: 6px;
  }
  .icon {
    vertical-align: middle;
    font-size: 16px;
    margin-right: 10px;
    margin-top: -2px;
  }
`;

export const LinkBuyButton = styled.button`
  color: #3cbc98;
  border: none;
  padding: 0px;
  background: white;
`;

export const HelpLink = styled.button`
  color: #95acb7;
  background: #fff !important;
  font-size: 10px;
  border: none;
  padding: 0px;
  cursor: pointer;
  transition: 0.44s all;
  :hover {
    text-decoration: underline;
    color: rgb(61, 85, 107);
  }
`;

export const InfoLink = styled(FontAwesomeIcon)`
  vertical-align: middle;
`;

export const AreaDisabler = styled.div`
  opacity: ${props => (props.disabled ? '1' : '0.4')};
`;
