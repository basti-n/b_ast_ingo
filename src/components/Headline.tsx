import { FunctionComponent } from 'react';
import styled from 'styled-components';

export interface HeadlineProps {
  text: string;
}

export const Headline: FunctionComponent<HeadlineProps> = ({
  text,
}) => {
  return <StyledHeadline>{text}</StyledHeadline>;
};

export const StyledHeadline = styled.h2`
  text-transform: uppercase;
  text-align: center;
  margin: 0;
  padding-top: 20px;
`;
