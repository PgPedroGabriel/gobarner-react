import styled, { css } from 'styled-components';

import ToolTip from '../ToolTip';

interface ContainerProps {
  isFocus: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  ${props =>
    props.isErrored &&
    css`
      color: #c53030;
      border-color: #c53030;
    `}
  ${props =>
    props.isFocus &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

   

  & + div {
    margin-top: 8px;
  }
  input {
    background: transparent;
    color: #f4edeb;
    flex: 1;
    border: 0;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
    color: #666360;

    ${props =>
      props.isFilled &&
      css`
        color: #ff9000;
      `}
  }
`;

export const Error = styled(ToolTip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
