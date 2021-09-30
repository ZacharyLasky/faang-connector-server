import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Candidates } from './Candidates';

export const Jobs = ({ selectedCompany, setSelectedCompany, jobList, candidateList }) => {
  const [selectedJob, setSelectedJob] = useState({
    title: '',
    qualifications: []
  });
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [upperCaseCandidates, setUpperCaseCandidates] = useState([]);
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

  const renderComponent = () => {
    if (selectedJob.title) {
      return <Candidates candidateList={selectedCandidates} />;
    }

    return (
      <div>
        {jobList.length === 0 ? (
          <Job
            onClick={() => setSelectedCompany('')}
            title="return to homepage"
            noJobs>{`No ${companyName} jobs available`}</Job>
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
                <CandidatesButton onClick={() => renderMatches(job, true)}>
                  {renderMatches(job)}
                </CandidatesButton>
              </Job>
            );
          })
        )}
      </div>
    );
  };

  const renderMatches = (job, singleJob = false) => {
    const upperCaseJob = {
      ...job,
      job_qualifications: job.job_qualifications
        .map((qualification) => qualification.toUpperCase())
        .join('')
    };

    const candidateSkills = upperCaseCandidates.map((candidate) =>
      candidate.skills.map((skill) => {
        return { candidate: candidate.name, skill: skill };
      })
    );

    const skillMatch = candidateSkills.map((skill) => {
      return skill.map((s) => {
        if (upperCaseJob.job_qualifications.includes(s.skill) && s.skill !== '') {
          return {
            job: upperCaseJob.job_title,
            name: s.candidate,
            skill: s.skill
          };
        }
      });
    });

    const matches = skillMatch.map((match) => match.filter((m) => m !== undefined));
    const filteredMatches = matches.filter((match) => match.length !== 0);
    const filteredMatchesNames = filteredMatches.map((match) => match.map((m) => m.name)).join('');
    const fullCandidateMatches = candidateList.map((candidate) => {
      if (filteredMatchesNames.includes(candidate.candidate_name)) {
        return candidate;
      }
    });
    const filteredCandidates = fullCandidateMatches.filter((match) => match);

    if (singleJob) {
      setSelectedCandidates(filteredCandidates);
      return;
    }

    if (filteredCandidates.length === 1) {
      return '1 matching candidate';
    }

    return `${filteredCandidates.length} matching candidates`;
  };

  return <div className="jobs-container">{renderComponent()}</div>;
};

const Job = styled('div')`
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

const JobTitle = styled('h4')`
  margin: 5px;
`;

const JobQualifications = styled('h6')`
  margin: 5px;
`;

const CandidatesButton = styled('button')`
  border: 3px double grey;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background: white;
  }
`;
