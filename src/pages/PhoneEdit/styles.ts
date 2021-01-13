import { Colors } from 'shared/colors';
import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${Colors.white};
  border-radius: 15px;
  box-shadow: 5px 9px 40px -10px ${Colors.shadow};
`;

export const Inputs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-row-gap: 1em;
  grid-column-gap: 2em;
`;

export const Title = styled.span`
  color: ${Colors.orange};
  font-weight: 500;
  font-size: 1.8em;
`;