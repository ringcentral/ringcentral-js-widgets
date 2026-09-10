"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseLocaleFile;
const tslib_1 = require("tslib");
const generator_1 = tslib_1.__importDefault(require("@babel/generator"));
const parser_1 = require("@babel/parser");
const ramda_1 = require("ramda");
const extractAnnotations_1 = tslib_1.__importDefault(require("../extractAnnotations"));
/* eslint { no-eval: 0 } */
function parseLocaleFile(rawContent) {
    const data = new Map();
    const { content, annotations } = (0, extractAnnotations_1.default)(rawContent);
    const ast = (0, parser_1.parse)(content, { sourceType: 'module', plugins: ['typescript'] });
    function getData(properties) {
        (0, ramda_1.forEach)((prop) => {
            // get raw key from source content
            let key = content.substring(prop.key.start, prop.key.end);
            // wrap key in [] if needed
            if (prop.key.type !== 'StringLiteral' &&
                prop.key.type !== 'Identifier' &&
                prop.key.type !== 'NumericLiteral') {
                key = `[${key}]`;
            }
            // evaluate value to convert template literals or string concats into single string literal
            const value = eval((0, generator_1.default)(prop.value).code);
            const source = annotations.get(key);
            data.set(key, {
                key,
                value,
                source,
            });
        }, properties);
    }
    const defaultExport = (0, ramda_1.find)((item) => item.type === 'ExportDefaultDeclaration', ast.program.body);
    if (defaultExport) {
        if (defaultExport.declaration.type === 'ObjectExpression') {
            getData(defaultExport.declaration.properties);
        }
        else if (defaultExport.declaration.type === 'TSAsExpression') {
            const nest = defaultExport.declaration.expression;
            if (nest.type === 'ObjectExpression') {
                getData(nest.properties);
            }
        }
    }
    return {
        content,
        annotations,
        ast,
        data,
    };
}
//# sourceMappingURL=index.js.map