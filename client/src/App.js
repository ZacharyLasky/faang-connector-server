import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios
      .get('http://localhost:4000/jobs')
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  return (
    <div className="App">
      <h1>FAANG Connector Client</h1>
    </div>
  );
}

export default App;
