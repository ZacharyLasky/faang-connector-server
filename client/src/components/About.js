import React from 'react';
import styled from 'styled-components';

export const About = () => {
  return (
    <Container className="about-container" title="About Website">
      <Title>Connect top tech jobs with top tech candidates!</Title>
      <Directions>
        Click the top "homepage" icon to return to the company selection from any page.
      </Directions>
      <Directions>
        Click a company icon to see current tech job listings for that company.
      </Directions>
      <Directions>
        Click a job result to see candidates that would be a good match for that job.
      </Directions>
    </Container>
  );
};

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 280px;
  height: 220px;
`;

const Title = styled('h4')`
  margin: 5px;
`;

const Directions = styled('h5')`
  margin: 5px;
`;
