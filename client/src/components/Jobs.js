import React from 'react';
import styled from 'styled-components';

export const Jobs = ({ selectedCompany, setSelectedCompany, jobList }) => {
  const companyName = selectedCompany[0].toUpperCase() + selectedCompany.slice(1);

  return (
    <div className="jobs-container">
      {jobList.length === 0 ? (
        <Job
          onClick={() => setSelectedCompany('')}
          title="return to homepage">{`No ${companyName} jobs available`}</Job>
      ) : (
        jobList.map((job, i) => {
          return (
            <Job className={`${selectedCompany}-job`} title={`${companyName} job`} key={i}>
              <h4>{job.job_title}</h4>
              <h6>{job.job_qualifications}</h6>
            </Job>
          );
        })
      )}
    </div>
  );
};

const Job = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 250px;
  height: 220px;
  cursor: pointer;
  &:hover {
    background: #f0f8fa;
  }
`;
