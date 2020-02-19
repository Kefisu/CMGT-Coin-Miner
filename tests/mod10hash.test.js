const mod10hash = require('../modules/helpers/mod10hash');

const groupOf10 = [
    [1, 1, 6, 1, 0, 1, 1, 2, 0, 1],
    [1, 6, 0, 1, 2, 3, 4, 5, 6, 7],
    [1, 1, 6, 1, 0, 1, 1, 2, 0, 1]
];

test('A large array can be mod10 hashed', () => {
    expect(mod10hash(groupOf10, ...groupOf10.splice(0, 1))).toStrictEqual([3, 8, 2, 3, 2, 5, 6, 9, 6, 9])
});