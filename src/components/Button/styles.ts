import { HTMLAttributes } from 'react';
import { Colors } from 'shared/colors';
import styled from 'styled-components';

interface BtnProps extends HTMLAttributes<HTMLButtonElement> {
  btnColor: string;
  inShadow?: boolean;
}
export const BtnWrapper = styled.button<BtnProps>`
  border-radius: 1em;
  box-shadow: 0 0 10px -6px;
  transition-duration: 0.4s;
  background-color: ${Colors.white};

  & > span {
    color: ${(props) => props.btnColor};
    font-weight: 500;
    font-size: 1.4em;
  }

  &:hover {
    box-shadow: ${({ btnColor, disabled, inShadow }) =>
      disabled
        ? 'none'
        : `${inShadow ? 'inset' : ''} 0 0 10px -2.5px ${btnColor}`};
    transition-duration: 0.4s;
  }
`;
