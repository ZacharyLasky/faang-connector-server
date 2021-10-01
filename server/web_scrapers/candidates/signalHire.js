const puppeteer = require('puppeteer');
require('dotenv').config();

const launchCandidateWebScraper = async () => {
  console.log('email', process.env.SIGNAL_HIRE_EMAIL);
  console.log('email', process.env.SIGNAL_HIRE_PASSWORD);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const signalHireLoginURL = 'https://www.signalhire.com/login';
  await page.goto(signalHireLoginURL, { waitUntil: 'networkidle2' });

  // Check for login in URL in case somehow you are already logged in
  // If you are logged in, "/login" will automatically redirect to "/candidates"
  if (page.url().includes('/login')) {
    const email = process.env.SIGNAL_HIRE_EMAIL;
    const password = process.env.SIGNAL_HIRE_PASSWORD;

    // Input login info
    await page.type('#_email', email);
    await page.type('#_password', password);

    // Click submit and wait for navigation
    await Promise.all([
      page.click('#submit'),
      page.waitForNavigation({ waitUntil: 'networkidle0' })
    ]);
  }

  // Select "software" saved search from dropdown menu on new page once logged in
  await Promise.all([page.waitForSelector('.sp-formGroup__content')]);
  await Promise.all([
    page.select('select[class="form-control select2-hidden-accessible"]', '6014'),
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);

  // Check for paywall that limits number of searches and bypass it with generic search
  if (page.url().includes('candidatesSearchResultsLimitation')) {
    await page.goto(signalHireLoginURL, {
      waitUntil: 'networkidle2'
    });
  }

  // Evaluate page and grab specific data
  const candidateData = await page.evaluate(() => {
    const candidateResultNodes = document.querySelector('.sp-candList__inner');

    let candidateNames = [];
    const candidateNameNodes = candidateResultNodes.querySelectorAll(
      'div[class="sp-nameField__inner"]'
    );
    candidateNameNodes?.forEach((node) => {
      candidateNames.push(node.innerText);
    });

    let candidateJobTitles = [];
    const candidateJobTitleNodes = candidateResultNodes.querySelectorAll(
      'div[class="sp-candItem__subName"]'
    );
    candidateJobTitleNodes?.forEach((node) => {
      candidateJobTitles.push(node.innerText);
    });

    let candidateLocations = [];
    const candidateLocationNodes = candidateResultNodes.querySelectorAll(
      'span[class="sp-candItem__city"]'
    );
    candidateLocationNodes?.forEach((node) => {
      candidateLocations.push(node.innerText);
    });

    let candidatePreviousJobs = [];
    const candidatePreviousJobNodes = candidateResultNodes.querySelectorAll(
      'div[class="sp-candItem__metaList text-lighter"] > span'
    );
    candidatePreviousJobNodes?.forEach((node) => {
      candidatePreviousJobs.push(node.innerText);
    });

    let candidateSkills = [];
    const candidateSkillNodes = candidateResultNodes.querySelectorAll(
      '.sp-candItem > div:nth-child(5) > div > span'
    );
    candidateSkillNodes?.forEach((node) => {
      candidateSkills.push(node.innerText);
    });

    const candidates = [];
    for (let i = 0; i < candidateNames.length; i++) {
      candidates.push({
        candidate_name: candidateNames[i],
        candidate_job_title: candidateJobTitles[i],
        candidate_location: candidateLocations[i],
        candidate_previous_jobs: [candidatePreviousJobs[i]],
        candidate_skills: [candidateSkills[i]]
      });
    }

    return candidates;
  });

  await browser.close();
  return candidateData;
};

module.exports = { launchCandidateWebScraper };
