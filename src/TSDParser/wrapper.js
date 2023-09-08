var ts = require("./typescript.js");


function getCircularReplacer() {
    const ancestors = [];
    return function (key, value) {
        if (typeof value !== "object" || value === null) {
            return value;
        }
        // `this` is the object that value is contained in,
        // i.e., its direct parent.
        while (ancestors.length > 0 && ancestors.at(-1) !== this) {
            ancestors.pop();
        }
        if (ancestors.includes(value)) {
            return "[Circular]";
        }
        ancestors.push(value);
        return value;
    };
}

module.exports = (callback, source) => callback(null, JSON.stringify(ts.createSourceFile("definition.d.ts", source, ts.ScriptTarget.Latest, false), getCircularReplacer()));