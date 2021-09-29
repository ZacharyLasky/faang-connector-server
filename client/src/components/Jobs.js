import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/jobs')
      .then((res) => {
        console.log(res.data);
        setJobs(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  return (
    <JobsContainer>
      <h1>Google Jobs</h1>
      {jobs?.map((job) => {
        return (
          <Job>
            <h1>{job.job_title}</h1>
            <h3>{job.job_qualifications}</h3>
            <ButtonWrapper>
              <button>
                <a href={job.jobs_url}>Jobs link</a>
              </button>
              <button>Candidates</button>
            </ButtonWrapper>
          </Job>
        );
      })}
    </JobsContainer>
  );
};

const JobsContainer = styled('div')`
  font-size: 12px;
`;

const Job = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid black;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 300px;
`;

const ButtonWrapper = styled('div')`
  display: flex;
  justify-content: space-evenly;
`;
