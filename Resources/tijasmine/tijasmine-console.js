function ConsoleReporter(finishCallback) {
    function isTopLevel(suite) {
        return !suite.parentSuite;
    }
    function indent(suiteOrSpec) {
        var parent, level = 0;
        if (suiteOrSpec.suite) return indent(suiteOrSpec.suite);
        parent = suiteOrSpec.parentSuite;
        while (parent) {
            level++;
            parent = parent.parentSuite;
        }
        return Array(level * levelIndentation + 1).join(" ");
    }
    var startedAt, runningSuite, failureRecaps, topLevelSuites, logPrefix = "iphone" === Ti.Platform.osname ? ".  " : "", separatorLength = 60, levelIndentation = 3, sep = Array(separatorLength + 1).join("-"), bigsep = Array(separatorLength + 1).join("="), failedCount = 0, passedCount = 0;
    this.reportRunnerStarting = function(runner) {
        startedAt = new Date();
        failedCount = passedCount = 0;
        failureRecaps = [];
        runningSuite = null;
        topLevelSuites = runner.topLevelSuites();
    };
    this.reportRunnerResults = function() {
        finishCallback && finishCallback({
            failed: failedCount,
            passed: passedCount,
            elapsed: new Date() - startedAt
        });
        console.log(logPrefix + bigsep);
        failedCount ? setTimeout(function() {
            console.error(logPrefix + "THERE WERE FAILURES!");
            console.error(logPrefix + bigsep);
            console.error(logPrefix + "Recap of failing specs:");
            console.error(logPrefix + sep);
            failureRecaps.forEach(function(txt) {
                console.error(logPrefix + txt);
            });
            console.error(logPrefix + sep);
        }, 30) : console.log(logPrefix + "Congratulations! All passed.");
    };
    this.reportSuiteResults = function() {};
    this.reportSpecStarting = function(spec) {
        var suite = spec.suite, topLevel = isTopLevel(suite);
        if (!runningSuite || runningSuite.id !== suite.id) {
            runningSuite = suite;
            topLevel && console.log(logPrefix + sep);
            console.log(logPrefix + indent(suite) + suite.description + ":");
        }
    };
    this.reportSpecResults = function(spec) {
        var results = spec.results();
        console.log(logPrefix + indent(spec) + " - " + spec.description + " (" + (results.failedCount ? "FAILED" : "ok") + ")");
        passedCount += results.passedCount;
        failedCount += results.failedCount;
        results.items_ && results.items_.forEach(function(item) {
            if (!item.passed_ && item.message) {
                console.log(logPrefix + indent(spec) + " - - " + item.message);
                failureRecaps.push(spec.getFullName() + " - " + item.message);
            }
        });
    };
}

function ConsoleReporter2(finishCallback) {
    var failureCount = 0;
    var passedCount = 0;
    this.jasmineStarted = function() {
        failureCount = 0;
        passedCount = 0;
    };
    this.suiteStarted = function(result) {
        console.log("-------------------------");
        console.log(result.fullName + ":");
    };
    this.suiteDone = function() {};
    this.specStarted = function() {};
    this.specDone = function(result) {
        if ("passed" == result.status) {
            passedCount++;
            console.log("  -  " + result.description + " (ok)");
        } else if ("failed" == result.status) {
            console.log("  -  " + result.description + " (FAILED)");
            failureCount++;
            result.failedExpectations.forEach(function(expectation) {
                console.log("  -  -  " + expectation.message);
            });
        }
    };
    this.jasmineDone = function() {
        console.log("=========================");
        failureCount > 0 ? setTimeout(function() {
            console.error("THERE WERE FAILURES");
        }, 30) : console.log("Congratulations! All passed.");
        finishCallback && finishCallback({
            failed: failureCount,
            passed: passedCount
        });
    };
}

exports.ConsoleReporter2 = ConsoleReporter2;

exports.ConsoleReporter = ConsoleReporter;