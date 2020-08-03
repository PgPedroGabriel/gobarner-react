import styled from 'styled-components';
import { shade } from 'polished';

import backgroundimage from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
  }

  > a {
    color: #f4edeb;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.5s;

    text-align: center;

    &:hover {
      color: ${shade(0.2, '#f4edeb')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundimage}) no-repeat center;
  background-size: cover;
`;