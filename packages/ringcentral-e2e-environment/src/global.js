const setup = () => console.log('=======>global setup<======');
const teardown = () => {
  console.log('=======>global teardown<======');
};
module.exports = {
  teardown,
  setup,
};
