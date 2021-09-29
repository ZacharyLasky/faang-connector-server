import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export const Candidates = () => {
  return (
    <div className="jobs-container">
      <Candidate>hi</Candidate>
    </div>
  );
};

const Candidate = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.noJobs ? 'center' : 'space-between')};
  align-items: ${(props) => props.noJobs && 'center'};
  border: 2px solid black;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 260px;
  height: 220px;
  cursor: pointer;
  &:hover {
    background: #f0f8fa;
  }
`;
