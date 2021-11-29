import chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import lighthouse from 'lighthouse';

const URLS = ['https://wisemind.com'];
const CATEGORIES = ['performance', ''];

const testAllPages = async (categories, urls) => {
  if (!(category in CATEGORIES)) {
    return;
  }

  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

  for (const url of urls) {
    const result = await testPage(chrome, url, categories);

    const reportHtml = result.report;
    fs.writeFileSync(`../reports/${result.finalUrl}.html`, reportHtml);

    console.log('Report is done for', result.lhr.finalUrl);
    console.log(
      'Performance score was',
      result.lhr.categories.performance.score * 100
    );
  }

  await chrome.kill();
};

const testPage = async (
  chromeInstance: any,
  url: string,
  categories: string[]
) => {
  const result = await lighthouse(url, {
    logLevel: 'verbose',
    output: 'html',
    onlyCategories: categories,
    port: chromeInstance.port,
  });

  return result;
};

testAllPages(['performance'], URLS);
