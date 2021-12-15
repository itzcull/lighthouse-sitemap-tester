import chromeLauncher from 'chrome-launcher';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import SiteMapper from 'sitemapper';
import { URL } from 'url';

dotenv.config({
  path: `.env`,
});

const ALL_CATEGORIES: string[] = [
  'performance',
  'accessibility',
  'best-practices',
  'seo',
  'pwa',
];

// const args = arg({
//   '--help': Boolean,
//   '--version': Boolean,
//   '--category': (string) => {
//     return string.toLowerCase();
//   },
//   '--url': String,
//   '-c': '--category',
//   '-u': '--url',
// });

// const urlRegex = new RegExp(
//   /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
// );

// // Input validation
// if (!args['--target'] || !args['--category']) {
//   throw new Error('You must specify a target and category');
// } else if (urlRegex.test(args['--target']) === false) {
//   throw new Error('You must specify a valid URL');
// } else if (ALL_CATEGORIES.includes(args['--category'] as string) === false) {
//   throw new Error('You must specify a valid category');
// }

// const target = args['--target'] as string;
// const category = args['--category'] as Category;

const main = async () => {
  const target = process.env.TARGET;
  const category = 'performance';

  const sitemapper = new SiteMapper({
    url: target + '/sitemap.xml',
    debug: true,
  });

  const urls = await sitemapper.fetch().then((data) => data.sites);

  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

  for (const url of urls) {
    const runnerResult = await testWebPage(chrome, url, category);

    // Using url pathname to uniquely name files
    const urlPath = new URL(url).pathname;

    const reportHtml = runnerResult.report;
    fs.writeFileSync(
      path.join(
        __dirname,
        `./reports/${category}-${urlPath.replace('/', '-')}`
      ),
      reportHtml
    );

    console.log('Report is done for', runnerResult.lhr.finalUrl);
    console.log(
      'Performance score was',
      runnerResult.lhr.categories.performance.score * 100
    );
  }

  await chrome.kill();
};

main();
