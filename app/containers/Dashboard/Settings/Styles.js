import styled from 'styled-components';

export const Title = styled.h3`
  border-bottom: 1px solid #e5e8eb;
  font-weight: 600;
  font-size: 20px;
  opacity: 1;
  padding-top: 13px;
  padding-bottom: 22px;

  margin-bottom: 20px;
`;

export const Ol = styled.ol`
  padding: 15px 20px;
  li {
    list-style-type: decimal;
    padding-top: 5px;
    padding-bottom: 5px;
    span {
      padding-left: 13px;
      line-height: 20px;
      display: block;
      span {
        padding-left: 0px;
        display: inline-block;
      }
    }
  }
`;
