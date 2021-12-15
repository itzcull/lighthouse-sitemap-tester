declare module 'lighthouse';

declare module 'chrome-launcher';

declare type Category =
  | 'performance'
  | 'accessibility'
  | 'best-practices'
  | 'seo'
  | 'pwa';

declare const testWebPage: (
  chromeInstance: any,
  url: string,
  category: string
) => Promise<any>;
