import { Colors } from 'shared/colors';
import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${Colors.white};
  border-radius: 15px;
  box-shadow: 5px 9px 40px -10px ${Colors.shadow};
`;

export const PriceDetail = styled.div`
  & > .title {
    font-size: 1.5em;
    color: ${Colors.blue};

    & > strong {
      color: ${Colors.green};
    }
    & + div {
      & > span {
        font-size: 1.2em;
        padding: 0 0.5em;
        color: ${Colors.black};
      }
    }
  }
`;

export const Button = styled.button`
  width: 3.5em;
  padding: 0;
  height: 3.5em;
  border-radius: 50%;
  transition-duration: 0.4s;
  &:hover {
    box-shadow: 0 0 10px -5px;
    transition-duration: 0.4s;
  }
`;

export const Number = styled.span`
  font-size: 2em;
  font-weight: 500;
  color: ${Colors.black};
`;