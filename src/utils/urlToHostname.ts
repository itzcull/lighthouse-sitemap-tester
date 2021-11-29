const urlToHostname = (url: string): string => {
  const match = url.match(
    /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im
  );
  return match && match[1];
};

export default urlToHostname;
