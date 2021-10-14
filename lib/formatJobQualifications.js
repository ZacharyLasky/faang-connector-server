const formatJobQualifications = (jobQualificationsData) => {
  return jobQualificationsData
    .join('')
    .toUpperCase()
    .split(' ')
    .map((jobQualification) => jobQualification.replace(',', ''));
};

module.exports = { formatJobQualifications };
