const envs = {
  apiUrl: process.env.REACT_APP_API_URL,
  miniAppUrl: process.env.REACT_APP_MINIAPP_URL,
  testInitData: process.env.REACT_APP_TEST_INIT_DATA ?? '',
  testManifest: process.env.REACT_APP_TEST_MANIFEST ?? '',
  secret: process.env.REACT_APP_SECRET ?? '',
};

export { envs };
