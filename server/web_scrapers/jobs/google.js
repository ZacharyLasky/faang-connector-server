const puppeteer = require('puppeteer');

const launchWebScraper = async () => {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  let jobsUrl =
    'https://careers.google.com/jobs/results/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PRODUCT_MANAGEMENT&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&category=USER_EXPERIENCE&company=Google&distance=50&employment_type=FULL_TIME&employment_type=TEMPORARY&jex=ENTRY_LEVEL';
  await page.goto(jobsUrl, { waitUntil: 'networkidle2' });

  let data = await page.evaluate(() => {
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
    jobResultInnerText?.forEach((text, i) => {
      if (text.includes(jobTitles[i])) {
        jobs.push({
          jobTitle: jobTitles[i],
          jobQualifications: [...new Set(jobQualifications)].filter((qualification) =>
            text.includes(qualification)
          )
        });
      }
    });

    return {
      jobs
    };
  });

  console.dir(data, { depth: null });
  await browser.close();
};

launchWebScraper();
