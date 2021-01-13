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
  transition-duration: 0.4s;

  &:hover {
    box-shadow: 0 0 10px -5px;
    transition-duration: 0.4s;
  }
  & > span {
    font-weight: 500;
    color: ${Colors.black};
  }
`;

export const PagMainInfo = styled.div`
  & span {
    &.number {
      color: ${Colors.blue};
    }
  }
`;