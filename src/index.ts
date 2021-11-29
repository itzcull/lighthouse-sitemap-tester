import args from 'args';
import chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import getRobotsTxt from './utils/getRobotsTxt';
import getSitemapFromRobots from './utils/getSitemapFromRobots';
import testWebPage from './utils/testWebPage';

const URLS = ['https://wisemind.com'];

const ALL_CATEGORIES = [
  'performance',
  'accessibility',
  'best-practices',
  'seo',
  'pwa',
];

args.options([
  {
    name: 'target',
    description: 'URL to target for testing.',
    init: (value: string) => value.toLowerCase(),
    defaultValue: 'https://google.com',
  },
  {
    name: 'category',
    description: 'Category to test.',
    init: (value: string) => value.toLowerCase(),
    defaultValue: 'performance',
  },
]);

const flags = args.parse(process.argv);

console.log(flags);

const robots = await getRobotsTxt(URLS[0]);

const sitemap = await getSitemapFromRobots(robots);

const urls = sitemap;
const testAllPages = async (categories: string[], urls: string[]) => {
  if (!(flags['category'] in ALL_CATEGORIES)) {
    throw new Error('Invalid category');
  }

  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

  for (const url of urls) {
    const result = await testWebPage(chrome, url, categories);

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

testAllPages(['performance'], URLS);
