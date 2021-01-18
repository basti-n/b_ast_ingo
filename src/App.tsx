import { Board } from './components/Board';
import styled from 'styled-components';
import React from 'react';
import { Headline } from './components/Headline';

function App() {
  return (
    <>
      <Headline text={"Bingo"} />
      <StyledAppContainer>
        <Board></Board>
      </StyledAppContainer>
    </>
  );
}

export default App;

export const StyledAppContainer = styled.main`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
