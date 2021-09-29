import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaFacebookF, FaApple, FaAmazon, FaGoogle } from 'react-icons/fa';
import { SiNetflix } from 'react-icons/si';

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
      <Company className="facebook-company-wrapper" title="Facebook">
        <FaFacebookF className="facebook-company-icon" size="48px" alt="Facebook company icon" />
      </Company>
      <Company className="apple-company-wrapper" title="Apple">
        <FaApple className="apple-company-icon" size="48px" alt="Apple company icon" />
      </Company>
      <Company className="amazon-company-wrapper" title="Amazon">
        <FaAmazon className="amazon-company-icon" size="48px" alt="Amazon company icon" />
      </Company>
      <Company className="netflix-company-wrapper" title="Netflix">
        <SiNetflix className="netflix-company-icon" size="48px" alt="Netflix company icon" />
      </Company>
      <Company className="google-company-wrapper" title="Google">
        <FaGoogle className="google-company-icon" size="48px" alt="Google company icon" />
      </Company>
      {/* {jobs?.map((job) => {
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
      })} */}
    </JobsContainer>
  );
};

const JobsContainer = styled('div')`
  font-size: 20px;
`;

const JobListing = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 250px;
`;

const Company = styled(JobListing)`
  height: 200px;
  cursor: pointer;
  &:hover {
    background: #f0f8fa;
  }
`;

const ButtonWrapper = styled('div')`
  display: flex;
  justify-content: space-evenly;
`;
