import { HTMLAttributes } from 'react';
import styled from 'styled-components';

export const BtnWrapper = styled.button<{ btnColor: string } & HTMLAttributes<HTMLButtonElement>>`
  border-radius: 1em;
  box-shadow: 0 0 10px -6px;
  transition-duration: 0.4s;

  & > span {
    color: ${(props) => props.btnColor};
    font-weight: 500;
    font-size: 1.4em;
  }

  &:hover {
    box-shadow: ${({ btnColor, disabled}) => disabled ? 'none': `0 0 10px -2.5px ${btnColor}`};
    transition-duration: 0.4s;
  }
`;
