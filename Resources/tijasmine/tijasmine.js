function extend(destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
}

var jasmine = require("./jasmine").jasmine, env = jasmine.getEnv(), specFiles = [], jasmineInterface;

jasmineInterface = {
    describe: function(description, specDefinitions) {
        return env.describe(description, specDefinitions);
    },
    xdescribe: function(description, specDefinitions) {
        return env.xdescribe(description, specDefinitions);
    },
    it: function(desc, func) {
        return env.it(desc, func);
    },
    xit: function(desc, func) {
        return env.xit(desc, func);
    },
    beforeEach: function(beforeEachFunction) {
        return env.beforeEach(beforeEachFunction);
    },
    afterEach: function(afterEachFunction) {
        return env.afterEach(afterEachFunction);
    },
    expect: function(actual) {
        return env.currentSpec.expect(actual);
    },
    addMatchers: function(matchers) {
        return env.addMatchers(matchers);
    },
    spyOn: function(obj, methodName) {
        return env.currentSpec.spyOn(obj, methodName);
    },
    runs: function(func) {
        return env.currentSpec.runs(func);
    },
    waitsFor: function(latchFunction, optional_timeoutMessage, optional_timeout) {
        return env.currentSpec.waitsFor(latchFunction, optional_timeoutMessage, optional_timeout);
    },
    jasmine: jasmine
};

exports.addSpecModules = function(paths) {
    specFiles = Array.isArray(paths) ? specFiles.concat(paths) : specFiles.concat(Array.prototype.slice.call(arguments));
};

exports.execute = function() {
    specFiles.forEach(function(path) {
        require(path);
    });
    env.execute();
};

exports.addReporter = function(reporter) {
    env.addReporter(reporter);
};

exports.infect = function(infectee) {
    extend(infectee, jasmineInterface);
};