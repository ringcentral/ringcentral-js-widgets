export async function getMeetingProvider(client) {
  const res = await client.service
    .platform()
    .get('/restapi/v1.0/account/~/extension/~/video-configuration');
  return res.json();
}
