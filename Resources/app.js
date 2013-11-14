var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

if ("production" !== Ti.App.deployType) {
    Alloy.CFG.environment = "test";
    require("tests_runner").run();
}

Alloy.createController("index");