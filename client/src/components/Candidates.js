import React from 'react';
import styled from 'styled-components';

export const Candidates = ({ candidateList }) => {
  return (
    <div className="candidates-container">
      {candidateList.length === 0 ? (
        <Candidate title={`No candidates match this job`} noCandidates>
          No candidates match this job
        </Candidate>
      ) : (
        candidateList?.map((candidate, i) => {
          return (
            <Candidate title="Candidate" key={i}>
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
        })
      )}
    </div>
  );
};

const Candidate = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.noCandidates ? 'center' : 'space-between')};
  align-items: ${(props) => props.noCandidates && 'center'};
  border: 2px solid black;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 270px;
  height: 220px;
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
