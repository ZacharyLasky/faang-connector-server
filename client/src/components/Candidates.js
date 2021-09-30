import React from 'react';
import styled from 'styled-components';

export const Candidates = ({ candidateList }) => {
  return (
    <div className="candidates-container">
      {candidateList?.map((candidate) => {
        console.log(candidate);
        return (
          <Candidate>
            <CandidateName>{candidate.candidate_name}</CandidateName>
            <CandidateLocation>{candidate.candidate_location}</CandidateLocation>
            <CandidatePreviousJob>
              {candidate.candidate_previous_jobs
                .map((job) => job)
                .concat(candidate.candidate_job_title + ', ')
                .reverse()}
            </CandidatePreviousJob>
            <CandidateSkills>{candidate.candidate_skills.map((skill) => skill)}</CandidateSkills>
          </Candidate>
        );
      })}
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
  width: 280px;
  height: 220px;
  cursor: pointer;
  &:hover {
    background: #f0f8fa;
  }
`;

const CandidateName = styled('h4')`
  margin: 5px;
`;

const CandidateLocation = styled('h5')`
  margin: 5px;
`;

const CandidatePreviousJob = styled('h6')`
  margin: 5px;
`;

const CandidateSkills = styled(CandidatePreviousJob)``;
