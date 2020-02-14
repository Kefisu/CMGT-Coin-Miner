const addition = require('./addition');

const mod10hash = (collection, summary) => {
    if (collection.length === 0) {
        return summary
    }
    return mod10hash(collection, addition(summary, ...collection.splice(0, 1)))
};

module.exports = mod10hash;