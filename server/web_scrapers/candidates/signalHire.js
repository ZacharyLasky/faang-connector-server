const puppeteer = require('puppeteer');

const launchCandidateWebScraper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // This page will redirect to login until we log in
  const signalHireLoginURL = 'https://www.signalhire.com/candidates';
  await page.goto(signalHireLoginURL, { waitUntil: 'networkidle2' });

  // Input info
  await page.type('#_email', 'faang.connector@gmail.com'); // update later with env variable
  await page.type('#_password', 'Blahspaghetti123'); // update later with env variable

  // Click and wait for navigation
  await Promise.all([page.click('#submit'), page.waitForNavigation({ waitUntil: 'networkidle2' })]);

  // Select "software" saved search from dropdown
  await Promise.all([
    page.waitForSelector('select[class="form-control select2-hidden-accessible"]')
  ]);
  await Promise.all([
    page.select('select[class="form-control select2-hidden-accessible"]', '6014'),
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);

  // Evaluate page
  const candidateData = await page.evaluate(async () => {
    const candidateResultNodes = document.querySelector('.sp-candList__inner');

    let candidateNames = [];
    const candidateNameNodes = candidateResultNodes.querySelectorAll(
      'div[class="sp-nameField__inner"]'
    );
    candidateNameNodes?.forEach((node) => {
      candidateNames.push(node.innerText);
    });

    let candidateSkills = [];
    const candidateSkillNodes = candidateResultNodes.querySelectorAll(
      'div[class="sp-candItem__metaList text-lighter"] > span'
    );
    candidateSkillNodes?.forEach((node) => {
      candidateSkills.push(node.innerText);
    });

    const candidateArray = [];
    for (let i = 0; i < candidateNames.length; i++) {
      candidateArray.push({
        candidateName: candidateNames[i],
        candidateSkills: candidateSkills[i]
      });
    }

    return candidateArray;
  });

  console.log({ candidateData });
  await browser.close();
};

launchCandidateWebScraper();
