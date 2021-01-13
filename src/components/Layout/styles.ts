import { Colors } from 'shared/colors';
import styled from 'styled-components';

export const Header = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  background: ${Colors.blue};
  z-index: 1;
  height: 60px;
  min-height: 55px;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 9px 40px -10px ${Colors.blue};
`;

export const Body = styled.div`
  max-width: 600px;
  min-height: 100vh;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
`;
