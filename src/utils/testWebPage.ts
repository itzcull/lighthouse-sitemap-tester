const lighthouse = require('lighthouse');

const testWebPage = async (
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

export default testWebPage;
