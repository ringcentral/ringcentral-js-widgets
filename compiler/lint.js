var Checker = require("jscs");
var checker = new Checker();
checker.registerDefaultRules();
checker.configure({
    preset: 'google',
    esnext: true,
    "validateIndentation": 4,
    "requireSemicolons": false,
    "disallowSemicolons": true,
    fix: true
});

function lintScript(input) {
    input.script && (input.script = checker.fixString(input).output)
    return input
}

