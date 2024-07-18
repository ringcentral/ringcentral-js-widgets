const ignores = ['node_modules/(?!((@rjsf|culori)/|(@ringcentral/spring)))'];

module.exports = {
  ignores,
  regexp: ignores.map((ignore) => new RegExp(ignore)),
};
