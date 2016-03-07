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
// test('Some registered function is not defined by users', t => {
//     var Man = register({
//         actions: {
//             climb: {
//                 brfore: function() {},
//                 method: function() {},
//                 after: function() {}
//             }
//         }
//     });
//     var man = new Man({
//         template: './template/auth-panel.html',
//         actions: {}
//     });
//     t.ok(man.climb);
// })
// test('Some registered function -> before/after is not defined by users', t => {
//     var Man = register({
//         actions: {
//             climb: {
//                 brfore: function() {},
//                 method: function() {},
//                 after: function() {}
//             }
//         }
//     });
//     var man = new Man({
//         template: './template/auth-panel.html',
//         actions: {
//             climb: {
//                 method: function() {},
//             }
//         }
//     });
//     t.ok(man.climb);
// })
// test('Some registered function -> method is not defined by users', t => {
//     var Man = register({
//         actions: {
//             climb: {
//                 brfore: function() {},
//                 method: function() {},
//                 after: function() {}
//             }
//         }
//     });
//     var man = new Man({
//         template: './template/auth-panel.html',
//         actions: {
//             climb: {
//                 brfore: function() {},
//                 after: function() {}
//             }
//         }
//     });
//     t.ok(man.climb);
// })
// test('Some registered function is ignored', t => {})
// test('Some registered function -> before/after is ignored', t => {})
// test('Some registered function -> ignore is ignored', t => {})
