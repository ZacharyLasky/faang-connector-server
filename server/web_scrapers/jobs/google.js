const puppeteer = require('puppeteer');

(async () => {
  let jobsUrl =
    'https://careers.google.com/jobs/results/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PRODUCT_MANAGEMENT&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&category=USER_EXPERIENCE&company=Fitbit&company=Google&company=Google%20Fiber&company=Loon&company=Verily%20Life%20Sciences&company=Waymo&company=Wing&company=X&company=YouTube&distance=50&employment_type=FULL_TIME&employment_type=PART_TIME&employment_type=TEMPORARY&jex=ENTRY_LEVEL';
  // Initialize browser
  let browser = await puppeteer.launch();
  // Open a new browser page
  let page = await browser.newPage();
  // Go to specified url and tell browser that the navigation is finished
  // when there are no more than 2 network connections for at least half of a second
  await page.goto(jobsUrl, { waitUntil: 'networkidle2' });
  // Evaluate browser page
  let data = await page.evaluate(() => {
    let jobTitles = [];
    let jobQualifications = [];
    let jobs = [];
    const jobResultNodes = document.querySelector('#search-results');

    const jobTitleNodes = jobResultNodes.querySelectorAll('h2[itemprop="title"]');
    jobTitleNodes?.forEach((node) => {
      jobTitles.push(node.innerText);
    });

    const jobQualificationNodes = jobResultNodes.querySelectorAll(
      'div[itemprop="qualifications"] > ul > li'
    );
    jobQualificationNodes?.forEach((node) => {
      jobQualifications.push(node.innerText);
    });

    let jobResultArray = [...jobResultNodes.children];
    let jobResultInnerText = [];
    for (let i = 0; i < jobResultArray.length; i++) {
      jobResultInnerText.push(jobResultArray[i].innerText);
    }
    jobResultInnerText?.forEach((text, i) => {
      if (text.includes(jobTitles[i])) {
        jobs.push({
          jobTitle: jobTitles[i],
          jobQualifications: jobQualifications.filter((qualification) =>
            text.includes(qualification)
          )
        });
      }
    });

    return {
      jobs
    };
  });
  console.log(data);
  debugger;
  // Close browser
  await browser.close();
})();
