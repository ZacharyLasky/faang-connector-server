const { formatCandidateSkills, formatJobQualifications } = require('./');

const getMatchingCandidates = ({ candidateData, jobQualificationsData }) => {
  const jobQualifications = formatJobQualifications(jobQualificationsData[0].job_qualifications);
  const candidates = formatCandidateSkills(candidateData);

  let matches = [];
  candidates.forEach((candidate) => {
    return candidate.candidate_skills.filter((skill) => {
      if (jobQualifications.includes(skill)) {
        matches.push(candidate);
      }
    });
  });

  return [...new Set(matches)];
};

module.exports = { getMatchingCandidates };
