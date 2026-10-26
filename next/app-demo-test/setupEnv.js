// micro-core's rc config reads these at build time; the mocked API responses
// (and some assertions) use the devtest server.
process.env.RINGCENTRAL_SERVER_URL ||= 'https://platform.devtest.ringcentral.com';
process.env.RINGCENTRAL_CLIENT_ID ||= 'app-demo-test-client-id';
