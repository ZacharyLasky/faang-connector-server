import React from 'react';
import styled from 'styled-components';
import { Jobs } from './components/Jobs';

function App() {
  return (
    <AppContainer className="App">
      <h1>FAANG Connector</h1>
      <Jobs />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: Arial, sans-serif;
`;
