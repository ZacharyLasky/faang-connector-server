import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export const Jobs = ({ selectedCompany, setSelectedCompany, jobList, candidateList }) => {
  const [selectedJob, setSelectedJob] = useState({
    title: '',
    qualifications: []
  });
  const [upperCaseCandidates, setUpperCaseCandidates] = useState([]);
  const [candidateMatches, setCandidateMatches] = useState(0);
  const companyName = selectedCompany[0].toUpperCase() + selectedCompany.slice(1);

  useEffect(() => {
    const candidates = candidateList.map((candidate) => {
      return {
        name: candidate.candidate_name,
        skills:
          candidate.candidate_skills &&
          candidate.candidate_skills.join('').replace(/\s/g, '').toUpperCase().split(',')
      };
    });

    setUpperCaseCandidates(candidates);
  }, [jobList, candidateList]);

  const renderMatches = (job) => {
    const upperCaseJob = {
      ...job,
      job_qualifications: job.job_qualifications
        .map((qualification) => qualification.toUpperCase())
        .join('')
    };
    // console.log({ upperCaseJob });

    const candidateSkills = upperCaseCandidates.map((candidate) =>
      candidate.skills.map((skill) => {
        return { candidate: candidate.name, skill: skill };
      })
    );

    // console.log(candidateSkills);

    let a = candidateSkills.map((skill) => {
      // console.log('skill', skill);
      return skill.map((s) => {
        console.log('skill', s.skill);
        if (upperCaseJob.job_qualifications.includes(s.skill)) {
          return s.skill;
        }
      });
    });

    console.log({ a });
    return '2 matching candidates';
  };

  return (
    <div className="jobs-container">
      {jobList.length === 0 ? (
        <Job
          onClick={() => setSelectedCompany('')}
          title="return to homepage">{`No ${companyName} jobs available`}</Job>
      ) : (
        jobList.map((job, i) => {
          return (
            <Job
              className={`${selectedCompany}-job`}
              title={`${companyName} job`}
              key={i}
              onClick={() =>
                setSelectedJob({ title: job.job_title, qualifications: job.job_qualifications })
              }>
              <JobTitle>{job.job_title}</JobTitle>
              <JobQualifications>{job.job_qualifications}</JobQualifications>
              <button>{renderMatches(job)}</button>
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
  justify-content: space-between;
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

const JobTitle = styled('h4')`
  margin: 5px;
`;

const JobQualifications = styled('h6')`
  margin: 5px;
`;
