import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaApple, FaAmazon, FaGoogle } from 'react-icons/fa';
import { SiNetflix } from 'react-icons/si';

export const Companies = ({ setSelectedCompany }) => {
  return (
    <div className="companies-container">
      <Company
        className="facebook-company-wrapper"
        title="Facebook"
        onClick={() => setSelectedCompany('facebook')}>
        <FaFacebookF className="facebook-company-icon" size="48px" alt="Facebook company icon" />
      </Company>
      <Company
        className="apple-company-wrapper"
        title="Apple"
        onClick={() => setSelectedCompany('apple')}>
        <FaApple className="apple-company-icon" size="48px" alt="Apple company icon" />
      </Company>
      <Company
        className="amazon-company-wrapper"
        title="Amazon"
        onClick={() => setSelectedCompany('amazon')}>
        <FaAmazon className="amazon-company-icon" size="48px" alt="Amazon company icon" />
      </Company>
      <Company
        className="netflix-company-wrapper"
        title="Netflix"
        onClick={() => setSelectedCompany('netflix')}>
        <SiNetflix className="netflix-company-icon" size="48px" alt="Netflix company icon" />
      </Company>
      <Company
        className="google-company-wrapper"
        title="Google"
        onClick={() => setSelectedCompany('google')}>
        <FaGoogle className="google-company-icon" size="48px" alt="Google company icon" />
      </Company>
    </div>
  );
};

const Company = styled('div')`
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
