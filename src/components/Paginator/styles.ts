import { Colors } from 'shared/colors';
import styled from 'styled-components';

export const Wrapper = styled.div`
  color: ${Colors.black};
  font-weight: 500;
  font-size: 1.2em;
`;

export const ChangePageBtn = styled.button`
  display: flex;
  align-items: center;
  border-radius: 25px;
  padding: 0.5em 1em;
  background-color: ${Colors.white};
  transition-duration: 0.4s;

  &:hover {
    box-shadow: inset 0px 0px 10px -3px;
    transition-duration: 0.4s;
  }
  & > span {
    font-weight: 500;
    color: ${Colors.black};
  }
`;

export const PagMainInfo = styled.div`
  background-color: ${Colors.white};
  padding: 5px 15px;
  border-radius: 5px;

  & span {
    &.number {
      color: ${Colors.blue};
    }
  }
`;
