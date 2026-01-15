module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'must have `@common` decorator when you export crius test case, otherwise, the be extended class still exec when you import in other place.',
      category: 'Best Practices',
      recommended: true,
    },
    // Add fixable to enable auto-fix
    fixable: 'code',
    schema: [], // no options
    messages: {
      missingCommonDecorator:
        'Exported classes step must have `@common` decorator when you export crius test case, otherwise, the be extended class still exec when you import in other place.',
    },
  },

  create(context) {
    return {
      ClassDeclaration(node) {
        // Check if the class is exported
        const isExported =
          node.parent &&
          (node.parent.type === 'ExportNamedDeclaration' ||
            node.parent.type === 'ExportDefaultDeclaration');

        if (!isExported) {
          return;
        }

        // Check for @common decorator
        const hasCommonDecorator =
          node.decorators &&
          node.decorators.some((decorator) => {
            // Check if the decorator is @common()
            if (decorator.expression.type === 'CallExpression') {
              const callee = decorator.expression.callee;
              return callee.type === 'Identifier' && callee.name === 'common';
            }

            // Check if the decorator is a simple @common
            if (decorator.expression.type === 'Identifier') {
              return decorator.expression.name === 'common';
            }

            return false;
          });

        // Report error if no @common decorator found
        if (!hasCommonDecorator) {
          context.report({
            node,
            messageId: 'missingCommonDecorator',
            // Add fix function
            fix(fixer) {
              // Determine the start of the class declaration
              // const classStart = node.range[0];

              // Create the decorator text to insert
              const decoratorText = '@common';

              // Use the fixer to insert the decorator
              return fixer.insertTextAfter(
                node.decorators[0],
                decoratorText + '\n',
              );
            },
          });
        }
      },
    };
  },
};
