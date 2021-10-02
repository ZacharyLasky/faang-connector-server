const puppeteer = require('puppeteer');

// The babel async function code isn't compatible with Puppeteer.
// Puppeteer calls function.toString and send the code into Chromium.
// But babel messes with that and we end up sending an incomplete string.
// You get around this by using template strings instead of functions.
const jobList = `(async () => {
  const jobResultNodes = document.querySelector('#search-results');

  let jobTitles = [];
  const jobTitleNodes = jobResultNodes.querySelectorAll('h2[itemprop="title"]');
  jobTitleNodes?.forEach((node) => {
    jobTitles.push(node.innerText);
  });

  let jobQualifications = [];
  const jobQualificationNodes = jobResultNodes.querySelectorAll(
    'div[itemprop="qualifications"] > ul > li'
  );
  jobQualificationNodes?.forEach((node) => {
    jobQualifications.push(node.innerText);
  });

  let jobResultsArray = [...jobResultNodes.children];
  let jobResultInnerText = [];
  for (let i = 0; i < jobResultsArray.length; i++) {
    jobResultInnerText.push(jobResultsArray[i].innerText);
  }

  let jobs = [];
  const jobsUrl =
    'https://careers.google.com/jobs/results/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PRODUCT_MANAGEMENT&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&category=USER_EXPERIENCE&company=Google&distance=50&employment_type=FULL_TIME&employment_type=TEMPORARY&jex=ENTRY_LEVEL';
  jobResultInnerText?.forEach((text, i) => {
    if (text.includes(jobTitles[i])) {
      jobs.push({
        job_title: jobTitles[i],
        job_qualifications: [...new Set(jobQualifications)].filter((qualification) =>
          text.includes(qualification)
        ),
        company: 'google',
        jobs_url: jobsUrl
      });
    }
  });

  return jobs;
})()`;

const launchGoogleWebScraper = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  const jobsUrl =
    'https://careers.google.com/jobs/results/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PRODUCT_MANAGEMENT&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&category=USER_EXPERIENCE&company=Google&distance=50&employment_type=FULL_TIME&employment_type=TEMPORARY&jex=ENTRY_LEVEL';
  await page.goto(jobsUrl, { waitUntil: 'networkidle2' });
  const jobData = await page.evaluate(jobList);

  await browser.close();
  return jobData;
};

module.exports = { launchGoogleWebScraper };
