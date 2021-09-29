import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AiFillHome } from 'react-icons/ai';
import { Companies } from './components/Companies';
import { Jobs } from './components/Jobs';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:4000/jobs')
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });

    axios
      .get('http://localhost:4000/candidates')
      .then((res) => {
        setCandidates(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  useEffect(() => {
    const filterJobs = jobs.filter((job) => job.company === selectedCompany);
    setFilteredJobs(filterJobs);
  }, [jobs, selectedCompany]);

  return (
    <AppContainer className="app">
      <Header className="header">
        <HomeIconWrapper className="home-icon-wrapper" onClick={() => setSelectedCompany('')}>
          <AiFillHome size="48px" className="home-icon" title="return to homepage" />
        </HomeIconWrapper>
        <Title>FAANG Connector</Title>
      </Header>
      {selectedCompany ? (
        <Jobs
          jobList={filteredJobs}
          candidateList={candidates}
          selectedCompany={selectedCompany}
          setSelectedCompany={(company) => setSelectedCompany(company)}
        />
      ) : (
        <Companies setSelectedCompany={(company) => setSelectedCompany(company)} />
      )}
    </AppContainer>
  );
}

export default App;

const AppContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: Arial, sans-serif;
`;

const Header = styled('div')`
  display: flex;
  align-items: center;
`;

const HomeIconWrapper = styled('div')`
  cursor: pointer;
  height: 48px;
`;

const Title = styled('h1')`
  margin-bottom: 0px;
  font-size: 24px;
`;
