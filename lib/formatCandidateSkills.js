const formatCandidateSkills = (candidateData) => {
  return candidateData.map((candidate) => {
    return {
      ...candidate,
      candidate_skills: candidate.candidate_skills
        .join('')
        .toUpperCase()
        .split(',')
        .map((skill) => skill.trim())
    };
  });
};

module.exports = { formatCandidateSkills };
