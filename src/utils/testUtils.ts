import lighthouse from 'lighthouse';

export const testWebPage = async (
  chromeInstance: any,
  url: string,
  category: string
) => {
  const result = await lighthouse(url, {
    logLevel: 'verbose',
    output: 'html',
    onlyCategories: category,
    port: chromeInstance.port,
  });

  return result;
};
