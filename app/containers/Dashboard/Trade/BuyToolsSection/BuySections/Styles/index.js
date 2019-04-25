import styled from 'styled-components';

export const ButtonLink = styled('button')`
  color: #3cbc98;
  border: none;
  padding: 2px;
  cursor: pointer;
  line-height: 12px;
  font-size: ${props => (props.bolded ? '12px' : '11px')};
  font-weight: ${props => (props.bolded ? '600' : '400')};
  margin-top: ${props => (props.bolded ? '10px' : '0px')};
  vertical-align: middle;
  text-align: right;
  transition: 0.2s all;
  background: white;
  :hover {
    color: #3dd2a8;
  }
  :focus {
    outline: none;
  }
  svg {
    margin-right: 5px;
  }
`;

export const ControlButtonUp = styled('button')`
  width: 30px;
  height: 17px;
  right: 10px;
  cursor: pointer;
  position: absolute;
  background: white;
  border: 1px solid #d8dcde;
  top: 0px;
  border-top-right-radius: 4px;
  :focus {
    outline: none;
  }
`;

export const ControlButtonDown = styled('button')`
  width: 30px;
  height: 16px;
  right: 10px;
  cursor: pointer;
  position: absolute;
  background: white;
  border: 1px solid #d8dcde;
  top: 16px;
  border-top: 0px;
  border-bottom-right-radius: 4px;
  :focus {
    outline: none;
  }
`;

export const HelpLink = styled('button')`
  color: #95acb7;
  font-size: 10px;
  border: none;
  padding: 0px;
  cursor: pointer;
  transition: 0.2s all;
  background: white;
  :hover {
    text-decoration: underline;
    color: rgb(61, 85, 107);
  }
`;

export const InputDecorator = styled('div')`
  position: absolute;
  right: 20px;
  font-size: 12px;
  top: 11px;
  opacity: 0.6;
`;

export const InputDecoratorIndeted = styled('div')`
  position: absolute;
  right: 50px;
  font-size: 12px;
  top: 11px;
  opacity: 0.6;
`;

export const InputDecoratorTall = styled('div')`
  position: absolute;
  right: 20px;
  font-size: 12px;
  top: 37px;
  opacity: 0.6;
`;

export const AreaDisabler = styled('div')`
  opacity: ${props => (props.disabled ? '1' : '0.3')};
  pointer-events: ${props => !props.disabled && 'none'};
  transition: 0.2s all;
`;

export const ButtonMini = styled.button`
  background: white;
  color: #3cbc98;
  padding: 6px 10px;
  border-radius: 3px;
  border: 1px solid #3cbc98;
  cursor: pointer;
  outline: none;
  margin-top: 3px;
  font-weight: 600;
  font-size: 10px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  transition: 0.2s all;
  :hover {
    border-color: transparent;
    background-color: #3dd2a8;
    text-decoration: none;
    color: #fff;
  }
  :focus {
    outline: none;
  }
  svg {
    margin-right: 5px;
  }
`;
