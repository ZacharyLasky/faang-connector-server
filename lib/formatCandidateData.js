const formatCandidateData = (candidateData) => {
  console.log('candidate data:', candidateData[0]);
  return candidateData.map((candidate) => {
    return {
      ...candidate,
      candidate_skills: candidate.candidate_skills
        .join('')
        .toUpperCase()
        .split(',')
        .map((skill) => skill.trim()),
      candidate_previous_jobs: candidate.candidate_previous_jobs
        .join('')
        .split(',')
        .map((job) => job.trim())
    };
  });
};

module.exports = { formatCandidateData };
