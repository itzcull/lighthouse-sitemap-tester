const getSitemapFromRobots = (robots: string) => {
  const sitemap = robots.match(/Sitemap: (.*)/);

  console.log(sitemap);
  return sitemap ? sitemap[1] : null;
};

export default getSitemapFromRobots;
