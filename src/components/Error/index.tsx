import React from 'react';

import NotFoundIcon from 'assets/images/not_found.png';
import styled from 'styled-components';
import { Colors } from 'shared/colors';

const ErrorWrapper = styled.div`
  & span {
    font-size: 1.7em;
    color: ${Colors.black};
    font-weight: 500;
  }
`;

interface Props {
  message: string;
}

const Error: React.FC<Props> = ({ message }) => {
  return (
    <ErrorWrapper className="d-flex flex-column align-items-center justify-content-center">
      <img height={200} src={NotFoundIcon} alt="error icon" />
      <span>{message}</span>
    </ErrorWrapper>
  );
};

export default Error;
