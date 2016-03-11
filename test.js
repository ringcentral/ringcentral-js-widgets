import test from 'ava';
import 'babel-register';
import register from './src/scripts/component.js'

test('register is exported successfully', t => {
    t.notThrows(register);
});
test('Components should be registered in normal ways', t => {
    var Man = register({
        actions: {
            climb: {
                brfore: function() {},
                method: function() {},
                after: function() {}
            }
        }
    });
    t.ok(Man);
})
test('Some registered function is not defined by users', t => {
    var Man = register({
        actions: {
            climb: {
                brfore: function() {},
                method: function() {},
                after: function() {}
            }
        }
    });
})
