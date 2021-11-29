import fetch from 'node-fetch';

const getRobotsTxt = async (url: string): Promise<string> =>
  await fetch(`${url}/robots.txt`).then((res: Response) => res.text());

export default getRobotsTxt;
